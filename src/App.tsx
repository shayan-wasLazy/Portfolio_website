import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Palette, Code2, X, ExternalLink, Mail, Sun, Moon, Activity, Target, Trophy, BookOpen, Database, BrainCircuit, Film } from "lucide-react";

type PageId = "home" | "design" | "builds" | "analysis" | "reed" | "cog" | "anime" | "chess";
type Project = { number: string; title: string; type: string; description: string; stack: string; focus: string; url?: string; analysisUrl?: string };
const navItems: { id: PageId; label: string; href: string }[] = [
  { id: "home", label: "Home", href: import.meta.env.BASE_URL },
  { id: "design", label: "Design", href: `${import.meta.env.BASE_URL}#/design` },
  { id: "builds", label: "Builds", href: `${import.meta.env.BASE_URL}#/builds` },
];
type DesignProject = { number: string; title: string; subtitle: string; description: string; year: string; role: string; tools: string; url: string; embed: string; tone: string; thumbnail: string; media: "image" | "video" };
const reelProjects = [
  { id: "NfMGeI5htS0", label: "VIDEO / 01" },
  { id: "N3gH7SXzGcI", label: "VIDEO / 02" },
  { id: "n1H5aUNC6Q4", label: "VIDEO / 03" },
  { id: "DIBXYPhjCWY", label: "VIDEO / 04" },
  { id: "VQn_lkjb-2c", label: "VIDEO / 05" },
  { id: "EE3UOdOqkMs", label: "VIDEO / 06" },
  { id: "KCRJzkxxC8M", label: "VIDEO / 07" },
  { id: "RGX4G9L45Ko", label: "VIDEO / 08" },

  { id: "e4AjccMiT-s", label: "VIDEO / 09" },
  { id: "bC7Bat_pDAs", label: "VIDEO / 10" },];

const designProjects: DesignProject[] = [
  { number: "01", title: "Hyperloop", subtitle: "BRAND IDENTITY", description: "A visual identity concept exploring the future-facing character of high-speed transportation.", year: "2024", role: "Brand identity / visual design", tools: "Branding · Typography · Visual systems", url: "https://www.behance.net/gallery/201498491/HyperLoop-brand-identity", embed: "https://www.behance.net/embed/project/201498491?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F201498491%2FHyperLoop-brand-identity", tone: "hyperloop", thumbnail: `${import.meta.env.BASE_URL}assets/hyperloop.gif`, media: "image" },
  { number: "02", title: "Green Oasis", subtitle: "BRAND IDENTITY", description: "A brand identity built around a greener, calmer visual language.", year: "2024", role: "Brand identity / visual design", tools: "Branding · Logo · Visual system", url: "https://www.behance.net/gallery/201579531/Green-Oasis-Brand-identity", embed: "https://www.behance.net/embed/project/201579531?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F201579531%2FGreen-Oasis-Brand-identity", tone: "oasis", thumbnail: `${import.meta.env.BASE_URL}assets/green-oasis.gif`, media: "image" },
  { number: "03", title: "VitaFizz", subtitle: "PACKAGING / BRANDING", description: "A bright, playful identity concept for a fizzy beverage brand.", year: "2023", role: "Branding / packaging concept", tools: "Branding · Packaging · Art direction", url: "https://www.behance.net/gallery/179377597/Vita-Fizz-COmp", embed: "https://www.behance.net/embed/project/179377597?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F179377597%2FVita-Fizz-COmp", tone: "vitafizz", thumbnail: `${import.meta.env.BASE_URL}assets/vitafizz.gif`, media: "image" },
  { number: "04", title: "Designly Rebrand", subtitle: "DISCORD BANNER", description: "A banner design created for the Designly Discord community.", year: "2023", role: "Banner design", tools: "Graphic design · Digital composition", url: "https://www.behance.net/gallery/181584011/Designly-rebarnd-comp", embed: "https://www.behance.net/embed/project/181584011?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F181584011%2FDesignly-rebarnd-comp", tone: "designly", thumbnail: `${import.meta.env.BASE_URL}assets/designly.mp4`, media: "video" },
  { number: "05", title: "The Myth", subtitle: "DISCORD BANNER", description: "A themed digital banner exploring a darker, myth-inspired visual direction.", year: "2022", role: "Banner design", tools: "Graphic design · Digital composition", url: "https://www.behance.net/gallery/174810451/The-myth", embed: "https://www.behance.net/embed/project/174810451?url=https%3A%2F%2Fwww.behance.net%2Fgallery%2F174810451%2FThe-myth", tone: "myth", thumbnail: `${import.meta.env.BASE_URL}assets/the-myth.mp4`, media: "video" },
];
const projects: Project[] = [
  { number: "01", title: "SupeRR Selector", type: "CRICKET ANALYTICS / PRESSURE MODELLING", description: "A pressure-first T20 player evaluation system that ranks batters and bowlers using ball-by-ball match context, role-specific performance, and model consensus.", stack: "Python · Pandas · XGBoost · Streamlit · Matplotlib", focus: "Pressure Index engineering, alternative pressure scenarios, player baselines and uplift, eligibility controls, and weighted Reciprocal Rank Fusion across five scoring methods.", url: "https://github.com/shayan-wasLazy/Cricket-Aanalysis", analysisUrl: "#/cricket-analysis" },
  { number: "02", title: "Reed AI", type: "AI STUDY ASSISTANT / LOCAL RAG", description: "A local-first study workspace that turns uploaded notes into grounded, searchable answers.", stack: "FastAPI · Docling · Qdrant · MiniLM · BM25 · Ollama", focus: "PDF ingestion, heading-aware chunking, hybrid dense/sparse retrieval, and answers constrained to retrieved note context.", url: "https://github.com/shayan-wasLazy/Reed", analysisUrl: "#/reed-ai" },
  { number: "03", title: "Cinematic Color Grading", type: "COMPUTER VISION / DEEP LEARNING", description: "A reference-guided color grading model that predicts a differentiable 3D lookup table from source and reference frames.", stack: "PyTorch · ResNet50 · 3D LUTs · Differentiable sampling", focus: "Shared visual encoding, reference-minus-source feature conditioning, 16³ LUT generation, and validation with L1, MSE, PSNR, and SSIM.", url: "https://github.com/shayan-wasLazy/Color-Grading-AI-COG-", analysisUrl: "#/cog-analysis" },
  { number: "04", title: "Anime Discovery", type: "ANIME DATABASE / SEMANTIC RECOMMENDATIONS", description: "A MyAnimeList-inspired catalogue with user tracking and content-based anime discovery through vector similarity.", stack: "FastAPI · PostgreSQL · SQLAlchemy · Qdrant · Sentence Transformers", focus: "Relational anime and watchlist data, metadata embeddings, nearest-neighbour retrieval, and recommendation workflows.", url: "https://github.com/shayan-wasLazy/MAL-project", analysisUrl: "#/anime-discovery" },
  { number: "05", title: "Chess Bot", type: "NEUROSYMBOLIC GAME AI", description: "A chess-playing agent that combines neural move scoring with a minimax search over the strongest legal candidates.", stack: "TensorFlow / Keras · python-chess · Streamlit · NumPy", focus: "8×8×12 board encoding, learned move scores, legal-move filtering, top-10 candidate search, and depth-three minimax.", url: "https://github.com/shayan-wasLazy/Chess-Bot", analysisUrl: "#/chess-bot" },
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
function AnimalFrameSequence({ folder, active }: { folder: string; active: boolean }) {
  const [frame, setFrame] = useState(0);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    let cancelled = false;
    const loaded: HTMLImageElement[] = [];
    const patterns = (n: number) => {
      const two = String(n).padStart(2, "0");
      const three = String(n).padStart(3, "0");
      return [`frame_${two}.png`, `frame-${two}.png`, `${two}.png`,
        `frame_${three}.png`, `frame-${three}.png`, `${three}.png`,
        `frame${n}.png`, `${n}.png`];
    };
    const loadFrame = (n: number) => new Promise<HTMLImageElement | null>((resolve) => {
      const candidates = patterns(n);
      let candidate = 0;
      const tryNext = () => {
        if (cancelled || candidate >= candidates.length) { resolve(null); return; }
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => { candidate += 1; tryNext(); };
        image.src = `${import.meta.env.BASE_URL}assets/animals/${folder}/${candidates[candidate]}`;
      };
      tryNext();
    });
    (async () => {
      for (let n = 1; n <= 30; n += 1) {
        const image = await loadFrame(n);
        if (cancelled) return;
        if (!image) break;
        loaded.push(image);
        setFrames([...loaded]);
      }
    })();
    return () => { cancelled = true; };
  }, [folder]);

  useEffect(() => {
    if (!frames.length || !active) return;
    let raf = 0;
    let previous = 0;
    const tick = (time: number) => {
      if (!activeRef.current) return;
      if (!previous || time - previous >= 240) {
        frameRef.current = (frameRef.current + 1) % frames.length;
        setFrame(frameRef.current);
        previous = time;
      }
      raf = requestAnimationFrame(tick);
    };
    if (frames.length > 1) raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [active, frames]);

  const current = frames[frame] ?? frames[0];
  return current
    ? <img className="animal-frame-image" src={current.src} alt="" draggable={false} />
    : <span className="animal-frame-placeholder" aria-hidden="true" />;
}

