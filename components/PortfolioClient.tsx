"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Atom,
  Code2,
  FlaskConical,
  Github,
  Instagram,
  Menu,
  MessageCircle,
  Sparkles,
  X,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ExperienceStudio from "@/components/ExperienceStudio";
import IntersectionLab from "@/components/IntersectionLab";
import ProjectExplorer from "@/components/ProjectExplorer";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const roles = ["POSTER DESIGNER", "CREATIVE EDITOR", "VIBE CODER", "AI EXPLORER", "PHARMA STUDENT"];

const disciplines = [
  {
    number: "01",
    title: "VISUAL DESIGN",
    body: "Posters · Brand visuals · Typography · Creative compositions · Digital artwork",
    tag: "FORM",
    className: "discipline-visual"
  },
  {
    number: "02",
    title: "EDITING",
    body: "Creative edits · Motion · Social content · Visual storytelling",
    tag: "RHYTHM",
    className: "discipline-editing"
  },
  {
    number: "03",
    title: "VIBE CODING",
    body: "AI-assisted development · Web experiences · Android concepts · Rapid prototyping",
    tag: "SYSTEM",
    className: "discipline-code"
  },
  {
    number: "04",
    title: "ARTIFICIAL INTELLIGENCE",
    body: "Prompt engineering · AI imagery · AI video · Automation · Generative workflows",
    tag: "INTELLIGENCE",
    className: "discipline-ai"
  },
  {
    number: "05",
    title: "PHARMACEUTICAL SCIENCE",
    body: "B.Pharm · Scientific thinking · Healthcare knowledge · Research curiosity",
    tag: "SCIENCE",
    className: "discipline-science"
  }
];

const posters = [
  { index: "A01", title: "TYPE / MASS", subtitle: "Scale study", className: "poster-a" },
  { index: "A02", title: "SIGNAL", subtitle: "Editorial composition", className: "poster-b" },
  { index: "A03", title: "AFTERIMAGE", subtitle: "Image treatment", className: "poster-c" },
  { index: "A04", title: "FORM / 04", subtitle: "Negative space", className: "poster-d" },
  { index: "A05", title: "MONOLITH", subtitle: "Contrast study", className: "poster-e" },
  { index: "A06", title: "SYNTHESIS", subtitle: "Type × texture", className: "poster-f" }
];

const labs = [
  ["AI IMAGE", "Visual direction, consistency and controlled generation.", "PROMPT / COMPOSITION / LIGHT"],
  ["AI VIDEO", "Cinematic concepts, motion language and commercial storytelling.", "CAMERA / MOTION / EDIT"],
  ["PROMPT DESIGN", "Structured instructions that turn creative intent into repeatable systems.", "SYSTEMS / CONSTRAINTS / TASTE"],
  ["AGENT EXPERIMENTS", "Exploring memory, personality, workflow and tool-using agents.", "BEHAVIOR / CONTEXT / TOOLS"],
  ["GENERATIVE UI", "Interfaces created through rapid human–AI iteration.", "IDEA / BUILD / REFINE"],
  ["AUTOMATION", "Connecting creative steps into repeatable production workflows.", "TRIGGER / TRANSFORM / SHIP"]
];

const toolkit = [
  ["VISUAL", ["Poster Design", "Typography", "Composition", "Photo Editing", "Creative Direction"]],
  ["AI", ["Prompt Engineering", "Generative Image", "Generative Video", "AI Agents", "Automation"]],
  ["DEVELOPMENT", ["Vibe Coding", "HTML / CSS", "JavaScript", "AI-assisted Development", "GitHub"]],
  ["SCIENCE", ["Pharmaceutical Sciences", "Drug Knowledge", "Scientific Research", "Analytical Thinking"]]
];

