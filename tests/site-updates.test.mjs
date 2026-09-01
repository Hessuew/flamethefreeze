import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

import { HOUR_OF_ENCOUNTER } from "../src/data/meetings.ts";
import { ui } from "../src/i18n/ui.ts";

const eventScreen = await readFile(new URL("../src/screens/hour-of-encounter.astro", import.meta.url), "utf8");
const layout = await readFile(new URL("../src/layouts/Layout.astro", import.meta.url), "utf8");
const metaPixel = await readFile(new URL("../src/components/common/MetaPixel.astro", import.meta.url), "utf8");

describe("requested site updates", () => {
  test("offers an accessible flyer download using the event flyer asset", () => {
    expect(eventScreen).toContain("href={flyer.src}");
    expect(eventScreen).toContain('download="hour-of-encounter-flyer.jpg"');
    expect(eventScreen).toContain('aria-label={t("hourOfEncounter.downloadFlyer")}');
    expect(ui.en["hourOfEncounter.downloadFlyer"]).toBe("Download the Hour of Encounter flyer");
  });

  test("links the future-events action to the supplied Zoom registration page", () => {
    expect(HOUR_OF_ENCOUNTER.registrationUrl).toBe(
      "https://flamethefreeze.zoom.us/meeting/register/ld_7_mtRRcmYZSfmGUgbUw"
    );
    expect(eventScreen).toContain("href={HOUR_OF_ENCOUNTER.registrationUrl}");
    expect(eventScreen).toContain("hourOfEncounter.registerFutureEvents");
    expect(eventScreen).not.toContain("hourOfEncounter.addCalendar");
    expect(ui.en["hourOfEncounter.registerFutureEvents"]).toBe("Register for future events");
  });

  test("includes the Meta Pixel globally alongside the existing layout analytics", () => {
    expect(layout).toContain("<Analytics />");
    expect(layout).toContain("<MetaPixel />");
    expect(metaPixel).toContain("1774128133609281");
    expect(metaPixel).toContain('fbq("track", "PageView");');
    expect(metaPixel).toContain("https://www.facebook.com/tr?id=1774128133609281&ev=PageView&noscript=1");
  });
});
