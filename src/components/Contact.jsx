import { useState } from "react";
import { Mail, Phone, Copy, Check, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./TechIcons";

export function Contact() {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2400);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32 border-t border-[#00E5D4]/15 overflow-hidden">
      {/* Subtle ambient backdrop radial aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,212,0.1)_0%,transparent_70%)] blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        {/* Narrative Headline */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-[#F1F5F9] uppercase leading-[1.05]">
            Have an Idea? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5D4] via-[#00C8FF] to-sky-300">
              Let's Build Something.
            </span>
          </h2>
          <p className="editorial-copy max-w-[54ch] mx-auto text-[15.5px] sm:text-[17.5px] text-[#CBD5E1]/90 leading-[1.72]">
            Actively open to opportunities in AI Engineering and Software Development. Reach out directly via email, phone, or LinkedIn.
          </p>
        </div>

        {/* Copyable Action Boxes */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Email Box */}
          <div className="w-full max-w-md sm:w-auto flex items-center rounded-xl border border-[#00E5D4]/20 bg-[#08131F] hover:border-[#00E5D4]/50 transition-all duration-200 shadow-xs">
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex-1 min-w-0 inline-flex items-center gap-2 pl-4 pr-3 py-3.5 font-mono text-xs text-[#F1F5F9] hover:text-[#00E5D4] transition-colors"
            >
              <Mail size={15} className="text-[#00E5D4] shrink-0" />
              <span className="truncate">{PROFILE.email}</span>
              <ArrowUpRight size={13} className="text-[#A7B3C2] shrink-0" />
            </a>
            <div className="h-5 w-px bg-[#00E5D4]/20 shrink-0" />
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.email, "email")}
              className="px-3.5 py-3.5 text-[#A7B3C2] hover:text-[#00E5D4] active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
              title="Copy email"
              aria-label="Copy email address"
            >
              {copiedKey === "email" ? (
                <>
                  <Check size={14} className="text-[#00E5D4]" />
                  <span className="font-mono text-[10px] font-bold text-[#00E5D4] uppercase tracking-wider">Copied</span>
                </>
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>

          {/* Phone Box */}
          <div className="w-full max-w-md sm:w-auto flex items-center rounded-xl border border-[#00E5D4]/20 bg-[#08131F] hover:border-[#00E5D4]/50 transition-colors duration-200 shadow-xs">
            <a
              href={`tel:+91${PROFILE.phoneRaw}`}
              aria-label={`Call ${PROFILE.phone}`}
              className="flex-1 min-w-0 inline-flex items-center gap-2 pl-4 pr-3 py-3.5 font-mono text-xs text-[#F1F5F9] hover:text-[#00E5D4] hover:underline underline-offset-4 transition-colors"
            >
              <Phone size={15} className="text-[#00C8FF] shrink-0" />
              <span className="truncate">{PROFILE.phone}</span>
              <ArrowUpRight size={13} className="text-[#A7B3C2] shrink-0" />
            </a>
            <div className="h-5 w-px bg-[#00E5D4]/20 shrink-0" />
            <button
              type="button"
              onClick={() => handleCopy(PROFILE.phoneRaw, "phone")}
              className="px-3.5 py-3.5 text-[#A7B3C2] hover:text-[#00E5D4] active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
              title="Copy phone"
              aria-label="Copy phone number"
            >
              {copiedKey === "phone" ? (
                <>
                  <Check size={14} className="text-[#00E5D4]" />
                  <span className="font-mono text-[10px] font-bold text-[#00E5D4] uppercase tracking-wider">Copied</span>
                </>
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        </div>

        {/* Action Link Buttons (GitHub -> LinkedIn matching Navbar & Hero) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/20 hover:border-[#00E5D4]/50 hover:bg-[#0B1824] text-xs font-mono font-semibold uppercase tracking-wider text-[#F1F5F9] hover:text-[#00E5D4] transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-[#00E5D4]" />
            <span>GitHub</span>
            <ArrowUpRight size={13} />
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/20 hover:border-[#00E5D4]/50 hover:bg-[#0B1824] text-xs font-mono font-semibold uppercase tracking-wider text-[#F1F5F9] hover:text-[#00C8FF] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-[#00C8FF]" />
            <span>LinkedIn</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
