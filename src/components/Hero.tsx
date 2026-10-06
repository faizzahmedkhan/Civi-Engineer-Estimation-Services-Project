import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, HelpCircle, HardHat, ShieldCheck, Zap, Activity, Info, CheckCircle } from "lucide-react";

interface HeroProps {
  onStartEstimate: () => void;
  onExploreCapabilities: () => void;
}

export default function Hero({ onStartEstimate, onExploreCapabilities }: HeroProps) {
  // Bending Moment & Deflection Simulator State
  const [loadTons, setLoadTons] = useState<number>(150); // uniformly distributed load in tons
  const [spanFeet, setSpanFeet] = useState<number>(45); // span length in feet
  const [beamMaterial, setBeamMaterial] = useState<"Steel" | "Concrete" | "Timber">("Steel");
  const [isSimulatingStress, setIsSimulatingStress] = useState<boolean>(false);
  const [currentStatIndex, setCurrentStatIndex] = useState<number>(0);

  // Structural Engineering Sizing Formula calculations
  // w = load / span (converted for simple visual scaling)
  const loadKipsPerFoot = (loadTons * 2) / spanFeet; // 1 ton = 2 kips
  // Max Bending Moment M_max = (w * L^2) / 8
  const maxBendingMoment = (loadKipsPerFoot * Math.pow(spanFeet, 2)) / 8;
  
  // Approximate structural depth required: d = L / 16 for steel, L / 12 for concrete, L / 10 for timber
  let structuralDepthInches = 0;
  let materialGrade = "";
  let stressPercentage = 0;
  
  if (beamMaterial === "Steel") {
    structuralDepthInches = spanFeet * 12 / 16;
    materialGrade = "Structural Steel (ASTM A992 Grade 50)";
    const capacity = 8000; // Kip-ft capacity
    stressPercentage = Math.min(100, Math.round((maxBendingMoment / capacity) * 100));
  } else if (beamMaterial === "Concrete") {
    structuralDepthInches = spanFeet * 12 / 12;
    materialGrade = "Reinforced Concrete (C40/50 Grade 60)";
    const capacity = 6200;
    stressPercentage = Math.min(100, Math.round((maxBendingMoment / capacity) * 100));
  } else {
    structuralDepthInches = spanFeet * 12 / 10;
    materialGrade = "Glulam Engineered Timber (24F-V4)";
    const capacity = 3800;
    stressPercentage = Math.min(100, Math.round((maxBendingMoment / capacity) * 100));
  }

  // Stress-trigger buzzer with safety checks
  const triggerStressSimulation = () => {
    setIsSimulatingStress(true);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.frequency.setValueAtTime(100 + (stressPercentage * 0.3), audioCtx.currentTime);
      oscillator.type = "sine";
      
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.65);
    } catch (e) {
      // AudioContext blocker or unsupported
    }
    setTimeout(() => setIsSimulatingStress(false), 850);
  };

  const statShowcase = [
    { value: "6+ Years", label: "Active Civil & Estimation Field Experience" },
    { value: "140+", label: "International & Local Takeoff Audits" },
    { value: "$450M+", label: "Total Estimated Construction Value Managed" },
    { value: "100%", label: "USGS, IBC & British Standard Code Compliance" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % statShowcase.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="hero-section-root" 
      className="relative overflow-hidden bg-[#0A0B0D] bg-blueprint-grid-dark pt-10 pb-16 md:py-20 lg:py-24 border-b border-white/5"
    >
      {/* Background Architectural Vector Overlays (Minimalist, technical look) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Circular grid */}
        <div className="absolute top-1/4 right-[-100px] h-[500px] w-[500px] rounded-full border border-white/5 opacity-40 flex items-center justify-center">
          <div className="h-[400px] w-[400px] rounded-full border border-dashed border-white/5 flex items-center justify-center">
            <div className="h-[250px] w-[250px] rounded-full border border-white/5"></div>
          </div>
        </div>
        {/* Fine crosshairs */}
        <div className="absolute left-10 top-20 h-40 w-40 border-l border-t border-white/5"></div>
        <div className="absolute right-20 bottom-10 h-32 w-32 border-r border-b border-white/5"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Column 1: Copywriting */}
          <div id="hero-cta-col" className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            
            {/* Tagline Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 rounded-full border border-[#C5A267]/20 bg-[#111317] px-4 py-1.5"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#C5A267] animate-ping"></span>
              <span className="font-mono text-[9px] uppercase font-bold tracking-[0.2em] text-[#C5A267]">
                CIVIL CONSULTANCY & QUANTITY TAKEOFFS
              </span>
            </motion.div>

            {/* Giant Display Headings */}
            <div className="space-y-3 sm:space-y-4">
              <div className="text-[#C5A267] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">Est. 6 Years Professional Field Expertise</div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-[34px] xs:text-[46px] sm:text-[68px] lg:text-[76px] xl:text-[84px] font-extrabold leading-[0.9] tracking-tighter text-white uppercase"
              >
                RIDA SARFARAZ<br/>
                <span className="text-zinc-600 font-bold">ESTIMATION &</span><br/>
                ENGINEERING
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl pt-2"
              >
                Providing high-fidelity material takeoffs, structural cost estimates, value engineering, and detailed civil sizing models. Serving both local developers and international contractors with certified accuracy and meticulous project planning.
              </motion.p>
            </div>

            {/* Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 sm:gap-4 items-center"
            >
              <button
                id="hero-estimator-nav-btn"
                onClick={onStartEstimate}
                className="flex items-center space-x-2 bg-[#C5A267] hover:bg-white text-black px-6 py-3.5 rounded-xl font-display text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-md shadow-black/30"
              >
                <span>Launch Sizing Portal</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                id="hero-capabilities-nav-btn"
                onClick={onExploreCapabilities}
                className="flex items-center space-x-2 border border-white/10 hover:border-[#C5A267]/50 bg-transparent text-white hover:text-[#C5A267] px-6 py-3.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
              >
                <span>Capabilities Details</span>
              </button>
            </motion.div>

            {/* Rotating Stats Ticker */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
            >
              <div className="relative h-12 w-full sm:w-36 overflow-hidden flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/5 pb-2 sm:pb-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStatIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-2xl font-black tracking-tight text-white"
                  >
                    {statShowcase[currentStatIndex].value}
                  </motion.div>
                </AnimatePresence>
                <span className="font-mono text-[9px] text-[#C5A267] uppercase tracking-wider mt-0.5">
                  Verified Metric
                </span>
              </div>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStatIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-sans text-xs font-semibold text-zinc-400"
                  >
                    {statShowcase[currentStatIndex].label}
                  </motion.p>
                </AnimatePresence>
                <p className="font-mono text-[8px] text-zinc-600 uppercase mt-0.5">
                  Calculated against ASTM, RICS, & AACE Estimating Best Practices
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hero Column 2: Materials Evaluator / Interactive Structural Sizer */}
          <div id="hero-simulator-col" className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl bg-[#111317] border border-white/5 p-5 sm:p-6 shadow-2xl bg-dot-matrix"
            >
              {/* Widget Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-[#C5A267] animate-pulse" />
                  <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">
                    Structural Member Sizer (L/D Limits)
                  </span>
                </div>
                <span className="font-mono text-[8px] px-2 py-0.5 bg-white/5 text-[#C5A267] rounded border border-white/5">
                  CALC SYSTEM
                </span>
              </div>

              {/* Material Picker */}
              <div className="mb-4">
                <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-2">
                  Select Structural Material Class
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Steel", "Concrete", "Timber"] as const).map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => setBeamMaterial(mat)}
                      className={`py-2 px-1 rounded-lg font-display text-[10px] font-bold uppercase tracking-wider border transition-all duration-200 ${
                        beamMaterial === mat
                          ? "bg-[#C5A267]/15 border-[#C5A267] text-white"
                          : "bg-black/35 border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Inputs */}
              <div className="space-y-4 mb-4">
                <div>
                  <div className="flex justify-between items-center mb-1 font-mono text-[9px] uppercase tracking-wider">
                    <span className="text-zinc-500">Unfactored Symmetrical Load</span>
                    <span className="text-white font-bold">{loadTons} Tons</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={loadTons}
                    onChange={(e) => setLoadTons(Number(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#C5A267]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 font-mono text-[9px] uppercase tracking-wider">
                    <span className="text-zinc-500">Span Length (L)</span>
                    <span className="text-white font-bold">{spanFeet} Feet</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    step="5"
                    value={spanFeet}
                    onChange={(e) => setSpanFeet(Number(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#C5A267]"
                  />
                </div>
              </div>

              {/* Visual Beam Deflection Simulator */}
              <div className="relative h-28 bg-black/60 rounded-xl border border-white/5 p-3 overflow-hidden flex flex-col justify-between">
                <span className="absolute top-1.5 left-2.5 font-mono text-[8px] text-zinc-500 uppercase">
                  Analytical Deflection Profile (x-axis)
                </span>
                
                {/* Arrow indicator under load */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-1.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                      className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[6px] border-t-[#C5A267]/70"
                    />
                  ))}
                </div>

                {/* Beam Structural line */}
                <div className="relative w-full h-10 flex items-center justify-center px-4">
                  {/* Base reference guide */}
                  <div className="absolute left-4 right-4 h-[1px] border-b border-dashed border-white/5"></div>

                  {/* Bending deformed beam line */}
                  <svg className="w-full h-full overflow-visible">
                    <motion.path
                      d={`M 15 20 Q ${spanFeet * 4} ${20 + (stressPercentage * 0.12)} ${spanFeet * 8} 20`}
                      fill="transparent"
                      stroke="#C5A267"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Left Support */}
                  <div className="absolute left-3 bottom-1 h-3 w-3 border-b-2 border-l-2 border-zinc-700 rotate-45"></div>
                  {/* Right Support */}
                  <div className="absolute right-3 bottom-1 h-3 w-3 border-b-2 border-r-2 border-zinc-700 -rotate-45"></div>
                </div>

                {/* Live indicators */}
                <div className="flex justify-between font-mono text-[8px] uppercase tracking-tight text-zinc-500">
                  <span>Pin Support</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[#C5A267] font-bold">M_max:</span>
                    <span className="text-zinc-300">{Math.round(maxBendingMoment)} Kip-ft</span>
                  </div>
                  <span>Roller Support</span>
                </div>
              </div>

              {/* Real-time Engineering Recommendation Output */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5">
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                    Recommended Depth
                  </span>
                  <span className="font-display text-sm font-bold text-white">
                    {structuralDepthInches.toFixed(1)} Inches
                  </span>
                  <p className="font-mono text-[7px] text-zinc-600 mt-0.5">
                    L / ratio sizing parameter
                  </p>
                </div>

                <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5">
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                    Specification Class
                  </span>
                  <span className="font-display text-[10px] font-bold text-white truncate block mt-0.5">
                    {beamMaterial === "Steel" ? "A992 Gr. 50 Steel" : beamMaterial === "Concrete" ? "Rebar C40/50" : "Glulam 24F-V4"}
                  </span>
                  <p className="font-mono text-[7px] text-zinc-600 mt-0.5">
                    Recommended code target
                  </p>
                </div>
              </div>

              {/* Action trigger & Stress status */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex items-center justify-between mb-1 font-mono text-[8px]">
                    <span className="text-zinc-500 uppercase">Est. Sizing Limit Capacity</span>
                    <span className={`${stressPercentage > 85 ? "text-[#C5A267] font-extrabold" : "text-zinc-400"} font-bold`}>
                      {stressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      animate={{ width: `${stressPercentage}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        stressPercentage > 80 ? "bg-red-500" : stressPercentage > 50 ? "bg-[#C5A267]" : "bg-zinc-600"
                      }`}
                    />
                  </div>
                </div>

                <button
                  id="test-structural-stress-btn"
                  onClick={triggerStressSimulation}
                  disabled={isSimulatingStress}
                  className={`px-4 py-2 rounded-lg font-display text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-1 border ${
                    isSimulatingStress 
                      ? "bg-[#C5A267] text-black border-[#C5A267]" 
                      : "bg-transparent border-white/10 text-white hover:border-white"
                  }`}
                >
                  <Zap className="h-3 w-3 text-[#C5A267]" />
                  <span>{isSimulatingStress ? "Analyzing..." : "Sizing Check"}</span>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
