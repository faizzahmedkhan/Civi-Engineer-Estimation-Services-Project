import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SubmittedInquiry } from "../types";
import { FileCheck, Search, Filter, ShieldCheck, ChevronRight, Trash2, Calendar, ClipboardCheck, ArrowLeft, Layers, Landmark } from "lucide-react";

interface InquiryManagerProps {
  inquiries: SubmittedInquiry[];
  onUpdateStatus: (id: string, status: SubmittedInquiry["status"]) => void;
  onDeleteInquiry: (id: string) => void;
}

export default function InquiryManager({ inquiries, onUpdateStatus, onDeleteInquiry }: InquiryManagerProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<SubmittedInquiry | null>(null);

  // Status categories
  const statuses: SubmittedInquiry["status"][] = [
    "Pending Sizing Audit",
    "Seismic Model Verified",
    "Site Visit Scheduled",
    "PE-Stamped Approved"
  ];

  // Filtering logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.result.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "All" || inq.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <section 
      id="pipeline-manager-panel" 
      className="bg-[#0A0B0D] py-12 min-h-[600px] border-b border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Panel Header */}
        <div className="border-b border-white/5 pb-5 mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[10px] font-bold text-[#C5A267] uppercase tracking-widest">
              <ClipboardCheck className="h-4 w-4 text-[#C5A267]" />
              <span>Internal Systems</span>
            </div>
            <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
              RSE Engineering Pipeline Console
            </h2>
            <p className="font-sans text-xs text-zinc-400 max-w-lg leading-relaxed">
              Inquiry review panel. Inspect client parameters, verify calculated material takeoff logs, and update estimation review statuses.
            </p>
          </div>

          {/* Sizing indicators count */}
          <div className="flex space-x-4 font-mono text-[10px] text-zinc-400 uppercase">
            <div className="px-4 py-2 bg-[#111317] rounded-xl border border-white/5 font-bold">
              Total Specs: <span className="font-bold text-white ml-1">{inquiries.length}</span>
            </div>
            <div className="px-4 py-2 bg-[#111317] rounded-xl border border-white/5 font-bold">
              Pending review: <span className="font-bold text-[#C5A267] ml-1">
                {inquiries.filter((i) => i.status === "Pending Sizing Audit").length}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Sizing Viewer split frame */}
        {selectedInquiry ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Back to pipeline index */}
            <div className="col-span-12">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-400 hover:text-[#C5A267] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Active Pipeline Registry</span>
              </button>
            </div>

            {/* Left side: Inquiry details summary */}
            <div className="lg:col-span-4 bg-[#111317] border border-white/5 p-6 rounded-2xl shadow-2xl space-y-5">
              <div className="pb-3 border-b border-white/5">
                <span className="font-mono text-[8px] bg-white/5 text-[#C5A267] px-2.5 py-1 rounded-full border border-white/5 font-bold uppercase tracking-wider">
                  ACTIVE CASE FILE
                </span>
                <h3 className="font-display text-base font-bold text-white mt-2.5 uppercase tracking-wider">
                  {selectedInquiry.result.projectName}
                </h3>
              </div>

              {/* Client specifications contacts details */}
              <div className="space-y-3 font-sans text-xs text-zinc-400">
                <h4 className="font-mono text-[9px] text-[#C5A267] uppercase font-bold tracking-wider">
                  Client Contact Block
                </h4>
                <div>
                  <span className="block font-semibold text-white text-sm">{selectedInquiry.clientName}</span>
                  <span className="block text-zinc-500 mt-0.5">{selectedInquiry.clientEmail}</span>
                  {selectedInquiry.clientPhone && <span className="block font-mono text-[10px] text-zinc-500 mt-1">{selectedInquiry.clientPhone}</span>}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                  <span>Submitted: {new Date(selectedInquiry.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Status modifiers control */}
              <div className="pt-4 border-t border-white/5 space-y-2.5">
                <label className="block font-mono text-[9px] text-[#C5A267] uppercase font-bold tracking-wider">
                  Update Sizing Pipeline Status
                </label>
                <div className="space-y-1.5">
                  {statuses.map((stat) => (
                    <button
                      key={stat}
                      onClick={() => onUpdateStatus(selectedInquiry.id, stat)}
                      className={`w-full py-2 px-3 rounded-xl border font-mono text-[10px] text-left uppercase transition-all duration-150 cursor-pointer ${
                        selectedInquiry.status === stat
                          ? "bg-[#C5A267] border-[#C5A267] text-black font-black"
                          : "bg-[#0A0B0D] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span className="inline-block w-2 h-2 rounded-full mr-2" style={{
                        backgroundColor: stat === "PE-Stamped Approved" ? "#22c55e" : stat === "Site Visit Scheduled" ? "#3b82f6" : "#C5A267"
                      }} />
                      <span>{stat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger Actions list */}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    onDeleteInquiry(selectedInquiry.id);
                    setSelectedInquiry(null);
                  }}
                  className="w-full py-2.5 bg-red-500/10 hover:bg-red-600 hover:text-white border border-red-500/20 text-red-400 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Purge Case Record</span>
                </button>
              </div>
            </div>

            {/* Right side: Sizing specs details & calculations list */}
            <div className="lg:col-span-8 bg-[#111317] border border-white/5 p-6 rounded-2xl shadow-2xl space-y-6 bg-blueprint-grid-dark">
              
              {/* Sizing block description */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-4 border-b border-white/5">
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase">Building Type</span>
                  <span className="font-display text-xs font-bold text-white uppercase">{selectedInquiry.specs.buildingType}</span>
                </div>
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase">Total Area</span>
                  <span className="font-display text-xs font-bold text-white">{selectedInquiry.specs.footprintArea * selectedInquiry.specs.floorsCount} sq ft</span>
                </div>
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase">System Sized</span>
                  <span className="font-display text-xs font-bold text-white uppercase">{selectedInquiry.specs.structuralSystem}</span>
                </div>
                <div className="p-3.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="block font-mono text-[8px] text-zinc-500 uppercase">Seismic Zone</span>
                  <span className="font-display text-xs font-bold text-[#C5A267] uppercase">{selectedInquiry.specs.seismicZone}</span>
                </div>
              </div>

              {/* Costs takeoffs block duplication */}
              <div className="space-y-4">
                <h4 className="font-mono text-[9px] text-[#C5A267] uppercase font-bold tracking-wider">
                  Sized Cost Calculations Schedulers
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase">Minimum cost median bounds</span>
                    <span className="block font-display text-xl font-bold text-white">${selectedInquiry.result.costEstimation.minCost.toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase">Maximum cost median bounds</span>
                    <span className="block font-display text-xl font-bold text-[#C5A267]">${selectedInquiry.result.costEstimation.maxCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Material takeoff duplication list */}
              <div className="space-y-2">
                <h4 className="font-mono text-[9px] text-[#C5A267] uppercase font-bold tracking-wider">
                  Material Takeoffs Approved Schedulers
                </h4>
                <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20">
                  <table className="w-full text-left font-mono text-[9px]">
                    <thead>
                      <tr className="bg-white/5 text-zinc-400 uppercase border-b border-white/5 font-bold">
                        <th className="p-2.5">Material</th>
                        <th className="p-2.5 text-right">Qty</th>
                        <th className="p-2.5">Unit</th>
                        <th className="p-2.5">Purpose Sizing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {selectedInquiry.result.materialTakeoff.map((mat, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="p-2.5 font-bold text-white">{mat.material}</td>
                          <td className="p-2.5 text-right font-bold text-[#C5A267]">{mat.estimatedQuantity.toLocaleString()}</td>
                          <td className="p-2.5 text-zinc-400">{mat.unit}</td>
                          <td className="p-2.5 text-zinc-500 font-sans text-xs">{mat.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations and assessment stamp block */}
              <div className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3">
                <span className="block font-mono text-[9px] text-zinc-500 uppercase font-bold tracking-wider">
                  Structural Recommendations & Compliance Stamp
                </span>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed italic">
                  &ldquo;{selectedInquiry.result.regulatoryRiskAssessment}&rdquo;
                </p>
                <div className="pt-2 flex justify-between items-center text-[8px] font-mono uppercase text-zinc-500 border-t border-white/5">
                  <span>Audit Code: ASCE-7-PE</span>
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#C5A267]" />
                    <span className="text-zinc-300">Rida Sarfaraz PE</span>
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            
            {/* Search and Filters row bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#111317] border border-white/5 p-4 rounded-2xl shadow-2xl">
              
              {/* Search bar input */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search inquiries registry by name, email or design code..."
                  className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 font-sans text-xs text-white focus:outline-none focus:border-[#C5A267] transition-colors placeholder-zinc-600"
                />
              </div>

              {/* Filter bar selector */}
              <div className="md:col-span-4 relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-[#0A0B0D] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 font-sans text-xs font-semibold text-white focus:outline-none focus:border-[#C5A267] transition-colors"
                >
                  <option value="All">All Pipeline Statuses</option>
                  <option value="Pending Sizing Audit">Pending Sizing Audit</option>
                  <option value="Seismic Model Verified">Seismic Model Verified</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="PE-Stamped Approved">PE-Stamped Approved</option>
                </select>
              </div>

              {/* Status Count tag */}
              <div className="md:col-span-2 text-right font-mono text-[9px] text-zinc-500 uppercase tracking-wider hidden md:block">
                Matching: <span className="font-bold text-[#C5A267]">{filteredInquiries.length}</span> records
              </div>
            </div>

            {/* Inquiries table / list */}
            {filteredInquiries.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-white/5 bg-[#111317] rounded-2xl">
                <Search className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  No Pipeline Matches Sizing Found
                </h3>
                <p className="font-sans text-xs text-zinc-500 mt-1">
                  Refine your search parameters or submit a new takeoff estimate from the Sizing Portal.
                </p>
              </div>
            ) : (
              <div className="bg-[#111317] border border-white/5 rounded-2xl overflow-hidden shadow-2xl divide-y divide-white/5">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <div className="space-y-1.5 flex-1">
                      {/* Top tags row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[8px] bg-white/5 text-[#C5A267] px-2.5 py-1 rounded-full border border-white/5 font-bold uppercase tracking-wider">
                          {inq.result.projectName}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">
                          {inq.specs.buildingType} / {inq.specs.footprintArea * inq.specs.floorsCount} SQ FT
                        </span>
                      </div>

                      {/* Client parameters */}
                      <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider group-hover:text-[#C5A267] transition-colors mt-1">
                        {inq.clientName}
                      </h3>
                      <p className="font-sans text-xs text-zinc-400">
                        {inq.clientEmail} &bull; Sized System: <span className="font-bold text-[#C5A267]">{inq.specs.structuralSystem}</span>
                      </p>
                    </div>

                    {/* Sizing Pipeline Status and Chevron trigger */}
                    <div className="flex items-center space-x-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider font-bold border" style={{
                          borderColor: inq.status === "PE-Stamped Approved" ? "rgba(34, 197, 94, 0.3)" : inq.status === "Site Visit Scheduled" ? "rgba(59, 130, 246, 0.3)" : "rgba(197, 162, 103, 0.3)",
                          backgroundColor: inq.status === "PE-Stamped Approved" ? "rgba(34, 197, 94, 0.05)" : inq.status === "Site Visit Scheduled" ? "rgba(59, 130, 246, 0.05)" : "rgba(197, 162, 103, 0.05)",
                          color: inq.status === "PE-Stamped Approved" ? "#22c55e" : inq.status === "Site Visit Scheduled" ? "#3b82f6" : "#C5A267"
                        }}>
                          {inq.status}
                        </span>
                        <span className="block font-mono text-[8px] text-zinc-500 uppercase mt-1">
                          Est. Range: ${inq.result.costEstimation.minCost.toLocaleString()} - ${inq.result.costEstimation.maxCost.toLocaleString()}
                        </span>
                      </div>

                      <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-white transition-colors group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