function Hero() {
  const [activeAnimal, setActiveAnimal] = useState<string | null>(null);
  const animals = [
    { id: "sleepy-cat", label: "Sleeping cat", folder: "sleepy_cat", className: "animal-sleepy-cat" },
    { id: "sunglasses-cat", label: "Sunglasses cat", folder: "sunglasses_cat", className: "animal-sunglasses-cat" },
    { id: "headphone-blob", label: "Headphone creature", folder: "headphone_blob_frames", className: "animal-headphone-blob" },
  ];
  return <section className="hero home-hero" aria-label="Portfolio cover">
    <div className="hero-image" role="img" aria-label="Monochrome Japanese mountain valley illustration" />
    <div className="hero-vignette" /><div className="hero-grain" /><FloatingLeaves />
    <div className="hero-animal-layer" aria-label="Interactive valley characters">
      {animals.map((animal) => <button key={animal.id} type="button"
        className={`hero-animal ${animal.className} ${activeAnimal === animal.id ? "is-active" : ""}`}
        aria-label={animal.label} aria-pressed={activeAnimal === animal.id}
        onMouseEnter={() => setActiveAnimal(animal.id)}
        onMouseLeave={() => setActiveAnimal(null)}
        onFocus={() => setActiveAnimal(animal.id)}
        onBlur={() => setActiveAnimal(null)}
        >
        <AnimalFrameSequence folder={animal.folder} active={activeAnimal === animal.id} />
      </button>)}
    </div>
  </section>;
}

function HoverAnimal({ folder, className, label }: { folder: string; className: string; label: string }) {
  const [active, setActive] = useState(false);
  return <button type="button" className={`inline-critter ${className}`} aria-label={label}
    onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
    onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
    <AnimalFrameSequence folder={folder} active={active} />
  </button>;
}

function LoadingScreen({ page }: { page: PageId }) {
  const loadingCopy: Record<PageId, { first: string; second: string; tagline: string }> = {
    home: { first: "Shayan", second: "Mandrekar", tagline: "" },
    design: { first: "Design", second: "Page", tagline: "A curated collection of visual work, shaped over the years." },
    builds: { first: "Builds", second: "Page", tagline: "Experiments, tools, and ideas brought to life through code." },
    analysis: { first: "Cricket", second: "Analysis", tagline: "A pressure-first cricket analytics case study." },
    reed: { first: "Reed", second: "AI", tagline: "A grounded study assistant, built around your notes." },
    cog: { first: "Color", second: "Grading", tagline: "Reference-guided color transformation with learned LUTs." },
    anime: { first: "Anime", second: "Discovery", tagline: "Relational data meets semantic recommendations." },
    chess: { first: "Chess", second: "Bot", tagline: "Neural move scoring with symbolic search." },
  };
  const { first: firstLine, second: secondLine, tagline } = loadingCopy[page];
  return <motion.div className="portfolio-intro-screen" role="status" aria-label={`Loading ${firstLine} ${secondLine}`}
    initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }}
    transition={{ duration: page === "home" ? 3 : 1.35, times: [0, .78, 1], ease: "easeInOut" }}>
    <div className="portfolio-intro-content"><div className="portfolio-intro-wordmark" aria-label={`${firstLine} ${secondLine}`}>
      <span className="portfolio-intro-first">{Array.from(firstLine).map((char, index) => <span aria-hidden="true" className="portfolio-intro-letter" key={index} style={{ "--letter-index": index } as React.CSSProperties}>{char}</span>)}</span>
      <span className="portfolio-intro-last">{Array.from(secondLine).map((char, index) => <span aria-hidden="true" className="portfolio-intro-letter" key={index} style={{ "--letter-index": index + firstLine.length } as React.CSSProperties}>{char}</span>)}</span>
    </div>{page !== "home" && <p className="portfolio-intro-tagline">{tagline}</p>}</div>
  </motion.div>;
}

function LoFiCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    const move = (event: MouseEvent) => { setPosition({ x: event.clientX, y: event.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  return <div className={`lofi-cursor ${visible ? "is-visible" : ""} ${pressed ? "is-pressed" : ""}`} style={{ left: position.x, top: position.y }} aria-hidden="true"><span className="lofi-cursor-core" /><span className="lofi-cursor-ring" /><span className="lofi-cursor-spark">✳</span></div>;
}


function SectionLabel({ left, right }: { left: string; right: string }) { return <div className="section-label"><span>{left}</span><span>{right}</span></div>; }
function HomePage() {
  return <><Hero /><section id="content" className="intro section-shell"><SectionLabel left="HOME / 001" right="MUMBAI, INDIA" /><div className="intro-grid"><h1 className="curious-heading"><HoverAnimal folder="sleepy_cat" className="inline-sleepy-cat" label="Sleeping cat" />Curious by<br /><em>default.</em></h1><div className="intro-copy"><p className="intro-lead">I’m Shayan — a data science student who likes building things that sit somewhere between logic and feeling.</p><p>From machine learning experiments to motion graphics, I enjoy pulling ideas apart, figuring out how they work, and making something of my own. Usually with music on and too many tabs open.</p><div className="interest-line"><span>CURRENT CURIOSITIES</span><b>AI / ML</b><i>✳</i><b>Visual storytelling</b><i>✳</i><b>Anime</b></div></div></div><section className="about-poster" aria-label="About Shayan Mandrekar">
    <div className="about-poster-top"><span>✳ ABOUT ME</span><span>PROFILE / 001</span></div>
    <div className="about-poster-body">
      <div className="about-poster-photo">
        <span className="about-photo-stamp">MUMBAI<br />INDIA</span>
        <img src={`${import.meta.env.BASE_URL}assets/shayan-portrait.png`} alt="Shayan Mandrekar in a dramatic black and white portrait" loading="lazy" />
        <span className="about-photo-caption">SHAYAN MANDREKAR · 2026</span>
      </div>
      <div className="about-poster-copy">
        <span className="about-poster-kicker">DESIGNER × DEVELOPER</span>
        <h2>HI<span>!!</span></h2>
        <p className="about-poster-lead">I’m Shayan — a data science student with one foot in logic and the other in visual storytelling.</p>
        <p>I build machine learning experiments, code useful things, and create motion graphics and visual identities. I like work that feels considered, a little unexpected, and unmistakably human.</p>
        <div className="about-poster-mark" aria-hidden="true">✳</div>
        <div className="about-poster-facts"><span>01 / AI & MACHINE LEARNING</span><span>02 / MOTION & GRAPHIC DESIGN</span><span>03 / ALWAYS EXPERIMENTING</span></div>
      </div>
    </div>
    <div className="about-poster-bottom"><span>CURIOUS BY DEFAULT.</span><span>CREATIVE / TECHNICAL</span><span>MMXXVI</span></div>
  </section>
  <div className="home-contact"><div><span className="eyebrow"><Mail size={14} /> CONTACT / SOCIALS</span><h2>Say <em>hello.</em></h2><p>Have an interesting idea, a project to build, or something good to recommend? Let’s connect.</p></div><div className="social-links">
  <a href="https://github.com/shayan-wasLazy" target="_blank" rel="noreferrer"><Github size={18} /><span>GitHub</span><small>CODE & EXPERIMENTS</small><ArrowUpRight size={17} /></a>
  <a href="https://www.linkedin.com/in/shayan-mandrekar-71368126a" target="_blank" rel="noreferrer"><Linkedin size={18} /><span>LinkedIn</span><small>PROFESSIONAL</small><ArrowUpRight size={17} /></a>
  <a href="https://www.instagram.com/lazy_but_kind_/" target="_blank" rel="noreferrer"><Instagram size={18} /><span>Instagram</span><small>VISUALS & PERSONAL</small><ArrowUpRight size={17} /></a>
  </div></div></section></>;
}
function DesignPage() {
  const [activeReel, setActiveReel] = useState(0);
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
    <section className="reels-section" aria-labelledby="reels-heading">
      <div className="reels-heading-row">
        <div><span className="eyebrow"><Instagram size={14} /> MOTION / SHORT FORM</span><h2 id="reels-heading">Made to <em>move.</em></h2></div>
        <p>Short-form edits, playing in a little cinematic carousel.</p>
      </div>
      <div className="reel-stage" aria-label="Short-form video carousel">
        {reelProjects.map((reel, index) => {
          const offset = (index - activeReel + reelProjects.length) % reelProjects.length;
          const position = offset > reelProjects.length / 2 ? offset - reelProjects.length : offset;
          const visible = Math.abs(position) <= 2;
          return <button type="button" key={reel.id} className={`reel-slide ${position === 0 ? "is-current" : ""} ${visible ? "" : "is-hidden"}`} style={{ "--reel-position": position } as React.CSSProperties} onClick={() => setActiveReel(index)} aria-label={`Play video ${index + 1}`} aria-current={position === 0 ? "true" : undefined} tabIndex={visible ? 0 : -1}>
            {position === 0 ? <span className="reel-player"><iframe key={reel.id} src={`https://www.youtube-nocookie.com/embed/${reel.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.id}&playsinline=1&rel=0&modestbranding=1`} title={`Short-form edit ${index + 1}`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></span> : <span className="reel-still"><img src={`https://i.ytimg.com/vi/${reel.id}/hqdefault.jpg`} alt="" loading="lazy" /></span>}
            <span className="reel-slide-label"><span>{reel.label}</span><span>{String(index + 1).padStart(2, "0")} / {String(reelProjects.length).padStart(2, "0")}</span></span>
          </button>;
        })}
        <button className="reel-nav reel-nav-prev" type="button" onClick={() => setActiveReel((activeReel - 1 + reelProjects.length) % reelProjects.length)} aria-label="Previous video">←</button>
        <button className="reel-nav reel-nav-next" type="button" onClick={() => setActiveReel((activeReel + 1) % reelProjects.length)} aria-label="Next video">→</button>
      </div>
      <div className="reel-progress" aria-hidden="true"><span style={{ width: `${((activeReel + 1) / reelProjects.length) * 100}%` }} /></div>
    </section>
    <section className="asset-gallery-section" aria-labelledby="apparel-heading">
      <div className="reels-heading-row asset-gallery-heading">
        <div><span className="eyebrow"><Palette size={14} /> APPAREL DESIGN</span><h2 id="apparel-heading">Made to <em>wear.</em></h2></div>
        <p>Apparel concepts and wearable visual experiments.</p>
      </div>
      <div className="asset-gallery-grid asset-gallery-apparel">
        {[
          ["Tee%201.png", "APPAREL / 01"], ["jjjj4w.png", "APPAREL / 02"],
          ["tee%202.png", "APPAREL / 03"], ["tee%203.png", "APPAREL / 04"],
          ["tsjtj.png", "APPAREL / 05"]
        ].map(([file, label], index) => <a className="asset-gallery-card" key={file} href={`${import.meta.env.BASE_URL}assets/design/tshirt%20design/${file}`} target="_blank" rel="noreferrer">
          <span className="asset-gallery-image"><img src={`${import.meta.env.BASE_URL}assets/design/tshirt%20design/${file}`} alt={`Apparel design ${index + 1}`} loading="lazy" /></span>
          <span className="asset-gallery-meta"><span>{label}</span><ArrowUpRight size={16} /></span>
        </a>)}
      </div>
    </section>
    <section className="asset-gallery-section" aria-labelledby="gfx-heading">
      <div className="reels-heading-row asset-gallery-heading">
        <div><span className="eyebrow"><Palette size={14} /> GRAPHIC DESIGN</span><h2 id="gfx-heading">Visual <em>experiments.</em></h2></div>
        <p>Standalone graphics, compositions, and visual studies.</p>
      </div>
      <div className="asset-gallery-grid asset-gallery-gfx">
        {[
          ["dgafgagg.png", "GRAPHIC / 01"], ["eghge.png", "GRAPHIC / 02"],
          ["fhshg.png", "GRAPHIC / 03"], ["rhrehreh.png", "GRAPHIC / 04"],
          ["rhrhg.png", "GRAPHIC / 05"], ["rurujrj.png", "GRAPHIC / 06"]
        ].map(([file, label], index) => <a className="asset-gallery-card" key={file} href={`${import.meta.env.BASE_URL}assets/design/gfx/${file}`} target="_blank" rel="noreferrer">
          <span className="asset-gallery-image"><img src={`${import.meta.env.BASE_URL}assets/design/gfx/${file}`} alt={`Graphic design ${index + 1}`} loading="lazy" /></span>
          <span className="asset-gallery-meta"><span>{label}</span><ArrowUpRight size={16} /></span>
        </a>)}
      </div>
    </section>
  </section>
  {selected && <div className="design-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
    <motion.section className="design-modal" role="dialog" aria-modal="true" aria-labelledby="design-modal-title" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>
      <div className="design-modal-top"><span>{selected.number} / PROJECT DETAILS</span><button className="design-modal-close" onClick={() => setSelected(null)} aria-label="Close project"><X size={19} /></button></div>
      <div className="design-modal-thumbnail">{selected.media === "video" ? <video src={selected.thumbnail} autoPlay muted loop playsInline controls aria-label={`${selected.title} thumbnail video`} /> : <img src={selected.thumbnail} alt={`${selected.title} project thumbnail`} />}</div>
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
  {selectedProject && <div className="project-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedProject(null); }}><motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 16, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .2 }}><div className="modal-topline"><span>{selectedProject.number} / {selectedProject.type}</span><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={19} /></button></div><h2 id="modal-title">{selectedProject.title}</h2><p className="modal-description">{selectedProject.description}</p><div className="modal-detail"><span>THE FOCUS</span><p>{selectedProject.focus}</p></div><div className="modal-detail"><span>TECH STACK</span><p>{selectedProject.stack}</p></div><div className="modal-actions">{selectedProject.url ? <a className="modal-repo-link" href={selectedProject.url} target="_blank" rel="noreferrer"><Github size={17} /> View GitHub repository <ExternalLink size={15} /></a> : <p className="modal-unavailable">Repository link not added yet.</p>}{selectedProject.analysisUrl && <a className="modal-repo-link modal-analysis-link" href={selectedProject.analysisUrl}><Activity size={17} /> Project analysis <ArrowUpRight size={15} /></a>}</div><button className="modal-done" onClick={() => setSelectedProject(null)}>BACK TO BUILDS <ArrowDownRight size={15} /></button></motion.section></div>}</>;
}

const cricketBatters = [
  { rank: 1, name: "David Miller", rrf: "0.0158", model: 99.10, uplift: 20.94, balls: 56, matches: 11, methods: 5 },
  { rank: 2, name: "Namboori Tilak Varma", rrf: "0.0156", model: 98.59, uplift: 31.90, balls: 82, matches: 11, methods: 5 },
  { rank: 3, name: "Naman Dhir", rrf: "0.0155", model: 99.43, uplift: 18.93, balls: 56, matches: 5, methods: 4 },
  { rank: 4, name: "Ashutosh Sharma", rrf: "0.0153", model: 97.33, uplift: 8.34, balls: 41, matches: 7, methods: 5 },
  { rank: 5, name: "Jason Holder", rrf: "0.0151", model: 97.77, uplift: 15.31, balls: 101, matches: 16, methods: 5 },
  { rank: 6, name: "Sherfane Rutherford", rrf: "0.0148", model: 95.49, uplift: 9.29, balls: 58, matches: 7, methods: 5 },
  { rank: 7, name: "Mitchell Santner", rrf: "0.0145", model: 96.73, uplift: 13.08, balls: 82, matches: 11, methods: 5 },
  { rank: 8, name: "Rovman Powell", rrf: "0.0141", model: 96.68, uplift: 15.85, balls: 123, matches: 16, methods: 5 },
  { rank: 9, name: "Tristan Stubbs", rrf: "0.0138", model: 96.99, uplift: 17.65, balls: 60, matches: 8, methods: 4 },
  { rank: 10, name: "Shashank Singh", rrf: "0.0137", model: 93.55, uplift: 11.19, balls: 81, matches: 9, methods: 5 },
];

const cricketBowlers = [
  { rank: 1, name: "Corbin Bosch", rrf: "0.0159", model: 88.08, uplift: -2.76, balls: 95, matches: 7, methods: 5 },
  { rank: 2, name: "Nathan Ellis", rrf: "0.0159", model: 87.92, uplift: -3.25, balls: 85, matches: 9, methods: 5 },
  { rank: 3, name: "Jofra Archer", rrf: "0.0158", model: 87.84, uplift: -3.76, balls: 263, matches: 20, methods: 5 },
  { rank: 4, name: "Bhuvneshwar Kumar", rrf: "0.0156", model: 87.26, uplift: -2.86, balls: 459, matches: 43, methods: 5 },
  { rank: 5, name: "Axar Patel", rrf: "0.0146", model: 81.29, uplift: -3.37, balls: 272, matches: 28, methods: 5 },
  { rank: 6, name: "Rashid Khan", rrf: "0.0144", model: 82.46, uplift: -3.94, balls: 479, matches: 36, methods: 5 },
  { rank: 7, name: "Lungi Ngidi", rrf: "0.0137", model: 80.21, uplift: -4.61, balls: 108, matches: 11, methods: 5 },
  { rank: 8, name: "Josh Hazlewood", rrf: "0.0136", model: 78.59, uplift: -2.50, balls: 333, matches: 27, methods: 5 },
  { rank: 9, name: "Dunith Wellalage", rrf: "0.0135", model: 79.32, uplift: -3.93, balls: 61, matches: 6, methods: 5 },
  { rank: 10, name: "Kagiso Rabada", rrf: "0.0135", model: 79.74, uplift: -4.37, balls: 267, matches: 24, methods: 5 },
];

function CricketAnalysisPage() {
  const pressureWeights = [
    ["Required run-rate pressure", "25.0%", "How quickly the batting side must score"],
    ["Wicket pressure", "20.0%", "Cost and risk of losing a wicket"],
    ["Time urgency", "15.0%", "Balls remaining to reach the target"],
    ["Momentum pressure", "15.0%", "Gap between required and recent scoring rate"],
    ["Death-over pressure", "10.0%", "Additional urgency in the final overs"],
    ["Target difficulty", "7.5%", "Relative target difficulty within format and season"],
    ["Match stakes", "7.5%", "Stage / knockout importance proxy"],
  ];
  const rrfWeights = [
    ["PI baseline", "35%", "Primary, transparent pressure definition"],
    ["PI RRR-heavy", "25%", "Emphasises chase urgency"],
    ["PI momentum-heavy", "20%", "Tests sensitivity to recent scoring momentum"],
    ["PI stakes-heavy", "15%", "Tests sensitivity to match importance"],
    ["Synthetic XGBoost", "5%", "Supporting signal trained on generated pressure labels"],
  ];
  return <section id="content" className="cricket-analysis-section section-shell">
    <SectionLabel left="03 / PROJECT ANALYSIS" right="SUPERR SELECTOR · SEASON 02" />
    <header className="cricket-case-hero">
      <div className="cricket-case-kicker"><Activity size={14} /> PRESSURE PERFORMANCE / IPL + T20I</div>
      <div className="cricket-case-main">
        <div className="cricket-case-title">
          <h1>Read the game.<br /><em>Measure the pressure.</em></h1>
          <p>A pressure-first player evaluation framework built for the SupeRR Selector Season 02 challenge. Instead of ranking players only by career totals, the system evaluates how they perform when match context becomes difficult.</p>
        </div>
        <aside className="cricket-case-aside">
          <span>THE QUESTION</span>
          <p>Who has produced the strongest performance profile in high-pressure T20 situations—not simply the strongest overall record?</p>
          <a href="#/builds">← BACK TO BUILDS</a>
        </aside>
      </div>
      <div className="cricket-case-actions">
        <a className="cricket-action-primary" href="https://github.com/shayan-wasLazy/Cricket-Aanalysis" target="_blank" rel="noreferrer"><Github size={17} /> VIEW SOURCE REPOSITORY <ExternalLink size={14} /></a>
        <a className="cricket-action-secondary" href="https://github.com/shayan-wasLazy/Cricket-Aanalysis/blob/main/README.md" target="_blank" rel="noreferrer">METHODOLOGY & RUN GUIDE <ArrowUpRight size={14} /></a>
      </div>
    </header>

    <div className="cricket-stat-grid">
      <div className="cricket-stat"><strong>10 + 10</strong><span>BATTER & BOWLER SHORTLISTS</span></div>
      <div className="cricket-stat"><strong>05</strong><span>RANKING METHODS</span></div>
      <div className="cricket-stat"><strong>0—100</strong><span>PRESSURE INDEX SCALE</span></div>
      <div className="cricket-stat"><strong>2022—26</strong><span>IPL + T20I DATA WINDOW</span></div>
    </div>

    <section className="cricket-report-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">01 / THE CHALLENGE</span><h2>Measure performance <em>in context.</em></h2></div><p>The brief asks for two ordered top-10 lists and a reproducible explanation of pressure, player metrics, fair comparisons, supporting evidence, and model limitations.</p></div>
      <div className="cricket-facts-grid">
        <article><span>DATA INPUT</span><h3>Ball-by-ball</h3><p>IPL and T20 International deliveries from 2022 onward, joined with match, competition, team, player, playing-XI, and competition-player metadata.</p></article>
        <article><span>ROLE-SPECIFIC VIEW</span><h3>Batters ≠ bowlers</h3><p>Batters are evaluated when the batting side is under pressure; bowlers are evaluated while the defending side is under pressure.</p></article>
        <article><span>OUTPUT</span><h3>Coach-ready shortlist</h3><p>Rankings narrow the candidate pool. Role fit, matchups, and cricket context still require human review.</p></article>
      </div>
    </section>

    <section className="cricket-report-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">02 / SELECTION PIPELINE</span><h2>From deliveries to <em>decisions.</em></h2></div><p>Each stage adds context and evidence controls before the model combines independent ranking positions.</p></div>
      <div className="cricket-pipeline">
        {[
          ["01", "Join data", "Connect delivery-level records to match, competition, team, and player metadata."],
          ["02", "Rebuild match state", "Reconstruct score, target, wickets, balls remaining, innings context, and chase state."],
          ["03", "Score pressure", "Calculate a 0–100 baseline Pressure Index and alternative PI weight scenarios."],
          ["04", "Measure response", "Build batter and bowler metrics using role-correct high-pressure opportunities and lower-pressure baselines."],
          ["05", "Apply eligibility", "Filter by pressure deliveries, matches, recency, and the number of supporting methods."],
          ["06", "Fuse rankings", "Rank every method independently, then combine candidate positions with weighted Reciprocal Rank Fusion."],
        ].map((stage) => <article className="cricket-pipeline-step" key={stage[0]}><span>{stage[0]}</span><div><h3>{stage[1]}</h3><p>{stage[2]}</p></div></article>)}
      </div>
    </section>

    <section className="cricket-report-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">03 / PRESSURE MODEL</span><h2>A transparent <em>Pressure Index.</em></h2></div><p>The baseline PI is a weighted sum of normalized match-state components. The transformations are implemented in code; the weights alone are not the whole definition.</p></div>
      <div className="cricket-model-layout">
        <div className="cricket-table-wrap">
          <table className="cricket-table">
            <thead><tr><th>COMPONENT</th><th>WEIGHT</th><th>CAPTURES</th></tr></thead>
            <tbody>{pressureWeights.map((item) => <tr key={item[0]}><td>{item[0]}</td><td>{item[1]}</td><td>{item[2]}</td></tr>)}</tbody>
          </table>
        </div>
        <aside className="cricket-formula-card"><span>BASELINE FORMULA</span><p>PI = 0.25·RRR + 0.20·Wicket + 0.15·Time + 0.15·Momentum + 0.10·Death + 0.075·Target + 0.075·Stakes</p><small>Each component is normalized before weighting. The resulting pressure score is scaled to 0–100.</small></aside>
      </div>
      <div className="cricket-note-grid">
        <article><span>ALTERNATIVE PI VARIANTS</span><p>RRR-heavy, momentum-heavy, and stakes-heavy variants test whether the shortlist remains competitive when the pressure definition changes.</p></article>
        <article><span>SYNTHETIC XGBOOST</span><p>XGBoost is trained on generated scenarios with teacher-rule labels. It learns that synthetic rule; it is not independently validated against real-world pressure labels.</p></article>
      </div>
    </section>

    <section className="cricket-report-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">04 / PLAYER METRICS & RANKING</span><h2>Reward performance and <em>agreement.</em></h2></div><p>Role-specific rates are compared with lower-pressure baselines, while rank fusion avoids treating differently scaled model scores as directly comparable.</p></div>
      <div className="cricket-facts-grid">
        <article><span>BATTERS</span><h3>Runs per 100 balls</h3><p>Pressure scoring rate and uplift versus the player's lower-pressure baseline. Wides are not balls faced; no-balls count as balls faced.</p></article>
        <article><span>BOWLERS</span><h3>Wickets per 100 legal balls</h3><p>Credited wickets, economy, and dot-ball rate. Only legal balls enter the wicket-rate denominator; non-bowler-credited dismissals are excluded.</p></article>
        <article><span>RECENCY & SHRINKAGE</span><h3>Stabilise small samples</h3><p>Recency weights follow w = 2^(−age / half-life). A 100-delivery prior pulls small-sample rates toward the population rate.</p></article>
      </div>
      <div className="cricket-model-layout cricket-rank-layout">
        <div className="cricket-table-wrap">
          <table className="cricket-table">
            <thead><tr><th>RANKING METHOD</th><th>WEIGHT</th><th>ROLE</th></tr></thead>
            <tbody>{rrfWeights.map((item) => <tr key={item[0]}><td>{item[0]}</td><td>{item[1]}</td><td>{item[2]}</td></tr>)}</tbody>
          </table>
        </div>
        <aside className="cricket-formula-card"><span>WEIGHTED RECIPROCAL RANK FUSION</span><p>RRF(p) = Σ [ method weight / (60 + method rank) ]</p><small>Missing method ranks contribute zero. A player must appear in at least three eligible method lists to enter the captured ensemble.</small></aside>
      </div>
      <div className="cricket-eligibility">
        <div><span>FORMATS / SEASONS</span><strong>T20 + T20I · 2022–2026</strong></div>
        <div><span>MINIMUM PRESSURE BALLS</span><strong>40</strong></div>
        <div><span>MINIMUM PRESSURE MATCHES</span><strong>5</strong></div>
        <div><span>MINIMUM MODEL SUPPORT</span><strong>3 of 5</strong></div>
        <div><span>LAST PRESSURE MATCH</span><strong>Within 365 days</strong></div>
      </div>
      <p className="cricket-footnote">These are the dashboard settings captured in the final report. The repository's stricter code defaults are 100 deliveries and 10 matches; the dashboard overrides them for this submission. The 365-day value is an activity cutoff, not the recency half-life.</p>
    </section>

    <section className="cricket-report-section cricket-results-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">05 / BATTER SHORTLIST</span><h2>David Miller leads the <em>ensemble.</em></h2></div><p>Tilak Varma has the strongest displayed pressure uplift (+31.90 runs per 100 pressure balls); Naman Dhir has the highest displayed model score (99.43).</p></div>
      <div className="cricket-highlight-row">
        <div><span>TOP RRF RANK</span><strong>David Miller</strong><small>0.0158 · 5 methods · 11 matches</small></div>
        <div><span>HIGHEST UPLIFT</span><strong>Tilak Varma</strong><small>+31.90 runs / 100 pressure balls</small></div>
        <div><span>HIGHEST MODEL SCORE</span><strong>Naman Dhir</strong><small>99.43 · 56 balls · 5 matches</small></div>
      </div>
      <div className="cricket-chart-panel">
        <div className="cricket-chart-heading"><span>BATTER PRESSURE UPLIFT</span><small>RUNS PER 100 PRESSURE BALLS</small></div>
        <div className="cricket-bars">{cricketBatters.map((player) => <div className="cricket-bar-row" key={player.name}><span>{player.name}</span><div className="cricket-bar-track"><i style={{ width: (player.uplift / 31.9 * 100) + "%" }} /></div><strong>+{player.uplift.toFixed(2)}</strong></div>)}</div>
      </div>
      <div className="cricket-table-wrap">
        <table className="cricket-table cricket-ranking-table">
          <thead><tr><th>#</th><th>PLAYER</th><th>RRF</th><th>MODEL</th><th>UPLIFT / 100</th><th>MIN BALLS</th><th>MIN MATCHES</th><th>METHODS</th></tr></thead>
          <tbody>{cricketBatters.map((player) => <tr key={player.name}><td>{player.rank}</td><td>{player.name}</td><td>{player.rrf}</td><td>{player.model.toFixed(2)}</td><td className="is-positive">+{player.uplift.toFixed(2)}</td><td>{player.balls}</td><td>{player.matches}</td><td>{player.methods}/5</td></tr>)}</tbody>
        </table>
      </div>
      <p className="cricket-footnote">Miller combines +20.94 uplift with 56 minimum pressure balls across 11 matches and support from all five methods. Holder and Powell have comparatively larger samples (101/16 and 123/16). Ashutosh Sharma ranks fourth despite a lower uplift, showing that the ensemble is not sorted by uplift alone.</p>
    </section>

    <section className="cricket-report-section cricket-results-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">06 / BOWLER SHORTLIST</span><h2>Bosch & Ellis lead the <em>ensemble.</em></h2></div><p>The important qualification: all ten listed bowlers have negative wicket-rate uplift against their own lower-pressure baseline.</p></div>
      <div className="cricket-highlight-row">
        <div><span>TOP RRF RANK</span><strong>Corbin Bosch</strong><small>0.0159 · 5 methods · 7 matches</small></div>
        <div><span>JOINT RRF SCORE</span><strong>Nathan Ellis</strong><small>0.0159 · 5 methods · 9 matches</small></div>
        <div><span>LEAST-NEGATIVE UPLIFT</span><strong>Josh Hazlewood</strong><small>−2.50 wickets / 100 legal balls · rank 8</small></div>
      </div>
      <div className="cricket-table-wrap">
        <table className="cricket-table cricket-ranking-table">
          <thead><tr><th>#</th><th>PLAYER</th><th>RRF</th><th>MODEL</th><th>WKT UPLIFT / 100</th><th>MIN BALLS</th><th>MIN MATCHES</th><th>METHODS</th></tr></thead>
          <tbody>{cricketBowlers.map((player) => <tr key={player.name}><td>{player.rank}</td><td>{player.name}</td><td>{player.rrf}</td><td>{player.model.toFixed(2)}</td><td className="is-negative">{player.uplift.toFixed(2)}</td><td>{player.balls}</td><td>{player.matches}</td><td>{player.methods}/5</td></tr>)}</tbody>
        </table>
      </div>
      <div className="cricket-callout"><Trophy size={18} /><p>These are the ten highest-ranked eligible bowlers under the composite framework—not ten bowlers who improve under pressure. Negative uplift means credited wicket rate per 100 legal pressure balls is lower than the lower-pressure baseline. The composite also includes pressure wicket rate, economy, dot-ball rate, and model consensus.</p></div>
    </section>

    <section className="cricket-report-section">
      <div className="cricket-section-heading"><div><span className="eyebrow">07 / LIMITATIONS & AUDIT</span><h2>Keep the result <em>in perspective.</em></h2></div><p>The model is designed to support selection review, not to claim certainty about a player's psychological response or predict future performance.</p></div>
      <div className="cricket-limitations">
        <article><span>01 / PRESSURE IS ENGINEERED</span><p>PI is an operational definition built from match-state features, not an externally labelled ground truth. Alternative weights test sensitivity but do not remove the modelling choice.</p></article>
        <article><span>02 / SYNTHETIC XGBOOST</span><p>The classifier learns a generated teacher rule. Its 5% ensemble weight limits its influence; synthetic holdout performance is not independent real-match validation.</p></article>
        <article><span>03 / OBSERVATIONAL UPLIFT</span><p>Pressure and baseline deliveries differ in phase, opposition, venue, role, and match state. The difference is descriptive, not a causal estimate.</p></article>
        <article><span>04 / SAMPLE THRESHOLDS</span><p>40 balls and 5 matches expand coverage but increase uncertainty near the cutoff. Sample sizes should be reviewed beside every score.</p></article>
        <article><span>05 / SCORE RECONSTRUCTION</span><p>The repository flags unresolved bye / leg-bye values and an extras field that may be categorical. Reconstructed innings totals and chase states remain provisional until checked against official scorecards.</p></article>
        <article><span>06 / ELIGIBILITY & DISPLAY</span><p>Pakistan- and Bangladesh-mapped national-team player IDs are excluded from final candidates as a competition rule. The report also flags the dashboard's “None” shrinkage display and requests a full candidate-row audit for Brian Bennett.</p></article>
      </div>
      <div className="cricket-final-note"><Target size={19} /><p>A high rank means a player scores well under this pressure definition and eligibility configuration. It is not a probability of success, proof of causation, or a universal ranking of player quality.</p></div>
    </section>
    <footer className="cricket-analysis-footer"><span>SUPERR SELECTOR / SEASON 02</span><a href="https://github.com/shayan-wasLazy/Cricket-Aanalysis" target="_blank" rel="noreferrer">EXPLORE THE CODE <ExternalLink size={13} /></a><a href="#/builds">BACK TO BUILDS ↑</a></footer>
  </section>;
}



type StudyStat = { value: string; label: string };
function ProjectStudyFrame({ number, title, secondLine, kicker, description, thesis, repo, stats, children }: {
  number: string; title: string; secondLine: string; kicker: string; description: string; thesis: string; repo: string; stats: StudyStat[]; children: React.ReactNode;
}) {
  return <section id="content" className="project-study section-shell">
    <SectionLabel left={number + " / PROJECT ANALYSIS"} right={kicker} />
    <header className="study-hero">
      <div className="study-kicker"><span className="study-kicker-mark">✳</span>{kicker}</div>
      <div className="study-hero-grid">
        <div className="study-hero-copy">
          <h1>{title}<br /><em>{secondLine}</em></h1>
          <p>{description}</p>
        </div>
        <aside className="study-thesis">
          <span>THE IDEA</span>
          <p>{thesis}</p>
          <a href="#/builds">← BACK TO BUILDS</a>
        </aside>
      </div>
      <div className="study-actions">
        <a className="study-action-primary" href={repo} target="_blank" rel="noreferrer"><Github size={17} /> VIEW SOURCE REPOSITORY <ExternalLink size={14} /></a>
        <a className="study-action-secondary" href="#/builds">BACK TO BUILDS <ArrowUpRight size={14} /></a>
      </div>
    </header>
    <div className="study-stat-grid">
      {stats.map((item) => <div className="study-stat" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
    </div>
    {children}
    <footer className="study-footer">
      <span>{kicker}</span>
      <a href={repo} target="_blank" rel="noreferrer">EXPLORE THE CODE <ExternalLink size={13} /></a>
      <a href="#/builds">BACK TO BUILDS ↑</a>
    </footer>
  </section>;
}

function StudySection({ index, label, title, description, children }: {
  index: string; label: string; title: string; description: string; children: React.ReactNode;
}) {
  return <section className="study-section">
    <div className="study-section-heading">
      <div><span className="eyebrow">{index} / {label}</span><h2>{title}</h2></div>
      <p>{description}</p>
    </div>
    {children}
  </section>;
}

function StudyFlow({ steps }: { steps: { number: string; title: string; detail: string }[] }) {
  return <div className="study-flow">
    {steps.map((step, i) => <div className="study-flow-item" key={step.number}>
      <span>{step.number}</span><strong>{step.title}</strong><small>{step.detail}</small>
      {i < steps.length - 1 && <b className="study-flow-arrow" aria-hidden="true">→</b>}
    </div>)}
  </div>;
}

function StudyImage({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return <figure className={"study-figure " + className}>
    <a href={src} target="_blank" rel="noreferrer" aria-label={"Open image: " + caption}>
      <img src={src} alt={alt} loading="lazy" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>;
}

function ReedCaseStudy() {
  const repo = "https://github.com/shayan-wasLazy/Reed";
  return <ProjectStudyFrame number="02" title="Your notes." secondLine="Your knowledge." kicker="REED AI / LOCAL STUDY ASSISTANT"
    description="Reed is a study workspace that lets students upload course material and ask questions against their own notes. The retrieval path is designed to keep answers tied to the uploaded context instead of letting a general-purpose model fill gaps."
    thesis="Make personal study material searchable, then make the answer stay accountable to the material that was actually retrieved."
    repo={repo}
    stats={[{value:"PDF",label:"NOTE INGESTION"},{value:"HYBRID",label:"DENSE + SPARSE RETRIEVAL"},{value:"TOP 5",label:"CONTEXT CHUNKS"},{value:"LOCAL",label:"OLLAMA LLM"}]}>
    <StudySection index="01" label="PRODUCT WORKFLOW" title="A study space, not just a chat box." description="The interface is organised around workspaces and uploaded course notes. This visual is an illustrative layout based on the documented product flow, not a captured application screenshot.">
      <div className="reed-preview">
        <div className="reed-preview-top"><span className="reed-brand">reed<span>.</span></span><span className="reed-local-pill">LOCAL WORKSPACE</span><span className="reed-preview-avatar">SM</span></div>
        <div className="reed-preview-body">
          <aside className="reed-preview-sidebar">
            <span className="reed-sidebar-label">YOUR WORKSPACE</span>
            <div className="reed-side-active">⌂ <b>Overview</b></div>
            <div>▤ <span>DBMS</span></div><div>▤ <span>Machine Learning</span></div><div>▤ <span>Deep Learning</span></div>
            <span className="reed-sidebar-label reed-sidebar-spaced">NOTE TYPES</span>
            <div>◷ <span>Lecture notes</span></div><div>✳ <span>Revision notes</span></div><div>⌁ <span>Previous papers</span></div>
          </aside>
          <div className="reed-preview-main">
            <div className="reed-preview-welcome"><span>STUDY / DBMS · UNIT 02</span><strong>Pick up where<br />you left off.</strong><p>Your material is indexed and ready to search.</p></div>
            <div className="reed-preview-question"><span>YOU ASKED</span><p>What is the difference between 2NF and 3NF?</p></div>
            <div className="reed-preview-answer"><span>REED RESPONSE <i>GROUNDED IN YOUR NOTES</i></span><p>2NF removes partial dependencies on a composite key. 3NF goes further by removing transitive dependencies between non-key attributes.</p><small>Retrieved from: DBMS · Unit 02 · Normalisation.pdf</small></div>
            <div className="reed-preview-input">Ask something from your notes… <b>↑</b></div>
          </div>
        </div>
        <div className="reed-preview-foot"><span>ILLUSTRATIVE PRODUCT VISUAL</span><span>YOUR NOTES STAY YOUR SOURCE OF TRUTH</span></div>
      </div>
    </StudySection>
    <StudySection index="02" label="RETRIEVAL PIPELINE" title="From a PDF to a grounded answer." description="The upload route stores the file with course, unit and note-type metadata. Docling parses the document; the HybridChunker preserves heading context in chunks capped at 300 tokens.">
      <StudyFlow steps={[
        {number:"01",title:"Upload",detail:"PDF + course / unit metadata"},
        {number:"02",title:"Parse",detail:"Docling document conversion"},
        {number:"03",title:"Chunk",detail:"Heading-aware · max 300 tokens"},
        {number:"04",title:"Retrieve",detail:"Qdrant dense + BM25"},
        {number:"05",title:"Answer",detail:"Ollama using retrieved context"},
      ]} />
      <div className="study-info-grid">
        <article><span>DENSE SEARCH</span><h3>all-MiniLM-L6-v2</h3><p>Semantic vectors represent the note chunks so questions can match by meaning, not only exact wording.</p></article>
        <article><span>SPARSE SEARCH</span><h3>Qdrant / BM25</h3><p>Lexical relevance complements dense search and helps retain important course terminology and exact phrases.</p></article>
        <article><span>CONTEXT WINDOW</span><h3>Top 5 chunks</h3><p>The query path retrieves five documents, joins them into the prompt context, and passes that context to the local model.</p></article>
      </div>
    </StudySection>
    <StudySection index="03" label="GROUNDING & SAFETY" title="The model is told what it can use." description="The retrieval prompt explicitly constrains the assistant to the returned context and gives it a fixed fallback when the answer is not present.">
      <div className="study-quote-card">
        <span>THE CORE INSTRUCTION</span>
        <blockquote>“Answer ONLY using the provided context.”</blockquote>
        <p>When the answer is missing, the implemented fallback is: “I could not find that in the uploaded notes.”</p>
      </div>
      <div className="study-info-grid two">
        <article><span>BACKEND</span><h3>FastAPI</h3><p>Exposes upload, query, workspace and file endpoints. The API separates ingestion and question answering from the frontend.</p></article>
        <article><span>LOCAL INFERENCE</span><h3>Ollama</h3><p>Runs the language model locally. The repository README documents Qwen3 as its default model family.</p></article>
      </div>
    </StudySection>
    <StudySection index="04" label="IMPLEMENTATION NOTES" title="What is built—and what remains." description="The page reflects the current repository rather than presenting roadmap items as finished functionality.">
      <div className="study-limit-grid">
        <article><span>IN THE REPOSITORY</span><p>PDF upload with course, unit and note-type metadata; Docling conversion; hybrid retrieval; a context-constrained answer prompt; and workspace/file endpoints.</p></article>
        <article><span>DOCUMENTED NEXT STEPS</span><p>Source citations, streaming answers, multi-PDF upload UX, configurable model selection and a fuller Docker Compose setup are listed as roadmap items.</p></article>
      </div>
    </StudySection>
  </ProjectStudyFrame>;
}

function CogCaseStudy() {
  const repo = "https://github.com/shayan-wasLazy/Color-Grading-AI-COG-";
  const base = "https://raw.githubusercontent.com/shayan-wasLazy/Color-Grading-AI-COG-/main/evaluation/";
  return <ProjectStudyFrame number="03" title="Color, learned." secondLine="Style, transferred." kicker="CINEMATIC COLOR GRADING / COMPUTER VISION"
    description="A reference-guided image grading experiment: encode a source frame and a visual reference, infer a colour transformation as a 3D lookup table, and apply that table to the source."
    thesis="Instead of copying pixels from the reference, learn a compact colour transform conditioned on the difference between source and reference features."
    repo={repo}
    stats={[{value:"ResNet50",label:"VISUAL ENCODER"},{value:"2048",label:"FEATURE DIMENSION"},{value:"16³",label:"3D LUT GRID"},{value:"4",label:"EVALUATION METRICS"}]}>
    <StudySection index="01" label="VISUAL EVALUATION" title="Source, reference, target, prediction." description="The repository’s evaluation script saves four-panel comparisons for validation samples. Open any frame to inspect the full-size montage.">
      <div className="study-image-grid cog-image-grid">
        <StudyImage src={base + "sample_00.png"} alt="COG validation sample 00 showing source, reference, target and predicted grade" caption="VALIDATION / SAMPLE 00" />
        <StudyImage src={base + "sample_01.png"} alt="COG validation sample 01 showing source, reference, target and predicted grade" caption="VALIDATION / SAMPLE 01" />
        <StudyImage src={base + "sample_02.png"} alt="COG validation sample 02 showing source, reference, target and predicted grade" caption="VALIDATION / SAMPLE 02" />
      </div>
    </StudySection>
    <StudySection index="02" label="MODEL ARCHITECTURE" title="Two frames become one colour map." description="The checked-in baseline uses the same ResNet50 encoder for both images. Their 2048-dimensional feature vectors are differenced, then a multilayer perceptron predicts a 16 × 16 × 16 × 3 LUT.">
      <StudyFlow steps={[
        {number:"01",title:"Source frame",detail:"256 × 256 RGB input"},
        {number:"02",title:"Reference frame",detail:"Same shared ResNet50 encoder"},
        {number:"03",title:"Feature difference",detail:"Reference features − source features"},
        {number:"04",title:"LUT generator",detail:"MLP: 2048 → 1024 → 2048 → LUT"},
        {number:"05",title:"Apply LUT",detail:"Differentiable trilinear interpolation"},
      ]} />
      <div className="study-info-grid">
        <article><span>ENCODER</span><h3>Pretrained ResNet50</h3><p>The classification head is removed. The backbone produces a 2048-dimensional visual representation and is frozen in the baseline configuration.</p></article>
        <article><span>TRANSFORM</span><h3>3D lookup table</h3><p>The MLP predicts RGB outputs over a 16³ colour grid. The LUT is applied to every pixel by interpolating between neighbouring grid points.</p></article>
        <article><span>TRAINING OBJECTIVE</span><h3>Image-space L1</h3><p>The training script applies the predicted LUT to the source and compares the resulting image with the target using L1 loss.</p></article>
      </div>
    </StudySection>
    <StudySection index="03" label="DATA & EXPERIMENTS" title="A pipeline built around frame pairs." description="The scripts validate clips, extract frames, create train/validation splits, prepare LUT assets and construct source/reference/target training pairs.">
      <div className="study-info-grid two">
        <article><span>PREPARATION</span><h3>Video → frames → pairs</h3><p>Separate scripts handle video validation, frame extraction, clip cleanup, split generation, LUT generation and training-pair construction.</p></article>
        <article><span>MODEL INPUTS</span><h3>Source + reference</h3><p>The dataset returns source, reference and target tensors alongside the LUT label used to group evaluation summaries.</p></article>
      </div>
    </StudySection>
    <StudySection index="04" label="CHECKED-IN VALIDATION" title="Compare the LUT groups with image metrics." description="The aggregate table groups validation predictions by their LUT label. The desaturated group has the lowest mean L1 and highest mean SSIM among the 12 groups in the checked-in metrics_by_lut.csv.">
      <div className="study-metric-grid">
        <div><span>DESATURATED GROUP / 117 SAMPLES</span><strong>0.0223</strong><small>MEAN L1 ↓</small></div>
        <div><span>DESATURATED GROUP</span><strong>31.25 dB</strong><small>MEAN PSNR ↑</small></div>
        <div><span>DESATURATED GROUP</span><strong>0.9772</strong><small>MEAN SSIM ↑</small></div>
      </div>
      <p className="study-footnote">These are per-LUT validation averages from the committed aggregate CSV, not a comparison between model architectures. The evaluation script also records per-sample L1, MSE, PSNR and SSIM.</p>
    </StudySection>
    <StudySection index="05" label="SCOPE" title="A research prototype, not a finished video editor." description="The repository documents an image-pair training and evaluation pipeline. A complete frame-by-frame video application would additionally need decoding, frame processing, reassembly, and audio/FPS/resolution preservation.">
      <div className="study-limit-grid">
        <article><span>IMPLEMENTED HERE</span><p>ResNet50-conditioned LUT prediction, differentiable LUT application, train/validation routines, sample visualisation and metric exports.</p></article>
        <article><span>EXTENSION DIRECTION</span><p>Wrap the image model in a video pipeline, process frames consistently, and reassemble the clip while preserving its original timing and audio.</p></article>
      </div>
    </StudySection>
  </ProjectStudyFrame>;
}

function AnimeCaseStudy() {
  const repo = "https://github.com/shayan-wasLazy/MAL-project";
  const base = "https://raw.githubusercontent.com/shayan-wasLazy/MAL-project/main/ER%20Diagrams/";
  return <ProjectStudyFrame number="04" title="Find your next" secondLine="favourite anime." kicker="ANIME DISCOVERY / MAL-INSPIRED PLATFORM"
    description="A MyAnimeList-inspired catalogue that combines relational anime and user data with semantic similarity search. Users can manage watch states while discovery uses the meaning of anime metadata—not only exact title matches."
    thesis="Keep structured catalogue and user state in PostgreSQL, then use vector similarity to find titles with related genres, tags and synopsis content."
    repo={repo}
    stats={[{value:"3",label:"CORE RELATIONAL TABLES"},{value:"384-D",label:"ANIME EMBEDDINGS"},{value:"TOP 6",label:"SIMILARITY RESULTS"},{value:"QDRANT",label:"VECTOR SEARCH"}]}>
    <StudySection index="01" label="SYSTEM OVERVIEW" title="Relational records plus semantic discovery." description="The repository includes an application stack diagram and an entity relationship diagram. These are original project assets, not recreated diagrams.">
      <div className="study-image-grid anime-image-grid">
        <StudyImage src={base + "stack%20flow%20diagram.png"} alt="Anime recommendation platform technology stack and flow diagram" caption="APPLICATION / STACK FLOW" className="wide" />
        <StudyImage src={base + "er_diagram%20(all%20enitites).png"} alt="Anime project entity relationship diagram" caption="DATABASE / ENTITY RELATIONSHIPS" className="wide" />
      </div>
    </StudySection>
    <StudySection index="02" label="DATA MODEL" title="Separate catalogue data from user activity." description="The SQLAlchemy models define users, anime catalogue entries and a user-anime association. That association stores each user's watch status, rating and episodes watched.">
      <div className="study-data-model">
        <article><span>01 / USERS</span><h3>users</h3><p>Username, email and account credential fields.</p></article>
        <div className="study-data-link">1 : N</div>
        <article><span>02 / JOIN TABLE</span><h3>user_anime</h3><p>User ID + anime ID, watch status, rating and episodes watched.</p></article>
        <div className="study-data-link">N : 1</div>
        <article><span>03 / CATALOGUE</span><h3>anime_dataset</h3><p>Title, score, popularity, dates, type, episodes, studios, genres, tags and synopsis.</p></article>
      </div>
    </StudySection>
    <StudySection index="03" label="RECOMMENDATION PIPELINE" title="Represent an anime by its metadata." description="The recommendation function combines the selected title, genres, tags, studios and synopsis into one text representation before embedding it.">
      <StudyFlow steps={[
        {number:"01",title:"Select anime",detail:"Load title and catalogue metadata"},
        {number:"02",title:"Build text",detail:"Genres · tags · studio · synopsis"},
        {number:"03",title:"Embed",detail:"all-MiniLM-L6-v2 · 384 dimensions"},
        {number:"04",title:"Search",detail:"Qdrant cosine similarity"},
        {number:"05",title:"Return",detail:"Up to six neighbours, excluding itself"},
      ]} />
      <div className="study-info-grid two">
        <article><span>RELATIONAL STORE</span><h3>PostgreSQL + SQLAlchemy</h3><p>Stores the catalogue, user accounts and watchlist state. The API exposes anime retrieval, registration, login, user anime and recommendation routes.</p></article>
        <article><span>VECTOR STORE</span><h3>Qdrant</h3><p>The embedding script creates an anime_embeddings collection with 384-dimensional vectors and cosine distance. Search returns the nearest matching anime records.</p></article>
      </div>
      <p className="study-footnote">The README describes an Ollama-assisted recommendation explanation stage. In the committed recc.py function, the visible retrieval step returns nearest-neighbour anime IDs from Qdrant.</p>
    </StudySection>
    <StudySection index="04" label="APPLICATION FEATURES" title="Discovery is connected to tracking." description="The API joins user activity back to anime titles and poster URLs, so watchlist information can be shown with the catalogue record.">
      <div className="study-info-grid">
        <article><span>CATALOGUE</span><h3>Anime metadata</h3><p>Retrieve anime records and detail pages using the catalogue's stored attributes.</p></article>
        <article><span>PERSONAL STATE</span><h3>Watchlist</h3><p>Save watching status, rating and episodes watched against a user and anime pair.</p></article>
        <article><span>DISCOVERY</span><h3>Related titles</h3><p>Use semantic metadata vectors to retrieve similar titles based on the selected anime's content.</p></article>
      </div>
    </StudySection>
    <StudySection index="05" label="STACK & DEPLOYMENT" title="A full-stack learning project." description="The README documents container-based deployment and a Linux VPS target.">
      <div className="study-stack-line"><span>FASTAPI</span><span>POSTGRESQL</span><span>SQLALCHEMY</span><span>QDRANT</span><span>SENTENCE TRANSFORMERS</span><span>OLLAMA</span><span>DOCKER</span><span>HTML / CSS / JS</span></div>
    </StudySection>
  </ProjectStudyFrame>;
}

function ChessCaseStudy() {
  const repo = "https://github.com/shayan-wasLazy/Chess-Bot";
  const board = "https://raw.githubusercontent.com/shayan-wasLazy/Chess-Bot/main/board.svg";
  return <ProjectStudyFrame number="05" title="Neural intuition." secondLine="Search to verify." kicker="CHESS BOT / NEUROSYMBOLIC GAME AI"
    description="A chess-playing agent that uses a neural network to score candidate moves, then applies minimax search to compare the strongest legal options. The playable interface is built with Streamlit and python-chess."
    thesis="Let the network narrow the move space, then use explicit game-tree search and a handcrafted board evaluation to choose the final move."
    repo={repo}
    stats={[{value:"8 × 8",label:"BOARD GRID"},{value:"12",label:"PIECE CHANNELS"},{value:"TOP 10",label:"CANDIDATES SEARCHED"},{value:"DEPTH 3",label:"MINIMAX SEARCH"}]}>
    <StudySection index="01" label="THE BOARD" title="An interactive chess interface." description="The Streamlit app displays the current board, accepts a move in UCI notation, validates it against legal moves, and then asks the agent to respond.">
      <div className="chess-visual-grid">
        <StudyImage src={board} alt="Chess board SVG asset from the Chess Bot repository" caption="BOARD ASSET / REPOSITORY SVG" />
        <div className="study-info-panel"><span>STREAMLIT INTERACTION</span><h3>Human move → AI reply</h3><p>The interface stores the current board in Streamlit session state, checks whether the submitted move is legal, applies the move, calls the prediction function, and displays the AI response.</p><div className="study-tag-row"><span>python-chess</span><span>Streamlit</span><span>TensorFlow</span></div></div>
      </div>
    </StudySection>
    <StudySection index="02" label="BOARD REPRESENTATION" title="Turn a position into model input." description="Each square is represented across 12 channels: six piece types for each colour. The board is reshaped into a batch tensor before the network scores the move vocabulary.">
      <div className="study-code-visual">
        <div className="study-code-head"><span>BOARD TENSOR</span><span>ONE-HOT REPRESENTATION</span></div>
        <div className="study-code-grid">
          {Array.from({length:64},(_,i)=><span key={i} className={((Math.floor(i/8)+i%8)%2===0)?"light":"dark"} />)}
        </div>
        <div className="study-code-caption"><strong>8 × 8 × 12</strong><span>64 squares · 12 piece channels</span></div>
      </div>
    </StudySection>
    <StudySection index="03" label="HYBRID MOVE SELECTION" title="The network proposes. Minimax evaluates." description="The prediction function maps legal UCI moves into the model's move dictionary, sorts them by neural score and searches only the top ten candidates.">
      <StudyFlow steps={[
        {number:"01",title:"Encode board",detail:"8 × 8 × 12 tensor"},
        {number:"02",title:"Neural scores",detail:"TensorFlow / Keras model"},
        {number:"03",title:"Legal filter",detail:"Map UCI move IDs"},
        {number:"04",title:"Top 10",detail:"Keep highest-scoring moves"},
        {number:"05",title:"Minimax",detail:"Depth 3 · choose best evaluation"},
      ]} />
      <div className="study-info-grid two">
        <article><span>SEARCH</span><h3>Minimax</h3><p>Recursively explores alternating maximizing and minimizing turns until depth zero or a terminal game state is reached.</p></article>
        <article><span>POSITION EVALUATION</span><h3>Material + mobility</h3><p>Scores material using piece values (pawn 1, knight 3, bishop 3.2, rook 5, queen 9) and adds 0.1 times the number of legal moves as a mobility term.</p></article>
      </div>
    </StudySection>
    <StudySection index="04" label="ENGINE DETAILS" title="A compact neural-symbolic loop." description="The saved Keras model is loaded once and reused in the Streamlit session. The inference code uses the same move-to-integer dictionary that was created during training.">
      <div className="study-limit-grid">
        <article><span>MODEL COMPONENT</span><p>A TensorFlow / Keras model scores the encoded board against a fixed move vocabulary. The repository includes a saved model checkpoint and its move dictionary.</p></article>
        <article><span>SEARCH COMPONENT</span><p>python-chess supplies legal moves and board transitions; a depth-three minimax search evaluates the ten highest neural-scored candidates.</p></article>
      </div>
      <p className="study-footnote">The repository does not publish a benchmark rating, win-rate evaluation or held-out move accuracy, so none is claimed here.</p>
    </StudySection>
  </ProjectStudyFrame>;
}

function Footer() { const reduceMotion = useReducedMotion(); return <footer className="site-footer section-shell"><span>© 2026 SHAYAN MANDREKAR</span><span>BUILT WITH CURIOSITY, NOT A TEMPLATE.</span><a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); }}>BACK TO HOME ↑</a></footer>; }

export default function App() {
  const initialPath = window.location.hash || "#/";
  const pageFromPath = (value: string): PageId => value.startsWith("#/design") ? "design" : value.startsWith("#/builds") ? "builds" : value.startsWith("#/cricket-analysis") ? "analysis" : value.startsWith("#/reed-ai") ? "reed" : value.startsWith("#/cog-analysis") ? "cog" : value.startsWith("#/anime-discovery") ? "anime" : value.startsWith("#/chess-bot") ? "chess" : "home";
  const [path, setPath] = useState(initialPath);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [loadingPage, setLoadingPage] = useState<PageId | null>(pageFromPath(initialPath));
  useEffect(() => {
    if (!loadingPage) return;
    const timeout = window.setTimeout(() => setLoadingPage(null), loadingPage === "home" ? 3000 : 1350);
    return () => window.clearTimeout(timeout);
  }, [loadingPage]);
  useEffect(() => {
    const update = () => {
      const nextPath = window.location.hash || "#/";
      setPath(nextPath);
      setLoadingPage(pageFromPath(nextPath));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  const active = pageFromPath(path);
  return <main id="top" data-theme={theme}><LoFiCursor />{loadingPage && <LoadingScreen key={loadingPage} page={loadingPage} />}<Navigation active={active} theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />{active === "design" ? <DesignPage /> : active === "builds" ? <BuildsPage /> : active === "analysis" ? <CricketAnalysisPage /> : active === "reed" ? <ReedCaseStudy /> : active === "cog" ? <CogCaseStudy /> : active === "anime" ? <AnimeCaseStudy /> : active === "chess" ? <ChessCaseStudy /> : <HomePage />}<Footer /></main>;
}
