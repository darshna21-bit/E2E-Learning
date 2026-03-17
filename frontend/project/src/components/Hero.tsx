import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .hero-root {
          position: relative;
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%);
          overflow: hidden;
          padding: 80px 24px 100px;
        }
        .hero-bg-img {
          position: absolute;
          inset: 0;
          background: url('https://t4.ftcdn.net/jpg/04/30/26/81/360_F_430268143_vgIE6L3H5JRxpqeAP1QBm2s2fOYmRNDC.jpg') center/cover no-repeat;
          opacity: 0.7;
        }
        .hero-glow {
          position: absolute;
          top: -100px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 500px;
          background: radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-circle-1 {
          position: absolute; top: -60px; right: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .hero-circle-2 {
          position: absolute; bottom: -80px; left: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .hero-content {
          position: relative; z-index: 2;
          max-width: 800px; margin: 0 auto; text-align: center;
        }
        .hero-stars {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px; padding: 6px 16px; margin-bottom: 28px;
          font-size: 0.8rem; color: rgba(255,255,255,0.9);
          font-weight: 500; letter-spacing: 0.04em;
        }
        .hero-h1 {
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 800; color: #ffffff;
          line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.025em;
        }
        .hero-h1 .highlight {
          position: relative; display: inline-block;
        }
        .hero-h1 .highlight::after {
          content: ''; position: absolute;
          bottom: 2px; left: 0; right: 0; height: 4px;
          background: rgba(255,255,255,0.35); border-radius: 2px;
        }
        .hero-p {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.75);
          max-width: 560px; margin: 0 auto 12px; line-height: 1.75;
        }
        .hero-p2 {
          font-size: 0.9rem; color: rgba(255,255,255,0.5);
          margin-bottom: 40px; letter-spacing: 0.03em;
        }
        .hero-btns {
          display: flex; align-items: center;
          justify-content: center; gap: 12px; flex-wrap: wrap;
        }
        .btn-main {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 30px; background: #ffffff; color: #1d4ed8;
          border-radius: 10px; font-size: 1rem; font-weight: 700;
          border: none; cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }
        .btn-main:hover { background: #eff6ff; box-shadow: 0 8px 36px rgba(0,0,0,0.28); transform: translateY(-2px); }
        .btn-main:hover svg { transform: translateX(4px); }
        .btn-main svg { transition: transform 0.2s ease; }
        .btn-ghost {
          display: inline-flex; align-items: center;
          padding: 14px 28px; background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9); border-radius: 10px;
          font-size: 1rem; font-weight: 500;
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer; transition: all 0.25s ease;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.18); transform: translateY(-2px); }
        .hero-stats {
          display: flex; align-items: center; justify-content: center;
          gap: 28px; margin-top: 52px; flex-wrap: wrap;
        }
        .hero-stat-num { font-size: 1.7rem; font-weight: 800; color: #ffffff; line-height: 1; text-align: center; }
        .hero-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; text-align: center; }
        .hero-stat-div { width: 1px; height: 36px; background: rgba(255,255,255,0.15); }
        .hero-wave { position: absolute; bottom: -1px; left: 0; right: 0; }

        @media (max-width: 640px) {
          .hero-root { padding: 52px 16px 80px; }
          .hero-stars { font-size: 0.72rem; padding: 5px 12px; gap: 4px; margin-bottom: 20px; flex-wrap: wrap; justify-content: center; }
          .hero-h1 { font-size: 2rem; margin-bottom: 16px; }
          .hero-p { font-size: 0.95rem; margin-bottom: 10px; padding: 0 4px; }
          .hero-p2 { font-size: 0.78rem; margin-bottom: 28px; line-height: 1.9; }
          .hero-btns { flex-direction: column; align-items: stretch; gap: 10px; }
          .btn-main, .btn-ghost { width: 100%; justify-content: center; padding: 13px 20px; font-size: 0.95rem; }
          .hero-stats { gap: 14px; margin-top: 36px; }
          .hero-stat-num { font-size: 1.35rem; }
          .hero-stat-label { font-size: 0.65rem; }
          .hero-stat-div { height: 26px; }
          .hero-circle-1, .hero-circle-2 { display: none; }
        }
        @media (max-width: 380px) {
          .hero-h1 { font-size: 1.7rem; }
          .hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .hero-stat-div { display: none; }
          .hero-stat-num { font-size: 1.5rem; }
        }
      `}</style>

      <div className="hero-root">
        <div className="hero-bg-img" />
        <div className="hero-glow" />
        <div className="hero-circle-1" />
        <div className="hero-circle-2" />

        <div className="hero-content">
          {/* Badge */}
          <motion.div className="hero-stars" {...fadeUp(0)}>
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#fbbf24" strokeWidth={0} />)}
            &nbsp;Trusted by 500+ Engineering Students
          </motion.div>

          {/* Heading */}
          <motion.h1 className="hero-h1" {...fadeUp(0.1)}>
            Master Your Exams with<br />
            <span className="highlight">E2E Learning</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p className="hero-p" {...fadeUp(0.18)}>
            Comprehensive, exam-oriented notes designed for 9+ SGPA success — written by toppers, for toppers.
          </motion.p>
          <motion.p className="hero-p2" {...fadeUp(0.24)}>
            All PYQs &nbsp;·&nbsp; Presentation Tips &nbsp;·&nbsp; High-Scoring Topics &nbsp;·&nbsp; Instant Download
          </motion.p>

          {/* Buttons */}
          <motion.div className="hero-btns" {...fadeUp(0.3)}>
            <button className="btn-main" onClick={() => navigate('/notes')}>
              Explore Notes <ArrowRight size={18} />
            </button>
            <button className="btn-ghost" onClick={() => navigate('/signup')}>
              Join Free
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero-stats" {...fadeUp(0.38)}>
            {[
              { num: '500+', label: 'Students' },
              { num: '9+',   label: 'Avg SGPA' },
              { num: '50+',  label: 'Subjects' },
              { num: '10yr', label: 'PYQ Coverage' },
            ].map((s, i) => (
              <>
                {i > 0 && <div key={`d-${i}`} className="hero-stat-div" />}
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </motion.div>
              </>
            ))}
          </motion.div>
        </div>

        <svg className="hero-wave" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60H1440V30C1200 0 960 60 720 30C480 0 240 60 0 30V60Z" fill="#f8faff"/>
        </svg>
      </div>
    </>
  );
};

export default Hero;
