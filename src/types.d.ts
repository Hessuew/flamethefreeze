import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { HTMLAttributes } from "astro/types";

export interface Post {
  /** A unique ID number that identifies a post. */
  id: string;

  /** A post’s unique slug – part of the post’s URL based on its name, i.e. a post called “My Sample Page” has a slug “my-sample-page”. */
  slug: string;

  /**  */
  permalink: string;

  /**  */
  publishDate: Date;
  /**  */
  updateDate?: Date;

  /**  */
  title: string;
  /** Optional summary of post content. */
  excerpt?: string;
  /**  */
  image?: string;

  /**  */
  category?: string;
  /**  */
  tags?: Array<string>;
  /**  */
  author?: string;

  /**  */
  metadata?: MetaData;

  /**  */
  draft?: boolean;

  /**  */
  Content?: AstroComponentFactory;
  content?: string;

  /**  */
  readingTime?: number;
}

export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
  structuredData?: MetaDataStructuredData;
}

export interface MetaDataStructuredData {
  "@context"?: string;
  "@type"?: string;
  "@id"?: string;
  headline?: string;
  description?: string;
  image?: string | MetaDataImage;
  author?: {
    "@type": string;
    name: string;
    url?: string;
  };
  publisher?: {
    "@type": string;
    name: string;
    logo?: {
      "@type": string;
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: {
    "@type": string;
    "@id": string;
  };
  url?: string;
  keywords?: string;
  articleSection?: string;
  wordCount?: number;
  about?: Array<{
    "@type": string;
    name: string;
    description: string;
  }>;
  mentions?: Array<{
    "@type": string;
    name: string;
    description: string;
  }>;
  // Allow for additional properties that might be needed
  [key: string]: unknown;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  alt: string;
  url: string | ImageMetadata;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface Image {
  src: string;
  alt?: string;
}

export interface Video {
  src: string;
  type?: string;
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: Record<string, string | Record<string, string>>;
  noAnimation?: boolean;
}

export interface Headline {
  anchorId?: string;
  title?: string;
  subtitle?: string;
  subtitle2?: string;
  tagline?: string;
  tagline2?: string;
  headlineType?: number;
  classes?: Record<string, string>;
  hrefID?: string;
}

interface TeamMember {
  name?: string;
  job?: string;
  image?: Image;
  socials?: Array<Social>;
  description?: string;
  classes?: Record<string, string>;
}

interface Social {
  icon?: string;
  href?: string;
}

export interface Stat {
  amount?: string;
  title?: string;
  description?: string;
  icon?: string;
}

export interface Item {
  title?: string;
  flag?: string;
  description?: string | { text: string; link?: boolean; subtitle?: boolean; classes?: Record<string, string> }[];
  description2?: { text: string; link?: string };
  icon?: string;
  classes?: Record<string, string>;
  callToAction?: CallToAction;
  image?: Image;
  link?: boolean;
}

export interface Price {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number;
  period?: string;
  items?: Array<Item>;
  callToAction?: CallToAction;
  hasRibbon?: boolean;
  ribbonTitle?: string;
}

export interface Testimonial {
  title?: string;
  testimonials?: string | string[];
  name?: string;
  job?: string;
  image?: string | unknown;
}

export interface Input {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface Textarea {
  label?: string;
  placeholder?: string;
  rows?: number;
}

export interface Disclaimer {
  label?: string;
}

// COMPONENTS
export interface CallToAction extends HTMLAttributes<a> {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  size?: "small" | "medium" | "large";
}

export interface CallToActionModern extends HTMLAttributes<a> {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  buttonType?: "fire" | "ice" | "default";
  size?: "small" | "medium" | "large";
}

export interface ItemGrid {
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
  classes?: Record<string, string>;
}

export interface Collapse {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
  classes?: Record<string, string>;
}

export interface Form {
  inputs?: Array<Input>;
  textarea?: Textarea;
  disclaimer?: Disclaimer;
  button?: string;
  description?: string;
}

// WIDGETS
export interface Hero extends Headline, Widget {
  content?: string;
  actions?: string | CallToAction[];
  isInfographics?: boolean;
  image?:
    | string
    | {
        src: string | ImageMetadata;
        alt?: string;
        class?: string;
        objectPosition?: string;
        isInfographics?: boolean;
        height?: number;
        width?: number;
        link?: {
          href: string;
          target?: string;
          rel?: string;
        };
      };
  imageText?: string;
}

export interface Team extends Headline, Widget {
  team?: Array<TeamMember>;
}

export interface Stats extends Headline, Widget {
  stats?: Array<Stat>;
}

export interface Pricing extends Headline, Widget {
  prices?: Array<Price>;
}

export interface Testimonials extends Headline, Widget {
  testimonials?: Array<Testimonial>;
  columns?: number;
  callToAction?: CallToAction;
  numbers?: boolean;
  animated?: boolean;
}

export interface Brands extends Headline, Widget {
  icons?: Array<string>;
  images?: Array<Image>;
}

export interface Features extends Omit<Headline, "classes">, Widget {
  animated?: boolean;
  image?: string | unknown;
  image2?: string | unknown;
  imageText?: string;
  imageText2?: string;
  video?: Video;
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
  callToAction1?: CallToAction;
  callToAction2?: CallToAction;
  isReversed?: boolean;
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
  callToAction?: CallToAction;
}

export interface Faqs extends Headline, Widget {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
}

export interface Steps extends Omit<Headline, "classes">, Widget {
  bigImage?: boolean;
  callToAction?: string | CallToAction;
  footer?: string;
  image?: string | Image;
  isReversed?: boolean;
  items: Array<Item>;
  type2?: boolean;
}

export interface Content extends Headline, Widget {
  content?: string;
  defaultIcon?: string;
  image?: string | unknown;
  items?: Array<Item>;
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: CallToAction;
  testimonial?: Array<Testimonial>;
  bottom?: {
    title: string;
    subtitle: string;
    links: { title: string; link: string }[];
  };
  whiteText?: boolean;
}

export interface Contact extends Headline, Form, Widget {}

export interface Services extends Omit<Headline, "classes">, Widget {
  services?: Array<{
    title: string;
    description: string;
    icon: string;
    features?: Array<string>;
  }>;
}

export interface Gallery extends Omit<Headline, "classes">, Widget {
  images?: Array<{
    src?: string;
    alt?: string;
    title?: string;
    description?: string;
    height?: number;
  }>;
  columns?: number;
}

export interface ImageShowcase extends Omit<Headline, "classes">, Widget {
  images?: Array<{
    src?: string | ImageMetadata;
    alt?: string;
    title?: string;
    description?: string;
    href?: string;
    height?: number;
    features?: Array<string>;
    icon?: boolean;
  }>;
  layout?: "masonry" | "grid" | "featured";
  textGetStarted?: string;
}

export interface VideoShowcase extends Omit<Headline, "classes">, Widget {
  videos?: Array<{
    src: string | ImageMetadata;
    alt?: string;
    title: string;
    description?: string;
    features?: Array<string>;
    link: string;
    objectPosition?: string;
  }>;
}

export interface ZoomLink {
  title: string;
  description?: string;
  url: string;
  icon?: string;
  time?: string;
  recurring?: string;
  meetingId?: string;
  passcode?: string;
  weekType?: "even" | "odd";
}
