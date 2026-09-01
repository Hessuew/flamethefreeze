import { beforeAll, describe, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const projectRoot = new URL("..", import.meta.url);
const registrationUrl = "https://flamethefreeze.zoom.us/meeting/register/ld_7_mtRRcmYZSfmGUgbUw";

beforeAll(() => {
  execFileSync(process.execPath, ["run", "build"], {
    cwd: projectRoot,
    stdio: "pipe",
  });
}, 120_000);

const readPage = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");

const decodeAttribute = (value) => value?.replaceAll("&amp;", "&").replaceAll("&quot;", '"');

const parseAttributes = (source) =>
  Object.fromEntries(
    [...source.matchAll(/([:\w-]+)(?:="([^"]*)")?/g)].map(([, name, value = ""]) => [name, decodeAttribute(value)])
  );

const linksIn = (html) =>
  [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attributes, content]) => ({
    attributes: parseAttributes(attributes),
    text: content
      .replaceAll(/<[^>]+>/g, " ")
      .replaceAll(/\s+/g, " ")
      .trim(),
  }));

const pixelScriptIn = (html) => {
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  return scripts.find((script) => script.includes("connect.facebook.net/en_US/fbevents.js"));
};

describe("requested site updates", () => {
  test("renders an accessible flyer download on both event pages", async () => {
    const pages = [
      [await readPage("en/events/hour-of-encounter/index.html"), "Download the Hour of Encounter flyer"],
      [await readPage("fi/events/hour-of-encounter/index.html"), "Lataa Hour of Encounter -esite"],
    ];

    for (const [html, label] of pages) {
      const download = linksIn(html).find(({ attributes }) => attributes.download === "hour-of-encounter-flyer.jpg");

      expect(download).toBeDefined();
      expect(download.attributes["aria-label"]).toBe(label);
      expect(download.text).toContain(label);
      expect(new URL(download.attributes.href, "https://flamethefreeze.com").pathname).toMatch(
        /\/hour-of-encounter\.[\w-]+\.jpg$/
      );
    }
  });

  test("renders the future-events registration action on both event pages", async () => {
    const pages = [
      [await readPage("en/events/hour-of-encounter/index.html"), "Register for future events"],
      [await readPage("fi/events/hour-of-encounter/index.html"), "Ilmoittaudu tuleviin tapahtumiin"],
    ];

    for (const [html, label] of pages) {
      const registration = linksIn(html).find(({ attributes }) => attributes.href === registrationUrl);

      expect(registration).toBeDefined();
      expect(registration.text).toContain(label);
      expect(html).not.toContain("Add recurring event to calendar");
    }
  });

  test("initializes Meta Pixel once and tracks every client page load", async () => {
    const html = await readPage("index.html");
    const script = pixelScriptIn(html);
    const listeners = new Map();
    const insertedScripts = [];
    const document = {
      addEventListener(type, listener) {
        const registered = listeners.get(type) ?? [];
        registered.push(listener);
        listeners.set(type, registered);
      },
      createElement() {
        return {};
      },
      getElementsByTagName() {
        return [{ parentNode: { insertBefore: (element) => insertedScripts.push(element) } }];
      },
    };
    const context = { document };
    context.window = context;

    expect(script).toBeDefined();
    vm.runInNewContext(script, context);
    vm.runInNewContext(script, context);

    const pageLoadListeners = listeners.get("astro:page-load") ?? [];
    expect(pageLoadListeners).toHaveLength(1);
    expect(insertedScripts).toHaveLength(1);
    expect([...context.fbq.queue].map((entry) => Array.from(entry))).toEqual([["init", "1774128133609281"]]);

    pageLoadListeners[0]();
    pageLoadListeners[0]();
    expect([...context.fbq.queue].map((entry) => Array.from(entry))).toEqual([
      ["init", "1774128133609281"],
      ["track", "PageView"],
      ["track", "PageView"],
    ]);

    const noscriptImage = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)]
      .flatMap((match) => [...match[1].matchAll(/<img\b([^>]*)>/g)])
      .map((match) => parseAttributes(match[1]))
      .find(({ src }) => src?.startsWith("https://www.facebook.com/tr?"));
    const fallbackUrl = new URL(noscriptImage.src);

    expect(fallbackUrl.searchParams.get("id")).toBe("1774128133609281");
    expect(fallbackUrl.searchParams.get("ev")).toBe("PageView");
    expect(fallbackUrl.searchParams.get("noscript")).toBe("1");
  });
});
