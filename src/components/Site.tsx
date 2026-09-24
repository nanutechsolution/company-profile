"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Menu, X, ChevronRight, ShieldCheck, Database, Workflow, Users, Cloud, GraduationCap, Building2, Cpu, LockKeyhole } from "lucide-react";
import type { Dictionary } from "@/locales/types";
import type { Locale } from "@/locales";
import { ContactForm } from "./ContactForm";

const icons = [Workflow, Cloud, Database, Cpu, LockKeyhole];
const industryIcons = [Users, GraduationCap, Building2, Database];

export function Site({ locale, dictionary: d }: { locale: Locale; dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [activeCapability, setActiveCapability] = useState(0);
  const [systemState, setSystemState] = useState("PROCESS");
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); menuButtonRef.current?.focus(); }
    };
    const sections = ["main-content", "solutions", "industries", "experience", "security", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const rows = document.querySelectorAll<HTMLElement>(".capability-row");
    const observer = reduceMotion.matches ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains("capability-row")) setActiveCapability(Number((entry.target as HTMLElement).dataset.index ?? 0));
        if (entry.target.id === "main-content") setSystemState("PROCESS");
        if (entry.target.id === "solutions") setSystemState("SYSTEM");
        if (entry.target.id === "industries" || entry.target.id === "experience") setSystemState("DATA");
        if (entry.target.id === "security" || entry.target.id === "contact") setSystemState("DECISION");
      });
    }, { rootMargin: "-35% 0px -50%", threshold: 0 });
    sections.forEach((section) => observer?.observe(section));
    rows.forEach((row) => observer?.observe(row));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    onScroll();
    return () => { observer?.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKeyDown); };
  }, [open]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const cleanups: (() => void)[] = [];
    if (window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      targets.forEach((target) => {
        const move = (event: PointerEvent) => { const rect = target.getBoundingClientRect(); target.style.setProperty("--mag-x", `${(event.clientX - (rect.left + rect.width / 2)) * 0.12}px`); target.style.setProperty("--mag-y", `${(event.clientY - (rect.top + rect.height / 2)) * 0.12}px`); };
        const reset = () => { target.style.removeProperty("--mag-x"); target.style.removeProperty("--mag-y"); };
        target.addEventListener("pointermove", move); target.addEventListener("pointerleave", reset); cleanups.push(() => { target.removeEventListener("pointermove", move); target.removeEventListener("pointerleave", reset); });
      });
    }
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  const other = locale === "id" ? "en" : "id";
  const nav = [["solutions", d.nav.solutions], ["industries", d.nav.industries], ["experience", d.nav.work], ["process", d.sections.process], ["about", d.nav.about]];
  return <main>
    <a className="skip-link" href="#main-content">{d.ui.skip}</a>
    <header className={scrolled ? "nav is-scrolled" : "nav"}>
      <Link href={`/${locale}`} className="brand" aria-label="PT Nanu Tech Solution"><span className="brand-mark">N</span><span>PT Nanu<br /><b>Tech Solution</b></span></Link>
      <nav id="primary-navigation" aria-label={locale === "id" ? "Navigasi utama" : "Primary navigation"} className={open ? "nav-links open" : "nav-links"}>
        {nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        <Link href={`/${other}`} className="lang">{locale === "id" ? "EN" : "ID"}</Link>
        <a href="#contact" className="button small">{d.nav.cta}<ArrowRight size={15} aria-hidden="true" /></a>
      </nav>
      <button ref={menuButtonRef} className="menu-button" aria-label={open ? d.ui.menuClose : d.ui.menuOpen} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </header>

    <section className="hero" id="main-content" aria-labelledby="hero-heading">
      <div className="hero-copy"><p className="eyebrow">{d.hero.eyebrow}</p><h1 id="hero-heading">{d.hero.title}</h1><p className="lead">{d.hero.text}</p><div className="hero-actions"><a className="button magnetic-cta" href="#contact" data-magnetic>{d.hero.primary}<ArrowRight size={17} aria-hidden="true" /></a><a className="text-link" href="#solutions">{d.hero.secondary}<ChevronRight size={17} aria-hidden="true" /></a></div></div>
      <div className="flow-visual" data-system-state={systemState} aria-labelledby="system-map-title"><div className="visual-heading"><span id="system-map-title">{d.ui.systemMap}</span><span className="live-dot">● {d.ui.connected} / {systemState}</span></div><p className="visual-description">{d.ui.systemMapDescription}</p><div className="flow-grid">{d.hero.flow.map((item, i) => <div className="flow-node" key={item}><span className="node-index">0{i + 1}</span><span>{item}</span>{i < d.hero.flow.length - 1 && <ArrowRight className="flow-arrow" size={16} aria-hidden="true" />}</div>)}</div><div className="visual-panel"><div className="panel-top"><span>OPERATING PICTURE / 01</span><span>PEOPLE → IMPACT</span></div><div className="bars" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="panel-lines" aria-hidden="true"><span /><span /><span /></div></div></div>
    </section>

    <section className="statement-band" aria-label={d.sections.about}><p className="eyebrow gold">00 / {locale === "id" ? "TITIK BERANGKAT" : "STARTING POINT"}</p><p className="statement">{locale === "id" ? "Teknologi yang baik tidak dimulai dari fitur. Ia dimulai dari cara pekerjaan benar-benar dilakukan." : "Good technology does not start with features. It starts with how work actually gets done."}</p></section>

    <section className="section" id="solutions"><SectionHead eyebrow="01" title={d.sections.solutions} text={locale === "id" ? "Dari perangkat lunak hingga infrastruktur, kami menyusun sistem di sekitar masalah operasional yang nyata." : "From software to infrastructure, we shape systems around real operational problems."} /><div className="capability-layout"><div className="capability-list">{d.solutions.map((item, i) => { const Icon = icons[i] ?? Cpu; return <article className={`capability-row ${activeCapability === i ? "is-active" : ""}`} data-index={i} key={item.title} onMouseEnter={() => setActiveCapability(i)}><span className="row-number">0{i + 1}</span><Icon size={22} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowRight size={18} aria-hidden="true" /></article>; })}</div><div className="capability-signal" aria-hidden="true"><span className="signal-index">0{activeCapability + 1}</span><span className="signal-orbit orbit-one" /><span className="signal-orbit orbit-two" /><span className="signal-core" /><span className="signal-label">{d.solutions[activeCapability]?.title}</span></div></div></section>

    <section className="section stack-section" aria-labelledby="stack-title"><div className="stack-intro"><p className="eyebrow">01A / {d.ui.capabilityIndex}</p><h2 id="stack-title">{d.ui.stackTitle}</h2><p>{d.ui.stackDescription}</p></div><div className="stack-ecosystem"><div className="ecosystem-path" aria-hidden="true"><span>APPLICATION</span><i>↓</i><span>API / DATA</span><i>↓</i><span>INFRASTRUCTURE</span></div><div className="stack-grid">{d.stack.map(group => <div className="stack-group" key={group.label}><span>{group.label}</span><p>{group.items.join(" · ")}</p></div>)}</div></div></section>

    <section className="section muted" id="industries"><SectionHead eyebrow="02" title={d.sections.industries} /><div className="industry-list">{d.industries.map((item, i) => { const Icon = industryIcons[i] ?? Building2; return <article className="industry" key={item.title}><span className="row-number">0{i + 1}</span><Icon size={24} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowRight size={18} aria-hidden="true" /></article>; })}</div></section>

    <section className="section dark-section" id="cooperative"><div className="split-head"><div><p className="eyebrow gold">03 / {locale === "id" ? "VERTIKAL UTAMA" : "CORE VERTICAL"}</p><h2>{d.sections.cooperative}</h2></div><p>{locale === "id" ? "Teknologi yang dibangun berdasarkan cara koperasi Anda bekerja." : "Technology built around the way your cooperative actually works."}</p></div><div className="dark-cards">{d.cooperative.map((item, i) => <article key={item.title}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

    <section className="section education-section" id="education"><SectionHead eyebrow="04" title={d.sections.education} /><div className="tag-list">{d.education.map((item, i) => <span key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}</span>)}</div></section>

    <section className="section muted" id="work"><SectionHead eyebrow="05" title={d.sections.work} text={locale === "id" ? "Contoh pengalaman profesional dan karya terpilih. Detail proyek ditampilkan secara netral dan dapat dikonfirmasi lebih lanjut." : "Examples of professional experience and selected work. Project details are presented neutrally and can be confirmed further."} /><div className="work-grid">{d.work.map((item, i) => <article className="work-card" key={item.title}><div className="work-meta"><span>0{i + 1}</span><span>{d.ui.selectedExperience}</span></div><h3>{item.title}</h3><p>{item.text}</p><ArrowRight size={19} aria-hidden="true" /></article>)}</div></section>

    <section className="experience-stage section" id="experience"><div className="experience-stage-copy"><p className="eyebrow">06 / {d.ui.founderExperience}</p><h2>{locale === "id" ? "Dari membangun perangkat lunak hingga merancang sistem." : "From building software to designing systems."}</h2><p>{d.experience.disclaimer}</p></div><div className="experience-timeline">{d.experience.items.map((item, i) => <article key={item.title}><span className="step">{String(i + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

    <section className="section process-section" id="process"><SectionHead eyebrow="07" title={d.sections.process} /><div className="process-grid">{d.process.map((item, i) => <article key={item.title}><span className="step">{String(i + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

    <section className="security-band" id="security" aria-labelledby="security-heading"><div><p className="eyebrow gold">08 / {d.ui.securityArchitecture}</p><h2 id="security-heading">{d.sections.security}</h2><p>{d.ui.securityArchitectureDescription}</p><p className="security-note">{locale === "id" ? "Auditabilitas by Design" : "Auditability by Design"}</p></div><div className="security-architecture"><div className="security-flow">{d.securityFlow.map((item, i) => <div className="security-node" key={item}><span>{String(i + 1).padStart(2, "0")}</span>{item}{i < d.securityFlow.length - 1 && <ArrowDown size={15} aria-hidden="true" />}</div>)}</div><div className="security-list">{d.security.map(item => <span key={item}><ShieldCheck size={17} aria-hidden="true" />{item}</span>)}</div></div></section>

    <section className="section about" id="about"><div><p className="eyebrow">09 / {d.nav.about.toUpperCase()}</p><h2>{d.sections.about}</h2></div><div><p className="about-copy">{d.about}</p><div className="formula">{(locale === "id" ? ["Masalah", "Proses", "Data", "Pengguna", "Teknologi"] : ["Problem", "Process", "Data", "Users", "Technology"]).map((item, i) => <span key={item}>{i > 0 && <b>→</b>}{item}</span>)}</div></div></section>

    <section className="section principles" id="principles"><SectionHead eyebrow="10" title={d.sections.principles} /><div className="principle-grid">{d.principles.map((item, i) => <div key={item.title}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
    <section className="final-scene cta-section"><p className="eyebrow gold">11 / {locale === "id" ? "LANGKAH BERIKUTNYA" : "NEXT STEP"}</p><h2>{locale === "id" ? "Sistem berikutnya dimulai dari pemahaman masalah yang lebih baik." : "Your next system starts with a better understanding of the problem."}</h2><p>{d.cta.text}</p><a className="button light magnetic-cta" href="#contact" data-magnetic>{locale === "id" ? "Mari membangunnya" : "Let's build it"}<ArrowRight size={17} aria-hidden="true" /></a></section>
    <section className="contact section" id="contact" aria-labelledby="contact-heading"><div><p className="eyebrow">12 / {d.nav.contact.toUpperCase()}</p><h2 id="contact-heading">{d.sections.contact}</h2><p>{d.contact.text}</p><div className="contact-details"><div><span>Email</span><strong>{d.contact.email}</strong></div><div><span>WhatsApp</span><strong>{d.contact.phone}</strong></div><div><span>{locale === "id" ? "Lokasi" : "Location"}</span><strong>{d.contact.location}</strong></div><small>{d.contact.note}</small></div></div><ContactForm locale={locale} /></section>
    <footer><div className="brand footer-brand"><span className="brand-mark">N</span><span>PT Nanu<br /><b>Tech Solution</b></span></div><div className="footer-groups"><div><span>{d.ui.footerSolutions}</span><p>{d.nav.solutions} · {d.nav.industries} · {d.nav.work}</p></div><div><span>{d.ui.footerConnect}</span><p>{d.nav.contact} · {d.contact.location}</p></div><div><span>{d.ui.footerSystem}</span><p>{d.ui.unavailable}</p></div></div><p>{d.footer}</p><span>© {new Date().getFullYear()} PT Nanu Tech Solution</span></footer>
  </main>;
}
function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) { return <div className="section-head"><p className="eyebrow">{eyebrow} /</p><h2>{title}</h2>{text && <p>{text}</p>}</div>; }
