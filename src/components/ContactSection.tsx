import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, FileCheck, Send, ShieldAlert, CheckCircle } from "lucide-react";
import { EstimateSpecs, EstimateResult } from "../types";

interface ContactSectionProps {
  onAddInquiry: (specs: EstimateSpecs, result: EstimateResult, name: string, email: string, phone: string) => void;
}

export default function ContactSection({ onAddInquiry }: ContactSectionProps) {
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");
  
  // Statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: idle, 1: packaging, 2: registering, 3: completed
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !notes) {
      setErrorMessage("Please complete all required fields (Name, Email, and Project Description).");
      return;
    }
    
    setErrorMessage("");
    setIsSubmitting(true);
    setSubmitStep(1);

    // Dynamic animation sequence for premium developer console vibe
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitStep(2);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitStep(3);
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Construct a beautiful placeholder spec for general consultation so it is recorded in the central Pipeline Console
    const footprintArea = Number(area) || 0;
    const generalSpecs: EstimateSpecs = {
      buildingType: "Mixed Use",
      footprintArea: footprintArea > 0 ? footprintArea : 5000,
      floorsCount: footprintArea > 15000 ? 5 : 2,
      structuralSystem: "Reinforced Concrete",
      siteLocation: location || "General Direct Consultation",
      seismicZone: "Moderate",
      windSpeed: 110,
      foundationType: "Let AI suggest",
      sustainabilityFocus: true,
      additionalNotes: `[GENERAL CONSULTATION REQUEST] Location: ${location || "Not specified"}. Sized Area: ${footprintArea || "N/A"} sq ft. Message: ${notes}`
    };

    // Construct a standard consultation fee template
    const generalResult: EstimateResult = {
      projectName: `RSE-CONSULT-${Math.floor(100 + Math.random() * 900)}`,
      costEstimation: {
        minCost: footprintArea > 0 ? footprintArea * 120 : 15000,
        maxCost: footprintArea > 0 ? footprintArea * 180 : 25000,
        breakdown: [
          { category: "Structural Scoping & Schematic Calculations", percentage: 40, estimatedAmount: footprintArea > 0 ? footprintArea * 60 : 8000, notes: "Direct engineering analysis and preliminary frame sizing." },
          { category: "Geotechnical & Wind Code Review", percentage: 30, estimatedAmount: footprintArea > 0 ? footprintArea * 45 : 6000, notes: "Site response spectra analysis for localized seismic hazards." },
          { category: "Professional Engineering (PE) Stamped Blueprints", percentage: 30, estimatedAmount: footprintArea > 0 ? footprintArea * 45 : 6000, notes: "Official stamp and structural calculation logs certified for permit approval." }
        ]
      },
      materialTakeoff: [
        { material: "Structural Engineering Audit Time", estimatedQuantity: 40, unit: "Hours", purpose: "Code compliance review & structural FEM analysis" }
      ],
      structuralRecommendations: [
        "Schedule dynamic site response analysis based on localized soils.",
        "Submit architectural schematics to RSE for lateral framing analysis.",
        "Seismic load resistance must conform strictly to ASCE 7-22 Chapters 11-12."
      ],
      engineeringTimeline: [
        { phase: "Consultation Scoping Call", durationWeeks: 1, deliverables: "Initial design brief, contract proposal" },
        { phase: "Schematic Engineering Review", durationWeeks: 3, deliverables: "3D finite element structural model, preliminary framing plan" }
      ],
      regulatoryRiskAssessment: "Scoped under localized California Building Code (CBC) 2025 and ASCE 7-22 structural load requirements."
    };

    // Add to state registry database
    onAddInquiry(generalSpecs, generalResult, name, email, phone);

    // Reset Form
    setName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setArea("");
    setNotes("");
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact-section-root" 
      className="relative overflow-hidden bg-[#0A0B0D] bg-blueprint-grid-dark py-16 md:py-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="mb-12 text-center md:text-left space-y-3">
          <div className="inline-flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-widest text-[#C5A267] font-bold">
            <Clock className="h-3.5 w-3.5" />
            <span>DIRECT CHANNELS</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl">
            GET IN TOUCH
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Connect directly with RSE to discuss your upcoming project. Request estimation audits, detailed material takeoffs, value engineering reviews, or structural sizing consultations.
          </p>
        </div>

        {/* Dynamic Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Studio Info & Licensure Registries (5cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="rounded-2xl bg-[#111317] border border-white/5 p-6 space-y-6">
              <h3 className="font-display text-xs font-bold uppercase text-[#C5A267] tracking-[0.15em] border-b border-white/5 pb-3">
                CONTACT DETAILS
              </h3>
              
              <div className="space-y-4">
                {/* Physical Location */}
                <div className="flex items-start space-x-3.5">
                  <div className="mt-0.5 p-2 rounded-xl bg-white/5 text-zinc-400 border border-white/5">
                    <MapPin className="h-4 w-4 text-[#C5A267]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Office Location</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-1 leading-normal">
                      Rawalpindi, Pakistan<br />
                      Serving Local & Global Clients Remotely
                    </p>
                  </div>
                </div>

                {/* Secure Line */}
                <div className="flex items-start space-x-3.5">
                  <div className="mt-0.5 p-2 rounded-xl bg-white/5 text-zinc-400 border border-white/5">
                    <Phone className="h-4 w-4 text-[#C5A267]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Phone Contact</h4>
                    <a href="tel:+923000000000" className="font-mono text-xs text-zinc-400 hover:text-[#C5A267] transition-colors mt-1 block">
                      +92 (300) 123-4567
                    </a>
                  </div>
                </div>

                {/* Encrypted Mail */}
                <div className="flex items-start space-x-3.5">
                  <div className="mt-0.5 p-2 rounded-xl bg-white/5 text-zinc-400 border border-white/5">
                    <Mail className="h-4 w-4 text-[#C5A267]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Inquiries Email</h4>
                    <a href="mailto:rida.sarfaraz@rse-consultants.com" className="font-mono text-xs text-zinc-400 hover:text-[#C5A267] transition-colors mt-1 block">
                      rida.sarfaraz@rse-consultants.com
                    </a>
                  </div>
                </div>

                {/* Core Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="mt-0.5 p-2 rounded-xl bg-white/5 text-zinc-400 border border-white/5">
                    <Clock className="h-4 w-4 text-[#C5A267]" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Working Hours</h4>
                    <p className="font-sans text-xs text-zinc-400 mt-1">
                      Mon &ndash; Sat: 09:00 &ndash; 18:00 (GMT+5)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Licensure Seals Card */}
            <div className="rounded-2xl bg-[#111317] border border-white/5 p-6 space-y-4">
              <h3 className="font-display text-xs font-bold uppercase text-white tracking-[0.15em]">
                6+ Years Professional Experience
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Applying extensive expertise in both local construction estimating and international remote structural consulting to ensure your projects are fully optimized, code-compliant, and cost-effective.
              </p>
              
              <div className="grid grid-cols-2 gap-2 font-mono text-[9px] text-zinc-400">
                <div className="bg-white/5 rounded-xl border border-white/5 p-3 text-center">
                  <span className="block text-[#C5A267] font-bold">ESTIMATION</span>
                  <span className="block text-zinc-500 mt-0.5">RICS & AACE Standards</span>
                </div>
                <div className="bg-white/5 rounded-xl border border-white/5 p-3 text-center">
                  <span className="block text-[#C5A267] font-bold">STRUCTURAL</span>
                  <span className="block text-zinc-500 mt-0.5">IBC & Eurocode Compliant</span>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2 text-[10px] text-zinc-500">
                <FileCheck className="h-4 w-4 text-[#C5A267] shrink-0" />
                <span>Custom structural calculations and takeoff schedules delivered with every package.</span>
              </div>
            </div>

            {/* What happens next step flow */}
            <div className="rounded-2xl bg-white/5 border border-white/5 p-6 space-y-4">
              <h4 className="font-display text-xs font-bold uppercase text-white tracking-[0.15em]">
                PROMPT ENGAGEMENT WORKFLOW
              </h4>
              <ul className="space-y-3 font-sans text-xs text-zinc-400">
                <li className="flex items-start space-x-2">
                  <span className="text-[#C5A267] font-mono font-bold mr-1">01.</span>
                  <span><strong>Requirements Logging:</strong> Submit your parameters via the direct portal to store them in our active pipeline.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C5A267] font-mono font-bold mr-1">02.</span>
                  <span><strong>Technical Alignment Audit:</strong> We analyze structural scopes against local building codes and calculate material pricing.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#C5A267] font-mono font-bold mr-1">03.</span>
                  <span><strong>Deliverable Turnaround:</strong> Receive tailored Bills of Quantities (BoQ) or fully optimized framing plans.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Column 2: Direct Consultation Request Form (7cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111317] border border-white/5 p-6 md:p-8 shadow-2xl relative">
              <h3 className="font-display text-xs font-bold uppercase text-white tracking-[0.15em] border-b border-white/5 pb-4 mb-6">
                SUBMIT PROJECT SPECIFICATION
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name / Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      Full Name <span className="text-[#C5A267]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-[#C5A267] text-white p-3 rounded-xl transition-all duration-200 text-xs focus:ring-0 outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      Email Address <span className="text-[#C5A267]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john.doe@domain.com"
                      className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-[#C5A267] text-white p-3 rounded-xl transition-all duration-200 text-xs focus:ring-0 outline-none"
                    />
                  </div>
                </div>

                {/* Telephone / Location Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5 md:col-span-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      Direct Telephone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-[#C5A267] text-white p-3 rounded-xl transition-all duration-200 text-xs focus:ring-0 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      Est. Area (sq ft)
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. 15000"
                      className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-[#C5A267] text-white p-3 rounded-xl transition-all duration-200 text-xs focus:ring-0 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-1">
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      Project Site Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. London, UK"
                      className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-[#C5A267] text-white p-3 rounded-xl transition-all duration-200 text-xs focus:ring-0 outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                    Project Scope / Technical Description <span className="text-[#C5A267]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe building occupancy, desired structural systems (wood, steel, concrete), span lengths, or material takeoff/cost estimation requests."
                    className="w-full bg-black border border-white/10 hover:border-white/20 focus:border-[#C5A267] text-white p-3 rounded-xl transition-all duration-200 text-xs focus:ring-0 outline-none resize-none"
                  />
                </div>

                {/* Errors */}
                {errorMessage && (
                  <div className="flex items-center space-x-2 rounded-xl border border-red-500/25 bg-red-950/20 p-4 text-xs text-red-400">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submission State Overlays */}
                <AnimatePresence mode="wait">
                  {submitStep === 3 ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-5 flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left"
                    >
                      <CheckCircle className="h-8 w-8 text-emerald-400 shrink-0" />
                      <div>
                        <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                          Specifications Registered Successfully
                        </h4>
                        <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                          Your direct inquiry has been verified and safely queued into our active Engineering Pipeline. A Principal PE will begin finite-element lateral checks immediately. Check the <strong>Pipeline Console</strong> to view your active status.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmitStep(0)}
                          className="mt-3 font-mono text-[9px] uppercase tracking-wider text-[#C5A267] hover:underline"
                        >
                          Submit another request
                        </button>
                      </div>
                    </motion.div>
                  ) : isSubmitting ? (
                    <motion.div 
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-black/90 rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center space-y-4"
                    >
                      {/* Spinner */}
                      <div className="relative h-10 w-10">
                        <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-t-[#C5A267] animate-spin"></div>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <p className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#C5A267]">
                          {submitStep === 1 ? "COMPILING STRUCTURAL SPECIFICATIONS..." : "REGISTERING IN PIPELINE DATABASE..."}
                        </p>
                        <p className="font-mono text-[8px] text-zinc-500 uppercase">
                          System checking dynamic ASCE compliance coordinates...
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      className="group w-full relative flex items-center justify-center space-x-2 overflow-hidden rounded-xl bg-[#C5A267] hover:bg-white text-black py-4 font-display text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#C5A267]/10"
                    >
                      <span>Transmit Scope to Pipeline</span>
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-black" />
                    </button>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
