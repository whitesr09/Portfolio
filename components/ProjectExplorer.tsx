"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Eye, Grid2X2, List, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { type Project, projects } from "@/data/projects";

type ViewMode = "cinematic" | "index" | "contact";
type Filter = "ALL" | "PRODUCT" | "AI" | "VISUAL" | "EXPERIMENTAL";
const filters:Filter[]=["ALL","PRODUCT","AI","VISUAL","EXPERIMENTAL"];

function groupFor(project:Project):Exclude<Filter,"ALL">{
  const value=`${project.category} ${project.tools.join(" ")}`.toLowerCase();
  if(value.includes("visual design")||value.includes("poster")) return "VISUAL";
  if(value.includes("ai image")||value.includes("ai video")||value.includes("generative ai")) return "AI";
  if(value.includes("android")||value.includes("product design")) return "PRODUCT";
  return "EXPERIMENTAL";
}

export default function ProjectExplorer(){
  const reduced=useReducedMotion();
  const [view,setView]=useState<ViewMode>("cinematic");
  const [filter,setFilter]=useState<Filter>("ALL");
  const [selected,setSelected]=useState<Project|null>(null);
  const closeRef=useRef<HTMLButtonElement|null>(null);

  useEffect(()=>{
    try{
      const saved=localStorage.getItem("nshd-project-view") as ViewMode|null;
      if(saved==="cinematic"||saved==="index"||saved==="contact") setView(saved);
    }catch{}
  },[]);
  useEffect(()=>{try{localStorage.setItem("nshd-project-view",view);}catch{}},[view]);

  useEffect(()=>{
    if(!selected) return;
    const previousOverflow=document.body.style.overflow;
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape") setSelected(null);};
    document.body.style.overflow="hidden";
    document.addEventListener("keydown",onKeyDown);
    window.setTimeout(()=>closeRef.current?.focus(),0);
    return ()=>{document.body.style.overflow=previousOverflow;document.removeEventListener("keydown",onKeyDown);};
  },[selected]);

  const visible=useMemo(()=>projects.filter((project)=>filter==="ALL"||groupFor(project)===filter),[filter]);

  return (
    <section className="work work-v2 section-pad" id="work">
      <div className="work-v2-head">
        <div><p className="section-label">03 / SELECTED WORK</p><h2>WORK THAT<br /><em>BEHAVES.</em></h2></div>
        <div className="work-v2-intro"><p>Products, systems and visual experiments built through design thinking, AI-assisted development and continuous iteration.</p><span>{String(visible.length).padStart(2,"0")} PROJECTS / {filter}</span></div>
      </div>

      <div className="project-controls">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map((item)=><button type="button" key={item} className={filter===item?"is-active":""} aria-pressed={filter===item} onClick={()=>setFilter(item)}>{item}</button>)}
        </div>
        <div className="project-view-control" role="group" aria-label="Project layout">
          <button type="button" className={view==="cinematic"?"is-active":""} aria-label="Cinematic project view" aria-pressed={view==="cinematic"} onClick={()=>setView("cinematic")}><Eye/><span>CINEMATIC</span></button>
          <button type="button" className={view==="index"?"is-active":""} aria-label="Index project view" aria-pressed={view==="index"} onClick={()=>setView("index")}><List/><span>INDEX</span></button>
          <button type="button" className={view==="contact"?"is-active":""} aria-label="Contact sheet project view" aria-pressed={view==="contact"} onClick={()=>setView("contact")}><Grid2X2/><span>CONTACT</span></button>
        </div>
      </div>

      <motion.div layout className={`project-stack project-stack-v2 is-${view}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project,index)=>(
            <motion.article layout key={project.slug} className="project-card-v2" initial={reduced?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,scale:.98}} transition={{duration:.42,ease:[.16,1,.3,1]}}>
              <Link href={`/work/${project.slug}`} className="project-row project-row-v2" data-cursor="VIEW">
                <div className="project-meta-top"><span>{String(index+1).padStart(2,"0")}</span><span>{groupFor(project)} / {project.category}</span><span>{project.year}</span></div>
                <div className={`project-visual ${project.media?"has-project-media":""}`} style={{background:project.accent}}>
                  {project.media&&<div className="project-media-stage"><div className="project-media-shell"><Image src={project.media} alt={project.mediaAlt||`${project.title} interface preview`} fill sizes="(max-width: 680px) 88vw, (max-width: 1100px) 62vw, 55vw"/></div></div>}
                  <div className="project-grid" aria-hidden="true"/><div className="project-sigil" aria-hidden="true">{project.title.slice(0,1)}</div>
                  <div className="project-title-wrap"><p>{project.kicker}</p><h3>{project.title}</h3></div><ArrowUpRight className="project-arrow"/>
                </div>
                <div className="project-bottom"><p>{project.description}</p><span>{project.tools.slice(0,3).join(" / ")}</span></div>
              </Link>
              <button type="button" className="project-inspect" onClick={()=>setSelected(project)} aria-label={`Quick inspect ${project.title}`}><Eye/><span>QUICK INSPECT</span></button>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected&&(
          <motion.div className="project-sheet-backdrop" role="presentation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(event)=>{if(event.target===event.currentTarget)setSelected(null);}}>
            <motion.aside className="project-sheet" role="dialog" aria-modal="true" aria-label={`Quick view: ${selected.title}`} initial={reduced?false:{x:"100%"}} animate={{x:0}} exit={reduced?undefined:{x:"100%"}} transition={{duration:.55,ease:[.16,1,.3,1]}}>
              <div className="project-sheet-head"><div><span>{groupFor(selected)} / {selected.year}</span><strong>PROJECT INSPECT</strong></div><button ref={closeRef} type="button" onClick={()=>setSelected(null)} aria-label="Close project quick view"><X/></button></div>
              {selected.media&&<div className="project-sheet-media" style={{background:selected.accent}}><Image src={selected.media} alt={selected.mediaAlt||`${selected.title} interface preview`} fill sizes="(max-width: 680px) 92vw, 44vw"/></div>}
              <div className="project-sheet-copy">
                <p>{selected.kicker}</p><h3>{selected.title}</h3><blockquote>“{selected.statement}”</blockquote><p className="project-sheet-description">{selected.description}</p>
                <div className="project-sheet-tools">{selected.tools.map((tool)=><span key={tool}>{tool}</span>)}</div>
                <div className="project-sheet-chapters">{selected.chapters.slice(0,3).map((chapter,index)=><div key={chapter.title}><span>{String(index+1).padStart(2,"0")}</span><strong>{chapter.title}</strong></div>)}</div>
                <div className="project-sheet-actions"><Link href={`/work/${selected.slug}`}>OPEN CASE STUDY <ArrowUpRight/></Link>{selected.href&&<a href={selected.href} target="_blank" rel="noreferrer">REPOSITORY <ArrowUpRight/></a>}</div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
