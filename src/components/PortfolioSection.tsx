import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_PROJECTS } from "../data";
import { Project } from "../types";
import { ShieldAlert, Compass, Calendar, Ruler, Award, X, SlidersHorizontal } from "lucide-react";

export default function PortfolioSection() {
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Cost Estimation & Takeoffs", "Structural Design & Sizing", "Local Estimations", "Value Engineering & Optimization"];

  const filteredProjects = filterCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === filterCategory);

  return (
    <section 
      id="portfolio-section-root" 
      className="bg-[#0A0B0D] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between space-y-4 md:space-y-0 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-widest text-[#C5A267] font-bold">
              <Compass className="h-3.5 w-3.5" />
              <span>STAMPED WORKS</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl">
              Project Portfolio
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Explore professional civil estimation audits, detailed material takeoffs, and freelance structural sizing deliverables.
            </p>
          </div>

          {/* Filtering controls */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-btn-${cat.toLowerCase().replace(" ", "-")}`}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-sans text-[10px] font-bold tracking-wide uppercase transition-all duration-200 ${
                  filterCategory === cat 
                    ? "bg-[#C5A267] text-black shadow-lg animate-fade-in" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat === "All" ? "All Projects" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid layout of Projects */}
        <motion.div 
          layout 
          id="portfolio-projects-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-[#111317] border border-white/5 shadow-2xl hover:border-[#C5A267]/40 transition-all duration-300"
              >
                {/* Photo with overlay */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-950 border-b border-white/5">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Status Indicator pill */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1 rounded bg-[#0A0B0D]/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-mono text-white uppercase tracking-widest border border-white/5">
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "Completed" ? "bg-emerald-400" : "bg-[#C5A267]"
                    }`}></span>
                    <span>{project.status}</span>
                  </div>

                  {/* Year pill */}
                  <div className="absolute top-3 right-3 rounded bg-black/80 px-2.5 py-0.5 text-[9px] font-mono font-bold text-[#C5A267] border border-white/5">
                    {project.year}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-[#C5A267] uppercase tracking-wider font-bold">
                      {project.category}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">
                      {project.location.split(",")[1]?.trim() || "USA"}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white group-hover:text-[#C5A267] transition-colors uppercase tracking-tight">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Physical metrics highlights bar */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 font-mono text-[8px] text-zinc-500 uppercase">
                    <div className="flex items-center space-x-1">
                      <Ruler className="h-3.5 w-3.5 text-zinc-600" />
                      <span className="truncate">{project.scale}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ShieldAlert className="h-3.5 w-3.5 text-[#C5A267]" />
                      <span className="truncate">{project.seismicRating.split("/")[0]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Blueprint Overlay Popup */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#111317] border border-white/5 shadow-2xl flex flex-col md:flex-row bg-blueprint-grid-dark"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Left Side: Mock Blueprint Vector Schemas (Incredibly technical & elegant) */}
                <div className="md:w-1/2 bg-[#0A0B0D] p-6 flex flex-col justify-between text-zinc-400 min-h-[350px] md:min-h-[500px]">
                  <div className="space-y-4">
                    {/* Header of schematic */}
                    <div className="border-b border-white/5 pb-3 flex justify-between items-center font-mono text-[9px] uppercase">
                      <span className="text-[#C5A267] font-bold">RSE Analytical Blueprint v1.0</span>
                      <span>CODE: {selectedProject.id.toUpperCase()}</span>
                    </div>

                    {/* Architectural Draft Simulation (SVGs representing gridlines, load points, and core details) */}
                    <div className="h-56 w-full border border-white/5 relative rounded-xl bg-blueprint-grid-dark flex items-center justify-center">
                      {/* Grid crosshairs & labels */}
                      <span className="absolute top-1 left-2 font-mono text-[7px] text-zinc-600">PLAN GRID SECTION A-A</span>
                      <span className="absolute bottom-1 right-2 font-mono text-[7px] text-zinc-600">SCALE: 1:150</span>
                      
                      {/* Technical drawing (SVG) */}
                      <svg className="w-full h-full p-4 overflow-visible">
                        {/* Core structural axis lines */}
                        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="0.5" strokeDasharray="3,3" />
                        
                        {/* Pillars points circular indicators */}
                        <circle cx="30%" cy="30%" r="5" fill="none" stroke="#C5A267" strokeWidth="1" />
                        <circle cx="70%" cy="30%" r="5" fill="none" stroke="#C5A267" strokeWidth="1" />
                        <circle cx="30%" cy="70%" r="5" fill="none" stroke="#C5A267" strokeWidth="1" />
                        <circle cx="70%" cy="70%" r="5" fill="none" stroke="#C5A267" strokeWidth="1" />

                        {/* Connection beams framing outline */}
                        <rect x="30%" y="30%" width="40%" height="40%" fill="none" stroke="#71717A" strokeWidth="1" strokeDasharray="4,2" />

                        {/* Core shear wall rectangle */}
                        <rect x="42%" y="42%" width="16%" height="16%" fill="rgba(197, 162, 103, 0.08)" stroke="#C5A267" strokeWidth="1.5" />
                        <line x1="42%" y1="42%" x2="58%" y2="58%" stroke="#C5A267" strokeWidth="0.5" />
                        <line x1="58%" y1="42%" x2="42%" y2="58%" stroke="#C5A267" strokeWidth="0.5" />
                        <text x="50%" y="38%" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="monospace" textAnchor="middle">RC SHEAR CORE</text>

                        {/* Loading forces vector arrows */}
                        <path d="M 10 30 L 50 30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" markerEnd="url(#arrow)" />
                        <text x="15" y="25" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="monospace">WIND FORCE (P_w)</text>
                      </svg>
                    </div>

                    {/* Structural Material schedules specifications table */}
                    <div className="bg-[#0A0B0D] border border-white/5 p-4 rounded-xl font-mono text-[9px] uppercase space-y-2">
                      <span className="block font-bold text-zinc-400 border-b border-white/5 pb-1.5 text-[8px] tracking-wider text-[#C5A267]">
                        STAMPED MATERIAL SPECIFICATIONS
                      </span>
                      <div className="grid grid-cols-2 gap-y-1 text-zinc-500">
                        <span>Concrete compressive strength:</span>
                        <span className="text-white text-right">{selectedProject.concreteGrade || "C30/37 Class"}</span>
                        
                        <span>Reinforcement steel yield:</span>
                        <span className="text-white text-right">{selectedProject.steelGrade?.split("+")[0] || "Grade 60 (A615)"}</span>
                        
                        <span>Primary framework members:</span>
                        <span className="text-white text-right text-xs truncate" title={selectedProject.steelGrade}>
                          {selectedProject.steelGrade?.split("+")[1] || "Conventional Members"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stamping signatures validation */}
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center font-mono text-[8px] text-zinc-500 uppercase">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-white font-bold">PE</div>
                      <span>Rida Sarfaraz, Civil Consultant</span>
                    </div>
                    <span className="text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      CODE COMPLIANT
                    </span>
                  </div>
                </div>

                {/* Right Side: Description and Full Details */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] bg-white/5 text-zinc-400 px-2.5 py-1 rounded-full border border-white/5 uppercase font-bold tracking-wider">
                        {selectedProject.category} Project File
                      </span>
                      <div className="flex items-center space-x-1 font-mono text-[10px] text-zinc-500">
                        <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Completed: {selectedProject.year}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-bold tracking-tight text-white uppercase">
                      {selectedProject.title}
                    </h3>

                    <div className="space-y-1.5 font-mono text-[10px] text-zinc-500 uppercase border-y border-white/5 py-3">
                      <div className="flex justify-between">
                        <span>Project Context:</span>
                        <span className="text-white font-semibold">{selectedProject.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Structural System:</span>
                        <span className="text-white font-semibold text-right max-w-[200px] truncate" title={selectedProject.structuralSystem}>
                          {selectedProject.structuralSystem}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clear Sizing Scale:</span>
                        <span className="text-white font-semibold">{selectedProject.scale}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block font-mono text-[9px] text-[#C5A267] uppercase tracking-wider font-bold">
                        Calculated Engineering Case Description:
                      </span>
                      <p className="font-sans text-xs text-zinc-400 leading-relaxed md:text-sm">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>

                  {/* Sizing tolerances specs */}
                  <div className="pt-6 border-t border-white/5">
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2.5">
                      Sizing Tolerances Calibrated
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-black/45 rounded-xl border border-white/5">
                        <span className="block font-mono text-[8px] text-zinc-500 uppercase">
                          Ultimate Wind Shear
                        </span>
                        <span className="font-display text-sm font-bold text-white">
                          {selectedProject.windLoadMax}
                        </span>
                      </div>
                      <div className="p-3 bg-black/45 rounded-xl border border-white/5">
                        <span className="block font-mono text-[8px] text-zinc-500 uppercase">
                          Load Sizing Standard
                        </span>
                        <span className="font-display text-sm font-bold text-[#C5A267] truncate block" title={selectedProject.seismicRating}>
                          {selectedProject.seismicRating.split("/")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
