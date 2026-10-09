import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Palette, Code2, X, ExternalLink, Mail, Sun, Moon } from "lucide-react";

type PageId = "home" | "design" | "builds";
type Project = { number: string; title: string; type: string; description: string; stack: string; focus: string; url?: string };
const navItems: { id: PageId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "design", label: "Design", href: "/design" },
  { id: "builds", label: "Builds", href: "/builds" },
];
type DesignProject = { number: string; title: string; subtitle: string; description: string; year: string; role: string; tools: string; url: string; embed: string; tone: string; thumbnail: string; media: "image" | "video" };
const designProjects: DesignProject[] = [
  { number: "01", title: "Hyperloop", subtitle: "BRAND IDENTITY", description: "A visual identity concept exploring the future-facing character of high-speed transportation.", year: "2024", role: "Brand identity / visual design", tools: "Branding · Typography · Visual systems", url: "https://www.behance.net/gallery/201498491/HyperLoop-brand-identity", embed: "https://www.behance.net/embed/project/201498491?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F201498491%2FHyperLoop-brand-identity", tone: "hyperloop", thumbnail: "/assets/hyperloop.gif", media: "image" },
  { number: "02", title: "Green Oasis", subtitle: "BRAND IDENTITY", description: "A brand identity built around a greener, calmer visual language.", year: "2024", role: "Brand identity / visual design", tools: "Branding · Logo · Visual system", url: "https://www.behance.net/gallery/201579531/Green-Oasis-Brand-identity", embed: "https://www.behance.net/embed/project/201579531?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F201579531%2FGreen-Oasis-Brand-identity", tone: "oasis", thumbnail: "/assets/green-oasis.gif", media: "image" },
  { number: "03", title: "VitaFizz", subtitle: "PACKAGING / BRANDING", description: "A bright, playful identity concept for a fizzy beverage brand.", year: "2023", role: "Branding / packaging concept", tools: "Branding · Packaging · Art direction", url: "https://www.behance.net/gallery/179377597/Vita-Fizz-COmp", embed: "https://www.behance.net/embed/project/179377597?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F179377597%2FVita-Fizz-COmp", tone: "vitafizz", thumbnail: "/assets/vitafizz.gif", media: "image" },
  { number: "04", title: "Designly Rebrand", subtitle: "DISCORD BANNER", description: "A banner design created for the Designly Discord community.", year: "2023", role: "Banner design", tools: "Graphic design · Digital composition", url: "https://www.behance.net/gallery/181584011/Designly-rebarnd-comp", embed: "https://www.behance.net/embed/project/181584011?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F181584011%2FDesignly-rebarnd-comp", tone: "designly", thumbnail: "/assets/designly.mp4", media: "video" },
  { number: "05", title: "The Myth", subtitle: "DISCORD BANNER", description: "A themed digital banner exploring a darker, myth-inspired visual direction.", year: "2022", role: "Banner design", tools: "Graphic design · Digital composition", url: "https://www.behance.net/gallery/174810451/The-myth", embed: "https://www.behance.net/embed/project/174810451?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F174810451%2FThe-myth", tone: "myth", thumbnail: "/assets/the-myth.mp4", media: "video" },
];
const projects: Project[] = [
  { number: "01", title: "Reed AI", type: "AI STUDY ASSISTANT", description: "A study companion that turns personal notes into a searchable, conversational learning space.", stack: "FastAPI · Qdrant · Ollama · Sentence Transformers", focus: "Document ingestion, chunking, embeddings, retrieval, and local LLM-powered study workflows.", url: "https://github.com/shayan-wasLazy/Reed" },
  { number: "02", title: "Cinematic Color Grading", type: "COMPUTER VISION / DEEP LEARNING", description: "An exploration of learning cinematic looks and transferring color characteristics between video frames.", stack: "PyTorch · ResNet · 3D LUTs", focus: "Frame extraction, training-pair construction, feature learning, and differentiable color lookup tables." },
  { number: "03", title: "Anime Discovery", type: "DATA / RECOMMENDATION SYSTEMS", description: "An anime database and recommendation project designed to make discovery feel more personal.", stack: "Python · SQL · FastAPI · Recommendation systems", focus: "Building a structured anime catalogue and exploring recommendation logic." },
  { number: "04", title: "Chess Bot", type: "ALGORITHMS / GAME AI", description: "A chess-playing project exploring how search and evaluation can guide decisions across a game tree.", stack: "Python · Search · Evaluation", focus: "Move generation, position evaluation, and adversarial search.", url: "https://github.com/shayan-wasLazy/Chess-Bot" },
];
const leaves = Array.from({ length: 13 }, (_, i) => ({ id: i, left: `${(i * 37 + 7) % 100}%`, delay: `${(i % 7) * -1.9}s`, duration: `${13 + (i % 6) * 2.5}s`, size: `${5 + (i % 4) * 2}px`, rotate: `${i * 43}deg` }));

