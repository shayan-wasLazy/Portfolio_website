import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Palette, Code2, AtSign } from "lucide-react";

type SectionId = "design" | "projects" | "socials";

const navItems: { id: SectionId; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "projects", label: "Projects" },
  { id: "socials", label: "Socials" },
];

const designWork = [
  { number: "01", title: "Motion & Edit", type: "After Effects / Premiere Pro", description: "Kinetic type, rhythmic cuts, and motion-led visual storytelling." },
  { number: "02", title: "Graphic Experiments", type: "Photoshop / Figma", description: "Posters, visual systems, and ideas shaped into bold compositions." },
  { number: "03", title: "Anime Archive", type: "Editing / Art direction", description: "A personal corner for anime, manga, and the visuals that stay with you." },
];

const projects = [
  { number: "01", title: "Reed AI", type: "AI STUDY ASSISTANT", description: "A study companion built around uploaded notes, retrieval, and conversational learning.", stack: "FastAPI · Qdrant · Ollama" },
  { number: "02", title: "Cinematic Color Grading", type: "COMPUTER VISION / ML", description: "Exploring how a model can learn cinematic looks and transfer color characteristics between frames.", stack: "PyTorch · ResNet · LUTs" },
  { number: "03", title: "Anime Discovery", type: "DATA / RECOMMENDATION", description: "An anime database and recommendation project focused on making discovery more personal.", stack: "Python · SQL · Recommendation systems" },
];

const leaves = Array.from({ length: 13 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  delay: `${(i % 7) * -1.9}s`,
  duration: `${13 + (i % 6) * 2.5}s`,
  size: `${5 + (i % 4) * 2}px`,
  rotate: `${i * 43}deg`,
}));

function FloatingLeaves() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div className="leaf-layer" aria-hidden="true">
      {leaves.map((leaf) => (
        <span
          className="leaf"
          key={leaf.id}
          style={{
            left: leaf.left,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            width: leaf.size,
            height: `calc(${leaf.size} * .62)`,
            transform: `rotate(${leaf.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<SectionId>("design");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: [0.05, 0.2, 0.45] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: SectionId) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <main>
      <section className="hero" aria-label="Introduction">
        <div className="hero-image" role="img" aria-label="Monochrome Japanese mountain valley illustration with Shayan Mandrekar's name" />
        <div className="hero-vignette" />
        <div className="hero-grain" />
        <FloatingLeaves />
        <motion.div
          className="hero-topline"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          
          
        </motion.div>
        <motion.div
          className="hero-caption"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
        
        </motion.div>
        <a className="scroll-cue" href="#design" onClick={(event) => { event.preventDefault(); goTo("design"); }}>
          <span>SCROLL TO EXPLORE</span><ArrowDownRight size={15} strokeWidth={1.7} />
        </a>
      </section>

      <nav className="floating-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "is-active" : ""}`}
            onClick={() => goTo(item.id)}
            aria-current={active === item.id ? "location" : undefined}
          >
            {/* <span className="nav-index">0{index + 1}</span> */}
            <span>{item.label}</span>
            {active === item.id && <motion.span className="active-mark" layoutId="active-mark" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
          </button>
        ))}
      </nav>

      <section className="intro section-shell">
        <div className="section-label"><span>FIELD NOTES / 001</span><span>MUMBAI, INDIA</span></div>
        <div className="intro-grid">
          <h1>Curious by<br /><em>default.</em></h1>
          <div className="intro-copy">
            <p className="intro-lead">I’m Shayan — a data science student who likes building things that sit somewhere between logic and feeling.</p>
            <p>From machine learning experiments to motion graphics, I enjoy pulling ideas apart, figuring out how they work, and making something of my own. Usually with music on and too many tabs open.</p>
            <div className="interest-line"><span>CURRENT CURIOSITIES</span><b>AI / ML</b><i>✳</i><b>Visual storytelling</b><i>✳</i><b>Anime</b></div>
          </div>
        </div>
      </section>

      <section id="design" className="work-section section-shell">
        <div className="section-label"><span>01 / THE VISUAL SIDE</span><span>DESIGN & MOTION</span></div>
        <div className="section-heading">
          <div><span className="eyebrow"><Palette size={14} /> SELECTED CREATIVE INTERESTS</span><h2>Made to <em>move.</em></h2></div>
          <p>Frames, shapes, timing, and tiny details. The visual side of my brain lives here.</p>
        </div>
        <div className="editorial-list">
          {designWork.map((work) => (
            <motion.article className="editorial-row" key={work.number} whileHover={reduceMotion ? undefined : { x: 5 }} transition={{ duration: 0.2 }}>
              <span className="row-number">{work.number}</span>
              <div className="row-main"><h3>{work.title}</h3><p>{work.description}</p></div>
              <span className="row-type">{work.type}</span>
              <ArrowUpRight className="row-arrow" size={19} strokeWidth={1.4} />
            </motion.article>
          ))}
        </div>
        <div className="section-footnote"><span>TOOLS I REACH FOR</span><p>After Effects / Photoshop / Premiere Pro / Figma</p></div>
      </section>

      <section id="projects" className="projects-section section-shell">
        <div className="section-label"><span>02 / THE BUILDING SIDE</span><span>CODE & EXPERIMENTS</span></div>
        <div className="section-heading">
          <div><span className="eyebrow"><Code2 size={14} /> WORK IN PROGRESS, ALWAYS</span><h2>Ideas into <em>systems.</em></h2></div>
          <p>I learn by building. These are some of the problems and rabbit holes I’m exploring.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <motion.article className="project-card" key={project.number} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: 0.22 }}>
              <div className="project-card-top"><span>{project.number} / PROJECT NOTE</span><ArrowUpRight size={18} strokeWidth={1.5} /></div>
              <span className="project-type">{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-stack">{project.stack}</div>
            </motion.article>
          ))}
        </div>
        <p className="honest-note">A living notebook of experiments — details and links will be added as each project is ready to share.</p>
      </section>

      <section id="socials" className="social-section section-shell">
        <div className="section-label"><span>03 / FIND ME ELSEWHERE</span><span>CONTACT & CONNECTIONS</span></div>
        <div className="social-layout">
          <div><span className="eyebrow"><AtSign size={14} /> THE INTERNET IS A SMALL PLACE</span><h2>Say <em>hello.</em></h2><p>Have an interesting idea, a project to build, or something good to recommend? I’m all ears.</p></div>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub</span><small>CODE & EXPERIMENTS</small><ArrowUpRight size={17} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={18} /><span>LinkedIn</span><small>PROFESSIONAL</small><ArrowUpRight size={17} /></a>
            <a href="https://www.instagram.com/shywhyanime/" target="_blank" rel="noreferrer"><Instagram size={18} /><span>Instagram</span><small>ANIME & VISUALS</small><ArrowUpRight size={17} /></a>
            <a href="https://www.behance.net/" target="_blank" rel="noreferrer"><Palette size={18} /><span>Behance</span><small>CREATIVE WORK</small><ArrowUpRight size={17} /></a>
          </div>
        </div>
        <footer><span>© 2026 SHAYAN MANDREKAR</span><span>BUILT WITH CURIOSITY, NOT A TEMPLATE.</span><a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }}>BACK TO THE VALLEY ↑</a></footer>
      </section>
    </main>
  );
}