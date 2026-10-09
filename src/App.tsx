import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Palette, Code2, X, ExternalLink, Mail } from "lucide-react";

type SectionId = "home" | "design" | "builds";
type Project = { number: string; title: string; type: string; description: string; stack: string; focus: string; url?: string };

const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "design", label: "Design" },
  { id: "builds", label: "Builds" },
];

const designWork = [
  { number: "01", title: "Motion & Edit", type: "AFTER EFFECTS / PREMIERE PRO", description: "Kinetic typography, rhythmic cuts, and motion-led visual storytelling." },
  { number: "02", title: "Graphic Design", type: "PHOTOSHOP / FIGMA", description: "Posters, visual systems, and compositions built around type, contrast, and detail." },
  { number: "03", title: "Visual Experiments", type: "ART DIRECTION / PERSONAL WORK", description: "A playground for visual references, anime-inspired edits, and ideas worth exploring." },
];

const projects: Project[] = [
  { number: "01", title: "Reed AI", type: "AI STUDY ASSISTANT", description: "A study companion that turns personal notes into a searchable, conversational learning space.", stack: "FastAPI · Qdrant · Ollama · Sentence Transformers", focus: "Document ingestion, chunking, embeddings, retrieval, and local LLM-powered study workflows.", url: "https://github.com/shayan-wasLazy/Reed" },
  { number: "02", title: "Cinematic Color Grading", type: "COMPUTER VISION / DEEP LEARNING", description: "An exploration of learning cinematic looks and transferring color characteristics between video frames.", stack: "PyTorch · ResNet · 3D LUTs", focus: "Frame extraction, training-pair construction, feature learning, and differentiable color lookup tables." },
  { number: "03", title: "Anime Discovery", type: "DATA / RECOMMENDATION SYSTEMS", description: "An anime database and recommendation project designed to make discovery feel more personal.", stack: "Python · SQL · FastAPI · Recommendation systems", focus: "Building a structured anime catalogue and exploring recommendation logic. The repository link can be added once its exact URL is confirmed." },
  { number: "04", title: "Chess Bot", type: "ALGORITHMS / GAME AI", description: "A chess-playing project exploring how search and evaluation can guide decisions across a game tree.", stack: "Python · Search · Evaluation", focus: "Move generation, position evaluation, and adversarial search.", url: "https://github.com/shayan-wasLazy/Chess-Bot" },
];

const leaves = Array.from({ length: 13 }, (_, i) => ({ id: i, left: `${(i * 37 + 7) % 100}%`, delay: `${(i % 7) * -1.9}s`, duration: `${13 + (i % 6) * 2.5}s`, size: `${5 + (i % 4) * 2}px`, rotate: `${i * 43}deg` }));

function FloatingLeaves() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return <div className="leaf-layer" aria-hidden="true">{leaves.map((leaf) => <span className="leaf" key={leaf.id} style={{ left: leaf.left, animationDelay: leaf.delay, animationDuration: leaf.duration, width: leaf.size, height: `calc(${leaf.size} * .62)`, transform: `rotate(${leaf.rotate})` }} />)}</div>;
}

