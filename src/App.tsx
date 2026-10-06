/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SubmittedInquiry, EstimateSpecs, EstimateResult } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import AIEstimateSection from "./components/AIEstimateSection";
import InquiryManager from "./components/InquiryManager";
import ContactSection from "./components/ContactSection";
import { Hammer, Ruler, Shield, ClipboardCheck, ArrowUpRight } from "lucide-react";

// Pre-seeded high-fidelity engineering project records for pipeline demo
const SEED_INQUIRIES: SubmittedInquiry[] = [
  {
    id: "inq-seed-01",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    clientName: "Arthur Pendelton (Pacific Developers)",
    clientEmail: "arthur@pacific-dev-group.com",
    clientPhone: "+1 (415) 880-9241",
    specs: {
      buildingType: "Commercial",
      footprintArea: 12000,
      floorsCount: 15,
      structuralSystem: "Reinforced Concrete",
      siteLocation: "Market St, San Francisco, CA",
      seismicZone: "Very High",
      windSpeed: 130,
      foundationType: "Deep Pile Foundation",
      sustainabilityFocus: true,
      additionalNotes: "Requested high-strength composite outriggers, dynamic peer reviews, and LEED gold carbon-neutral tracking indices."
    },
    result: {
      projectName: "RSE-SEC-840-SF",
      costEstimation: {
        minCost: 45000000,
        maxCost: 52000000,
        breakdown: [
          { category: "Structural Frame & Foundations", percentage: 38, estimatedAmount: 17100000, notes: "Reinforced core concrete C60 + steel buckling-restrained bracing." },
          { category: "Enclosure & Facade", percentage: 18, estimatedAmount: 8100000, notes: "Triple-glazed high deflection curtain walls." },
          { category: "MEP & Life Safety Systems", percentage: 22, estimatedAmount: 9900000, notes: "Central HVAC seismic damping, high-volume fire pumps." },
          { category: "Architectural Finishes", percentage: 16, estimatedAmount: 7200000, notes: "Acoustical treatments and commercial tenant partitions." },
          { category: "Permits, Surveying, Engineering Fees", percentage: 6, estimatedAmount: 2700000, notes: "Geotechnical boring audits, peer analysis stamping, PE review." }
        ]
      },
      materialTakeoff: [
        { material: "Concrete (C60/75 High-Strength)", estimatedQuantity: 27000, unit: "m³", purpose: "Shear core casting, structural outrigger outlays" },
        { material: "Steel Rebar (ASTM A615 Grade 75)", estimatedQuantity: 2250000, unit: "kg", purpose: "High-yield structural concrete reinforcement columns" },
        { material: "Deep Friction Steel Piles (48 inch diam)", estimatedQuantity: 180, unit: "units", purpose: "Bedrock anchoring deep friction foundation" }
      ],
      structuralRecommendations: [
        "Dynamic high-displacement shear cores required.",
        "Include continuous vertical column post-tensioning.",
        "Seismic drift ratios must not exceed 1.5% under max design earthquake."
      ],
      engineeringTimeline: [
        { phase: "Pre-construction Surveys", durationWeeks: 4, deliverables: "Seismic boring logs, site response spectras" },
        { phase: "Schematic Calculations & ETABS Model", durationWeeks: 8, deliverables: "3D finite element dynamic modal audit logs" },
        { phase: "PE-Stamped Final Documentation", durationWeeks: 10, deliverables: "Structural blueprints packet, PE review stamp" }
      ],
      regulatoryRiskAssessment: "Evaluation completed under ASCE 7-22 Section 12 Seismic Design. Matched strict peer-review criteria. Structural Peer Review mandated under San Francisco building bulletin guidelines."
    },
    status: "Seismic Model Verified"
  },
  {
    id: "inq-seed-02",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    clientName: "Mark Sterling (Malibu Crest org)",
    clientEmail: "m.sterling@malibu-crests.org",
    clientPhone: "+1 (310) 555-1024",
    specs: {
      buildingType: "Residential",
      footprintArea: 4200,
      floorsCount: 2,
      structuralSystem: "Structural Steel",
      siteLocation: "Malibu Cliffline Road, CA",
      seismicZone: "High",
      windSpeed: 145,
      foundationType: "Raft/Mat Foundation",
      sustainabilityFocus: false,
      additionalNotes: "Desires extreme clear-view spans, structural double cantilever of 24ft overhang, and marine salt-water corrosion protections."
    },
    result: {
      projectName: "RSE-CANT-201-LA",
      costEstimation: {
        minCost: 21000000,
        maxCost: 26000000,
        breakdown: [
          { category: "Structural Frame & Foundations", percentage: 40, estimatedAmount: 840000, notes: "Exposed architectural steel diagrids + helical soil anchor ties." },
          { category: "Enclosure & Facade", percentage: 22, estimatedAmount: 462000, notes: "Seawater corrosion resistant structural glazing structures." },
          { category: "MEP & Life Safety Systems", percentage: 20, estimatedAmount: 420000, notes: "Advanced coastal HVAC and backup generation." },
          { category: "Architectural Finishes", percentage: 14, estimatedAmount: 294000, notes: "Concrete flooring finish, minimalist interior layouts." },
          { category: "Permits, Surveying, Engineering Fees", percentage: 4, estimatedAmount: 84000, notes: "Coastal commission compliance review, PE structural stamping." }
        ]
      },
      materialTakeoff: [
        { material: "Structural Hollow steel tubes (HSS)", estimatedQuantity: 135, unit: "tons", purpose: "Exposed cantilever framing, support diagonals" },
        { material: "Post-tensioned concrete slab (C40)", estimatedQuantity: 850, unit: "m³", purpose: "Structural floor diaphragms with epoxy rebars" }
      ],
      structuralRecommendations: [
        "Helical active tension ground anchors required to secure cliff edge.",
        "Anti-corrosive duplex coatings specified for all exposed steel structures.",
        "Wind load suction requires facade connections designed for Coastal Zone D."
      ],
      engineeringTimeline: [
        { phase: "Topographical Analysis & Anchor Testing", durationWeeks: 3, deliverables: "Pullout strength validation, bedrock shear logs" },
        { phase: "Diagrid Connection Detailing", durationWeeks: 5, deliverables: "3D structural welding specs, connection load sheets" }
      ],
      regulatoryRiskAssessment: "Coastal development zone requires structural review under Malibu Cliffside Stability Code. Sized specifically for high-suction ASCE 7 velocity profiles."
    },
    status: "Pending Sizing Audit"
  }
];

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>([]);

  // Load inquiries from Local Storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rse_structural_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved inquiries:", e);
        setInquiries(SEED_INQUIRIES);
      }
    } else {
      // Seed initial entries for a fully populated, gorgeous registry out-of-the-box
      setInquiries(SEED_INQUIRIES);
      localStorage.setItem("rse_structural_inquiries", JSON.stringify(SEED_INQUIRIES));
    }
  }, []);

  // Sync back to local storage whenever state changes
  const saveToLocalStorage = (data: SubmittedInquiry[]) => {
    setInquiries(data);
    localStorage.setItem("rse_structural_inquiries", JSON.stringify(data));
  };

  const handleAddInquiry = (specs: EstimateSpecs, result: EstimateResult, clientName: string, clientEmail: string, clientPhone: string) => {
    const newInq: SubmittedInquiry = {
      id: `inq-usr-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      clientName,
      clientEmail,
      clientPhone,
      specs,
      result,
      status: "Pending Sizing Audit"
    };
    
    const updated = [newInq, ...inquiries];
    saveToLocalStorage(updated);
  };

  const handleUpdateStatus = (id: string, status: SubmittedInquiry["status"]) => {
    const updated = inquiries.map((inq) => 
      inq.id === id ? { ...inq, status } : inq
    );
    saveToLocalStorage(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    saveToLocalStorage(updated);
  };

  return (
    <div id="application-root-node" className="flex flex-col min-h-screen bg-[#0A0B0D] text-white selection:bg-[#C5A267]/30 selection:text-white">
      
      {/* Universal Header */}
      <Header 
        currentSection={currentSection} 
        setCurrentSection={(sec) => {
          setIsAdminMode(false);
          setCurrentSection(sec);
        }}
        onOpenAdmin={() => setIsAdminMode(!isAdminMode)}
        isAdminMode={isAdminMode}
      />

      {/* Main Core Views wrapped in Framer Motion seamless sliding layout transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
            >
              <InquiryManager 
                inquiries={inquiries}
                onUpdateStatus={handleUpdateStatus}
                onDeleteInquiry={handleDeleteInquiry}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {currentSection === "home" && (
                <div id="home-view-group">
                  {/* Hero & Interactive Sizer load simulator */}
                  <Hero 
                    onStartEstimate={() => setCurrentSection("estimator")}
                    onExploreCapabilities={() => setCurrentSection("services")}
                  />
                  
                  {/* Structural Overview features bento bar */}
                  <section id="highlights-bar" className="bg-[#111317] border-y border-white/5 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2 flex items-start space-x-3.5">
                        <div className="h-10 w-10 shrink-0 bg-white/5 text-[#C5A267] flex items-center justify-center rounded-xl border border-white/5 font-mono text-sm font-bold">01</div>
                        <div>
                          <h3 className="font-display text-xs font-bold uppercase text-white tracking-[0.15em]">6+ Years Experience</h3>
                          <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">Extensive expertise working with both local Pakistani constructions and high-profile international developers.</p>
                        </div>
                      </div>

                      <div className="space-y-2 flex items-start space-x-3.5">
                        <div className="h-10 w-10 shrink-0 bg-white/5 text-[#C5A267] flex items-center justify-center rounded-xl border border-white/5 font-mono text-sm font-bold">02</div>
                        <div>
                          <h3 className="font-display text-xs font-bold uppercase text-white tracking-[0.15em]">Sizer Cost Savings</h3>
                          <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">Rigorous material takeoff calculations and structural sizing checks saving up to 20% in overall framing weight.</p>
                        </div>
                      </div>

                      <div className="space-y-2 flex items-start space-x-3.5">
                        <div className="h-10 w-10 shrink-0 bg-white/5 text-[#C5A267] flex items-center justify-center rounded-xl border border-white/5 font-mono text-sm font-bold">03</div>
                        <div>
                          <h3 className="font-display text-xs font-bold uppercase text-white tracking-[0.15em]">Codes & Standards</h3>
                          <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">Full compliance with localized codes (IBC, Eurocodes, and ASTM) ensuring absolute structural safety and integrity.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Portfolio section displayed prominently on Home */}
                  <PortfolioSection />

                  {/* Contact Section at bottom of Home for seamless reach-out */}
                  <ContactSection onAddInquiry={handleAddInquiry} />
                </div>
              )}

              {currentSection === "services" && <ServicesSection />}

              {currentSection === "portfolio" && <PortfolioSection />}

              {currentSection === "estimator" && (
                <AIEstimateSection onAddInquiry={handleAddInquiry} />
              )}

              {currentSection === "contact" && (
                <ContactSection onAddInquiry={handleAddInquiry} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer 
        onOpenAdmin={() => setIsAdminMode(true)}
        setCurrentSection={(sec) => {
          setIsAdminMode(false);
          setCurrentSection(sec);
        }}
      />
    </div>
  );
}

