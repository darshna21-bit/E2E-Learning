import { useParams, Navigate } from 'react-router-dom';
import {
  Lock, FileText, ZoomIn, ZoomOut, Download, ShoppingCart,
  CheckCircle2, BookOpen, Clock, Award, Users,
  ChevronDown, ChevronUp, Star
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSubjectById } from '../data/subjects';

// 🔧 TODO: Replace with real auth + Razorpay integration later

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const SubjectPreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const subject = id ? getSubjectById(id) : undefined;
  const [expandedUnit, setExpandedUnit] = useState<string | null>(
    subject?.units[0]?.id ?? null
  );
  const [paying, setPaying] = useState(false);

  if (!subject) return <Navigate to="/notes" replace />;

  const totalPages = subject.units.reduce((acc, u) => acc + u.totalPages, 0);
  const previewCount = subject.preview.length;
  const discount = subject.discountedPrice
    ? Math.round((1 - subject.discountedPrice / subject.price) * 100)
    : 0;
  const finalPrice = subject.discountedPrice ?? subject.price;

  const features = [
    'Comprehensive coverage of all units',
    'All previous year questions included',
    'Instant digital access',
    'Regular updates and improvements',
  ];

  const handleBuy = () => {
    setPaying(true);
    setTimeout(() => setPaying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2]" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>

      {/* ── STICKY TOPBAR ── */}
      <motion.div
        className="bg-white border-b border-gray-200 px-4 py-2.5 sticky top-0 z-30 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 leading-none mb-0.5 font-sans uppercase tracking-widest">Study Notes</p>
            <h1 className="text-sm font-semibold text-gray-800 leading-none truncate font-sans">{subject.title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:block font-sans">{previewCount} of {totalPages} pages free</span>
            <button
              onClick={handleBuy}
              disabled={paying}
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold font-sans px-3 py-1.5 rounded-lg transition"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {paying ? 'In Progress...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-5">
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-5">

            {/* 1. UNIT CARDS */}
            <div className="grid grid-cols-2 gap-3">
              {subject.units.map((unit, i) => (
                <motion.div
                  key={unit.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-3"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold font-sans text-white"
                    style={{ background: `hsl(${210 + i * 25},65%,48%)` }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 font-sans leading-snug">{unit.title}</p>
                    <p className="text-[11px] text-gray-400 font-sans mt-0.5">
                      {unit.totalPages} pages · {unit.topics.length} topics
                    </p>
                    {i === 0 && (
                      <span className="inline-block mt-1.5 text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 font-sans font-semibold">
                        Free Preview
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 2. COURSE CONTENTS */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              {...fadeUp(0)}
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 font-sans">Course Contents</h2>
                <p className="text-xs text-gray-400 font-sans mt-0.5">{subject.units.length} units · {totalPages} pages total</p>
              </div>
              <div className="divide-y divide-gray-100">
                {subject.units.map((unit, i) => (
                  <div key={unit.id}>
                    <button
                      className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition text-left"
                      onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold font-sans text-white"
                        style={{ background: `hsl(${210 + i * 25},65%,48%)` }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 font-sans leading-snug">{unit.title}</p>
                        <p className="text-xs text-gray-400 font-sans mt-0.5">{unit.totalPages} pages · {unit.topics.length} topics</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {i === 0
                          ? <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 font-sans font-semibold">Free</span>
                          : <Lock className="w-3.5 h-3.5 text-gray-300" />
                        }
                        {expandedUnit === unit.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </button>

                    {expandedUnit === unit.id && (
                      <motion.div
                        className="bg-gray-50 border-t border-gray-100 px-5 py-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        {unit.topics.map((topic, ti) => (
                          <div key={topic.id} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? 'bg-blue-400' : 'bg-gray-300'}`} />
                            <span className="text-xs text-gray-600 font-sans flex-1">{topic.title}</span>
                            {i === 0
                              ? ti < previewCount
                                ? <span className="text-[10px] text-emerald-600 font-sans font-semibold">Preview</span>
                                : <Lock className="w-3 h-3 text-gray-300" />
                              : <Lock className="w-3 h-3 text-gray-300" />
                            }
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. OVERVIEW */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              {...fadeUp(0)}
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 font-sans">Overview</h2>
              </div>
              <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: <BookOpen className="w-4 h-4 text-blue-500" />, label: 'Total Pages', value: `${totalPages}` },
                  { icon: <FileText className="w-4 h-4 text-blue-500" />, label: 'Units', value: `${subject.units.length}` },
                  { icon: <Clock className="w-4 h-4 text-blue-500" />, label: 'Access', value: 'Lifetime' },
                  { icon: <Award className="w-4 h-4 text-blue-500" />, label: 'Format', value: 'Digital PDF' },
                  { icon: <Users className="w-4 h-4 text-blue-500" />, label: 'Students', value: '2,400+' },
                  { icon: <Star className="w-4 h-4 text-amber-400" />, label: 'Rating', value: '4.9 / 5' },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {row.icon}
                    <div>
                      <p className="text-[11px] text-gray-400 font-sans">{row.label}</p>
                      <p className="text-sm font-bold text-gray-800 font-sans">{row.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 4. PDF PREVIEW */}
            <motion.div className="mb-8" {...fadeUp(0)}>
              <h2 className="text-sm font-bold text-gray-800 font-sans mb-3 px-1">Preview</h2>

              {/* Toolbar */}
              <div
                className="flex items-center gap-2 px-3 sm:px-4 py-2 select-none rounded-t-xl border border-b-0 border-gray-300"
                style={{ background: '#e8e6e1' }}
              >
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dfa123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c840] border border-[#1aab29]" />
                </div>
                <div className="flex items-center bg-white border border-gray-300 rounded-md px-2 py-0.5 ml-2">
                  <span className="text-[11px] text-gray-600 font-mono tabular-nums">Pages 1–{previewCount} of {totalPages}</span>
                </div>
                <div className="hidden sm:flex flex-1 mx-2">
                  <div className="bg-white border border-gray-300 rounded-md px-3 py-0.5 flex-1 text-center">
                    <span className="text-[11px] text-gray-500 font-mono">
                      {subject.title.replace(/\s+/g, '_').toLowerCase()}_unit1.pdf
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <button className="p-1.5 rounded text-gray-500 hover:text-gray-800 hover:bg-black/5 transition"><ZoomOut className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded text-gray-500 hover:text-gray-800 hover:bg-black/5 transition"><ZoomIn className="w-3.5 h-3.5" /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1" />
                  <button className="p-1.5 rounded text-gray-500 hover:text-gray-800 hover:bg-black/5 transition"><Download className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {/* PDF scroll area */}
              <div
                className="rounded-b-xl border border-gray-300 overflow-y-auto"
                style={{ background: '#d9d5cf', height: 'calc(100vh - 130px)', minHeight: 500 }}
              >
                <div className="py-7 px-4 sm:px-10 flex flex-col items-center gap-5">

                  {/* UNLOCKED PAGES */}
                  {subject.preview.map((page, idx) => (
                    <motion.div
                      key={page.pageNumber}
                      className="bg-white w-full"
                      style={{ maxWidth: 700, minHeight: 900, boxShadow: '0 2px 12px rgba(0,0,0,0.18),0 1px 3px rgba(0,0,0,0.12)' }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.05 }}
                      transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-col" style={{ padding: 'clamp(32px,6%,64px)', minHeight: 900 }}>
                        {idx === 0 && (
                          <div className="mb-8">
                            <div className="h-[3px] bg-blue-600 mb-5" />
                            <p className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-2 font-sans">
                              {subject.units[0].title} · Study Notes
                            </p>
                            <h2 className="font-bold text-gray-900 leading-tight" style={{ fontSize: 'clamp(18px,2.5vw,24px)' }}>
                              {subject.title}
                            </h2>
                            <div className="mt-5 h-px bg-gray-200" />
                          </div>
                        )}
                        {idx > 0 && (
                          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                            <span className="text-[10px] text-gray-400 tracking-widest uppercase font-sans">{subject.title}</span>
                            <span className="text-[10px] text-gray-400 font-sans">{subject.units[0].title}, continued</span>
                          </div>
                        )}
                        <div className="flex-1 text-gray-800" style={{ fontSize: 'clamp(12px,1.3vw,14px)', lineHeight: 1.9 }}>
                          <pre className="whitespace-pre-wrap" style={{ fontFamily: 'inherit' }}>{page.content}</pre>
                        </div>
                        <div className="mt-8 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-[9px] text-gray-300 font-sans tracking-widest uppercase">{subject.title}</span>
                          <span className="text-[9px] text-gray-400 font-sans tabular-nums">{page.pageNumber}</span>
                          <span className="text-[9px] text-gray-300 font-sans tracking-widest uppercase">Unit 1</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* LOCKED / BLURRED PAGE */}
                  <motion.div
                    className="relative bg-white w-full overflow-hidden"
                    style={{ maxWidth: 700, minHeight: 900, boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      className="absolute inset-0 select-none pointer-events-none"
                      style={{ padding: 'clamp(32px,6%,64px)', filter: 'blur(7px)', opacity: 0.5 }}
                      aria-hidden
                    >
                      <div className="mb-8">
                        <div className="h-[3px] bg-gray-400 mb-5" />
                        <div className="h-2.5 bg-gray-300 rounded w-1/3 mb-2" />
                        <div className="h-5 bg-gray-400 rounded w-2/3" />
                        <div className="mt-5 h-px bg-gray-200" />
                      </div>
                      {[...Array(26)].map((_, i) => (
                        <div key={i} className="h-2.5 bg-gray-300 rounded mb-3" style={{ width: `${58 + Math.sin(i * 2.3 + 0.5) * 37}%` }} />
                      ))}
                      <div className="mt-6 h-28 bg-gray-200 rounded border border-gray-300" />
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-2.5 bg-gray-300 rounded mb-3 mt-3" style={{ width: `${55 + Math.cos(i * 1.8) * 38}%` }} />
                      ))}
                    </div>
                    <div
                      className="absolute inset-x-0 top-0 h-40 pointer-events-none z-10"
                      style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(255,255,255,0.8) 55%,transparent 100%)' }}
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
                      <motion.div
                        className="bg-white rounded-2xl w-full text-center"
                        style={{ maxWidth: 310, padding: 'clamp(24px,5%,40px)', boxShadow: '0 8px 40px rgba(0,0,0,0.13)', border: '1px solid rgba(0,0,0,0.07)' }}
                        initial={{ opacity: 0, scale: 0.93 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ background: 'linear-gradient(135deg,#1a73e8,#0d47a1)' }}>
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-[0.18em] mb-2 font-sans">
                          Pages {previewCount + 1}–{totalPages} locked
                        </p>
                        <h3 className="text-base font-bold text-gray-900 mb-2 font-sans leading-snug">Buy to continue reading</h3>
                        <p className="text-xs text-gray-500 mb-5 font-sans leading-relaxed">
                          Unlock all <strong className="text-gray-700">{totalPages} pages</strong> across{' '}
                          <strong className="text-gray-700">{subject.units.length} units</strong>
                        </p>
                        <div className="flex items-baseline justify-center gap-2 mb-4">
                          {subject.discountedPrice && (
                            <span className="text-sm text-gray-400 line-through font-sans">₹{subject.price}</span>
                          )}
                          <span className="text-2xl font-bold text-gray-900 font-sans">₹{finalPrice}</span>
                          {discount > 0 && (
                            <span className="text-xs text-green-600 font-semibold font-sans bg-green-50 px-1.5 py-0.5 rounded-full">{discount}% off</span>
                          )}
                        </div>
                        <motion.button
                          onClick={handleBuy}
                          disabled={paying}
                          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold font-sans transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                          style={{ background: 'linear-gradient(135deg,#1a73e8,#0d47a1)' }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {paying ? 'In Progress...' : 'Unlock Full Notes'}
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>

          </div>

          {/* ══ RIGHT: STICKY BUYING CARD ══ */}
          <motion.div
            className="w-full lg:w-[300px] xl:w-[320px] shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="lg:sticky lg:top-[56px]">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    {subject.discountedPrice && (
                      <span className="text-sm text-gray-400 line-through font-sans">₹{subject.price}</span>
                    )}
                    <span className="text-3xl font-bold text-gray-900 font-sans">₹{finalPrice}</span>
                    {discount > 0 && (
                      <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-sans">{discount}% OFF</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 font-sans mb-4">One-time payment · Lifetime access</p>

                  <motion.button
                    onClick={handleBuy}
                    disabled={paying}
                    className="w-full py-3 rounded-xl text-white font-semibold font-sans text-sm flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-60 mb-3"
                    style={{ background: 'linear-gradient(135deg,#1a73e8,#0d47a1)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {paying ? 'In Progress...' : 'Buy Now'}
                  </motion.button>

                  <ul className="space-y-2.5">
                    {features.map((f, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-600 font-sans leading-snug">{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
                  {[
                    { icon: <BookOpen className="w-3.5 h-3.5" />, value: `${totalPages}`, label: 'Pages' },
                    { icon: <FileText className="w-3.5 h-3.5" />, value: `${subject.units.length}`, label: 'Units' },
                    { icon: <Star className="w-3.5 h-3.5" />, value: '4.9', label: 'Rating' },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col items-center py-3 gap-0.5">
                      <span className="text-blue-500">{s.icon}</span>
                      <span className="text-sm font-bold text-gray-800 font-sans">{s.value}</span>
                      <span className="text-[10px] text-gray-400 font-sans">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default SubjectPreviewPage;