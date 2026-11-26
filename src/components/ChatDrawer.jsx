import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Send,
  X,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  Activity,
} from "lucide-react";
import {
  PREDEFINED_QA,
  RESUME_CONTEXT,
  matchPredefinedAnswer,
  getLocalAnswer,
} from "../data/portfolioData";
import { ChatbotNeuralCore } from "./ChatbotNeuralCore";

// Enhanced message content parser: markdown links ([text](url)), URLs, emails, phones, bold, and bullets
function renderFormattedContent(text) {
  const lines = text.split("\n");
  const tokenRegex =
    /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+91\s?[0-9]{10})/g;
  const mdLinkRegex = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+91\s?[0-9]{10}$/;
  const urlRegex = /^https?:\/\//;

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-1.5" />;
    }

    const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("• ");
    const content = isBullet ? trimmed.slice(2) : line;

    const parts = content.split(tokenRegex);

    const renderedParts = parts.map((part, i) => {
      if (!part) return null;

      const mdMatch = part.match(mdLinkRegex);
      if (mdMatch) {
        const [, label, href] = mdMatch;
        const isRawUrlLabel = urlRegex.test(label);
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[#00E5D4] underline decoration-[#00E5D4]/60 underline-offset-2 font-semibold hover:text-[#00C8FF] inline-flex items-center gap-1 transition-colors ${
              isRawUrlLabel ? "break-all" : "break-words"
            }`}
          >
            <span>{label}</span>
            <ExternalLink size={11} className="inline shrink-0" />
          </a>
        );
      }

      if (urlRegex.test(part)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00E5D4] underline decoration-[#00E5D4]/60 underline-offset-2 font-semibold hover:text-[#00C8FF] inline-flex items-center gap-1 break-all transition-colors"
          >
            <span>{part}</span>
            <ExternalLink size={11} className="inline shrink-0" />
          </a>
        );
      }
      if (emailRegex.test(part)) {
        return (
          <a
            key={i}
            href={`mailto:${part}`}
            className="text-[#00E5D4] underline decoration-[#00E5D4]/60 underline-offset-2 font-semibold hover:text-[#00C8FF] break-all transition-colors"
          >
            {part}
          </a>
        );
      }
      if (phoneRegex.test(part)) {
        return (
          <a
            key={i}
            href={`tel:${part.replace(/\s+/g, "")}`}
            className="text-[#00E5D4] underline decoration-[#00E5D4]/60 underline-offset-2 font-semibold hover:text-[#00C8FF] break-all transition-colors"
          >
            {part}
          </a>
        );
      }

      // Format bold markdown (**text**)
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bp, bidx) => {
        if (bp.startsWith("**") && bp.endsWith("**")) {
          return (
            <strong key={bidx} className="font-bold text-[#F1F5F9]">
              {bp.slice(2, -2)}
            </strong>
          );
        }
        return bp;
      });
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2.5 mt-2 ml-0.5">
          <span className="size-1.5 rounded-full bg-[#00E5D4] mt-2 shrink-0 shadow-[0_0_8px_#00E5D4]" />
          <div className="flex-1 leading-relaxed text-[#D1D5DB] text-xs sm:text-[13px]">{renderedParts}</div>
        </div>
      );
    }

    return (
      <div key={lineIdx} className={lineIdx > 0 ? "mt-2" : ""}>
        {renderedParts}
      </div>
    );
  });
}

// Quick Questions 3x2 Grid
const QUICK_QUESTIONS_GRID = [
  { label: "Skills?", query: "Skills?" },
  { label: "Internships?", query: "Internships?" },
  { label: "Projects?", query: "Projects?" },
  { label: "Educational details?", query: "Educational details?" },
  { label: "Certifications?", query: "Certifications?" },
  { label: "Contact details?", query: "Contact details?" },
];

const INITIAL_GREETING =
  "Hi! I am Gokul's Personal AI Assistant. Ask me anything about his AI engineering work, RAG pipelines, tech stack, or career experience!";

export function ChatDrawer({
  isOpen,
  onClose,
  onOpen,
  origin = null,
  isDark = true,
  isAboutSection = true,
}) {
  const [chatQuery, setChatQuery] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      id: "init-greeting",
      role: "assistant",
      text: INITIAL_GREETING,
      time: "Just now",
    },
  ]);

  const msgIdRef = useRef(1);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll chat container to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, chatLoading, isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle asking question (preserves original backend/API logic strictly)
  const handleAskAssistant = async (customQuestion) => {
    const question = (customQuestion ?? chatQuery).trim();
    if (!question || chatLoading) return;

    setChatQuery("");
    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsgId = `msg-${msgIdRef.current++}`;

    setChatHistory((prev) => [
      ...prev,
      {
        id: userMsgId,
        role: "user",
        text: question,
        time: userTime,
      },
    ]);

    // Match predefined questions or smart keyword intents (resume, cv, download, about, hire, availability, voice ai, contact, etc.)
    const matchedAnswer = PREDEFINED_QA[question] ?? matchPredefinedAnswer(question);
    if (matchedAnswer) {
      const botMsgId = `msg-${msgIdRef.current++}`;
      setChatHistory((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: "assistant",
          text: matchedAnswer,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    setChatLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    const systemPrompt =
      "You are Gokul's Assistant on Gokul R's portfolio website. Answer in 1 to 3 short, direct, and accurate sentences strictly using the provided resume context. Never mention RAG or internal code.";

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Resume Details:\n${RESUME_CONTEXT}\n\nQuestion: ${question}`,
            },
          ],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    let reply = "";
    if (apiKey) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          const result = await response.json();
          const candidateText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            reply = candidateText.trim();
          }
        }
      } catch {
        // Fallback to instant local answer
      }
    }

    if (!reply) {
      reply = getLocalAnswer(question);
    }

    const botMsgId = `msg-${msgIdRef.current++}`;
    setChatHistory((prev) => [
      ...prev,
      {
        id: botMsgId,
        role: "assistant",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setChatLoading(false);
  };

  const handleCopyText = (text, idx) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClearChat = () => {
    setChatHistory([
      {
        id: `msg-${msgIdRef.current++}`,
        role: "assistant",
        text: INITIAL_GREETING,
        time: "Just now",
      },
    ]);
  };

  const showFloatingTrigger = !isOpen && !isAboutSection;

  const originOffset = useMemo(() => {
    if (typeof window === "undefined" || !origin) {
      return { x: 28, y: 28, originCss: "bottom right" };
    }
    const isSm = window.innerWidth >= 640;
    const w = isSm ? Math.min(1120, window.innerWidth - 48) : window.innerWidth - 24;
    const h = isSm ? Math.min(760, window.innerHeight - 48) : Math.min(760, window.innerHeight - 24);
    const modalCx = isSm ? window.innerWidth - 24 - w / 2 : window.innerWidth / 2;
    const modalCy = isSm ? window.innerHeight - 24 - h / 2 : window.innerHeight - 12 - h / 2;
    return {
      x: Math.round(origin.x - modalCx),
      y: Math.round(origin.y - modalCy),
      originCss: "center center",
    };
  }, [origin]);

  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          1. Dynamic Floating Trigger Button (Bottom-Right)
          Hidden while Hero section is in view to prevent duplicate cyan
          CTAs; reveals smoothly once scrolling past Hero.
          ──────────────────────────────────────────────────────────── */}
      <aside
        data-floating-chat="true"
        data-nav-theme={isDark ? "dark" : "light"}
        aria-label="AI Assistant Quick Trigger"
        aria-hidden={!showFloatingTrigger}
        onPointerMove={(e) => e.stopPropagation()}
        className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 transition-[opacity,transform] duration-300 ease-out ${
          showFloatingTrigger
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 pointer-events-none translate-y-3 scale-90"
        }`}
      >
        <button
          type="button"
          onClick={onOpen}
          tabIndex={showFloatingTrigger ? 0 : -1}
          aria-label="Chat with my Assistant"
          title="Chat with my Assistant"
          className={`group relative flex size-11 sm:size-12 items-center justify-center overflow-hidden rounded-full border shadow-xl transition-[transform,box-shadow,filter] duration-200 hover:scale-105 active:scale-95 ${
            isDark
              ? "bg-gradient-to-r from-[#00E5D4] via-[#00DFD0] to-[#00C8FF] text-[#050B12] border-[#00E5D4]/40 shadow-[0_8px_30px_rgba(0,229,212,0.35)] hover:shadow-[0_10px_42px_rgba(0,229,212,0.55)] hover:brightness-105"
              : "bg-[#0F766E] text-white border-[#0F766E]/40 shadow-[0_8px_28px_rgba(15,118,110,0.35)] hover:bg-[#0D655E] hover:shadow-[0_10px_36px_rgba(15,118,110,0.5)]"
          }`}
        >
          <Bot
            size={20}
            className={isDark ? "text-[#050B12]" : "text-white"}
          />
        </button>
      </aside>

      {/* ────────────────────────────────────────────────────────────
          2. Chatbot Opens Directly FROM Wherever Clicked
          Animates out from clicked button center (Hero CTA or Floating Trigger).
          ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click barrier */}
            <motion.div
              key="chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-50 bg-[#02050A]/70 backdrop-blur-md"
              onClick={onClose}
            />

            {/* Chatbot Window */}
            <motion.div
              key="chat-window"
              data-floating-chat="true"
              initial={{
                opacity: 0,
                scale: 0.14,
                x: originOffset.x,
                y: originOffset.y,
                transformOrigin: originOffset.originCss,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transformOrigin: originOffset.originCss,
              }}
              exit={{
                opacity: 0,
                scale: 0.14,
                x: originOffset.x,
                y: originOffset.y,
                transformOrigin: originOffset.originCss,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 25,
                mass: 0.72,
              }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 sm:w-[min(1120px,calc(100vw-48px))] h-[min(760px,calc(100dvh-24px))] sm:h-[min(760px,calc(100vh-48px))] rounded-[26px] bg-[#050B13]/[0.97] border border-[#00E5D4]/25 shadow-[0_0_80px_rgba(0,229,212,0.2),0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col lg:flex-row backdrop-blur-3xl"
              role="dialog"
              aria-label="Gokul's AI Assistant Studio"
            >
              {/* ── Left Column: Large, Constant-Size 3D Neural Structure ── */}
              <div className="w-full lg:w-[42%] xl:w-[40%] hidden lg:flex flex-col justify-between p-6 xl:p-7 border-b lg:border-b-0 lg:border-r border-[#00E5D4]/15 relative overflow-hidden bg-gradient-to-br from-[#071726] via-[#040C14] to-[#02060B]">
                {/* Ambient cyan/teal glows (zero purple) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#00E5D4]/[0.12] blur-[90px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#00C8FF]/10 blur-[100px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#00E5D4_1px,transparent_1px)] [background-size:24px_24px]"
                />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between shrink-0">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#081726]/80 border border-[#00E5D4]/30 shadow-sm backdrop-blur-md">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5D4] opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-[#00E5D4]" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#00E5D4] font-bold">
                      AI NEURAL CORE
                    </span>
                  </div>
                </div>

                {/* Center: Large 3D Neural Sphere filling full available space */}
                <div className="relative z-10 flex-1 w-full my-2 min-h-[200px]">
                  <ChatbotNeuralCore className="min-h-[200px]" />
                </div>

                {/* Bottom Profile Summary Card */}
                <div className="relative z-10 p-4 rounded-2xl bg-[#081524]/85 border border-[#00E5D4]/20 backdrop-blur-md shadow-lg space-y-2 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-sm text-[#F1F5F9]">
                      Gokul R
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#00E5D4]/10 text-[#00E5D4] border border-[#00E5D4]/30 font-mono text-[9px] font-semibold uppercase">
                      AI Engineer
                    </span>
                  </div>
                  <p className="text-xs text-[#A7B3C2] leading-relaxed">
                    Specializing in Generative AI, RAG pipelines, and voice workflows (STT/TTS).
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-[#00E5D4]">
                    <Activity size={12} className="animate-pulse" />
                    <span>Real-time Assistant Knowledge Base Active</span>
                  </div>
                </div>
              </div>

              {/* ── Right Column: Chatbot Interface ── */}
              <div className="flex-1 flex flex-col justify-between h-full bg-[#050B13]/95 relative overflow-hidden">
                {/* 1. Header */}
                <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-[#00E5D4]/15 bg-[#07111D]/90 backdrop-blur-md shrink-0 z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="relative size-10 rounded-full bg-gradient-to-br from-[#00E5D4] to-[#00C8FF] p-[2px] shadow-[0_0_18px_rgba(0,229,212,0.4)] shrink-0 flex items-center justify-center">
                      <div className="size-full rounded-full bg-[#050B12] flex items-center justify-center text-[#00E5D4]">
                        <Bot size={20} className="text-[#00E5D4]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#F1F5F9] leading-tight tracking-tight">
                          Gokul's AI Assistant
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-semibold">
                          <span className="size-1.5 rounded-full bg-emerald-400" />
                          <span>Online</span>
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#A7B3C2] flex items-center gap-1.5 mt-0.5">
                        <span className="size-1 rounded-full bg-[#00E5D4]" />
                        <span>Powered by Advanced AI</span>
                      </p>
                    </div>
                  </div>

                  {/* Header action icons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleClearChat}
                      title="Reset conversation"
                      className="size-9 rounded-full bg-[#0B1826] border border-[#00E5D4]/20 hover:border-[#00E5D4]/50 text-[#A7B3C2] hover:text-[#00E5D4] flex items-center justify-center transition-colors shadow-sm"
                      aria-label="Reset chat"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      title="Close assistant (ESC)"
                      className="size-9 rounded-full bg-[#0B1826] border border-white/10 hover:border-white/30 text-[#A7B3C2] hover:text-[#F1F5F9] flex items-center justify-center transition-colors shadow-sm"
                      aria-label="Close assistant"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* 2. Messages History Feed (Rich Atmospheric Cyber Background) */}
                <div className="relative flex-1 flex flex-col overflow-hidden shadow-[inset_0_0_60px_rgba(0,12,24,0.75)]">
                  {/* Layered Atmospheric Tech Grid & Aurora Glows (Fixed behind scroll) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: `
                        radial-gradient(ellipse at 18% 18%, rgba(0, 229, 212, 0.09), transparent 55%),
                        radial-gradient(ellipse at 85% 82%, rgba(0, 200, 255, 0.08), transparent 55%),
                        linear-gradient(to right, rgba(0, 229, 212, 0.04) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 229, 212, 0.04) 1px, transparent 1px)
                      `,
                      backgroundSize: "100% 100%, 100% 100%, 36px 36px, 36px 36px",
                    }}
                  />

                  {/* Subtle Centered Holographic Ring & Emblem Watermark */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="size-60 rounded-full border border-[#00E5D4]/60" />
                      <div className="absolute size-44 rounded-full border border-dashed border-[#00C8FF]/70 animate-[spin_45s_linear_infinite]" />
                      <Bot size={46} className="text-[#00E5D4]" />
                    </div>
                  </div>

                  {/* Scrollable Messages Container */}
                  <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7 py-5 space-y-4">

                  {chatHistory.map((msg, index) => {
                    const isUser = msg.role === "user";
                    return (
                      <motion.div
                        key={msg.id ?? index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col relative z-10 ${isUser ? "items-end" : "items-start"}`}
                      >
                        {/* Meta Header */}
                        <div
                          className={`flex items-center gap-2 mb-1.5 px-1 font-mono text-[11px] text-[#A7B3C2] ${
                            isUser ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div
                            className={`size-5 rounded-full flex items-center justify-center text-xs ${
                              isUser
                                ? "bg-[#00C8FF]/20 text-[#00C8FF]"
                                : "bg-gradient-to-br from-[#00E5D4] to-[#00C8FF] text-[#050B12]"
                            }`}
                          >
                            {isUser ? <User size={12} /> : <Bot size={12} />}
                          </div>
                          <span className="font-semibold text-[#F1F5F9]">
                            {isUser ? "You" : "Gokul's Assistant"}
                          </span>
                          <span className="text-[10px] text-[#A7B3C2]/60">{msg.time}</span>

                          {!isUser && (
                            <button
                              type="button"
                              onClick={() => handleCopyText(msg.text, index)}
                              className="ml-1 p-1 text-[#A7B3C2]/60 hover:text-[#00E5D4] transition-colors"
                              title="Copy response"
                              aria-label="Copy response"
                            >
                              {copiedIndex === index ? (
                                <Check size={12} className="text-emerald-400" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`max-w-[92%] sm:max-w-[85%] text-xs sm:text-[13px] leading-relaxed shadow-md ${
                            isUser
                              ? "px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#00C8FF] to-[#0077FF] text-white font-medium shadow-[0_4px_20px_rgba(0,180,255,0.25)]"
                              : "p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#091827]/95 to-[#06121E]/95 border border-[#00E5D4]/20 text-[#E2E8F0] shadow-[0_6px_25px_rgba(0,0,0,0.5)] backdrop-blur-md"
                          }`}
                        >
                          {isUser ? (
                            <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{msg.text}</p>
                          ) : (
                            <div className="space-y-1 break-words [overflow-wrap:anywhere]">{renderFormattedContent(msg.text)}</div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {chatLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 relative z-10"
                    >
                      <div className="size-6 rounded-full bg-gradient-to-br from-[#00E5D4] to-[#00C8FF] text-[#050B12] flex items-center justify-center shrink-0">
                        <Bot size={13} />
                      </div>
                      <div className="px-4 py-3 rounded-2xl bg-[#091522]/95 border border-[#00E5D4]/20 text-[#00E5D4] flex items-center gap-2 backdrop-blur-md">
                        <span className="font-mono text-xs">Synthesizing verified resume data</span>
                        <span className="flex items-center gap-1 ml-1">
                          <span className="size-1.5 rounded-full bg-[#00E5D4] animate-bounce" />
                          <span
                            className="size-1.5 rounded-full bg-[#00E5D4] animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="size-1.5 rounded-full bg-[#00E5D4] animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </span>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* 3. Quick Questions 3x2 Grid */}
                <div className="px-5 sm:px-7 py-3 border-t border-[#00E5D4]/15 bg-[#06101B]/95 shrink-0 space-y-2 z-10">
                  <span className="font-mono text-xs font-semibold text-[#A7B3C2] block">
                    Quick questions:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {QUICK_QUESTIONS_GRID.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAskAssistant(q.query)}
                        className="px-3 py-2 rounded-xl bg-[#0A1726] border border-[#00E5D4]/20 hover:border-[#00E5D4] hover:bg-[#00E5D4]/10 text-xs font-mono font-medium text-[#F1F5F9] hover:text-[#00E5D4] transition-all text-center truncate shadow-sm active:scale-95"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Bottom Capsule Input Bar (Clean — No file attachment) */}
                <div className="px-5 sm:px-7 py-3.5 bg-[#050B12] border-t border-[#00E5D4]/15 shrink-0 z-10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAskAssistant();
                    }}
                    className="relative flex items-center rounded-2xl bg-[#091522] border border-[#00C8FF]/40 focus-within:border-[#00E5D4] focus-within:shadow-[0_0_25px_rgba(0,229,212,0.25)] transition-all duration-300"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      placeholder="Ask anything about Gokul's AI experience..."
                      className="flex-1 bg-transparent px-4 py-3.5 text-xs sm:text-sm text-[#F1F5F9] placeholder-[#A7B3C2]/50 focus:outline-none"
                    />

                    {chatQuery && (
                      <button
                        type="button"
                        onClick={() => setChatQuery("")}
                        className="p-1 mr-1 text-[#A7B3C2] hover:text-white"
                        title="Clear input"
                        aria-label="Clear input"
                      >
                        <X size={14} />
                      </button>
                    )}

                    {/* Gradient send button */}
                    <button
                      type="submit"
                      disabled={chatLoading || !chatQuery.trim()}
                      className="m-1.5 size-9 rounded-xl bg-gradient-to-r from-[#00C8FF] to-[#0077FF] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-30 transition-all shrink-0 shadow-md shadow-[#00C8FF]/30 hover:scale-105 active:scale-95"
                      aria-label="Send message"
                    >
                      <Send size={15} className="translate-x-[-1px] translate-y-[-1px]" />
                    </button>
                  </form>

                  <p className="mt-2 text-[10px] font-mono text-center text-[#A7B3C2]/60">
                    Powered by Gokul's verified resume • Press Enter ↵
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
