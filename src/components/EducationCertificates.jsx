import { GraduationCap, Award, Calendar, CheckCircle2, ExternalLink } from "lucide-react";
import { EDUCATION, CERTIFICATES } from "../data/portfolioData";

export function EducationCertificates() {
  return (
    <section
      id="education-certificates"
      className="relative scroll-mt-24 pt-20 pb-28 sm:pt-28 sm:pb-36 bg-[#050B12] text-[#F1F5F9] border-t border-[#00E5D4]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-20 2xl:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00E5D4]/15 pb-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E5D4] font-semibold">
              EDUCATION &amp; CREDENTIALS
            </span>
            <span className="size-1.5 rounded-full bg-[#00E5D4]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A7B3C2]">
            ACADEMIC QUALIFICATIONS &amp; CERTIFICATIONS
          </span>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Education */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap size={20} className="text-[#00E5D4]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#00E5D4] font-semibold">
                Academic Qualifications
              </h3>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden p-6 rounded-2xl bg-[#08131F]/90 border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.4)] transition-all duration-300 flex-1 flex flex-col justify-between group"
                >
                  {/* Outlined architectural watermark number (01, 02, 03) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 sm:right-5 bottom-0 sm:bottom-1 select-none font-heading font-black leading-none tracking-[-0.06em] text-[5rem] sm:text-[6rem] transition-all duration-500 opacity-75 group-hover:opacity-100 group-hover:translate-y-[-2px]"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(0, 229, 212, 0.14)",
                      zIndex: 0,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex items-center justify-between gap-3 mb-2">
                    <span className="font-mono text-xs text-[#00E5D4] flex items-center gap-1.5 font-medium">
                      <Calendar size={13} className="text-[#00E5D4]" />
                      <span>{edu.period}</span>
                    </span>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-[#00E5D4]/10 text-[#00E5D4] border border-[#00E5D4]/25">
                      {edu.score}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-lg font-heading font-bold text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="editorial-copy text-[13.5px] sm:text-[14.5px] text-[#CBD5E1]/90 mt-1.5 leading-relaxed pr-12">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="flex items-center gap-2.5 mb-6">
              <Award size={20} className="text-[#00E5D4]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#00E5D4] font-semibold">
                Industry Certifications
              </h3>
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {CERTIFICATES.map((cert, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-[#08131F]/90 border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:shadow-[0_12px_35px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  {/* Outlined architectural watermark number (01, 02, 03, 04) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 bottom-[-4px] select-none font-heading font-black leading-none tracking-[-0.06em] text-[4.25rem] sm:text-[5rem] transition-all duration-500 opacity-75 group-hover:opacity-100 group-hover:translate-y-[-2px]"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(0, 229, 212, 0.14)",
                      zIndex: 0,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="size-10 rounded-xl bg-[#050B12] border border-[#00E5D4]/20 flex items-center justify-center text-[#00E5D4] group-hover:border-[#00E5D4]/50 group-hover:scale-105 transition-all shrink-0">
                      <CheckCircle2 size={20} />
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-base text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors">
                        {cert.title}
                      </h4>
                      <p className="editorial-copy text-[13px] sm:text-[13.5px] text-[#CBD5E1]/85 mt-0.5">{cert.category}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#050B12] text-[#A7B3C2] border border-[#00E5D4]/15">
                      {cert.issuer}
                    </span>

                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#00E5D4]/10 hover:bg-[#00E5D4] text-[#00E5D4] hover:text-[#050B12] border border-[#00E5D4]/25 hover:border-[#00E5D4] transition-all"
                      >
                        <span>Verify</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
