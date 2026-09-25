export type Project = {
  slug: string;
  title: string;
  kicker: string;
  category: string;
  year: string;
  role: string;
  description: string;
  statement: string;
  tools: string[];
  chapters: { title: string; body: string }[];
  accent: string;
  media?: string;
  mediaAlt?: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "nur",
    title: "NUR",
    kicker: "Faith × focus × interface",
    category: "Product Design / Android",
    year: "2026",
    role: "Concept, product direction, vibe coding",
    description: "A refined Islamic lifestyle and self-accountability experience shaped around prayer, daily intention and calm progress.",
    statement: "A spiritual utility designed to feel contemplative rather than clinical.",
    tools: ["AI-assisted development", "Android", "Interaction design", "Product thinking"],
    chapters: [
      { title: "The problem", body: "Many habit tools feel noisy, competitive or generic. NUR explores a calmer rhythm where progress is visible without turning faith into a scoreboard." },
      { title: "The idea", body: "Combine prayer tracking, daily tasks, reflection and long-term rhythm inside one coherent visual language built around restraint, warmth and intentional motion." },
      { title: "Design direction", body: "Dark surfaces, carefully controlled gold, expressive progress states and soft transitions create a sense of ceremony without sacrificing everyday usability." },
      { title: "What I learned", body: "The strongest interface decisions came from deciding what not to show. Restraint made the product feel more personal and easier to navigate." }
    ],
    accent: "linear-gradient(135deg,#0d0d0d 0%,#1a1510 45%,#9f7a36 120%)",
    media: "https://raw.githubusercontent.com/whitesr09/Portfolio/main/public/projects/nur.webp",
    mediaAlt: "NUR dark gold interface showing Daily Light, prayer, Amanah and Muhasaba screens."
  },
  {
    slug: "nur-m3",
    title: "NUR-M3",
    kicker: "Faith × Material 3 × customization",
    category: "Product Design / Android",
    year: "2026",
    role: "Product direction, Material 3 system, vibe coding",
    description: "A brighter, highly customizable Material 3 evolution of NUR, reworking the daily journey around prayer, Amanah, focus, rhythm and history.",
    statement: "Rebuilding a spiritual product without losing its identity.",
    tools: ["Material 3", "Android", "UI systems", "AI-assisted development"],
    chapters: [
      { title: "The evolution", body: "NUR-M3 reinterprets the original product through a lighter Material 3 system while preserving the core spiritual and self-accountability experience." },
      { title: "The idea", body: "Make the daily journey clearer, more modular and more customizable, with quick actions and meaningful progress visible at a glance." },
      { title: "Design direction", body: "Soft surfaces, expressive typography, teal accents, compact navigation and configurable progress treatments create a distinctly modern Android experience." },
      { title: "What I learned", body: "A redesign works best when it preserves the product's emotional identity while being willing to completely rethink its interaction system." }
    ],
    accent: "linear-gradient(135deg,#d9fbfa 0%,#bfece7 52%,#40d9b0 135%)",
    media: "https://raw.githubusercontent.com/whitesr09/Portfolio/main/public/projects/nur-m3.webp",
    mediaAlt: "NUR-M3 interface showing the Daily Journey dashboard and prayer tracking.",
    href: "https://github.com/whitesr09/NUR-M3"
  },
  {
    slug: "studyflow",
    title: "StudyFlow",
    kicker: "Student productivity, rethought",
    category: "Product Design / Android",
    year: "2026",
    role: "Product direction, UI/UX, vibe coding",
    description: "A student-focused workspace combining study planning, documents, countdowns and focused academic utilities.",
    statement: "A compact academic command center built for real student routines.",
    tools: ["AI-assisted development", "Android", "UX systems", "Information architecture"],
    chapters: [
      { title: "The problem", body: "Student tools are often fragmented across planners, timers, file viewers and note apps. The experience becomes a collection of utilities instead of a flow." },
      { title: "The idea", body: "Bring the most repeated academic actions into one fast, compact interface with strong hierarchy and low friction." },
      { title: "Design direction", body: "Professional typography, compact components, adaptable appearance modes and motion that supports navigation instead of decorating it." },
      { title: "What I learned", body: "Performance and density matter as much as visual polish on mobile. Small spacing decisions can change how fast an app feels." }
    ],
    accent: "linear-gradient(135deg,#f8f7fb 0%,#eee8fa 55%,#a96cea 140%)",
    media: "https://raw.githubusercontent.com/whitesr09/Portfolio/main/public/projects/studyflow.webp",
    mediaAlt: "StudyFlow interface showing Today, Library, Plan, learning cycle and workspace screens.",
    href: "https://github.com/whitesr09/StudyFlow"
  },
  {
    slug: "character-build",
    title: "Character Build",
    kicker: "Structured imagination",
    category: "Generative AI / Android",
    year: "2026",
    role: "Concept, UX direction, prompt systems",
    description: "A character prompt builder for assembling consistent visual identities through structured creative choices.",
    statement: "Turning a complicated prompt into a visual system you can actually navigate.",
    tools: ["Prompt engineering", "Generative AI", "Android", "UX design"],
    chapters: [
      { title: "The problem", body: "Detailed image prompts can become slow to compose and difficult to reproduce consistently across multiple generations." },
      { title: "The idea", body: "Translate prompt construction into modular visual choices so a creator can build a character progressively and understand every decision." },
      { title: "Design direction", body: "Compact controls, clear expansion patterns and restrained glass surfaces keep a large option set usable on a phone." },
      { title: "What I learned", body: "Prompt engineering becomes more powerful when treated as interface design: structure, defaults and sequencing matter." }
    ],
    accent: "linear-gradient(135deg,#07070b 0%,#111323 48%,#6047ff 115%,#00d7c7 145%)",
    media: "https://raw.githubusercontent.com/whitesr09/Portfolio/main/public/projects/character-build.webp",
    mediaAlt: "Character Build AI Character Prompt Studio interface with model presets and prompt controls.",
    href: "https://github.com/whitesr09/Charecter-Build"
  },
  {
    slug: "evolve",
    title: "EVOLVE",
    kicker: "Life systems as interaction",
    category: "Creative Technology / Web",
    year: "2026",
    role: "Concept, experience design, product architecture",
    description: "An experimental self-development ecosystem using simulations, challenges and progression as a language for personal growth.",
    statement: "A self-improvement product imagined more like an interactive world than a checklist.",
    tools: ["Experience design", "AI ideation", "Web concepts", "Gamification"],
    chapters: [
      { title: "The problem", body: "Traditional self-improvement tools often reduce complex growth into repetitive lists and streaks." },
      { title: "The idea", body: "Use decisions, simulations and visible progression to make reflection feel active and exploratory." },
      { title: "Design direction", body: "Futuristic systems, layered depth and responsive motion create the feeling of entering a personal operating system." },
      { title: "What I learned", body: "A strong concept needs equally strong information architecture. Ambition only works when the path through it stays clear." }
    ],
    accent: "linear-gradient(135deg,#07100c 0%,#10231a 48%,#83b897 125%)"
  },
  {
    slug: "ai-campaigns",
    title: "AI Creative Campaigns",
    kicker: "Direction over generation",
    category: "AI Image / AI Video",
    year: "2026",
    role: "Creative direction, prompting, editing",
    description: "Experiments in cinematic advertising, fashion imagery and marketing concepts built with generative tools and deliberate art direction.",
    statement: "Using AI as a production medium—not as a substitute for taste.",
    tools: ["Prompt engineering", "AI image", "AI video", "Creative direction"],
    chapters: [
      { title: "The problem", body: "Generative output can look technically impressive while still feeling directionless or interchangeable." },
      { title: "The idea", body: "Start with a clear visual thesis, camera language, materials, motion and editorial intent before choosing a model." },
      { title: "Design direction", body: "Commercial polish, controlled typography, cinematic pacing and repeatable visual language across still and moving media." },
      { title: "What I learned", body: "Prompt quality is less about adding words and more about making stronger decisions." }
    ],
    accent: "linear-gradient(135deg,#130d08 0%,#28180e 48%,#c18a54 130%)"
  },
  {
    slug: "poster-studies",
    title: "Poster Studies",
    kicker: "Typography × image × restraint",
    category: "Visual Design",
    year: "2026",
    role: "Poster design, composition, editing",
    description: "A growing archive of visual experiments exploring hierarchy, type, image treatment and high-impact composition.",
    statement: "Posters as a laboratory for visual decisions.",
    tools: ["Typography", "Composition", "Photo editing", "Art direction"],
    chapters: [
      { title: "The approach", body: "Each study begins with one dominant idea—scale, contrast, tension, rhythm or image treatment—and removes anything that weakens it." },
      { title: "Typography", body: "Type is treated as image: sometimes structural, sometimes quiet, sometimes the loudest object in the frame." },
      { title: "Composition", body: "Negative space and asymmetry are used deliberately so every element has a reason to exist." },
      { title: "What I learned", body: "Good poster work trains the eye quickly. Small typographic errors become impossible to ignore." }
    ],
    accent: "linear-gradient(135deg,#0b0b0b 0%,#242424 50%,#d8d2c5 140%)"
  }
];

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
