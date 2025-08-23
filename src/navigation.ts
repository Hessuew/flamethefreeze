import type { MenuLink } from "./components/widgets/Header.astro";
import prayer from "~/assets/images/fire_of_god_and_fire_for_god-prayer.webp";
import word from "~/assets/images/word.webp";
import smith from "~/assets/images/witnesses/flame_the_freeze_smith_wigglesworth.webp";
import free_you_from_your_sins from "~/assets/images/holyGhost/what_does_the_holy_ghost_do-free_you_from_your_sins.webp";

// Language route pairs mapping
export const routePairs: Record<string, string> = {
  "/": "/jumalan-tuli",
  "/prayer-for-works": "/miten-rukoilla",
  "/the-power-of-the-words": "/jumalan-sana",
  "/what-does-the-holy-ghost-do": "/pyhä-henki",
};

// Helper function to get the opposite route
export const getOppositeRoute = (path: string): string | null => {
  // Check if current path is an English route
  for (const [enRoute, fiRoute] of Object.entries(routePairs)) {
    if (path === enRoute) return fiRoute;
    if (path === fiRoute) return enRoute;
  }
  return null;
};

// Language route mapping function
export const changeLangInUrl = (currentPath: string, targetLang: "en" | "fi"): string => {
  // Handle specific route pairs
  const oppositeRoute = getOppositeRoute(currentPath);
  if (oppositeRoute !== null) {
    if (targetLang === "en") {
      // If we're switching to English, return the English route
      return Object.keys(routePairs).find((enRoute) => routePairs[enRoute] === currentPath) || oppositeRoute;
    } else {
      // If we're switching to Finnish, return the Finnish route
      return routePairs[currentPath] || oppositeRoute;
    }
  }

  // Fallback to generic language switching for other routes
  // For English target: add /en prefix if not already there
  if (targetLang === "en") {
    if (currentPath.startsWith("/fi/")) {
      return currentPath.replace("/fi", "/en");
    }
    if (currentPath === "/fi") {
      return "/en";
    }
    return currentPath;
  }

  // For Finnish target: remove /en prefix if present
  if (targetLang === "fi") {
    if (currentPath.startsWith("/en/")) {
      return currentPath.replace("/en", "/fi");
    }
    if (currentPath === "/en") {
      return "/fi";
    }
    return currentPath;
  }

  return currentPath;
};

// Helper function to get the correct route based on language and href
export const getLanguageRoute = (href: string, targetLang: "en" | "fi"): string => {
  // Map navigation hrefs to route pairs
  const hrefToRouteMap: Record<string, string> = {
    prayer: "/prayer-for-works",
    about: "/what-does-the-holy-ghost-do",
    "holy-ghost": "/what-does-the-holy-ghost-do",
    word: "/the-power-of-the-words",
    // Add more mappings as needed for other navigation items
  };

  // Get the base route from href
  const baseRoute = hrefToRouteMap[href] || `/${href}`;

  // If we have a route pair mapping, use it
  if (routePairs[baseRoute]) {
    return targetLang === "fi" ? routePairs[baseRoute] : baseRoute;
  }

  // For routes not in pairs, use language prefix for both languages
  return targetLang === "fi" ? `/fi/${href}` : `/en/${href}`;
};

export const headerData: { links: Array<MenuLink> } = {
  links: [
    {
      text: "header.flameUp",
      links: [
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
          text: "header.link7",
          href: "events",
          icon: "tabler:calendar-event",
          description: "header.description7",
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
          text: "header.link8",
          href: "holy-ghost",
          icon: "tabler:brand-tailwind",
          description: "header.description8",
          image: {
            src: free_you_from_your_sins,
            alt: "What does the Holy Ghost do? Free you from your sins",
          },
        },
      ],
    },
  ],
};
