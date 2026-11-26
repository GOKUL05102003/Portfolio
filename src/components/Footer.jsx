import { ArrowUp } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050B12] text-[#F1F5F9] border-t border-[#00E5D4]/15 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00E5D4]/40 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-20 2xl:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Brand Name & Unified Role */}
          <div className="flex flex-col gap-1">
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#F1F5F9]">
              {PROFILE.name}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5D4]">
              {PROFILE.role}
            </span>
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-[#A7B3C2]">
            <span>
              © {new Date().getFullYear()} {PROFILE.name}
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#A7B3C2] hover:text-[#00E5D4] transition-colors whitespace-nowrap"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
