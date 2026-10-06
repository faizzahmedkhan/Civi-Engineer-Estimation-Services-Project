import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HardHat, Layers, Award, Terminal, Calculator, Mail, Menu, X, Phone } from "lucide-react";

interface HeaderProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  onOpenAdmin: () => void;
  isAdminMode: boolean;
}

export default function Header({ currentSection, setCurrentSection, onOpenAdmin, isAdminMode }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Studio", icon: HardHat },
    { id: "services", label: "Capabilities", icon: Layers },
    { id: "portfolio", label: "Showcase", icon: Award },
    { id: "estimator", label: "Sizing Portal", icon: Calculator },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        id="main-app-header" 
        className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0B0D]/90 backdrop-blur-md transition-all duration-300"
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo and Brand Title */}
          <div 
            id="brand-logo-container"
            className="flex cursor-pointer items-center space-x-2.5 sm:space-x-3 group shrink-0"
            onClick={() => handleNavClick("home")}
          >
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded bg-[#C5A267] text-black transition-all duration-300 group-hover:bg-white shadow">
              <span className="font-display text-xs sm:text-sm font-black tracking-tight">RS</span>
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-xs sm:text-sm font-extrabold tracking-[0.12em] text-white uppercase leading-none">
                RIDA SARFARAZ
              </h1>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-[#C5A267] uppercase mt-1 leading-none">
                Estimation & Engineering
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="navbar-navigation" className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id && !isAdminMode;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-md font-display text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "text-white bg-white/5" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[#C5A267]" : "text-zinc-500"}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C5A267]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Hamburger */}
          <div id="header-action-container" className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Pipeline Console Button */}
            <button
              id="toggle-admin-portal-header"
              onClick={onOpenAdmin}
              title="Pipeline Control Center"
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border text-[10px] font-bold tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                isAdminMode 
                  ? "bg-[#C5A267] text-black border-[#C5A267]" 
                  : "bg-transparent border-white/10 text-zinc-300 hover:border-[#C5A267]/50 hover:text-white"
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-[#C5A267] shrink-0" />
              <span className="hidden sm:inline">Pipeline</span>
            </button>

            {/* Quick Sizing CTA */}
            <button
              id="quick-ai-estimate-cta"
              onClick={() => handleNavClick("estimator")}
              className="group relative flex items-center space-x-1.5 overflow-hidden rounded-lg bg-[#C5A267] px-3 py-1.5 sm:px-4 sm:py-2 font-display text-[10px] font-bold tracking-[0.15em] text-black uppercase transition-all duration-300 hover:bg-white cursor-pointer shadow"
            >
              <span className="hidden xs:inline sm:inline">Sizing Portal</span>
              <Calculator className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            </button>

            {/* Hamburger Button for Mobile/Tablet */}
            <button
              id="mobile-menu-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-white/10 bg-[#111317] text-zinc-300 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-[#C5A267]" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 sm:top-20 z-40 bg-[#0A0B0D]/98 border-b border-white/10 backdrop-blur-xl lg:hidden shadow-2xl"
          >
            <div className="px-5 py-6 space-y-5 max-w-md mx-auto">
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-[#C5A267] uppercase font-bold tracking-widest block px-1 mb-2">
                  Navigation Sections
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentSection === item.id && !isAdminMode;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? "bg-[#C5A267] text-black font-extrabold shadow-md" 
                            : "bg-[#111317] text-zinc-300 hover:text-white hover:bg-white/5 border border-white/5"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-4 w-4 ${isActive ? "text-black" : "text-[#C5A267]"}`} />
                          <span className="font-display text-xs font-bold uppercase tracking-wider">{item.label}</span>
                        </div>
                        {isActive && (
                          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-black/20 text-black font-bold">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons in Mobile Menu */}
              <div className="pt-3 border-t border-white/10 space-y-2.5">
                <button
                  onClick={() => {
                    onOpenAdmin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between p-3 rounded-xl border border-white/10 bg-[#111317] text-xs font-bold tracking-wider text-white uppercase hover:border-[#C5A267]/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center space-x-2.5">
                    <Terminal className="h-4 w-4 text-[#C5A267]" />
                    <span>Pipeline Control Console</span>
                  </span>
                  <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded text-zinc-400 font-mono">SPECS & AUDITS</span>
                </button>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3.5 w-3.5 text-[#C5A267]" />
                    <span>Inquiries: +92 (300) 123-4567</span>
                  </div>
                  <span className="text-[9px] text-[#C5A267] font-bold">RAWALPINDI</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

