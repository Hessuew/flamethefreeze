import type { MenuLink } from "./components/widgets/Header.astro";
import prayer from "~/assets/images/prayer.webp";
import word from "~/assets/images/word.webp";
import smith from "~/assets/images/witnesses/flame_the_freeze_smith_wigglesworth.webp";

export const headerData: { links: Array<MenuLink> } = {
  links: [
    {
      text: "header.flameUp",
      links: [
        {
          text: "header.link1",
          href: "word",
          icon: "tabler:bible",
          description: "header.description1",
          image: {
            src: word,
            alt: "flame_the_freeze_word",
          },
        },
        {
          text: "header.link2",
          href: "prayer",
          icon: "tabler:pray",
          description: "header.description2",
          image: {
            src: prayer,
            alt: "flame_the_freeze_prayer",
          },
        },
        {
          text: "header.link3",
          href: "church",
          icon: "tabler:flame",
          description: "header.description3",
        },
        {
          text: "header.link4",
          href: "devotions",
          icon: "tabler:notebook",
          description: "header.description4",
        },
      ],
    },
    {
      text: "header.resources",
      links: [
        {
          text: "header.link5",
          href: "witnesses",
          icon: "tabler:users",
          description: "header.description5",
        },
        {
          text: "header.link6",
          href: "fivefold",
          icon: "tabler:diamond",
          description: "header.description6",
          image: {
            src: smith,
            alt: "Smith Wigglesworth flamed the freeze in his own life time",
          },
        },
        {
          text: "header.link7",
          href: "events",
          icon: "tabler:calendar-event",
          description: "header.description7",
        },
      ],
    },
  ],
};
