import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EstimateSpecs, EstimateResult } from "../types";
import { Calculator, ArrowRight, ShieldCheck, Printer, FileText, CheckCircle, HelpCircle, HardHat, RefreshCw, Layers, Send } from "lucide-react";

interface AIEstimateSectionProps {
  onAddInquiry: (specs: EstimateSpecs, result: EstimateResult, clientName: string, clientEmail: string, clientPhone: string) => void;
}

const INITIAL_SPECS: EstimateSpecs = {
  buildingType: "Commercial",
  footprintArea: 3500,
  floorsCount: 3,
  structuralSystem: "Reinforced Concrete",
  siteLocation: "Seattle, WA",
  seismicZone: "High",
  windSpeed: 120,
  foundationType: "Let AI suggest",
  sustainabilityFocus: true,
  additionalNotes: ""
};

export default function AIEstimateSection({ onAddInquiry }: AIEstimateSectionProps) {
  const [specs, setSpecs] = useState<EstimateSpecs>(INITIAL_SPECS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>("");
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);
  
  // Storing input for official pipeline submit
  const [showInquirySubmit, setShowInquirySubmit] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [isSubmittedToPipeline, setIsSubmittedToPipeline] = useState<boolean>(false);

  // loading steps to keep client reassured under structural operations
  const loadingSteps = [
    "Initializing RSE sizing engine & variables...",
    "Running structural model matrix solvers (SAP2000 simulations)...",
    "Verifying IBC 2024 Chapter 16 seismic categories compliance...",
    "Estimating material takeoff quantities (concrete volume, steel mass ratio)...",
    "Assembling engineering phase deliverables timeline...",
    "Validating preliminary cost structures..."
  ];

  const handleGenerateSizing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEstimateResult(null);
    setIsSubmittedToPipeline(false);
    setShowInquirySubmit(false);

    // Dynamic text changes to show serious math is occurring
    let stepIndex = 0;
    setLoadingPhase(loadingSteps[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < loadingSteps.length) {
        setLoadingPhase(loadingSteps[stepIndex]);
      }
    }, 900);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specs),
      });
      const data = await response.json();
      clearInterval(stepInterval);
      setEstimateResult(data);
    } catch (error) {
      console.error("Failed to generate structural estimate:", error);
      clearInterval(stepInterval);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePipelineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimateResult) return;
    
    onAddInquiry(specs, estimateResult, clientName, clientEmail, clientPhone);
    setIsSubmittedToPipeline(true);
    setTimeout(() => {
      setShowInquirySubmit(false);
      // Reset inputs
      setClientName("");
      setClientEmail("");
      setClientPhone("");
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section 
      id="sizing-estimator-section" 
      className="bg-[#0A0B0D] py-16 md:py-24 border-b border-white/5 bg-blueprint-grid-dark"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-widest text-[#C5A267] font-bold">
            <Calculator className="h-3.5 w-3.5" />
            <span>RSE CIVIL ESTIMATION ENGINE</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl">
            Sizing & Takeoff Portal
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Specify building parameters below. Our server-side sizing algorithm estimates cost ranges, material takeoffs, and engineering phases compliant with IBC standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Specifications Form */}
          <div className="lg:col-span-5 bg-[#111317] border border-white/5 p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-2 pb-4 border-b border-white/5 mb-5">
              <Layers className="h-4 w-4 text-[#C5A267]" />
              <span className="font-mono text-[10px] font-bold text-white uppercase tracking-[0.2em]">
                Structural Parameters
              </span>
            </div>

            <form onSubmit={handleGenerateSizing} className="space-y-4">
              
              {/* Row 1: Building Type & System */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Building Purpose
                  </label>
                  <select
                    value={specs.buildingType}
                    onChange={(e) => setSpecs({ ...specs, buildingType: e.target.value as any })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Mixed Use">Mixed Use</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Structural System
                  </label>
                  <select
                    value={specs.structuralSystem}
                    onChange={(e) => setSpecs({ ...specs, structuralSystem: e.target.value as any })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  >
                    <option value="Reinforced Concrete">Concrete Shear Core</option>
                    <option value="Structural Steel">Structural Steel Frame</option>
                    <option value="Mass Timber">Mass Timber (CLT)</option>
                    <option value="Masonry / Shear Walls">Masonry Load-bearing</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Footprint Area & Floors Count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Footprint Area (sq ft)
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="100000"
                    required
                    value={specs.footprintArea}
                    onChange={(e) => setSpecs({ ...specs, footprintArea: Number(e.target.value) })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Number of Floors
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={specs.floorsCount}
                    onChange={(e) => setSpecs({ ...specs, floorsCount: Number(e.target.value) })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Site Location & Foundation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Project Site Location
                  </label>
                  <input
                    type="text"
                    required
                    value={specs.siteLocation}
                    onChange={(e) => setSpecs({ ...specs, siteLocation: e.target.value })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Foundation Concept
                  </label>
                  <select
                    value={specs.foundationType}
                    onChange={(e) => setSpecs({ ...specs, foundationType: e.target.value as any })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  >
                    <option value="Let AI suggest">Let AI Suggest Best</option>
                    <option value="Shallow Footing">Shallow Footings</option>
                    <option value="Raft/Mat Foundation">Raft / Mat Foundation</option>
                    <option value="Deep Pile Foundation">Deep Friction Piles</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Seismic Category & Wind loading */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Seismic Exposure Zone
                  </label>
                  <select
                    value={specs.seismicZone}
                    onChange={(e) => setSpecs({ ...specs, seismicZone: e.target.value as any })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  >
                    <option value="Low">Low Activity (Zone A)</option>
                    <option value="Moderate">Moderate Activity (Zone B/C)</option>
                    <option value="High">High Symmetrical (Zone D)</option>
                    <option value="Very High">Active Fault Core (Zone E)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                    Wind Speed Limit (mph)
                  </label>
                  <input
                    type="number"
                    min="85"
                    max="180"
                    required
                    value={specs.windSpeed}
                    onChange={(e) => setSpecs({ ...specs, windSpeed: Number(e.target.value) })}
                    className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                  />
                </div>
              </div>

              {/* Sustainability toggle */}
              <div className="flex items-center justify-between p-4 bg-[#0A0B0D] rounded-xl border border-white/5">
                <div className="space-y-0.5">
                  <span className="block font-sans text-xs font-bold text-white">
                    Eco Carbon-Offset Specs
                  </span>
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase">
                    Utilize low-carbon binders & CLT ratios
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={specs.sustainabilityFocus}
                  onChange={(e) => setSpecs({ ...specs, sustainabilityFocus: e.target.checked })}
                  className="w-4 h-4 text-[#C5A267] bg-[#0A0B0D] border-white/5 rounded focus:ring-[#C5A267] accent-[#C5A267] cursor-pointer"
                />
              </div>

              {/* Additional notes */}
              <div>
                <label className="block font-mono text-[9px] text-zinc-500 uppercase font-semibold tracking-[0.15em] mb-1.5">
                  Additional Notes & Parameters
                </label>
                <textarea
                  value={specs.additionalNotes}
                  onChange={(e) => setSpecs({ ...specs, additionalNotes: e.target.value })}
                  placeholder="e.g. Cantilevered floorplates, specific soil boring bearing capacity values, PE peer review requirements..."
                  rows={2}
                  className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A267] resize-none transition-colors"
                />
              </div>

              {/* Trigger Sizing */}
              <button
                type="submit"
                id="submit-structural-estimate-btn"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-[#C5A267] hover:bg-white text-black py-4 rounded-xl font-display text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#C5A267]/10 cursor-pointer animate-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-black" />
                    <span>Processing Structural Model...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Sizing & Takeoff</span>
                    <ArrowRight className="h-4 w-4 text-black" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Loading or Results */}
          <div className="lg:col-span-7 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* Default Empty State */}
              {!isLoading && !estimateResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-8 bg-[#111317] border border-white/5 rounded-2xl shadow-2xl text-center border-dashed"
                >
                  <div className="h-16 w-16 bg-white/5 text-zinc-600 rounded-full flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-[#C5A267]" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white uppercase tracking-widest">
                    Engine Offline
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 max-w-sm mt-1 leading-relaxed">
                    Awaiting building structural inputs. Specify your project specifications on the left panel and activate the structural calculations parser.
                  </p>
                </motion.div>
              )}

              {/* Active Loading State */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-8 bg-[#111317] border border-white/5 rounded-2xl shadow-2xl text-center min-h-[500px] bg-blueprint-grid-dark"
                >
                  <div className="relative h-20 w-20 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 border-4 border-t-[#C5A267] border-white/5 rounded-full animate-spin"></div>
                    <HardHat className="h-8 w-8 text-white animate-bounce" />
                  </div>
                  
                  <span className="font-mono text-[9px] text-[#C5A267] uppercase tracking-widest font-extrabold animate-pulse mb-2">
                    Calculating Cost & Takeoff Schedules
                  </span>
                  
                  <p className="font-sans text-xs font-semibold text-white max-w-md h-8 transition-all duration-300">
                    {loadingPhase}
                  </p>
                  
                  <div className="mt-8 p-4 bg-black/40 border border-white/5 rounded-xl max-w-xs">
                    <p className="font-mono text-[8px] text-zinc-500 uppercase leading-snug">
                      STABILITY RATIO COMPLIANCE GUARANTEE UNDER IBC SECTION 1604 GENERAL DESIGN LIMITS
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Sizing & Takeoff Results Card */}
              {!isLoading && estimateResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  id="print-section"
                  className="bg-[#111317] border border-white/5 p-6 rounded-2xl shadow-2xl space-y-6"
                >
                  
                  {/* Results Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white/5 gap-4">
                    <div>
                      <span className="font-mono text-[8px] bg-white/5 text-[#C5A267] px-2.5 py-1 rounded-full border border-white/5 font-bold tracking-wider">
                        ESTIMATE FILE APPROVED
                      </span>
                      <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase mt-1">
                        Sizing Report: {estimateResult.projectName}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePrint}
                        title="Print Stamped Document"
                        className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 transition-all flex items-center space-x-1.5 font-mono text-[10px] uppercase font-bold px-4 py-2 cursor-pointer"
                      >
                        <Printer className="h-3.5 w-3.5 text-[#C5A267]" />
                        <span>Print</span>
                      </button>

                      <button
                        onClick={() => setShowInquirySubmit(true)}
                        className="px-4 py-2 bg-[#C5A267] hover:bg-white text-black rounded-xl font-sans text-[11px] font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-[#C5A267]/15"
                      >
                        <Send className="h-3.5 w-3.5 text-black" />
                        <span>Submit to Studio</span>
                      </button>
                    </div>
                  </div>

                  {/* Pricing Estimation Range Meter */}
                  <div className="bg-black/30 border border-white/5 p-5 rounded-2xl">
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">
                      Preliminary Sizing Construction Cost Range (USD)
                    </span>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-display text-2xl font-black text-white">
                        ${estimateResult.costEstimation.minCost.toLocaleString()}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 font-bold uppercase">To</span>
                      <span className="font-display text-2xl font-black text-[#C5A267]">
                        ${estimateResult.costEstimation.maxCost.toLocaleString()}
                      </span>
                    </div>

                    {/* Sizing indicator slider visual */}
                    <div className="relative h-2 bg-black rounded-full overflow-hidden border border-white/5">
                      <div className="absolute left-[20%] right-[20%] h-full bg-[#C5A267]/20 rounded-full" />
                      <div className="absolute left-1/2 -ml-1 h-full w-2 bg-[#C5A267]" />
                    </div>
                    <div className="flex justify-between font-mono text-[7px] text-zinc-500 uppercase tracking-tight mt-1.5">
                      <span>Low variance bounds (-10%)</span>
                      <span>Target Sizing Median</span>
                      <span>High variance bounds (+15%)</span>
                    </div>
                  </div>

                  {/* Material Takeoffs Sizing list */}
                  <div>
                    <span className="block font-mono text-[9px] text-[#C5A267] uppercase tracking-widest font-bold mb-2">
                      Sized Material Takeoff Schedules
                    </span>
                    <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20">
                      <table className="w-full text-left font-mono text-[10px]">
                        <thead>
                          <tr className="bg-white/5 text-zinc-400 uppercase font-bold border-b border-white/5">
                            <th className="p-2.5">Material Specification</th>
                            <th className="p-2.5 text-right">Quantity</th>
                            <th className="p-2.5">Target Sizing Unit</th>
                            <th className="p-2.5">Structural Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {estimateResult.materialTakeoff.map((takeoff, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="p-2.5 font-bold text-white">{takeoff.material}</td>
                              <td className="p-2.5 text-right font-bold text-[#C5A267]">{takeoff.estimatedQuantity.toLocaleString()}</td>
                              <td className="p-2.5 text-zinc-400">{takeoff.unit}</td>
                              <td className="p-2.5 text-zinc-500 normal-case font-sans text-xs">{takeoff.purpose}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Cost Categories Percentage Breakdown bar visuals */}
                  <div>
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-3">
                      Structural Segment Allocations
                    </span>
                    <div className="space-y-3.5">
                      {estimateResult.costEstimation.breakdown.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline text-xs font-semibold">
                            <span className="text-white font-sans">{item.category}</span>
                            <div className="flex items-center space-x-1.5 font-mono text-[10px]">
                              <span className="text-zinc-500">({item.percentage}%)</span>
                              <span className="text-white font-bold">${item.estimatedAmount.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="relative h-2 bg-black rounded-full border border-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className="h-full rounded-full bg-[#C5A267]"
                              style={{ backgroundColor: idx === 0 ? "#C5A267" : idx === 4 ? "#FFFFFF" : "#555555" }}
                            />
                          </div>
                          <p className="font-sans text-[10px] text-zinc-500">
                            {item.notes}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Recommendations Box */}
                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                    <span className="block font-mono text-[9px] text-[#C5A267] uppercase tracking-widest font-extrabold flex items-center space-x-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#C5A267]" />
                      <span>RSE Structural Recommendations</span>
                    </span>
                    <ul className="space-y-2 font-sans text-xs text-zinc-400 leading-relaxed pl-1">
                      {estimateResult.structuralRecommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-[#C5A267] font-bold text-xs mt-0.5">&bull;</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sizing timeline schedule */}
                  <div>
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-2">
                      Standard Engineering Phases Schedule
                    </span>
                    <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20">
                      <div className="grid grid-cols-12 bg-white/5 p-3 font-mono text-[9px] uppercase font-bold border-b border-white/5">
                        <div className="col-span-5">Engineering Phase</div>
                        <div className="col-span-2 text-right">Duration</div>
                        <div className="col-span-5 pl-4">Core Deliverables & Audits</div>
                      </div>
                      <div className="divide-y divide-white/5 font-sans text-xs">
                        {estimateResult.engineeringTimeline.map((time, idx) => (
                          <div key={idx} className="grid grid-cols-12 p-3 hover:bg-white/5 transition-colors">
                            <div className="col-span-5 font-bold text-white">{time.phase}</div>
                            <div className="col-span-2 text-right font-mono text-[10px] font-bold text-[#C5A267]">{time.durationWeeks} Weeks</div>
                            <div className="col-span-5 text-zinc-400 pl-4">{time.deliverables}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Civil code compliance note */}
                  <div className="pt-4 border-t border-white/5 font-mono text-[9px] text-zinc-500 leading-normal bg-black/40 p-4 rounded-xl border border-white/5">
                    <span className="block font-bold text-zinc-300 uppercase text-[8px] tracking-wider mb-1">
                      IBC Chapter 16 regulatory code risk assessment
                    </span>
                    {estimateResult.regulatoryRiskAssessment}
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Slide-over Form to Submit Spec to pipeline */}
      <AnimatePresence>
        {showInquirySubmit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowInquirySubmit(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md bg-[#111317] border border-white/5 p-6 rounded-2xl shadow-2xl bg-blueprint-grid-dark"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-base font-bold tracking-tight text-white pb-3 border-b border-white/5 uppercase">
                Submit Spec to Pipeline
              </h3>
              
              {isSubmittedToPipeline ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle className="h-12 w-12 text-[#C5A267] mx-auto animate-bounce" />
                  <h4 className="font-display text-sm font-bold text-white uppercase">
                    Spec Submitted Successfully!
                  </h4>
                  <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-relaxed">
                    Sizing registered in active studio database. Redirecting...
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePipelineSubmit} className="mt-4 space-y-4">
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    Submit this calculated structural specification block directly to Rida Sarfaraz Engineering's validation system. Our Principal PE will audit the structural integrity.
                  </p>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1">
                      Client Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1">
                      Professional Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="jane.doe@clt-developer.com"
                      className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl px-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                    />
                  </div>

                  <div className="pt-4 flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowInquirySubmit(false)}
                      className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-sans text-xs font-bold uppercase transition-all border border-white/5 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#C5A267] hover:bg-white text-black rounded-xl font-sans text-xs font-bold uppercase tracking-wide transition-all cursor-pointer"
                    >
                      Confirm Submit
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