export default function App() {
  const [active, setActive] = useState<SectionId>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id as SectionId);
    }, { rootMargin: "-25% 0px -45% 0px", threshold: [0.05, 0.2, 0.45] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProject(null); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [selectedProject]);

  const goTo = (id: SectionId) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <main id="top">
      <section className="hero" aria-label="Introduction">
        <div className="hero-image" role="img" aria-label="Monochrome Japanese mountain valley illustration" />
        <div className="hero-vignette" /><div className="hero-grain" /><FloatingLeaves />
        <motion.div className="hero-topline" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <span className="availability"><i className="availability-dot" /> SHAYAN MANDREKAR</span><span className="edition">DATA SCIENCE / DESIGN / BUILD</span>
        </motion.div>
        <motion.div className="hero-caption" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65 }}>
          <p>LOGIC <span>×</span> VISUALS <span>×</span> CURIOSITY</p><span className="caption-note">A personal archive of things I make and things I’m figuring out.</span>
        </motion.div>
        <a className="scroll-cue" href="#home" onClick={(event) => { event.preventDefault(); goTo("home"); }}><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} strokeWidth={1.7} /></a>
      </section>

      <nav className="floating-nav" aria-label="Main navigation">
        {navItems.map((item) => <button key={item.id} className={`nav-item ${active === item.id ? "is-active" : ""}`} onClick={() => goTo(item.id)} aria-current={active === item.id ? "location" : undefined}>
          <span>{item.label}</span>{active === item.id && <motion.span className="active-mark" layoutId="active-mark" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
        </button>)}
      </nav>

      <section id="home" className="intro section-shell">
        <div className="section-label"><span>HOME / 001</span><span>MUMBAI, INDIA</span></div>
        <div className="intro-grid">
          <h1>Curious by<br /><em>default.</em></h1>
          <div className="intro-copy">
            <p className="intro-lead">I’m Shayan — a data science student who likes building things that sit somewhere between logic and feeling.</p>
            <p>From machine learning experiments to motion graphics, I enjoy pulling ideas apart, figuring out how they work, and making something of my own. Usually with music on and too many tabs open.</p>
            <div className="interest-line"><span>CURRENT CURIOSITIES</span><b>AI / ML</b><i>✳</i><b>Visual storytelling</b><i>✳</i><b>Anime</b></div>
          </div>
        </div>
        <div className="home-contact">
          <div><span className="eyebrow"><Mail size={14} /> CONTACT / SOCIALS</span><h2>Say <em>hello.</em></h2><p>Have an interesting idea, a project to build, or something good to recommend? Let’s connect.</p></div>
          <div className="social-links">
            <a href="https://github.com/shayan-wasLazy" target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub</span><small>CODE & EXPERIMENTS</small><ArrowUpRight size={17} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18} /><span>LinkedIn</span><small>PROFESSIONAL</small><ArrowUpRight size={17} /></a>
            <a href="https://www.instagram.com/lazy_but_kind_/" target="_blank" rel="noreferrer"><Instagram size={18} /><span>Instagram</span><small>VISUALS & PERSONAL</small><ArrowUpRight size={17} /></a>
            <a href="https://www.behance.net/" target="_blank" rel="noreferrer"><Palette size={18} /><span>Behance</span><small>CREATIVE WORK</small><ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>

      <section id="design" className="work-section section-shell">
        <div className="section-label"><span>01 / THE VISUAL SIDE</span><span>DESIGN & MOTION</span></div>
        <div className="section-heading"><div><span className="eyebrow"><Palette size={14} /> SELECTED CREATIVE INTERESTS</span><h2>Made to <em>move.</em></h2></div><p>Frames, shapes, timing, and tiny details. The visual side of my brain lives here.</p></div>
        <div className="editorial-list">{designWork.map((work) => <motion.article className="editorial-row" key={work.number} whileHover={reduceMotion ? undefined : { x: 5 }} transition={{ duration: 0.2 }}>
          <span className="row-number">{work.number}</span><div className="row-main"><h3>{work.title}</h3><p>{work.description}</p></div><span className="row-type">{work.type}</span><ArrowUpRight className="row-arrow" size={19} strokeWidth={1.4} />
        </motion.article>)}</div>
        <div className="section-footnote"><span>TOOLS I REACH FOR</span><p>After Effects / Photoshop / Premiere Pro / Figma</p></div>
        <a className="design-portfolio-link" href="https://shayanportfolio-2be31.web.app" target="_blank" rel="noreferrer"><span><small>FULL DESIGN PORTFOLIO</small><strong>Explore my visual work</strong></span><ArrowUpRight size={22} /></a>
      </section>

      <section id="builds" className="projects-section section-shell">
        <div className="section-label"><span>02 / THE BUILDING SIDE</span><span>CODE & EXPERIMENTS</span></div>
        <div className="section-heading"><div><span className="eyebrow"><Code2 size={14} /> SELECTED PROJECTS</span><h2>Ideas into <em>systems.</em></h2></div><p>I learn by building. Open a project to see what I’m exploring, how it works, and its code when available.</p></div>
        <div className="project-grid">{projects.map((project) => <motion.button type="button" className="project-card project-card-button" key={project.number} onClick={() => setSelectedProject(project)} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.22 }}>
          <span className="project-card-top"><span>{project.number} / PROJECT NOTE</span><ArrowUpRight size={18} strokeWidth={1.5} /></span><span className="project-type">{project.type}</span><span className="project-card-title">{project.title}</span><span className="project-description">{project.description}</span><span className="project-stack">{project.stack}</span><span className="card-hint">OPEN PROJECT <ArrowUpRight size={13} /></span>
        </motion.button>)}</div>
        <p className="honest-note">A curated selection of ongoing work. Some projects are still in development; links are included only where confirmed.</p>
      </section>

      <footer className="site-footer section-shell"><span>© 2026 SHAYAN MANDREKAR</span><span>BUILT WITH CURIOSITY, NOT A TEMPLATE.</span><a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }}>BACK TO THE VALLEY ↑</a></footer>

      {selectedProject && <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}>
        <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 16, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}>
          <div className="modal-topline"><span>{selectedProject.number} / {selectedProject.type}</span><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={19} /></button></div>
          <h2 id="modal-title">{selectedProject.title}</h2><p className="modal-description">{selectedProject.description}</p>
          <div className="modal-detail"><span>THE FOCUS</span><p>{selectedProject.focus}</p></div>
          <div className="modal-detail"><span>TECH STACK</span><p>{selectedProject.stack}</p></div>
          {selectedProject.url ? <a className="modal-repo-link" href={selectedProject.url} target="_blank" rel="noreferrer"><Github size={17} /> View source on GitHub <ExternalLink size={15} /></a> : <p className="modal-unavailable">Repository link not added yet.</p>}
          <button className="modal-done" onClick={() => setSelectedProject(null)}>BACK TO BUILDS <ArrowDownRight size={15} /></button>
        </motion.section>
      </div>}
    </main>
  );
}
