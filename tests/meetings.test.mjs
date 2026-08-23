import { describe, expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

import { HOUR_OF_ENCOUNTER, ONLINE_MEETINGS } from "../src/data/meetings.ts";

describe("meeting content", () => {
  test("keeps the supplied Hour of Encounter details aligned with its calendar", async () => {
    const calendar = await readFile(new URL("../public/calendar/hour-of-encounter.ics", import.meta.url), "utf8");

    expect(new Date(`${HOUR_OF_ENCOUNTER.firstOccurrence}T12:00:00Z`).getUTCDay()).toBe(0);
    expect(calendar).toContain("DTSTART;TZID=America/New_York:20260809T190000");
    expect(calendar).toContain("RRULE:FREQ=MONTHLY;BYDAY=2SU,4SU");
    expect(calendar).toContain(HOUR_OF_ENCOUNTER.meetingId);
    expect(calendar).toContain(`Passcode: ${HOUR_OF_ENCOUNTER.passcode}`);
    expect(calendar).toContain(`URL:${HOUR_OF_ENCOUNTER.joinUrl}`);
  });

  test("publishes only secure, unique Zoom destinations", () => {
    const urls = [HOUR_OF_ENCOUNTER.joinUrl, ...ONLINE_MEETINGS.map(({ joinUrl }) => joinUrl)];

    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(new URL(url).protocol).toBe("https:");
      expect(new URL(url).hostname).toMatch(/(^|\.)zoom\.us$/);
    }
  });
});
