"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Atom, Braces, FlaskConical, Sparkles } from "lucide-react";
import { useState } from "react";

const lenses = [
  { id:"design", number:"01", title:"DESIGN", tag:"FORM", body:"Start with hierarchy, composition and the feeling the interface should leave behind. Remove anything that weakens the main idea.", steps:["Frame the intent","Shape the hierarchy","Refine the details"], signal:"CLARITY / TASTE / RESTRAINT", Icon:Sparkles },
  { id:"ai", number:"02", title:"AI", tag:"INTELLIGENCE", body:"Use generative systems as an amplifier for exploration, direction and iteration—not as a replacement for judgment.", steps:["Define constraints","Explore variations","Curate with intent"], signal:"PROMPT / GENERATE / CURATE", Icon:Atom },
  { id:"code", number:"03", title:"CODE", tag:"SYSTEM", body:"Translate the visual idea into behavior: responsive structure, useful interactions, state, performance and reliable edge cases.", steps:["Prototype fast","Engineer the flow","Harden the experience"], signal:"STRUCTURE / MOTION / RELIABILITY", Icon:Braces },
  { id:"science", number:"04", title:"SCIENCE", tag:"METHOD", body:"Bring structured thinking into creative work: observe, compare, question assumptions and make decisions that can be explained.", steps:["Observe the problem","Test the assumption","Refine the model"], signal:"QUESTION / TEST / UNDERSTAND", Icon:FlaskConical }
] as const;

export default function IntersectionLab() {
  const [active,setActive]=useState<(typeof lenses)[number]["id"]>("design");
  const reduced=useReducedMotion();
  const current=lenses.find((item)=>item.id===active) ?? lenses[0];
  const CurrentIcon=current.Icon;

  return (
    <section className="intersection-lab section-pad" id="intersection">
      <div className="intersection-head">
        <div>
          <p className="section-label">02B / INTERSECTION LAB</p>
          <h2>ONE IDEA.<br /><em>FOUR LENSES.</em></h2>
        </div>
        <p>Tap a discipline to see how I use it as a different lens on the same creative problem.</p>
      </div>

      <div className="intersection-shell">
        <div className="intersection-tabs" role="tablist" aria-label="Creative lenses">
          {lenses.map((item)=>{
            const Icon=item.Icon;
            const selected=item.id===active;
            return (
              <button key={item.id} type="button" role="tab" aria-selected={selected} aria-controls="intersection-panel" className={selected?"is-active":""} onClick={()=>setActive(item.id)}>
                <span>{item.number}</span><Icon aria-hidden="true" /><strong>{item.title}</strong><small>{item.tag}</small>
              </button>
            );
          })}
        </div>

        <div className="intersection-stage" id="intersection-panel" role="tabpanel">
          <div className="intersection-visual" aria-hidden="true">
            <span className="intersection-axis axis-x" />
            <span className="intersection-axis axis-y" />
            <span className="intersection-ring ring-a" />
            <span className="intersection-ring ring-b" />
            <span className="intersection-ring ring-c" />
            <motion.div className="intersection-core" key={current.id} initial={reduced?false:{scale:.72,opacity:0,rotate:-12}} animate={{scale:1,opacity:1,rotate:0}} transition={{duration:.55,ease:[.16,1,.3,1]}}>
              <CurrentIcon />
            </motion.div>
            <span className="intersection-coordinate">NSHD / {current.number} / {current.tag}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={current.id} className="intersection-copy" initial={reduced?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-12}} transition={{duration:.38,ease:[.16,1,.3,1]}}>
              <div className="intersection-copy-top"><span>{current.number} / 04</span><span>{current.signal}</span></div>
              <h3>{current.title}</h3>
              <p>{current.body}</p>
              <ol>
                {current.steps.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