const journeySections = [
  { id: "home", number: "00", label: "INTRO" },
  { id: "expertise", number: "02", label: "EXPERTISE" },
  { id: "intersection", number: "02B", label: "INTERSECTION" },
  { id: "work", number: "03", label: "WORK" },
  { id: "archive", number: "04", label: "ARCHIVE" },
  { id: "lab", number: "05", label: "AI LAB" },
  { id: "about", number: "09", label: "ABOUT" },
  { id: "contact", number: "13", label: "CONTACT" }
] as const;

function ParticleField({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let inView = true;
    const pointer = { x: 0.5, y: 0.5 };
    const particles = Array.from({ length: coarse ? 34 : 64 }, (_, i) => ({
      seed: i * 0.6180339887,
      speed: 0.00016 + (i % 7) * 0.000018,
      radius: 0.7 + (i % 4) * 0.45
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.2 : 1.6);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    };

    const draw = () => {
      raf = 0;
      if (document.hidden || !inView) return;

      frame += 1;
      ctx.clearRect(0, 0, width, height);
      const cx = width * (0.69 + (pointer.x - 0.5) * 0.035);
      const cy = height * (0.47 + (pointer.y - 0.5) * 0.035);
      const scale = Math.min(width, height) * 0.36;

      const points = particles.map((p, i) => {
        const t = frame * p.speed + p.seed * Math.PI * 2;
        const ring = 0.34 + (i % 11) * 0.043;
        const x = cx + Math.cos(t * (1.1 + (i % 5) * 0.11) + i) * scale * ring;
        const y = cy + Math.sin(t * (0.88 + (i % 7) * 0.08) + i * 0.7) * scale * ring * 0.72;
        return { x, y, r: p.radius };
      });

      ctx.lineWidth = 0.45;
      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < Math.min(points.length, i + 8); j += 1) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < scale * 0.22) {
            ctx.strokeStyle = `rgba(220,214,200,${0.085 * (1 - d / (scale * 0.22))})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p, i) => {
        const glow = i % 13 === 0;
        ctx.fillStyle = glow ? "rgba(213,181,118,.72)" : "rgba(236,234,228,.34)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow ? p.r * 1.8 : p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf && !document.hidden && inView) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        if (inView) start();
        else stop();
      },
      { threshold: 0.01 }
    );

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    if (!coarse) window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (!coarse) window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={ref} className="particle-field" aria-hidden="true" />;
}

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 34, filter: "blur(8px)" }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <button className="wordmark" onClick={onClick} aria-label="N S H D home">
      <span>N</span><span>S</span><span>H</span><span>D</span>
    </button>
  );
}

export default function PortfolioClient() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [loadValue, setLoadValue] = useState(0);
  const [role, setRole] = useState(0);
  const [menu, setMenu] = useState(false);
  const [poster, setPoster] = useState<(typeof posters)[number] | null>(null);
  const [experimental, setExperimental] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLSpanElement | null>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.13], [1, 0.28]);
  const progressScale = scrollYProgress;

  useEffect(() => {
    if (reduced) {
      setLoading(false);
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem("nshd-intro") === "1";
    } catch {
      seen = false;
    }
    if (seen) {
      setLoading(false);
      return;
    }

    const started = performance.now();
    let raf = 0;
    let finishTimer = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - started) / 1150) * 100));
      setLoadValue(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }

      try {
        sessionStorage.setItem("nshd-intro", "1");
      } catch {
        // Storage may be unavailable in restricted browsing contexts.
      }
      finishTimer = window.setTimeout(() => setLoading(false), 180);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.92
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setRole((value) => (value + 1) % roles.length);
    }, 2250);
    return () => window.clearInterval(timer);
  }, [reduced]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = cursorLabelRef.current;
    if (!cursor || !label || window.matchMedia("(pointer: coarse)").matches || reduced) return;

    let x = -100;
    let y = -100;
    let raf = 0;

    const render = () => {
      raf = 0;
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = requestAnimationFrame(render);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("[data-cursor]") as HTMLElement | null;
      const cursorText = interactive?.dataset.cursor || "";
      label.textContent = cursorText;
      cursor.classList.toggle("cursor-active", Boolean(cursorText));
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, [reduced]);

  useEffect(() => {
    if (!menu && !poster) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenu(false);
      setPoster(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menu, poster]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const nodes = journeySections
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0, 0.15, 0.35, 0.6]
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const statusItems = useMemo(
    () => [
      ["STUDYING", "B.Pharm"],
      ["EXPLORING", "Generative AI"],
      ["BUILDING", "Creative digital experiments"],
      ["LEARNING", "AI × Design × Technology"]
    ],
    []
  );

  const activeJourneyIndex = Math.max(0, journeySections.findIndex(({ id }) => id === activeSection));
  const currentJourney = journeySections[activeJourneyIndex];
  const nextJourney = journeySections[(activeJourneyIndex + 1) % journeySections.length];
  const journeyAtEnd = activeJourneyIndex === journeySections.length - 1;

  const handleLogo = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 5) {
      setExperimental((value) => !value);
      setLogoClicks(0);
    }
  };

  const goTo = (id: string) => {
    setMenu(false);
    document.querySelector(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <main
      className={experimental ? "site experimental-mode" : "site"}
      data-active-section={activeSection}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            className="preloader"
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="preloader-top">
              <span>NSHD / SYSTEM</span>
              <span>{String(loadValue).padStart(2, "0")}</span>
            </div>
            <div className="preloader-center">
              <div className="preloader-mark">
                <span>N</span><span>S</span><span>H</span><span>D</span>
              </div>
              <p>CREATIVE INTELLIGENCE</p>
            </div>
            <div className="preloader-line"><span style={{ width: `${loadValue}%` }} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
        <span ref={cursorLabelRef} />
      </div>

      <motion.div className="scroll-progress" style={{ scaleY: progressScale }} />

      <header className="nav-shell">
        <nav className="nav glass-line" aria-label="Primary navigation">
          <Wordmark onClick={handleLogo} />
          <div className="nav-links">
            <button onClick={() => goTo("#work")}>WORK</button>
            <button onClick={() => goTo("#about")}>ABOUT</button>
            <button onClick={() => goTo("#expertise")}>EXPERTISE</button>
            <button onClick={() => goTo("#lab")}>LAB</button>
            <button onClick={() => goTo("#contact")}>CONTACT</button>
          </div>
          <div className="nav-status"><i /> {site.location}</div>
          <button
            className="menu-button"
            onClick={() => setMenu(true)}
            aria-label="Open navigation"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
          >
            <Menu size={18} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-head"><Wordmark /><button autoFocus onClick={() => setMenu(false)} aria-label="Close navigation"><X /></button></div>
            <div className="mobile-menu-links">
              {[["01", "#work", "WORK"], ["02", "#about", "ABOUT"], ["03", "#expertise", "EXPERTISE"], ["04", "#lab", "LAB"], ["05", "#contact", "CONTACT"]].map(([n, id, label]) => (
                <button key={id} onClick={() => goTo(id)}><small>{n}</small>{label}<ArrowUpRight /></button>
              ))}
            </div>
            <p>DESIGN × AI × CODE × SCIENCE</p>
          </motion.div>
        )}
      </AnimatePresence>

      <ExperienceStudio activeSection={activeSection} onNavigate={goTo} />

      <nav className="journey-rail" aria-label="Page sections">
        <span className="journey-rail-line" aria-hidden="true" />
        {journeySections.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeSection === item.id ? "is-active" : ""}
            onClick={() => goTo(`#${item.id}`)}
            aria-label={`Go to ${item.label}`}
            aria-current={activeSection === item.id ? "location" : undefined}
          >
            <i aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mobile-journey" aria-label="Page progress">
        <div>
          <span>{currentJourney.number} / {String(journeySections.length).padStart(2, "0")}</span>
          <strong>{currentJourney.label}</strong>
        </div>
        <button
          type="button"
          onClick={() => goTo(`#${nextJourney.id}`)}
          aria-label={journeyAtEnd ? "Back to top" : `Go to ${nextJourney.label}`}
        >
          {journeyAtEnd ? <ArrowUp /> : <ArrowDownRight />}
        </button>
      </div>

      <section className="hero" id="home">
        <ParticleField reduced={reduced} />
        <div className="hero-atmosphere" aria-hidden="true" />
        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="hero-eyebrow">
            <span>NSHD / 2026</span>
            <span>CREATIVE INTELLIGENCE</span>
          </div>

          <h1 aria-label="I design at the intersection of creativity, AI, code and science">
            <span>I DESIGN AT THE</span>
            <span>INTERSECTION OF</span>
            <span className="hero-metal">CREATIVITY, AI,</span>
            <span>CODE &amp; SCIENCE.</span>
          </h1>

          <div className="hero-bottom">
            <div>
              <p>{site.intro}</p>
              <div className="role-window">
                <span>NOW / </span>
                <AnimatePresence mode="wait">
                  <motion.strong
                    key={roles[role]}
                    initial={reduced ? false : { y: 18, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={reduced ? undefined : { y: -18, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {roles[role]}
                  </motion.strong>
                </AnimatePresence>
              </div>
            </div>
            <button className="hero-cta magnetic" onClick={() => goTo("#work")} data-cursor="EXPLORE">
              <span>EXPLORE MY WORLD</span>
              <ArrowDownRight />
            </button>
          </div>

          <div className="hero-signal-strip" aria-label="Portfolio overview">
            <div><span>PROJECTS</span><strong>{String(projects.length).padStart(2, "0")}</strong></div>
            <div><span>DISCIPLINES</span><strong>05</strong></div>
            <div><span>BASE</span><strong>{site.location.toUpperCase()}</strong></div>
            <div><span>MODE</span><strong>DESIGN × AI × CODE × SCIENCE</strong></div>
          </div>
        </motion.div>

        <div className="hero-index" aria-hidden="true">
          <span>01</span><span>50</span>
        </div>
      </section>

      <section className="manifesto section-pad">
        <Reveal>
          <p className="section-label">01 / POINT OF VIEW</p>
          <h2 className="manifesto-copy">
            I DON&apos;T TREAT <em>DESIGN, AI, CODE</em> AND <em>SCIENCE</em> AS SEPARATE WORLDS.
            <span> THE INTERESTING WORK HAPPENS BETWEEN THEM.</span>
          </h2>
        </Reveal>
      </section>

      <section className="disciplines section-pad" id="expertise">
        <div className="section-head">
          <Reveal><p className="section-label">02 / EXPERTISE</p></Reveal>
          <Reveal delay={0.08}><h2>MULTIDISCIPLINARY<br />BY DESIGN.</h2></Reveal>
        </div>
        <div className="discipline-list">
          {disciplines.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.045}>
              <article className={`discipline-row ${item.className}`}>
                <span className="discipline-no">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <span className="discipline-tag">{item.tag}</span>
                <div className="discipline-orbit" aria-hidden="true"><i /><i /><i /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <IntersectionLab />

      <ProjectExplorer />

      <section className="archive section-pad" id="archive">
        <div className="section-head">
          <Reveal><p className="section-label">04 / VISUAL ARCHIVE</p></Reveal>
          <Reveal delay={0.08}><h2>POSTER<br />STUDIES.</h2></Reveal>
        </div>
        <div className="poster-grid">
          {posters.map((item, index) => (
            <Reveal key={item.index} delay={(index % 3) * 0.06}>
              <button className={`poster ${item.className}`} onClick={() => setPoster(item)} data-cursor="OPEN">
                <span>{item.index}</span>
                <div className="poster-type"><b>{item.title}</b><small>{item.subtitle}</small></div>
                <i aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {poster && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Poster preview: ${poster.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPoster(null);
            }}
          >
            <button autoFocus className="lightbox-close" onClick={() => setPoster(null)} aria-label="Close poster"><X /></button>
            <motion.div
              className={`lightbox-poster poster ${poster.className}`}
              initial={reduced ? false : { scale: 0.9, y: 40, filter: "blur(12px)" }}
              animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
              exit={reduced ? undefined : { scale: 0.94, y: 24, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{poster.index}</span>
              <div className="poster-type"><b>{poster.title}</b><small>{poster.subtitle}</small></div>
              <i aria-hidden="true" />
            </motion.div>
            <div className="lightbox-caption"><span>VISUAL ARCHIVE</span><span>{poster.title} — {poster.subtitle}</span></div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="lab section-pad" id="lab">
        <div className="lab-backdrop" aria-hidden="true"><Atom /><span>AI / LAB</span></div>
        <div className="section-head">
          <Reveal><p className="section-label">05 / AI LAB</p></Reveal>
          <Reveal delay={0.08}><h2>EXPERIMENTS IN<br />CREATIVE INTELLIGENCE.</h2></Reveal>
        </div>
        <Reveal>
          <p className="lab-statement">Exploring how artificial intelligence can augment creativity rather than replace it.</p>
        </Reveal>
        <div className="lab-grid">
          {labs.map(([title, body, meta], index) => (
            <Reveal key={title} delay={(index % 3) * 0.05}>
              <article className="lab-tile">
                <div className="lab-number">{String(index + 1).padStart(2, "0")}</div>
                <Sparkles size={20} />
                <h3>{title}</h3>
                <p>{body}</p>
                <span>{meta}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="conversation section-pad">
        <div className="conversation-copy">
          <Reveal><p className="section-label">06 / VIBE CODING</p></Reveal>
          <Reveal delay={0.08}><h2>BUILT THROUGH<br /><em>CONVERSATION.</em></h2></Reveal>
          <Reveal delay={0.12}><p>I turn ideas into functional digital experiences using design thinking, AI-assisted development and rapid experimentation.</p></Reveal>
        </div>
        <div className="pipeline" aria-label="Vibe coding workflow">
          {["IDEA", "PROMPT", "PROTOTYPE", "ITERATE", "SHIP"].map((step, index) => (
            <Reveal key={step} delay={index * 0.06}>
              <div className="pipeline-step">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < 4 && <ArrowRight />}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="science section-pad">
        <div className="science-visual" aria-hidden="true">
          <div className="molecule-core"><FlaskConical /></div>
          {Array.from({ length: 8 }).map((_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}
          <span className="science-code">C₈H₉NO₂ / DATA / FORM / SIGNAL</span>
        </div>
        <div className="science-copy">
          <Reveal><p className="section-label">07 / PHARMACY × TECHNOLOGY</p></Reveal>
          <Reveal delay={0.08}><h2>SCIENCE MEETS<br />CREATIVE TECHNOLOGY.</h2></Reveal>
          <Reveal delay={0.12}>
            <p>My background in pharmaceutical sciences gives me a scientific lens for approaching design, technology and AI — encouraging structured thinking, research and curiosity alongside creativity.</p>
          </Reveal>
          <div className="science-tags">
            <span>PHARMACEUTICS</span><span>ANALYSIS</span><span>RESEARCH</span><span>SYSTEMS</span>
          </div>
        </div>
      </section>

      <section className="philosophy section-pad">
        <Reveal><p className="section-label">08 / PHILOSOPHY</p></Reveal>
        <div className="philosophy-lines">
          <Reveal><div><strong>DESIGN</strong><span>is how it looks.</span></div></Reveal>
          <Reveal><div><strong>TECHNOLOGY</strong><span>is how it works.</span></div></Reveal>
          <Reveal><div><strong>AI</strong><span>is how possibilities expand.</span></div></Reveal>
          <Reveal><div><strong>SCIENCE</strong><span>is how questions become understanding.</span></div></Reveal>
        </div>
        <Reveal><p className="philosophy-end">I LIKE WORKING BETWEEN ALL FOUR.</p></Reveal>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-portrait" aria-hidden="true">
          <span>N</span>
          <div className="portrait-rings"><i /><i /><i /></div>
          <p>NSHD / IDENTITY STUDY</p>
        </div>
        <div className="about-copy">
          <Reveal><p className="section-label">09 / ABOUT</p></Reveal>
          <Reveal delay={0.08}><h2>I DON&apos;T FIT<br />INTO ONE BOX.</h2></Reveal>
          <Reveal delay={0.12}>
            <p>I&apos;m N S H D — a multidisciplinary creator exploring visual design, editing, artificial intelligence, vibe coding and pharmaceutical science.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>I enjoy transforming ideas into visuals, interfaces and digital experiences while constantly experimenting with emerging creative technologies.</p>
          </Reveal>
        </div>
      </section>

      <section className="toolkit section-pad">
        <div className="section-head">
          <Reveal><p className="section-label">10 / CREATIVE TOOLKIT</p></Reveal>
          <Reveal delay={0.08}><h2>CAPABILITIES,<br />NOT PERCENTAGES.</h2></Reveal>
        </div>
        <div className="toolkit-grid">
          {toolkit.map(([title, items], index) => (
            <Reveal key={title as string} delay={index * 0.05}>
              <article>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title as string}</h3>
                <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="tool-marquee" aria-label="Tools">
            <div>PHOTOSHOP · CANVA · CHATGPT · GEMINI · CLAUDE · GITHUB · ANDROID · AI IMAGE · AI VIDEO · PROMPT SYSTEMS ·</div>
          </div>
        </Reveal>
      </section>

      <section className="evolution section-pad">
        <Reveal><p className="section-label">11 / EVOLUTION</p></Reveal>
        <div className="timeline">
          {[
            ["2024", "EXPLORATION", "Learning through curiosity and making."],
            ["2025", "DESIGN + EDITING", "Developing visual judgment and composition."],
            ["2026", "AI + VIBE CODING", "Turning ideas into systems, apps and experiments."],
            ["NEXT", "DEEPER CREATIVE TECH", "Building richer experiences across media and software."]
          ].map(([year, title, body], index) => (
            <Reveal key={year} delay={index * 0.06}>
              <div className="timeline-row">
                <span>{year}</span><i /><h3>{title}</h3><p>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="status section-pad">
        <Reveal><p className="section-label">12 / CURRENTLY</p></Reveal>
        <div className="status-grid">
          {statusItems.map(([label, value]) => (
            <Reveal key={label}>
              <div><span><i />{label}</span><strong>{value}</strong></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <Reveal><p className="section-label">13 / CONTACT</p></Reveal>
        <Reveal delay={0.08}>
          <h2>LET&apos;S CREATE<br /><em>SOMETHING</em><br />UNEXPECTED.</h2>
        </Reveal>
        <div className="contact-bottom">
          <Reveal>
            <p>For collaborations, creative projects, AI experiments and interesting ideas.</p>
          </Reveal>
          <Reveal delay={0.06}>
            <a className="contact-main" href="mailto:?subject=Portfolio%20collaboration%20with%20N%20S%20H%20D" data-cursor="WRITE">
              START A CONVERSATION <ArrowUpRight />
            </a>
          </Reveal>
        </div>
        <div className="socials">
          {site.socials.map((social) => {
            const Icon = social.label === "GitHub" ? Github : social.label === "Instagram" ? Instagram : MessageCircle;
            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" data-cursor="OPEN">
                <Icon size={16} /><span>{social.label}</span><ArrowUpRight size={15} />
              </a>
            );
          })}
        </div>
      </section>

      <footer>
        <div><span>© 2026 N S H D</span><span>DESIGN × AI × CODE × SCIENCE</span><span>{site.location.toUpperCase()}</span></div>
        <button onClick={handleLogo}>MADE BY <strong>N S H D.</strong></button>
      </footer>

      <div className="experimental-overlay" aria-hidden="true">
        <Code2 /><Zap /><span>EXPERIMENTAL MODE / ACTIVE</span>
      </div>
    </main>
  );
}
