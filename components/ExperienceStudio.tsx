"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Search, Share2, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type Props={activeSection:string;onNavigate:(selector:string)=>void};
type Atmosphere="rich"|"quiet";
type TextScale="standard"|"large";
const sectionCommands=[["HOME","#home"],["EXPERTISE","#expertise"],["INTERSECTION LAB","#intersection"],["WORK","#work"],["VISUAL ARCHIVE","#archive"],["AI LAB","#lab"],["ABOUT","#about"],["CONTACT","#contact"]] as const;

export default function ExperienceStudio({activeSection,onNavigate}:Props){
  const reduced=useReducedMotion();
  const [open,setOpen]=useState(false);
  const [tab,setTab]=useState<"explore"|"tune">("explore");
  const [query,setQuery]=useState("");
  const [atmosphere,setAtmosphere]=useState<Atmosphere>("rich");
  const [textScale,setTextScale]=useState<TextScale>("standard");
  const [technical,setTechnical]=useState(false);
  const [shareStatus,setShareStatus]=useState<"idle"|"shared"|"copied">("idle");
  const triggerRef=useRef<HTMLButtonElement|null>(null);
  const closeRef=useRef<HTMLButtonElement|null>(null);
  const panelRef=useRef<HTMLElement|null>(null);

  useEffect(()=>{try{
    const a=localStorage.getItem("nshd-atmosphere"), t=localStorage.getItem("nshd-text-scale"), g=localStorage.getItem("nshd-technical");
    if(a==="rich"||a==="quiet")setAtmosphere(a); if(t==="standard"||t==="large")setTextScale(t); if(g==="1")setTechnical(true);
  }catch{}},[]);

  useEffect(()=>{
    document.documentElement.dataset.atmosphere=atmosphere;
    document.documentElement.dataset.textScale=textScale;
    document.documentElement.dataset.technical=technical?"on":"off";
    try{localStorage.setItem("nshd-atmosphere",atmosphere);localStorage.setItem("nshd-text-scale",textScale);localStorage.setItem("nshd-technical",technical?"1":"0");}catch{}
  },[atmosphere,textScale,technical]);

  useEffect(()=>{
    if(!open)return;
    const previousOverflow=document.body.style.overflow;
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){setOpen(false);return;}
      if(event.key!=="Tab"||!panelRef.current)return;
      const focusable=Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter((node)=>node.offsetParent!==null);
      if(!focusable.length)return;
      const first=focusable[0], last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.body.style.overflow="hidden";document.addEventListener("keydown",onKeyDown);window.setTimeout(()=>closeRef.current?.focus(),0);
    return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener("keydown",onKeyDown);window.setTimeout(()=>triggerRef.current?.focus(),0);};
  },[open]);

  const normalized=query.trim().toLowerCase();
  const filteredSections=useMemo(()=>sectionCommands.filter(([label])=>!normalized||label.toLowerCase().includes(normalized)),[normalized]);
  const filteredProjects=useMemo(()=>projects.filter((project)=>!normalized||[project.title,project.category,project.kicker,...project.tools].join(" ").toLowerCase().includes(normalized)),[normalized]);
  const navigate=(selector:string)=>{setOpen(false);setQuery("");onNavigate(selector);};

  const shareCurrent=async()=>{
    const url=new URL(window.location.href);
    url.hash=activeSection==="home"?"":activeSection;
    try{
      if(navigator.share){
        await navigator.share({title:"N S H D — Creative Intelligence",text:"Design × AI × Code × Science",url:url.toString()});
        setShareStatus("shared");
      }else{
        if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(url.toString());
        else{
          const textarea=document.createElement("textarea");
          textarea.value=url.toString();textarea.style.position="fixed";textarea.style.opacity="0";
          document.body.appendChild(textarea);textarea.select();document.execCommand("copy");textarea.remove();
        }
        setShareStatus("copied");
      }
      window.setTimeout(()=>setShareStatus("idle"),1800);
    }catch{
      setShareStatus("idle");
    }
  };

  return (<>
    <div className="technical-grid-overlay" aria-hidden="true"/>
    <button ref={triggerRef} type="button" className="studio-trigger" onClick={()=>setOpen(true)} aria-label="Open experience studio"><Sparkles/><span>EXPLORE / TUNE</span><i aria-hidden="true"/></button>

    <AnimatePresence>
      {open&&<motion.div className="studio-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(event)=>{if(event.target===event.currentTarget)setOpen(false);}}>
        <motion.section ref={panelRef} className="studio-panel" role="dialog" aria-modal="true" aria-label="Experience studio" initial={reduced?false:{y:30,opacity:0,scale:.985}} animate={{y:0,opacity:1,scale:1}} exit={reduced?undefined:{y:20,opacity:0,scale:.99}} transition={{duration:.5,ease:[.16,1,.3,1]}}>
          <div className="studio-head"><div><span>NSHD / EXPERIENCE STUDIO</span><strong>ACTIVE / {activeSection.toUpperCase()}</strong></div><button ref={closeRef} type="button" onClick={()=>setOpen(false)} aria-label="Close experience studio"><X/></button></div>
          <div className="studio-tabs" role="tablist" aria-label="Experience studio sections">
            <button type="button" role="tab" aria-selected={tab==="explore"} className={tab==="explore"?"is-active":""} onClick={()=>setTab("explore")}><Search/> EXPLORE</button>
            <button type="button" role="tab" aria-selected={tab==="tune"} className={tab==="tune"?"is-active":""} onClick={()=>setTab("tune")}><SlidersHorizontal/> TUNE</button>
          </div>

          {tab==="explore"?<div className="studio-explore">
            <label className="studio-search"><Search aria-hidden="true"/><span className="sr-only">Search sections and projects</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search sections, projects, tools…" inputMode="search"/></label>
            <div className="studio-command-group"><div className="studio-group-head"><span>SECTIONS</span><span>{String(filteredSections.length).padStart(2,"0")}</span></div><div className="studio-command-list">{filteredSections.map(([label,selector],index)=><button key={selector} type="button" onClick={()=>navigate(selector)}><span>{String(index+1).padStart(2,"0")}</span><strong>{label}</strong><ArrowRight/></button>)}</div></div>
            <div className="studio-command-group"><div className="studio-group-head"><span>PROJECTS</span><span>{String(filteredProjects.length).padStart(2,"0")}</span></div><div className="studio-project-grid">{filteredProjects.map((project)=><Link key={project.slug} href={`/work/${project.slug}`} onClick={()=>setOpen(false)}><span>{project.category}</span><strong>{project.title}</strong><small>{project.kicker}</small><ArrowUpRight/></Link>)}</div></div>
            {!filteredSections.length&&!filteredProjects.length&&<div className="studio-empty">NO MATCH / TRY A DIFFERENT SIGNAL</div>}
          </div>:<div className="studio-tune">
            <div className="tune-intro"><span>LIVE DESIGN CONTROLS</span><p>These controls change presentation only. Content and navigation stay intact.</p></div>
            <div className="tune-row"><div><strong>ATMOSPHERE</strong><span>Control ambient glow, particles and surface depth.</span></div><div className="tune-choice" role="group" aria-label="Atmosphere">{(["rich","quiet"] as Atmosphere[]).map((value)=><button key={value} type="button" className={atmosphere===value?"is-active":""} aria-pressed={atmosphere===value} onClick={()=>setAtmosphere(value)}>{value.toUpperCase()}</button>)}</div></div>
            <div className="tune-row"><div><strong>READING SCALE</strong><span>Increase supporting copy without disturbing display typography.</span></div><div className="tune-choice" role="group" aria-label="Reading scale">{(["standard","large"] as TextScale[]).map((value)=><button key={value} type="button" className={textScale===value?"is-active":""} aria-pressed={textScale===value} onClick={()=>setTextScale(value)}>{value.toUpperCase()}</button>)}</div></div>
            <div className="tune-row"><div><strong>TECHNICAL OVERLAY</strong><span>Reveal the underlying measurement/grid motif from the design system.</span></div><button type="button" className={technical?"tune-toggle is-active":"tune-toggle"} aria-pressed={technical} onClick={()=>setTechnical((value)=>!value)}><span/>{technical?"ON":"OFF"}</button></div>
            <div className="tune-note"><span>MOTION</span><p>{reduced?"Reduced motion is active from your device setting.":"Cinematic motion is active. Device reduced-motion settings are always respected."}</p></div>
            <button type="button" className="studio-share" onClick={shareCurrent}><Share2/><span>{shareStatus==="shared"?"SHARED":shareStatus==="copied"?"LINK COPIED":"SHARE THIS VIEW"}</span><ArrowUpRight/></button>
            <div className="studio-socials">{site.socials.map((social)=><a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}<ArrowUpRight/></a>)}</div>
          </div>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </>);
}
