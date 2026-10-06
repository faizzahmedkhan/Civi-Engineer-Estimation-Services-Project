import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ENGINEERING_SERVICES } from "../data";
import { Service } from "../types";
import { Activity, Layers, ShieldAlert, Leaf, CheckCircle, FileText, Settings, X } from "lucide-react";

// Icon mapper for lucide-react names dynamically
const iconComponents: Record<string, React.ComponentType<any>> = {
  Activity: Activity,
  Layers: Layers,
  ShieldAlert: ShieldAlert,
  Leaf: Leaf,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section 
      id="capabilities-section-root" 
      className="bg-[#0A0B0D] py-16 md:py-24 border-y border-white/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-widest text-[#C5A267] font-bold">
              <Settings className="h-3.5 w-3.5 text-[#C5A267]" />
              <span>Rigorous Sizing & Costing Standards</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-4xl">
              Professional Capabilities
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Applying over 6 years of civil engineering field expertise, load transfer computations, and strict quality control to deliver rock-solid, optimized project budgets.
            </p>
          </div>
          
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest text-right hidden lg:block">
            RICS, AACE, & IBC REGULATORY CODE COMPLIANCE AUDITED
          </div>
        </div>

        {/* Services Grid */}
        <div id="capabilities-cards-grid" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENGINEERING_SERVICES.map((service, index) => {
            const IconComponent = iconComponents[service.iconName] || Activity;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#111317] border border-white/5 p-6 shadow-2xl hover:border-[#C5A267]/40 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
              >
                {/* Accent strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 group-hover:bg-[#C5A267] transition-colors duration-300"></div>

                <div className="space-y-4">
                  {/* Icon Shield */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white group-hover:bg-[#C5A267] group-hover:text-black transition-all duration-300 border border-white/5">
                    <IconComponent className="h-6 w-6 text-[#C5A267] group-hover:text-black transition-colors duration-300" />
                  </div>

                  <h3 className="font-display text-base font-bold tracking-tight text-white group-hover:text-[#C5A267] transition-colors duration-200 leading-snug uppercase">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-wide group-hover:text-white">
                  <span>Scope details</span>
                  <span className="flex items-center space-x-1 font-bold text-[#C5A267] group-hover:text-white">
                    <span>Inspect Specs</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Detail Overlay/Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#111317] border border-white/5 p-6 md:p-8 shadow-2xl bg-blueprint-grid-dark"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close trigger */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="space-y-6">
                  {/* Modal Header */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-white/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white border border-white/5">
                      {React.createElement(iconComponents[selectedService.iconName] || Activity, {
                        className: "h-5 w-5 text-[#C5A267]"
                      })}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase">
                        {selectedService.title}
                      </h3>
                      <p className="font-mono text-[9px] text-[#C5A267] uppercase tracking-wider font-semibold">
                        APPROVED SERVICE DISCIPLINE
                      </p>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="space-y-4">
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed md:text-sm">
                      {selectedService.longDesc}
                    </p>

                    {/* Sizing compliance standards mapping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      <div className="bg-black/45 border border-white/5 p-4 rounded-xl">
                        <h4 className="font-mono text-[9px] font-bold text-[#C5A267] uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#C5A267]" />
                          <span>Regulatory Design Codes</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedService.standards.map((code, idx) => (
                            <li key={idx} className="font-mono text-[10px] text-zinc-500 flex items-start space-x-1.5">
                              <span className="text-[#C5A267] font-bold">&bull;</span>
                              <span>{code}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-black/45 border border-white/5 p-4 rounded-xl">
                        <h4 className="font-mono text-[9px] font-bold text-[#C5A267] uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                          <FileText className="h-3.5 w-3.5 text-[#C5A267]" />
                          <span>Professional Deliverables</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedService.keyDeliverables.map((item, idx) => (
                            <li key={idx} className="font-sans text-xs text-zinc-400 flex items-start space-x-1.5">
                              <span className="text-[#C5A267] font-bold">&#10003;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Stamping guarantee */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-zinc-500 uppercase">
                    <span>Engineering Representative: Rida Sarfaraz</span>
                    <span>6 Years Proven Experience</span>
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
