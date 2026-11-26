import { useState, useMemo, useRef, useEffect } from "react";
import { ALL_SKILLS, SKILL_CATEGORIES } from "../data/portfolioData";
import { TechIcon } from "./TechIcons";
import { Search } from "lucide-react";

const SHORT_CATEGORY_MAP = {
  "Programming Languages": "LANGUAGES",
  "Artificial Intelligence": "AI / ML",
  "Web Technologies & APIs": "WEB & APIS",
  "Databases & Vector Stores": "DATABASES",
  "Tools & Version Control": "TOOLS",
};

function SkillGlyph({ item, compact = false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  const sizeClass = compact ? "w-5 h-5 sm:w-6 sm:h-6" : "w-9 h-9";
  const iconSize = compact ? 20 : 32;
  const fallbackSize = compact ? 22 : 34;

  if (item.iconUrl && !imgFailed) {
    return (
      <div className={`relative ${sizeClass} flex items-center justify-center`}>
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-[#0F766E]/45">
            <TechIcon name={item.officialLogo || ""} size={iconSize} />
          </div>
        )}
        <img
          ref={imgRef}
          src={item.iconUrl}
          alt={`${item.name} icon`}
          width={compact ? 24 : 36}
          height={compact ? 24 : 36}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          className={`${sizeClass} object-contain transition-[transform,opacity] duration-300 ease-out group-hover:scale-110 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClass} flex items-center justify-center text-[#0F766E] transition-transform duration-300 ease-out group-hover:scale-110`}>
      <TechIcon name={item.officialLogo || ""} size={fallbackSize} />
    </div>
  );
}

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return ALL_SKILLS.filter((item) => {
      const matchCat =
        selectedCategory === "ALL" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  const groupedSkills = useMemo(() => {
    const categories =
      selectedCategory === "ALL"
        ? SKILL_CATEGORIES.filter((c) => c !== "ALL")
        : [selectedCategory];

    return categories
      .map((category) => {
        const items = filteredItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        return {
          category,
          shortCategory: SHORT_CATEGORY_MAP[category] || category.toUpperCase(),
          items,
        };
      })
      .filter((group) => group.items.length > 0);
  }, [filteredItems, selectedCategory]);

  return (
    <section id="skills" className="relative scroll-mt-24 pt-20 pb-28 sm:pt-28 sm:pb-36 bg-[#F3F1EB] text-[#111111] border-t border-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-20 2xl:px-8">
        {/* Section Header without number */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#0F766E] font-bold">
              STACK &amp; CAPABILITIES
            </span>
            <span className="size-1.5 rounded-full bg-[#0F766E]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#77716A]">
            COMPLETE TECHNICAL ARSENAL
          </span>
        </div>

        {/* Narrative Title & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#111111] uppercase">
              Tech Stack &amp; Tools
            </h2>
            <p className="editorial-copy mt-3.5 text-[15px] sm:text-[17px] text-[#3F3B36] leading-[1.72]">
              Curated frameworks, generative AI pipelines, programming languages, and tools utilized across production environments.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77716A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search technologies..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-black/15 text-xs font-mono text-[#111111] placeholder-[#77716A]/60 focus:outline-none focus:border-[#0F766E] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 border ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#0F766E] text-white font-bold border-[#0F766E] shadow-sm"
                  : "bg-white text-[#55514B] border-black/10 hover:border-[#0F766E]/40 hover:text-[#111111]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Mobile View: Grouped Category Panels with 2-Column Horizontal Cards (Exact Reference Design) ── */}
        <div className="space-y-4 sm:space-y-5 md:hidden">
          {groupedSkills.length === 0 ? (
            <div className="py-12 text-center text-[#77716A] font-mono text-xs">
              No technologies found matching &ldquo;{search}&rdquo;.
            </div>
          ) : (
            groupedSkills.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-black/10 bg-white/75 p-4 sm:p-5 shadow-xs"
              >
                {/* Category Header: Name + Item Count */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#0F766E] font-bold">
                      {group.category.toUpperCase()}
                    </span>
                    <span className="size-1.5 rounded-full bg-[#0F766E]" />
                  </div>
                  <span className="font-mono text-[11px] text-[#77716A]">
                    {group.items.length} {group.items.length === 1 ? "item" : "items"}
                  </span>
                </div>

                {/* 2-Column Horizontal Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {group.items.map((item) => (
                    <div
                      key={`${item.category}-${item.name}`}
                      className="group flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl border border-black/10 bg-white hover:border-[#0F766E]/40 active:scale-[0.98] transition-all duration-200 shadow-xs"
                    >
                      {/* Left Icon Container */}
                      <div className="size-8 sm:size-9 rounded-lg border border-[#0F766E]/15 bg-[#0F766E]/[0.06] flex items-center justify-center shrink-0 group-hover:bg-[#0F766E]/[0.12] transition-colors">
                        <SkillGlyph item={item} compact />
                      </div>

                      {/* Right Text Column */}
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-mono text-[11px] sm:text-xs font-bold text-[#111111] group-hover:text-[#0F766E] leading-tight truncate"
                          title={item.name}
                        >
                          {item.name}
                        </div>
                        <div className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#77716A] truncate mt-0.5">
                          {group.shortCategory}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Desktop View: Wall Grid ── */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 items-stretch">
          {filteredItems.map((item) => (
            <div
              key={`${item.category}-${item.name}`}
              className="group relative h-full min-h-[214px]"
            >
              {/* Stationary hit wrapper (.group) prevents hover flicker on card bottom edges */}
              <div className="flex h-full min-h-[214px] flex-col rounded-2xl border border-black/10 bg-white p-4 sm:p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out shadow-sm will-change-transform group-hover:-translate-y-1 group-hover:border-[#0F766E]/35 group-hover:shadow-[0_14px_30px_rgba(15,118,110,0.08)]">
                {/* Top: Fixed-Height Category Label + Accent Dot */}
                <div className="h-4 flex items-center justify-between gap-2 shrink-0">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-[#77716A] font-semibold truncate">
                    {SHORT_CATEGORY_MAP[item.category] || item.category.toUpperCase()}
                  </span>
                  <span className="size-1.5 rounded-full bg-[#0F766E] opacity-55 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                </div>

                {/* Center: Uniformly Positioned 64x64 Icon Container */}
                <div className="flex-1 flex items-center justify-center py-5">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl border border-[#0F766E]/10 bg-[#0F766E]/[0.06] transition-[background-color,border-color] duration-300 ease-out group-hover:bg-[#0F766E]/[0.12] group-hover:border-[#0F766E]/25">
                    <SkillGlyph key={item.iconUrl || item.name} item={item} />
                  </div>
                </div>

                {/* Bottom: Fixed-Height Name Slot so multi-line titles never shift icon boxes */}
                <div className="h-11 pt-2.5 border-t border-black/10 flex items-center justify-center text-center shrink-0">
                  <span className="font-mono text-xs sm:text-[13px] font-bold leading-tight text-[#111111] group-hover:text-[#0F766E] transition-colors duration-200 line-clamp-2">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
