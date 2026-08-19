export const HOUR_OF_ENCOUNTER = {
  slug: "hour-of-encounter",
  title: "Hour of Encounter",
  audience: "North America",
  firstOccurrence: "2026-08-09",
  time: "7:00 p.m.",
  timezone: "America/New_York",
  timezoneLabel: "Eastern Time (ET)",
  meetingId: "896 8357 0736",
  passcode: "931418",
  joinUrl: "https://zoom.us/j/89683570736",
  calendarUrl: "/calendar/hour-of-encounter.ics",
  detailsPath: {
    en: "/en/events/hour-of-encounter",
    fi: "/fi/events/hour-of-encounter",
  },
  contacts: {
    emails: ["ftf.northamerica@gmail.com", "info@christ-dina.org"],
    phoneDisplay: "+1 647-926-4407",
    phoneUrl: "tel:+16479264407",
    whatsappUrl: "https://wa.me/16479264407",
    websites: ["https://www.flamethefreeze.com", "https://www.christ-dina.org"],
  },
} as const;

export const ONLINE_MEETINGS = [
  {
    id: "bible-study",
    titleKey: "zoom.bible.title",
    descriptionKey: "zoom.bible.description",
    scheduleKey: "meetings.bible.schedule",
    joinUrl: "https://flamethefreeze.zoom.us/j/89840579351?pwd=Hr5ZAcJHbUVrybCIIySL6sT6Vw7Rly.1",
    meetingId: "898 4057 9351",
    passcode: "983643",
    icon: "tabler:book-2",
  },
  {
    id: "prayer-meeting",
    titleKey: "zoom.prayer.title",
    descriptionKey: "zoom.prayer.description",
    scheduleKey: "meetings.prayer.schedule",
    joinUrl: "https://flamethefreeze.zoom.us/j/82297139976?pwd=2ZCDgn6UVPyuqKeKsh8CWBN3IQhiXu.1",
    meetingId: "822 9713 9976",
    passcode: "706512",
    icon: "tabler:pray",
  },
] as const;
