import projectsJson from "./projects.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroMarker {
  value: string;
  label: string;
}

export interface ImpactStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  category: string;
  year: string;
  name: string;
  problem: string;
  impacts: ImpactStat[];
  architecture: string;
  techTags: string[];
  featured: boolean;
  githubUrl: string;
  accentColor: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string[];
  accentColor: string;
  keyMetrics?: { value: string; label: string }[];
}

export interface SkillCluster {
  id: string;
  icon: string;
  name: string;
  description: string;
  stack: string[];
}

export interface InterestPillar {
  icon: string;
  label: string;
  sub: string;
}

export interface PhilosophyCard {
  num: string;
  title: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export type HighlightVisual = "rings" | "tiles" | "waveform" | "clusters";

export interface HighlightProject {
  id: string;
  name: string;
  category: string;
  blurb: string;
  techTags: string[];
  accentColor: string;
  href: string;
  githubUrl: string;
  visual: HighlightVisual;
}

export interface ProjectLandingConfig {
  name: string;
  category: string;
  blurb: string;
  techTags: string[];
  visual: HighlightVisual;
}

interface ProjectJson extends Project {
  landing?: ProjectLandingConfig;
}

export const PROFILE = {
  fullName: "Aravind Santhosh Kumar",
  handle: "aravind.",
  email: "lnu.arav@northeastern.edu",
  location: "Boston, MA",
  github: "https://github.com/ask187",
  linkedin: "https://www.linkedin.com/in/aravindsk187/",
  resume: "#",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const HERO_TAGS: string[] = [
  "Backend Systems",
  "Distributed Platforms",
  "Applied Machine Learning",
  "Full-Stack Product Engineering",
];

export const HERO_MARKERS: HeroMarker[] = [
  { value: "6+", label: "Yrs · Production Eng." },
  { value: "4.0", label: "MS · Computer Science" },
  { value: "AWS", label: "Solutions Architect" },
];

const PROJECTS_SOURCE = projectsJson as ProjectJson[];

export const PROJECTS: Project[] = PROJECTS_SOURCE.map(({ landing, ...rest }) => rest);

export const HIGHLIGHT_PROJECTS: HighlightProject[] = PROJECTS_SOURCE
  .filter((p): p is ProjectJson & { landing: ProjectLandingConfig } => Boolean(p.landing))
  .map((p) => ({
    id: p.id,
    name: p.landing.name,
    category: p.landing.category,
    blurb: p.landing.blurb,
    techTags: p.landing.techTags,
    accentColor: p.accentColor,
    href: `/projects#${p.id}`,
    githubUrl: p.githubUrl,
    visual: p.landing.visual,
  }));

export const EXPERIENCES: WorkExperience[] = [
  {
    company: "Geode",
    role: "Software Development Engineer Intern",
    period: "Jun 2025 – Dec 2025",
    location: "Remote — US Based",
    description: "Cross-chain dApp analytics and intelligence platform.",
    highlights: [
      "Designed and delivered a deep-linking and request-routing platform from scratch — NGINX-based proxy parsing and routing shortened URLs directly to marketplace listings across the platform.",
      "Reduced deployment time by 90% (30 min → 2–3 min) by architecting isolated staging and production environments with webhook-triggered CI/CD pipelines, eliminating all manual releases.",
      "Replaced third-party automation with an in-house BullMQ / Redis orchestration system, cutting operational costs and manual effort by 60% while enabling near real-time updates across thousands of dApps.",
    ],
    tech: ["Express.js", "BullMQ", "Redis", "NGINX", "Docker", "CI/CD", "NestJS"],
    accentColor: "#fb923c",
    keyMetrics: [
      { value: "90%↓", label: "deploy time" },
      { value: "60%↓", label: "ops cost" },
    ],
  },
  {
    company: "KPMG",
    role: "Assistant Manager — Software Developer 2",
    period: "Jun 2021 – Feb 2024",
    location: "Bangalore, India",
    description:
      "Global professional services — enterprise software delivery for Fortune 500 clients.",
    highlights: [
      "Led development of Schneider Electric's Asset Lifecycle Management platform — React.js UIs backed by NestJS BFFs and Redux Toolkit, serving global enterprise users across multiple regions.",
      "Integrated Oracle Aconex with OAuth 2.0, reducing document processing times by 15% and streamlining compliance workflows across thousands of engineering documents.",
      "Drove cross-functional issue resolution that reduced production blocker turnaround from 3 days to 1 day, directly improving delivery speed for high-priority customer features.",
    ],
    tech: ["React.js", "NestJS", "Redux Toolkit", "StencilJS", "OAuth 2.0", "TypeScript"],
    accentColor: "#3b82f6",
    keyMetrics: [
      { value: "3d→1d", label: "blocker turnaround" },
      { value: "15%↓", label: "processing time" },
    ],
  },
  {
    company: "Blume Global",
    role: "Software Developer 2",
    period: "Aug 2020 – Jun 2021",
    location: "Bangalore, India",
    description: "Enterprise supply chain and logistics intelligence platform.",
    highlights: [
      "Built a React micro-frontend module within a single-spa architecture for FMS and VIP Terminal Service platforms, integrating Stripe API — cutting transaction processing time by 40%.",
      "Diagnosed and resolved critical production incidents across services, reducing incident response times by 10% and improving platform reliability for enterprise customers.",
    ],
    tech: ["React.js", "single-spa", "Stripe API", "Micro-frontend", "JavaScript"],
    accentColor: "#8b5cf6",
    keyMetrics: [
      { value: "40%↓", label: "txn time" },
      { value: "10%↓", label: "incident response" },
    ],
  },
  {
    company: "Dsquare Solutions",
    role: "Software Developer",
    period: "Feb 2018 – Aug 2020",
    location: "Bangalore, India",
    description: "Analytics and data visualization software for enterprise clients.",
    highlights: [
      "Developed an interactive data visualization platform with React.js, Redux, and D3.js — reducing report generation time by 25% and saving analysts 12+ hours per week.",
      "Built reusable visualization components that streamlined reporting workflows and reduced duplicated code across internal analytics tools.",
    ],
    tech: ["React.js", "Redux", "D3.js", "JavaScript", "REST APIs"],
    accentColor: "#10b981",
    keyMetrics: [
      { value: "25%↓", label: "report gen time" },
      { value: "12h/wk", label: "analyst time saved" },
    ],
  },
];

export const SKILL_CLUSTERS: SkillCluster[] = [
  {
    id: "backend",
    icon: "⬡",
    name: "Backend Engineering",
    description:
      "Where most of my production work lives. API design, data modeling, authentication, queue-based processing, and service decomposition — owning the full backend from schema migrations to reverse proxy config.",
    stack: ["Node.js", "NestJS", "Express", "Flask", "Postgres", "Redis", "REST", "JWT", "WebSocket"],
  },
  {
    id: "frontend",
    icon: "△",
    name: "Frontend Engineering",
    description:
      "Six years of React in production — from D3-powered analytics dashboards to enterprise micro-frontends. I build interfaces with the same rigor I apply to backend systems: typed, composable, maintainable.",
    stack: ["React", "TypeScript", "Redux", "Next.js", "Tailwind", "StencilJS", "D3.js", "single-spa"],
  },
  {
    id: "ml",
    icon: "◇",
    name: "Applied ML / NLP",
    description:
      "Built during my MS and beyond — text classification, embedding-based retrieval, and semantic feedback systems. ML that actually ships: proper evaluation, class imbalance handling, and deployment paths that work in production.",
    stack: ["Python", "scikit-learn", "TF-IDF", "Embeddings", "pgvector", "GPT API", "Semantic Search", "Supabase"],
  },
  {
    id: "devops",
    icon: "⬢",
    name: "DevOps / Infrastructure",
    description:
      "Comfortable operating production systems without managed service dependencies — Docker, Nginx, CI/CD pipelines, and process management on bare-metal VPS. AWS-certified for when the cloud makes more sense.",
    stack: ["Docker", "Nginx", "GitHub Actions", "CI/CD", "AWS", "PM2", "VPS", "Linux"],
  },
  {
    id: "distributed",
    icon: "◉",
    name: "Systems Design",
    description:
      "How services decompose, where state authority lives, how failure propagates. Applied directly: VR server authority models, BullMQ job orchestration, CI/CD pipeline isolation, and service decomposition in enterprise platforms.",
    stack: ["Service Decomposition", "Event-Driven Architecture", "BullMQ", "State Machines", "Netcode Authority", "Redis Pub/Sub"],
  },
  {
    id: "realtime",
    icon: "◈",
    name: "Real-Time Systems",
    description:
      "Multiplayer VR state synchronization at 72Hz across N Quest headsets, live leaderboards with WebSocket broadcasting, and terrain streaming over deterministic frame buffers. Low-latency as a hard constraint, not an afterthought.",
    stack: ["Unity 2022.3", "Netcode for GameObjects", "Meta Quest", "NetworkVariable", "WebSocket", "Terrain Streaming"],
  },
];

export const INTEREST_PILLARS: InterestPillar[] = [
  { icon: "⬡", label: "Full-Stack Ownership", sub: "End-to-end product engineering, from data model to UI" },
  { icon: "◉", label: "Systems Design", sub: "Service decomposition, consistency tradeoffs, scalable architecture" },
  { icon: "◇", label: "Applied ML", sub: "NLP, semantic systems, embeddings in production" },
  { icon: "⬢", label: "Backend Platforms", sub: "API design, pipelines, infra that teams rely on" },
];

export const PHILOSOPHY_CARDS: PhilosophyCard[] = [
  {
    num: "01",
    title: "Authority belongs somewhere",
    description:
      "Ambiguous ownership causes ambiguous bugs. In the VR sandbox, the server owned world state — clients sent inputs, never mutations. In queue-based pipelines, the queue owns ordering. The authority model is the first architectural decision, not the last.",
  },
  {
    num: "02",
    title: "Failure is load-bearing",
    description:
      "Dead-letter queues, circuit breakers, retry with backoff, idempotent operations — these aren't edge-case handling. They're the architecture. At Geode, replacing a fragile third-party automation with BullMQ meant failure modes became observable and recoverable by design.",
  },
  {
    num: "03",
    title: "Measure the actual cost of wrong",
    description:
      "Accuracy on imbalanced clinical data is a vanity metric — a false negative on a Critical class has patient cost. p99 latency matters more than mean throughput when tail latency drives user abandonment. The metric should reflect the real consequence of failure in that domain.",
  },
  {
    num: "04",
    title: "Infrastructure carries the product",
    description:
      "I build systems that handle complexity at the infrastructure layer so the product layer can be simple. BullMQ with dead-letter recovery, Netcode authority models, sub-50ms vector retrieval — invisible when they work, load-bearing when they don't.",
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Email", href: "mailto:lnu.arav@northeastern.edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aravindsk187/" },
  { label: "GitHub", href: "https://github.com/ask187" },
  { label: "Resume", href: "#" },
];
