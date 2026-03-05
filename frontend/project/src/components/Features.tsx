import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, TrendingUp, Target, Award, FileText,
  Zap, Clock, Users, BookOpen, Star,
} from 'lucide-react';

const features = [
  { icon: <CheckCircle size={22} />, title: 'All PYQs Covered',       desc: '10 years of previous year questions with step-by-step solutions and examiner-approved formats.',            tag: '10 Yrs Coverage',  color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  { icon: <TrendingUp  size={22} />, title: '9+ SGPA Focus',           desc: 'Every topic is handpicked based on university scoring patterns to maximize your grade points.',             tag: 'Score Booster',    color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  { icon: <Target      size={22} />, title: '25+ Marks Topics (Insem)',desc: 'High-weightage units broken into crisp, digestible sections — exactly what examiners want.',              tag: 'High Weightage',   color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
  { icon: <FileText    size={22} />, title: 'Exam-Oriented Notes',     desc: 'No fluff — every line is written for the exam. Quick revision sheets included for last-night prep.',      tag: 'Instant Download', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  { icon: <Zap         size={22} />, title: 'Last-Night Revision',     desc: 'Compact cheat sheets covering all key formulas and concepts — perfect for exam eve cramming.',            tag: 'Quick Prep',       color: '#e11d48', bg: '#fff1f2', border: '#fecdd3' },
  { icon: <Clock       size={22} />, title: 'Instant Access',          desc: 'Download & start studying within minutes of purchase. No delays, no waiting, no hassle.',                 tag: 'Download Now',     color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  { icon: <Users       size={22} />, title: 'Peer-Verified',           desc: 'Written by toppers and reviewed by 500+ students who already scored 9+ SGPA using these notes.',         tag: 'Community Tested', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe' },
];

const allCards = [...features, ...features, ...features];

const Features = () => {
  const scrollRef   = useRef(null);
  const rafRef      = useRef(null);
  const isDown      = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const userActive  = useRef(false);
  const resumeTimer = useRef(null);
  const SPEED = 0.5;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleW = el.scrollWidth / 3;
    el.scrollLeft = singleW;
    const tick = () => {
      if (!userActive.current) {
        el.scrollLeft += SPEED;
        if (el.scrollLeft >= singleW * 2) el.scrollLeft -= singleW;
        if (el.scrollLeft <= 0)           el.scrollLeft += singleW;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pauseAuto = () => {
    userActive.current = true;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { userActive.current = false; }, 1500);
  };
  const onMouseDown = (e) => { isDown.current = true; startX.current = e.pageX; scrollStart.current = scrollRef.current.scrollLeft; scrollRef.current.style.cursor = 'grabbing'; pauseAuto(); };
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
    const el = scrollRef.current; const singleW = el.scrollWidth / 3;
    if (el.scrollLeft >= singleW * 2) el.scrollLeft -= singleW;
    if (el.scrollLeft <= 0)           el.scrollLeft += singleW;
    pauseAuto();
  };
  const onMouseUp = () => { isDown.current = false; if (scrollRef.current) scrollRef.current.style.cursor = 'grab'; };
  const onTouchStart = (e) => { startX.current = e.touches[0].pageX; scrollStart.current = scrollRef.current.scrollLeft; pauseAuto(); };
  const onTouchMove  = (e) => {
    const dx = e.touches[0].pageX - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
    const el = scrollRef.current; const singleW = el.scrollWidth / 3;
    if (el.scrollLeft >= singleW * 2) el.scrollLeft -= singleW;
    if (el.scrollLeft <= 0)           el.scrollLeft += singleW;
    pauseAuto();
  };

  return (
    <>
      <style>{`
        .feat-section { background: #f8faff; padding: 80px 0; position: relative; overflow: hidden; }
        .feat-section::before { content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 600px; height: 300px; background: radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%); pointer-events: none; }
        .feat-header { text-align: center; padding: 0 24px; margin-bottom: 48px; }
        .feat-eyebrow { display: inline-block; background: #eff6ff; color: #2563eb; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; border: 1px solid #bfdbfe; margin-bottom: 16px; }
        .feat-title { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; color: #0f172a; margin-bottom: 14px; letter-spacing: -0.02em; line-height: 1.2; }
        .feat-title span { color: #2563eb; }
        .feat-subtitle { font-size: 1.05rem; color: #64748b; max-width: 520px; margin: 0 auto; line-height: 1.7; }
        .feat-hint { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.76rem; color: #94a3b8; margin-bottom: 16px; user-select: none; }
        .feat-scroll { overflow-x: scroll; overflow-y: hidden; cursor: grab; -webkit-overflow-scrolling: touch; scrollbar-width: none; -ms-overflow-style: none; position: relative; padding: 8px 0 14px; }
        .feat-scroll::-webkit-scrollbar { display: none; }
        .feat-fade-left  { position: absolute; left: 0; top: 0; bottom: 0; width: 40px; background: linear-gradient(90deg, #f8faff, transparent); z-index: 2; pointer-events: none; }
        .feat-fade-right { position: absolute; right: 0; top: 0; bottom: 0; width: 40px; background: linear-gradient(270deg, #f8faff, transparent); z-index: 2; pointer-events: none; }
        .feat-scroll-wrap { position: relative; }
        .feat-track { display: flex; gap: 14px; width: max-content; padding: 0 40px; user-select: none; }
        .feat-card { flex-shrink: 0; width: 260px; background: #ffffff; border-radius: 16px; padding: 24px 20px; border: 1.5px solid #e2e8f0; transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; position: relative; overflow: hidden; }
        .feat-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--card-color); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
        .feat-card:hover { border-color: var(--card-border); box-shadow: 0 12px 36px rgba(0,0,0,0.09); transform: translateY(-5px); }
        .feat-card:hover::after { transform: scaleX(1); }
        .feat-icon-wrap { width: 44px; height: 44px; border-radius: 11px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; background: var(--card-bg); color: var(--card-color); border: 1.5px solid var(--card-border); }
        .feat-tag { display: inline-block; font-size: 0.67rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--card-color); background: var(--card-bg); border: 1px solid var(--card-border); padding: 3px 9px; border-radius: 100px; margin-bottom: 10px; }
        .feat-card-title { font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .feat-card-desc  { font-size: 0.8rem; color: #64748b; line-height: 1.6; }
        @media (max-width: 480px) {
          .feat-section { padding: 48px 0; } .feat-header { margin-bottom: 28px; } .feat-subtitle { font-size: 0.9rem; }
          .feat-track { gap: 10px; padding: 0 16px; } .feat-fade-left, .feat-fade-right { width: 16px; }
          .feat-card { width: 46vw; border-radius: 12px; padding: 14px 12px; }
          .feat-icon-wrap { width: 34px; height: 34px; border-radius: 8px; margin-bottom: 8px; }
          .feat-icon-wrap svg { width: 16px; height: 16px; }
          .feat-tag { font-size: 0.58rem; padding: 2px 7px; margin-bottom: 6px; }
          .feat-card-title { font-size: 0.78rem; margin-bottom: 5px; }
          .feat-card-desc  { font-size: 0.7rem; line-height: 1.5; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .feat-section { padding: 60px 0; } .feat-header { margin-bottom: 36px; }
          .feat-track { gap: 12px; padding: 0 24px; }
          .feat-card { width: 200px; border-radius: 14px; padding: 18px 15px; }
          .feat-icon-wrap { width: 38px; height: 38px; margin-bottom: 10px; }
          .feat-icon-wrap svg { width: 18px; height: 18px; }
          .feat-card-title { font-size: 0.87rem; } .feat-card-desc { font-size: 0.75rem; }
        }
      `}</style>

      <section className="feat-section">
        {/* Header animates in when scrolled into view */}
        <motion.div
          className="feat-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="feat-eyebrow">Why E2E?</span>
          <h2 className="feat-title">
            Everything You Need to <span>Score Higher</span>
          </h2>
          <p className="feat-subtitle">
            Built by toppers, for toppers. Every feature is designed with one goal — getting you that 9+ SGPA.
          </p>
        </motion.div>

        <motion.p
          className="feat-hint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 8L22 12L18 16M6 8L2 12L6 16M2 12H22"/>
          </svg>
          Drag or swipe to explore
        </motion.p>

        <div className="feat-scroll-wrap">
          <div className="feat-fade-left" />
          <div className="feat-fade-right" />
          <div
            ref={scrollRef}
            className="feat-scroll"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseEnter={() => { userActive.current = true; clearTimeout(resumeTimer.current); }}
            onMouseLeave={() => { onMouseUp(); userActive.current = false; }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => pauseAuto()}
          >
            <div className="feat-track">
              {allCards.map((f, i) => (
                <div
                  key={i}
                  className="feat-card"
                  style={{ '--card-color': f.color, '--card-bg': f.bg, '--card-border': f.border } as React.CSSProperties}
                >
                  <div className="feat-icon-wrap">{f.icon}</div>
                  <div className="feat-tag">{f.tag}</div>
                  <div className="feat-card-title">{f.title}</div>
                  <div className="feat-card-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;