function FloatingLeaves() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return <div className="leaf-layer" aria-hidden="true">{leaves.map((leaf) => <span className="leaf" key={leaf.id} style={{ left: leaf.left, animationDelay: leaf.delay, animationDuration: leaf.duration, width: leaf.size, height: `calc(${leaf.size} * .62)`, transform: `rotate(${leaf.rotate})` }} />)}</div>;
}

function Navigation({ active, theme, onToggleTheme }: { active: PageId; theme: "dark" | "light"; onToggleTheme: () => void }) {
  return <nav className="floating-nav" aria-label="Main navigation"><div className="nav-links">{navItems.map((item) => <a key={item.id} className={`nav-item ${active === item.id ? "is-active" : ""}`} href={item.href} aria-current={active === item.id ? "page" : undefined}><span>{item.label}</span>{active === item.id && <motion.span className="active-mark" layoutId="active-mark" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}</a>)}</div><span className="nav-separator" aria-hidden="true" /><button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button></nav>;
}
function Hero() {
  return <section className="hero home-hero" aria-label="Portfolio cover"><div className="hero-image" role="img" aria-label="Monochrome Japanese mountain valley illustration" /><div className="hero-vignette" /><div className="hero-grain" /><FloatingLeaves /></section>;
}
function SectionLabel({ left, right }: { left: string; right: string }) { return <div className="section-label"><span>{left}</span><span>{right}</span></div>; }
function HomePage() {
  return <><Hero /><section id="content" className="intro section-shell"><SectionLabel left="HOME / 001" right="MUMBAI, INDIA" /><div className="intro-grid"><h1>Curious by<br /><em>default.</em></h1><div className="intro-copy"><p className="intro-lead">I’m Shayan — a data science student who likes building things that sit somewhere between logic and feeling.</p><p>From machine learning experiments to motion graphics, I enjoy pulling ideas apart, figuring out how they work, and making something of my own. Usually with music on and too many tabs open.</p><div className="interest-line"><span>CURRENT CURIOSITIES</span><b>AI / ML</b><i>✳</i><b>Visual storytelling</b><i>✳</i><b>Anime</b></div></div></div>
  <div className="home-contact"><div><span className="eyebrow"><Mail size={14} /> CONTACT / SOCIALS</span><h2>Say <em>hello.</em></h2><p>Have an interesting idea, a project to build, or something good to recommend? Let’s connect.</p></div><div className="social-links">
  <a href="https://github.com/shayan-wasLazy" target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub</span><small>CODE & EXPERIMENTS</small><ArrowUpRight size={17} /></a>
  <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18} /><span>LinkedIn</span><small>PROFESSIONAL</small><ArrowUpRight size={17} /></a>
  <a href="https://www.instagram.com/lazy_but_kind_/" target="_blank" rel="noreferrer"><Instagram size={18} /><span>Instagram</span><small>VISUALS & PERSONAL</small><ArrowUpRight size={17} /></a>
  <a href="https://www.behance.net/" target="_blank" rel="noreferrer"><Palette size={18} /><span>Behance</span><small>CREATIVE WORK</small><ArrowUpRight size={17} /></a></div></div></section></>;
}
function DesignPage() {
  const [selected, setSelected] = useState<DesignProject | null>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);
  const openProject = (project: DesignProject) => { setSelected(project); };
  return <><section id="content" className="work-section section-shell design-page">
    <SectionLabel left="01 / THE VISUAL SIDE" right="SELECTED WORK · 2022—2024" />
    <div className="section-heading"><div><span className="eyebrow"><Palette size={14} /> SELECTED PROJECTS</span><h2>Made with <em>intent.</em></h2></div><p>A collection of identity explorations, packaging, and digital banners. One gallery, no boxes around the kind of work.</p></div>
    <div className="behance-gallery">{designProjects.map((project) =>
      <motion.button type="button" className={`behance-card behance-card-${project.tone}`} key={project.number} onClick={() => openProject(project)} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ duration: .2 }}>
        <span className="behance-card-visual">{project.media === "video" ? <video src={project.thumbnail} autoPlay muted loop playsInline preload="metadata" aria-label={`${project.title} animated thumbnail`} /> : <img src={project.thumbnail} alt={`${project.title} project thumbnail`} loading="lazy" /> }<span className="behance-preview-wash" /><span className="behance-open"><ArrowUpRight size={19} /></span></span>
        <span className="behance-card-meta"><span>{project.number} / {project.subtitle}</span><span>{project.year}</span></span>
        <span className="behance-card-title">{project.title}</span>
        <span className="behance-card-desc">{project.description}</span>
      </motion.button>
    )}</div>
    <div className="behance-bottom"><span>FULL PROJECTS HOSTED ON BEHANCE</span><a href="https://www.behance.net/" target="_blank" rel="noreferrer">VISIT BEHANCE <ArrowUpRight size={14} /></a></div>
  </section>
  {selected && <div className="design-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
    <motion.section className="design-modal" role="dialog" aria-modal="true" aria-labelledby="design-modal-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>
      <div className="design-modal-top"><span>{selected.number} / PROJECT DETAILS</span><button className="design-modal-close" onClick={() => setSelected(null)} aria-label="Close project"><X size={19} /></button></div>
      <div className="design-modal-embed"><iframe src={selected.embed} title={`${selected.title} project on Behance`} allowFullScreen loading="lazy" /></div>
      <div className="design-modal-info">
        <div className="design-modal-title-row"><div><span className="eyebrow">{selected.subtitle}</span><h2 id="design-modal-title">{selected.title}</h2></div><a href={selected.url} target="_blank" rel="noreferrer" className="behance-external">OPEN ON BEHANCE <ExternalLink size={14} /></a></div>
        <p className="design-modal-description">{selected.description}</p>
        <div className="design-info-grid"><div><span>ROLE</span><p>{selected.role}</p></div><div><span>TOOLS / FOCUS</span><p>{selected.tools}</p></div><div><span>YEAR</span><p>{selected.year}</p></div></div>
        <div className="design-modal-footer"><button onClick={() => { const i = designProjects.findIndex((p) => p.number === selected.number); const next = (i - 1 + designProjects.length) % designProjects.length; setSelected(designProjects[next]); }}>← PREVIOUS PROJECT</button><span>{designProjects.findIndex((p) => p.number === selected.number) + 1} / {designProjects.length}</span><button onClick={() => { const i = designProjects.findIndex((p) => p.number === selected.number); const next = (i + 1) % designProjects.length; setSelected(designProjects[next]); }}>NEXT PROJECT →</button></div>
      </div>
    </motion.section>
  </div>}
  </>;
}
function BuildsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (!selectedProject) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null); }; document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; }; }, [selectedProject]);
  return <><section id="content" className="projects-section section-shell"><SectionLabel left="02 / THE BUILDING SIDE" right="CODE & EXPERIMENTS" /><div className="section-heading"><div><span className="eyebrow"><Code2 size={14} /> SELECTED PROJECTS</span><h2>Ideas into <em>systems.</em></h2></div><p>I learn by building. Open a project to see what I’m exploring, how it works, and its code when available.</p></div>
  <div className="project-grid">{projects.map((project) => <motion.button type="button" className="project-card project-card-button" key={project.number} onClick={() => setSelectedProject(project)} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: .22 }}><span className="project-card-top"><span>{project.number} / PROJECT NOTE</span><ArrowUpRight size={18} strokeWidth={1.5} /></span><span className="project-type">{project.type}</span><span className="project-card-title">{project.title}</span><span className="project-description">{project.description}</span><span className="project-stack">{project.stack}</span><span className="card-hint">OPEN PROJECT <ArrowUpRight size={13} /></span></motion.button>)}</div>
  <p className="honest-note">A curated selection of ongoing work. Repository links are included only where confirmed.</p></section>
  {selectedProject && <div className="project-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}><motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 16, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .2 }}><div className="modal-topline"><span>{selectedProject.number} / {selectedProject.type}</span><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={19} /></button></div><h2 id="modal-title">{selectedProject.title}</h2><p className="modal-description">{selectedProject.description}</p><div className="modal-detail"><span>THE FOCUS</span><p>{selectedProject.focus}</p></div><div className="modal-detail"><span>TECH STACK</span><p>{selectedProject.stack}</p></div>{selectedProject.url ? <a className="modal-repo-link" href={selectedProject.url} target="_blank" rel="noreferrer"><Github size={17} /> View source on GitHub <ExternalLink size={15} /></a> : <p className="modal-unavailable">Repository link not added yet.</p>}<button className="modal-done" onClick={() => setSelectedProject(null)}>BACK TO BUILDS <ArrowDownRight size={15} /></button></motion.section></div>}</>;
}
function Footer() { const reduceMotion = useReducedMotion(); return <footer className="site-footer section-shell"><span>© 2026 SHAYAN MANDREKAR</span><span>BUILT WITH CURIOSITY, NOT A TEMPLATE.</span><a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); }}>BACK TO HOME ↑</a></footer>; }

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => { const update = () => setPath(window.location.pathname); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  const active: PageId = path.startsWith("/design") ? "design" : path.startsWith("/builds") ? "builds" : "home";
  return <main id="top" data-theme={theme}><Navigation active={active} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />{active === "design" ? <DesignPage /> : active === "builds" ? <BuildsPage /> : <HomePage />}<Footer /></main>;
}
