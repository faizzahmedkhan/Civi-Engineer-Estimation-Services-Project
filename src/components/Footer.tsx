import React from "react";
import { Hammer, Terminal, FileCheck, Landmark, ShieldCheck } from "lucide-react";

interface FooterProps {
  onOpenAdmin: () => void;
  setCurrentSection: (section: string) => void;
}

export default function Footer({ onOpenAdmin, setCurrentSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-app-footer" className="bg-[#0A0B0D] border-t border-white/5 text-zinc-400 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Column 1: Brand & Mandate */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#C5A267] text-black">
                <span className="font-display text-[10px] font-black tracking-tight">RS</span>
              </div>
              <span className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
                RIDA SARFARAZ
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-500 leading-relaxed max-w-xs">
              Civil engineering & estimation consultancy delivering high-performance structural designs, transparent material takeoffs, and professional project cost modeling.
            </p>
            <div className="flex items-center space-x-2 font-mono text-[9px] text-[#C5A267] uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C5A267]" />
              <span>Civil & Sizing Consultants</span>
            </div>
          </div>

          {/* Column 2: Structural Standards We Calibrate */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
              Design Codes
            </h3>
            <ul className="space-y-2 font-mono text-[11px] text-zinc-500">
              <li className="flex items-center space-x-1.5">
                <Landmark className="h-3 w-3 text-zinc-600" />
                <span>IBC 2024 / ASCE 7-22</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Landmark className="h-3 w-3 text-zinc-600" />
                <span>ACI 318-19 (Concrete)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Landmark className="h-3 w-3 text-zinc-600" />
                <span>AISC 360-16 (Steel Construction)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Landmark className="h-3 w-3 text-zinc-600" />
                <span>Eurocodes & ASTM Standards</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigate Studio */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
              Engineering Studio
            </h3>
            <ul className="space-y-2 font-sans text-xs text-zinc-500">
              <li>
                <button 
                  onClick={() => setCurrentSection("home")}
                  className="hover:text-[#C5A267] transition-colors duration-150 text-left cursor-pointer"
                >
                  Overview & Sizing Principles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentSection("services")}
                  className="hover:text-[#C5A267] transition-colors duration-150 text-left cursor-pointer"
                >
                  Core Capabilities & Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentSection("portfolio")}
                  className="hover:text-[#C5A267] transition-colors duration-150 text-left cursor-pointer"
                >
                  Project Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentSection("estimator")}
                  className="hover:text-[#C5A267] font-semibold text-[#C5A267] transition-colors duration-150 text-left cursor-pointer"
                >
                  Sizing Estimator Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulatory & Terminal */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold tracking-[0.2em] text-white uppercase">
              Authorized Portal
            </h3>
            <p className="font-sans text-[11px] text-zinc-500 leading-snug">
              Access the secure dynamic engineering pipeline logs to review active structural project records.
            </p>
            <button
              id="open-pipeline-console-footer"
              onClick={onOpenAdmin}
              className="flex items-center space-x-2 bg-[#111317] hover:bg-white hover:text-black px-4 py-2.5 rounded-xl font-mono text-[9px] font-bold tracking-[0.2em] text-white transition-all duration-200 uppercase w-full justify-center border border-white/5 cursor-pointer"
            >
              <Terminal className="h-3 w-3 text-[#C5A267] animate-pulse" />
              <span>Pipeline Console</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-zinc-600 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1.5">
            <FileCheck className="h-3.5 w-3.5 text-[#C5A267]" />
            <span>&copy; {currentYear} Rida Sarfaraz Engineering. All structural rights reserved.</span>
          </div>
          <div className="flex space-x-4">
            <span className="text-[9px] text-zinc-500 bg-[#111317] px-3 py-1 rounded-xl border border-white/5">
              RICS REGISTERED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
