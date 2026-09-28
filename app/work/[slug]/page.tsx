import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projectBySlug, projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — N S H D`,
      description: project.description,
      type: "article"
    }
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="case-page">
      <div className="case-scroll-progress" aria-hidden="true" />
      <nav className="case-nav">
        <Link href="/#work" className="case-back">
          <ArrowLeft /> BACK TO WORK
        </Link>
        <span className="case-index">
          {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </nav>

      <section
        className="case-hero"
        style={{ "--case-accent": project.accent } as CSSProperties}
      >
        <div className="case-hero-content">
          <div className="case-eyebrow">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </section>

      <section className="case-meta">
        <div><span>ROLE</span><strong>{project.role}</strong></div>
        <div><span>YEAR</span><strong>{project.year}</strong></div>
        <div><span>CATEGORY</span><strong>{project.category}</strong></div>
        <div><span>TOOLS</span><strong>{project.tools.slice(0, 2).join(" / ")}</strong></div>
      </section>

      {project.media && (
        <section className="case-media-showcase">
          <div className="case-media-frame" style={{ background: project.accent }}>
            <div className="case-media-image">
              <Image
                src={project.media}
                alt={project.mediaAlt || `${project.title} interface preview`}
                fill
                priority
                sizes="(max-width: 680px) 92vw, 82vw"
              />
            </div>
          </div>
          <div className="case-media-caption">
            <span>REAL PRODUCT INTERFACE</span>
            <span>NSHD / {project.year}</span>
          </div>
        </section>
      )}

      <section className="case-story">
        <aside className="case-sticky">
          <span className="section-label">CASE STUDY / {String(currentIndex + 1).padStart(2, "0")}</span>
          <p>“{project.statement}”</p>
          <nav className="case-chapter-nav" aria-label="Case study chapters">
            {project.chapters.map((chapter, index) => (
              <a key={chapter.title} href={`#chapter-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {chapter.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="case-chapters">
          {project.chapters.map((chapter, index) => (
            <article id={`chapter-${index + 1}`} key={chapter.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{chapter.title.toUpperCase()}</h2>
              <p>{chapter.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-tools">
        <div className="case-tools-wrap">
          {project.tools.map((tool) => <span key={tool}>{tool}</span>)}
          {project.href && (
            <a href={project.href} target="_blank" rel="noreferrer">
              VIEW REPOSITORY <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </section>

      <nav className="case-pagination" aria-label="Project navigation">
        <Link className="case-adjacent case-previous" href={`/work/${previousProject.slug}`}>
          <span>PREVIOUS PROJECT</span>
          <h3>{previousProject.title}</h3>
          <p>← {previousProject.category}</p>
        </Link>
        <Link className="case-adjacent case-next" href={`/work/${nextProject.slug}`}>
          <span>NEXT PROJECT</span>
          <h3>{nextProject.title}</h3>
          <p>{nextProject.category} ↗</p>
        </Link>
      </nav>
    </main>
  );
}
