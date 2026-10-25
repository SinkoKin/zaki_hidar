/**
 * ONLY ZEKO / central content configuration
 *
 * All coach-specific facts and editable copy live here.
 * Verified source: docs/only-zeko-brand-audit.md
 *
 * Images are public Instagram frames used with visible credit and source links.
 * Replace the `src` paths with approved originals before commercial launch.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sourceUrl?: string;
  label?: string;
  position?: string;
};

export type Skill = {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  image: ImageAsset;
  secondaryImage?: ImageAsset;
  glyph: "handstand" | "single-arm" | "planche" | "transition" | "balance";
};

const instagram = "https://www.instagram.com/only_zeko/";
const jams = "https://www.instagram.com/jams__association/";

const image = (
  src: string,
  alt: string,
  label: string,
  sourceUrl: string,
  position = "center",
): ImageAsset => ({
  src,
  alt,
  width: 361,
  height: 640,
  label,
  sourceUrl,
  position,
});

const at = (code: string) => `${instagram}reel/${code}/`;

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  brand: {
    name: "Only Zeko",
    wordmark: "ONLY ZEKO",
    person: "Zakaria",
    role: "Calisthenics athlete & personal trainer",
    handle: "@only_zeko",
    instagram,
    instagramDisplay: "instagram.com/only_zeko",
    jams,
    location: "Marrakech, Morocco",
    coordinates: "31.6295° N / 7.9811° W",
    association: "J.A.M.S. Marrakech",
    associationFull: "Jeunes Athlètes Marrakchis Du Street",
  },
  nav: [
    { label: "Discipline", href: "#discipline", index: "03" },
    { label: "Method", href: "#method", index: "04" },
    { label: "Coaching", href: "#coaching", index: "05" },
    { label: "Work", href: "#work", index: "06" },
  ],
  hero: {
    eyebrow: "Calisthenics athlete / Personal trainer",
    headline: ["Master", "Your body."],
    intro:
      "Strength, control and discipline. Built in Marrakech with the oldest equipment there is: the body, the bar, gravity.",
    primaryCta: "Start your journey",
    secondaryCta: "Explore my training",
    scrollLabel: "Scroll to enter",
    meta: [
      { label: "Base", value: "Marrakech / MA" },
      { label: "Discipline", value: "Calisthenics" },
      { label: "Crew", value: "J.A.M.S." },
    ],
    sideNote: "Bodyweight / Skill / Control",
    figure: {
      study: "Bodyweight study / 001",
      name: "The rig",
      medium: "Steel / light / gravity",
    },
    reticle: {
      top: "FIG. 01",
      bottom: "THE RIG / LIVE",
    },
  },
  ticker: [
    "Strength",
    "Control",
    "Discipline",
    "Bodyweight",
    "Marrakech",
    "Handstand",
    "Planche",
    "Balance",
    "J.A.M.S.",
  ],
  philosophy: {
    eyebrow: "02 / The standard",
    heading: "The body is the first machine.",
    paragraphs: [
      "Zakaria, known as Only Zeko, is a calisthenics athlete and personal trainer from Marrakech. His work starts with the oldest equipment there is: the body, the bar, gravity.",
      "One-arm handstands. Full planches. Controlled transitions. Positions held long enough to expose every weak link.",
      "Strength is the base. Control is the craft. Discipline is what remains when the camera stops.",
    ],
    facts: [
      { label: "Based", value: "Marrakech, Morocco" },
      { label: "Association", value: "J.A.M.S. Marrakech" },
      { label: "Focus", value: "Bodyweight / Skill / Control" },
    ],
    pullQuote: "Make the position honest.",
    aperture: {
      index: "Fig. 01",
      title: "Zakaria",
      image: image(
        "/images/1.jpeg",
        "Only Zeko — training frame.",
        "About / portrait",
        "",
        "center",
      ),
      meta: ["Load / 100% bodyweight", "Credit / @only_zeko"],
    },
    note: "Calisthenics is not a shortcut. It is a conversation between tension and patience.",
  },
  skills: {
    eyebrow: "03 / Discipline",
    heading: "The shapes that matter.",
    intro:
      "Five expressions of control. Each one earned through repetition, tension, and time under the bar.",
    instruction: "Select a discipline",
    items: [
      {
        id: "handstand",
        number: "01",
        name: "Handstand",
        category: "Vertical",
        description:
          "A straight line from wrist to toe. The first place strength becomes balance.",
        glyph: "handstand",
        image: image(
          "/images/zeko/courtyard-handstand.jpg",
          "Only Zeko holds a handstand in a sunlit tiled courtyard.",
          "Courtyard / handstand",
          at("DGqp_Ewow3F"),
          "center",
        ),
      },
      {
        id: "one-arm",
        number: "02",
        name: "One-arm handstand",
        category: "Single support",
        description:
          "The whole body balanced over one point of contact. Nothing extra. Nothing hidden.",
        glyph: "single-arm",
        image: image(
          "/images/zeko/courtyard-handstand-alt.jpg",
          "Only Zeko holds a handstand in a blue-sky courtyard.",
          "Courtyard / handstand",
          at("DDKkXcftrC5"),
          "center",
        ),
      },
      {
        id: "planche",
        number: "03",
        name: "Full planche",
        category: "Horizontal",
        description:
          "The body held level over the hands. Maximum tension with no room to cheat.",
        glyph: "planche",
        image: image(
          "/images/zeko/gym-planche.jpg",
          "Only Zeko holds a planche on parallelttes in a dark training room.",
          "Gym / planche",
          at("DZiL-HVsvFq"),
          "center",
        ),
      },
      {
        id: "balance",
        number: "04",
        name: "Balance",
        category: "Stillness",
        description:
          "The quiet work. Hold the shape until the wobble has nowhere left to hide.",
        glyph: "balance",
        image: image(
          "/images/zeko/studio-handstand.jpg",
          "Only Zeko holds a handstand under a stage light.",
          "Studio / handstand",
          at("DZS3peIMBno"),
          "center",
        ),
      },
    ] satisfies Skill[],
    caption: "Public training frames. More in the gallery.",
  },
  method: {
    eyebrow: "04 / Method",
    heading: "Built in layers.",
    intro:
      "A clear framework for turning raw effort into usable strength. The work starts with the position, then earns the next variable.",
    note: "No two athletes need the same plan. Programming is adapted to the individual.",
    steps: [
      {
        number: "01",
        title: "Own the position",
        body: "Before load, before speed, before the next skill. Find the line and hold it.",
        tag: "Position",
      },
      {
        number: "02",
        title: "Build tension",
        body: "Strength starts from the inside. Ribs down, shoulders active, everything connected.",
        tag: "Strength",
      },
      {
        number: "03",
        title: "Break it down",
        body: "A skill is a set of shapes. Train the shapes you can control, then connect them.",
        tag: "Skill",
      },
      {
        number: "04",
        title: "Repeat clean work",
        body: "Consistency over intensity. Leave the session with something you can repeat.",
        tag: "Discipline",
      },
    ],
  },
  coaching: {
    eyebrow: "05 / Coaching",
    heading: "Train with intent.",
    intro:
      "If you want to move better, get stronger, eat for the work, and learn the shapes properly, start a conversation. Tell me where you are and what you want to build.",
    note: "No automated checkout. Messages go directly to Zeko on Instagram. Availability and rates are confirmed in DM.",
    primaryLinkLabel: "Enquire on Instagram",
    options: [
      {
        number: "01",
        title: "Personal training",
        meta: "Marrakech / In person",
        body: "One-to-one training around your level and goals. Form, positioning, strength progression and skill work.",
        points: ["Form and positioning", "Strength progression", "Skill development"],
        availability: "Availability on request",
        featured: true,
      },
      {
        number: "02",
        title: "Skill work",
        meta: "Targeted practice",
        body: "Dedicated work for handstand, one-arm handstand, planche and transitions.",
        points: ["Technical breakdown", "Drills and progressions", "Practice structure"],
        availability: "Enquire via DM",
        featured: false,
      },
      {
        number: "03",
        title: "Collaborations",
        meta: "Brands / Creators / Athletes",
        body: "For collaborations, athlete features and community projects. The public bio is open for collaboration enquiries.",
        points: ["Content collaborations", "Athlete features", "Community projects"],
        availability: "DM @only_zeko",
        featured: false,
      },
      {
        number: "04",
        title: "Meal plans",
        meta: "Nutrition / Bodybuilding",
        body: "Custom meal plans for mass and strength phases. Bodybuilding nutrition built to support calisthenics training — eat to grow, train to control.",
        points: ["Custom meal plans", "Mass and strength phases", "Built around training days"],
        availability: "DM @only_zeko",
        featured: false,
      },
    ],
  },
  gallery: {
    eyebrow: "06 / Field notes",
    heading: "The work, in frame.",
    intro:
      "Public training frames from Marrakech and beyond. Documentary, not staged. More on Instagram.",
    credit: "Photography via @only_zeko. Source links open the original posts.",
    items: [
      image(
        "/images/zeko/beach-planche.jpg",
        "Only Zeko holds a planche above the sand at dusk.",
        "Dusk / planche",
        at("DbBkS9LsgkD"),
        "center",
      ),
      image(
        "/images/zeko/courtyard-handstand-alt.jpg",
        "Only Zeko holds a handstand in a blue-sky courtyard.",
        "Courtyard / handstand",
        at("DDKkXcftrC5"),
        "center",
      ),
      image(
        "/images/zeko/orange.jpeg",
        "Only Zeko — training frame.",
        "Field note / 03",
        "",
        "center",
      ),
      image(
        "/images/zeko/studio-handstand.jpg",
        "Only Zeko holds a handstand under a stage light.",
        "Studio / handstand",
        at("DZS3peIMBno"),
        "center",
      ),
      image(
        "/images/zeko/gym-planche.jpg",
        "Only Zeko holds a planche on parallelttes in a dark training room.",
        "Gym / planche",
        at("DZiL-HVsvFq"),
        "center",
      ),
      image(
        "/images/zeko/gym-one-arm.jpg",
        "Only Zeko trains a one-arm balance on parallelttes in a gym.",
        "Gym / single arm",
        at("DbG81bGM-xB"),
        "center",
      ),
      image(
        "/images/2.jpeg",
        "Only Zeko - training frame.",
        "Field note / 07",
        "",
        "center",
      ),
      image(
        "/images/3.jpeg",
        "Only Zeko - training frame.",
        "Field note / 08",
        "",
        "center",
      ),
    ],
  },
  finalCta: {
    eyebrow: "07 / Start",
    heading: ["The bar", "is waiting."],
    body: "You bring the intention. We build the rest, one clean rep at a time.",
    primaryCta: "Start your journey",
    secondaryCta: "More training on Instagram",
    meta: "DM @ONLY_ZEKO / MARRAKECH, MOROCCO",
  },
  footer: {
    statement: "Strength is built. Control is earned.",
    credit: "Public photography credited to @only_zeko. Used here as editorial reference with source links.",
    rights: "© 2026 Only Zeko. All rights reserved.",
    note: "Site design and build / 2026",
  },
} as const;

export type SiteData = typeof site;
