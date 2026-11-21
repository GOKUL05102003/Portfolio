import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Brain,
  Database,
  Layers,
  ChevronRight,
  Copy,
  Check,
  Menu,
  X,
  Sparkles,
  Search,
  Terminal,
  Send,
  FileText,
  Cpu,
  Eye,
  MessageSquare,
  Bot,
  CheckCircle2,
  BookOpen,
  Zap,
  GitBranch
} from 'lucide-react';

// Custom SVG Icons for GitHub and LinkedIn (lucide standard 24x24 outline style)
const Github = ({ className = "w-4 h-4", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ className = "w-4 h-4", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ==========================================
// PREDEFINED QA & LOCAL KNOWLEDGE FOR GOKUL'S ASSISTANT
// ==========================================
const PREDEFINED_QA = {
  "Skills?":
    "Gokul's technical skill set:\n" +
    "• Programming Languages: Python, JavaScript, Java, C, .NET\n" +
    "• Web Technologies: React.js, REST APIs, HTML, CSS\n" +
    "• AI & Machine Learning: Generative AI, AI Agents, Prompt Engineering, Machine Learning, Deep Learning, LLMs, RAG, LangChain, LangGraph, MCP, Hugging Face\n" +
    "• Databases: MySQL, ChromaDB\n" +
    "• Developer Tools: Git, GitHub",
  "Educational details?":
    "• B.E. CSE (2021–2025): University College of Engineering Villupuram — CGPA: 8.14\n• HSC (2021): Aditya's Vivekananda Matric Hr Sec School — 93%\n• SSLC (2019): Aditya's Vivekananda Matric Hr Sec School — 93%",
  "Contact details?":
    "• GitHub: https://github.com/GOKUL05102003\n• LinkedIn: https://www.linkedin.com/in/gokulrajakumar/\n• Email: gokul05102003@gmail.com\n• Call: +91 6380802728",
  "Certifications?":
    "• AI Foundation — TCS iON\n• Python — Skillup\n• Fundamentals of AI Agents — Hugging Face\n• SQL — HackerRank",
  "Internships?":
    "Gokul's experience:\n• Dakini AI — AI Software Engineer (October 2026 – Present): Engineered AI-driven voice workflows integrating STT/TTS pipelines with CRM systems, and developed automated webhooks, Meta Graph API integrations, and MCP server tooling.\n• Neohorizon Analytics Private Limited, Chennai — Software Engineer (June–July 2023): Built interactive React.js UI components and automated Python data-processing scripts.",
  "Projects?":
    "1. PDF RAG Pipeline: https://github.com/GOKUL05102003/PDF_RAG_Pipeline\n2. Hypertensive Retinopathy Classification: https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy\n3. Chatbot for E-commerce Website: https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website"
};

const RESUME_CONTEXT = `
Name: Gokul R
Role: AI Engineer & Software Developer (Available for AI Engineer & Software developer Roles)
Location: Chennai, Tamil Nadu
Email: gokul05102003@gmail.com | Phone: +91 6380802728
GitHub: https://github.com/GOKUL05102003
LinkedIn: https://www.linkedin.com/in/gokulrajakumar/
Summary: Aspiring AI Engineer with a solid background in machine learning pipelines, RAG systems, and computer vision models.
Education:
1. B.E., Computer Science and Engineering (2021-2025) at University College of Engineering Villupuram - CGPA: 8.14
2. HSC (2021) at Aditya's Vivekananda Matric Hr Sec School Villupuram - 93%
3. SSLC (2019) at Aditya's Vivekananda Matric Hr Sec School Villupuram - 93%
Skills:
- Programming Languages: Python, Java, C, JavaScript, TypeScript, .NET
- Artificial Intelligence: Machine Learning, Deep Learning, Generative AI, AI Agents, Prompt Engineering, LLMs, RAG, LangChain, LangGraph, MCP, Hugging Face
- Web Technologies: REST APIs, FastAPI, React.js, HTML, CSS
- Databases & Frameworks: MySQL, ChromaDB, PyTorch, OpenCV, NumPy, Scikit-learn, NLTK
- Developer Tools: Git, GitHub
Projects:
1. PDF RAG Pipeline (https://github.com/GOKUL05102003/PDF_RAG_Pipeline): Built a voice-interactive Retrieval-Augmented Generation (RAG) pipeline (STT - LLM - TTS) to parse, embed, and query PDF documents using LangChain, Google’s Gemini API and ChromaDB. Tools: Python, LangChain, Google Generative AI (Gemini), ChromaDB, PyPDF and SpeechRecognition.
2. Hypertensive Retinopathy Classification (https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy): Automated deep learning system classifying Hypertensive Retinopathy into 5 clinical stages with 96% accuracy using Python, PyTorch, EfficientNet-B7, OpenCV, NumPy and Scikit-learn.
3. Chatbot for E-commerce Website (https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website): End-to-end NLP conversational AI in PyTorch and NLTK for customer support and product recommendations.
Internships:
- Dakini AI - AI Software Engineer (October 2026 - Present): Engineered AI-driven voice workflows integrating Speech-to-Text (STT) and Text-to-Speech (TTS) pipelines with CRM systems to automate real-time customer interactions and lead management. Developed automated webhook subscriptions, Meta Graph API integrations, and MCP server tooling to synchronize multi-channel conversational data directly into CRM workflows.
- Neohorizon Analytics Private Limited, Chennai - Software Engineer (June 2023 - July 2023): Engineered responsive UI components using React.js and developed automated Python scripts for data processing workflows.
Certificates:
- AI Foundation: TCS iON
- Python: Skillup
- Fundamentals of AI Agents: Hugging Face
- SQL: HackerRank
`;

function getLocalAnswer(query) {
  const q = query.toLowerCase().trim();
  if (PREDEFINED_QA[query]) return PREDEFINED_QA[query];
  if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack') || q.includes('.net') || q.includes('net') || q.includes('ai') || q.includes('langchain') || q.includes('langgraph') || q.includes('mcp') || q.includes('agent')) {
    return PREDEFINED_QA["Skills"];
  }
  if (q.includes('education') || q.includes('college') || q.includes('school') || q.includes('cgpa') || q.includes('hsc') || q.includes('sslc')) {
    return PREDEFINED_QA["Educational details?"];
  }
  if (q.includes('certificate') || q.includes('course') || q.includes('tcs') || q.includes('skillup') || q.includes('hugging') || q.includes('hackerrank')) {
    return PREDEFINED_QA["Certifications?"];
  }
  if (q.includes('github') || q.includes('linkedin') || q.includes('link') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('mobile') || q.includes('call')) {
    return PREDEFINED_QA["Contact details?"];
  }
  if (q.includes('project') || q.includes('rag') || q.includes('projects') || q.includes('chatbot')) {
    return PREDEFINED_QA["Projects?"];
  }
  if (q.includes('intern') || q.includes('intership') || q.includes('experience') || q.includes('internship') || q.includes('neohorizon') || q.includes('dakini')) {
    return PREDEFINED_QA["Internships?"];
  }
  return "Gokul R is an AI Engineer & Software Developer skilled in Python, Machine Learning, RAG, LangChain, LangGraph, MCP, Deep Learning (PyTorch), React.js, FastAPI, and MySQL. Ask about his AI skills, education, certifications, projects, or contact details!";
}

// Helper to render URLs, email addresses, and phone numbers inside chat messages as clickable links
function renderMessageWithLinks(text) {
  const tokenRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+91\s?[0-9]{10})/g;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\+91\s?[0-9]{10}$/;
  const urlRegex = /^https?:\/\//;

  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(tokenRegex);
    return (
      <div key={lineIdx} className={lineIdx > 0 ? 'mt-1' : ''}>
        {parts.map((part, i) => {
          if (!part) return null;
          if (urlRegex.test(part)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5D4] underline hover:text-[#00C8FF] break-all"
              >
                {part}
              </a>
            );
          }
          if (emailRegex.test(part)) {
            return (
              <a
                key={i}
                href={`mailto:${part}`}
                className="text-[#00E5D4] underline hover:text-[#00C8FF] break-all"
              >
                {part}
              </a>
            );
          }
          if (phoneRegex.test(part)) {
            return (
              <a
                key={i}
                href={`tel:${part.replace(/\s+/g, '')}`}
                className="text-[#00E5D4] underline hover:text-[#00C8FF] break-all"
              >
                {part}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  });
}

// ==========================================
// CONSTELLATION / PLEXUS PARTICLE NETWORK BACKGROUND (Teal / Cyan theme)
// ==========================================
function ConstellationBackground({ mousePos }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef(mousePos);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(85, Math.floor((width * height) / 14000));
    const colors = ['#00E5D4', '#00C8FF', '#38BDF8', '#2DD4BF', '#0EA5E9'];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDist = 140;
      const m = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 212, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (m && m.x > 0) {
          const mdx = p1.x - m.x;
          const mdy = p1.y - m.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160) {
            const mAlpha = (1 - mdist / 160) * 0.45;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 200, 255, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p1.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}

// ==========================================
// MOUSE-POSITION-BASED 3D CARD TILT COMPONENT
// Decoupled stationary trigger wrapper + Lerp animation frame
// Completely eliminates transform feedback loop, sudden jumps, and jitter
// ==========================================
function TiltCard({ children, className = '', maxTilt = 4.5, style = {}, ...props }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);
  const isHoveredRef = useRef(false);

  const updateTransform = () => {
    // Controlled linear interpolation factor (0.12) for smooth, natural movement
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.12;
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.12;

    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${currentRot.current.x.toFixed(2)}deg) rotateY(${currentRot.current.y.toFixed(2)}deg)`;
    }

    const diffX = Math.abs(targetRot.current.x - currentRot.current.x);
    const diffY = Math.abs(targetRot.current.y - currentRot.current.y);

    if (isHoveredRef.current || diffX > 0.01 || diffY > 0.01) {
      animFrameId.current = requestAnimationFrame(updateTransform);
    } else {
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      animFrameId.current = null;
    }
  };

  const handleMouseMove = (e) => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!containerRef.current) return;

    // Stable coordinate reference frame from UNTRANSFORMED outer container
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = Math.max(-1, Math.min(1, (x - rect.width / 2) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (y - rect.height / 2) / (rect.height / 2)));

    targetRot.current = {
      x: -normY * maxTilt,
      y: normX * maxTilt
    };

    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updateTransform);
    }
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    isHoveredRef.current = true;
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updateTransform);
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    targetRot.current = { x: 0, y: 0 };
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updateTransform);
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const isFlex1 = className.includes('flex-1');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${isFlex1 ? 'flex-1 flex flex-col' : 'w-full'}`}
      style={{ transform: 'none' }}
    >
      <div
        ref={cardRef}
        className={`${className} ${isFlex1 ? 'flex-1' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);

  // Interactive cursor tracking & hover detection (Image 3)
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorActive(true);
      const target = e.target;
      if (target && target.closest('a, button, input, textarea, [role="button"], .cosmic-card')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    const handlePointerLeave = () => {
      setCursorActive(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Skill sets search & category filter state
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');

  // Gokul's Assistant Chat state (Only Chat, no extra tabs)
  const [chatQuery, setChatQuery] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Gokul's Assistant. Ask me about Gokul's AI skills, educational details, certifications, projects, or contact details!"
    }
  ]);
  const chatContainerRef = useRef(null);

  // Auto-scroll chat container to bottom when messages or loading state change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, chatLoading]);

  // Profile Data
  const profile = {
    name: 'Gokul R',
    role: 'AI Engineer & Software Developer',
    status: 'Available for AI Engineer & Software developer Roles',
    location: 'Chennai, Tamil Nadu',
    email: 'gokul05102003@gmail.com',
    phone: '+91 6380802728',
    github: 'https://github.com/GOKUL05102003',
    linkedin: 'https://www.linkedin.com/in/gokulrajakumar/',
    resumeUrl: 'https://drive.google.com/file/d/1Mnh4HnoW_59kZV_PLA4BJDWTlc4vGX-S/view?usp=sharing',
    summary:
      'Aspiring AI Engineer with a solid background in machine learning pipelines, RAG systems, and computer vision models. Eager to combine rigorous analytical capabilities with efficient coding practices to build, test, and deploy intelligent, data-driven solutions in a collaborative engineering team.'
  };

  // Individual Skill Blocks for "Skill sets" section (Clean core skills - frameworks removed)
  const allSkills = useMemo(() => [
    // Programming Languages
    {
      name: 'Python',
      category: 'Programming Languages',
      tag: 'Primary AI & Automation Language',
      icon: <Terminal className="w-5 h-5 text-cyan-400" />
    },
    {
      name: 'JavaScript',
      category: 'Programming Languages',
      tag: 'ES6+ Interactive Web Logic',
      icon: <Zap className="w-5 h-5 text-cyan-400" />
    },
    {
      name: 'Java',
      category: 'Programming Languages',
      tag: 'Object-Oriented Programming',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />
    },
    {
      name: 'C',
      category: 'Programming Languages',
      tag: 'Core Systems & Memory Logic',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />
    },
    {
      name: '.NET',
      category: 'Programming Languages',
      tag: 'Enterprise Application & Backend Framework',
      icon: <Layers className="w-5 h-5 text-cyan-400" />
    },
    // Artificial Intelligence
    {
      name: 'Generative AI',
      category: 'Artificial Intelligence',
      tag: 'Foundation Models & Synthesis',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'AI Agents',
      category: 'Artificial Intelligence',
      tag: 'Autonomous Multi-Agent Systems',
      icon: <Bot className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'Prompt Engineering',
      category: 'Artificial Intelligence',
      tag: 'Few-Shot, In-Context Learning & CoT',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'Machine Learning',
      category: 'Artificial Intelligence',
      tag: 'Predictive Modeling & Pipelines',
      icon: <Brain className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'Deep Learning',
      category: 'Artificial Intelligence',
      tag: 'Neural Architectures & CNNs',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'LLMs',
      category: 'Artificial Intelligence',
      tag: 'Gemini API & Prompt Tuning',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'RAG',
      category: 'Artificial Intelligence',
      tag: 'Vector Search & Grounded QA',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'LangChain',
      category: 'Artificial Intelligence',
      tag: 'LLM Orchestration',
      icon: <Layers className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'LangGraph',
      category: 'Artificial Intelligence',
      tag: 'Agentic Workflows',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'MCP',
      category: 'Artificial Intelligence',
      tag: 'Model Context Protocol',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />
    },
    {
      name: 'Hugging Face',
      category: 'Artificial Intelligence',
      tag: 'Transformers & Embeddings',
      icon: <Bot className="w-5 h-5 text-emerald-400" />
    },
    // Web Technologies
    {
      name: 'React.js',
      category: 'Web Technologies',
      tag: 'Frontend Component Architecture',
      icon: <Code2 className="w-5 h-5 text-indigo-400" />
    },
    {
      name: 'REST APIs',
      category: 'Web Technologies',
      tag: 'Scalable Endpoints & HTTP Protocols',
      icon: <Zap className="w-5 h-5 text-indigo-400" />
    },
    {
      name: 'HTML',
      category: 'Web Technologies',
      tag: 'Semantic Web Structure',
      icon: <Code2 className="w-5 h-5 text-indigo-400" />
    },
    {
      name: 'CSS',
      category: 'Web Technologies',
      tag: 'Responsive Styling & Layouts',
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    },
    // Databases
    {
      name: 'MySQL',
      category: 'Databases',
      tag: 'Relational Database Management',
      icon: <Database className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'ChromaDB',
      category: 'Databases',
      tag: 'Vector Store for RAG Systems',
      icon: <Database className="w-5 h-5 text-amber-400" />
    },
    // Developer Tools
    {
      name: 'Git',
      category: 'Developer Tools',
      tag: 'Version Control & Branching',
      icon: <GitBranch className="w-5 h-5 text-sky-400" />
    },
    {
      name: 'GitHub',
      category: 'Developer Tools',
      tag: 'CI/CD & Remote Repositories',
      icon: <Github className="w-5 h-5 text-sky-400" />
    }
  ], []);

  const skillCategoriesList = [
    'All',
    'Programming Languages',
    'Artificial Intelligence',
    'Web Technologies',
    'Databases',
    'Developer Tools'
  ];

  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        selectedSkillCategory === 'All' || skill.category === selectedSkillCategory;
      const query = skillSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        skill.tag.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, skillSearch, selectedSkillCategory]);

  // 3 Featured Projects (Displayed Side-by-Side with Exact Repository Links)
  const projects = [
    {
      title: 'PDF RAG Pipeline',
      badge: 'Voice-Interactive RAG',
      icon: <FileText className="w-6 h-6 text-emerald-400" />,
      description:
        'Built a voice-interactive Retrieval-Augmented Generation (RAG) pipeline (STT - LLM - TTS) to parse, embed, and query PDF documents using LangChain, Google’s Gemini API and ChromaDB.',
      highlights: [
        'Voice-interactive workflow integrating Speech-to-Text (STT) and Text-to-Speech (TTS)',
        'Automated document ingestion, intelligent text chunking, and LangChain orchestration',
        'High-dimensional vector embedding and semantic retrieval via ChromaDB'
      ],
      tools: ['Python', 'LangChain', 'ChromaDB', 'PyPDF', 'Google Generative AI (Gemini)', 'SpeechRecognition'],
      githubUrl: 'https://github.com/GOKUL05102003/PDF_RAG_Pipeline'
    },
    {
      title: 'Hypertensive Retinopathy Classification',
      badge: '96% Clinical Accuracy',
      icon: <Eye className="w-6 h-6 text-cyan-400" />,
      description:
        'Architected an automated deep learning system to classify Hypertensive Retinopathy into five clinical severity stages, achieving 96% accuracy.',
      highlights: [
        'Fine-tuned EfficientNet-B7 deep convolutional network in PyTorch',
        'Retinal fundus image preprocessing and enhancement using OpenCV',
        'Evaluated multi-stage clinical precision with Scikit-learn & NumPy'
      ],
      tools: ['Python', 'PyTorch', 'EfficientNet-B7', 'OpenCV', 'NumPy', 'Scikit-learn'],
      githubUrl: 'https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy'
    },
    {
      title: 'Chatbot for E-commerce Website',
      badge: 'PyTorch NLP Agent',
      icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
      description:
        'Built an end-to-end NLP-driven conversational AI in PyTorch to automate customer support and product recommendations for an e-commerce platform.',
      highlights: [
        'Tokenization, stemming, and intent recognition pipelines with NLTK',
        'Deep neural network classification model trained in PyTorch',
        'Automated 24/7 customer query resolution & product discovery'
      ],
      tools: ['Python', 'PyTorch', 'NLTK'],
      githubUrl: 'https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website'
    }
  ];

  // Internships
  const internships = [
    {
      role: 'AI Software Engineer',
      company: 'Dakini AI',
      period: 'October 2026 – Present',
      responsibilities: [
        'Engineered AI-driven voice workflows integrating Speech-to-Text (STT) and Text-to-Speech (TTS) pipelines with CRM systems to automate real-time customer interactions and lead management.',
        'Developed automated webhook subscriptions, Meta Graph API integrations, and MCP server tooling to synchronize multi-channel conversational data directly into CRM workflows.'
      ],
      tech: ['Python', 'STT', 'TTS', 'CRM Integration', 'Webhooks', 'Meta Graph API', 'MCP']
    },
    {
      role: 'Software Engineer',
      company: 'Neohorizon Analytics Private Limited, Chennai',
      period: 'June 2023 – July 2023',
      responsibilities: [
        'Engineered responsive and interactive user interface components using React.js, translating design specifications into functional web features.',
        'Developed and optimized automated Python scripts to streamline data processing workflows and fundamental programming logic.'
      ],
      tech: ['React.js', 'Python', 'JavaScript', 'HTML', 'CSS']
    }
  ];

  // Education (3 items on left side)
  const education = [
    {
      degree: 'B.E., Computer Science and Engineering',
      institution: 'University College of Engineering Villupuram',
      period: '2021 – 2025',
      score: 'CGPA: 8.14'
    },
    {
      degree: 'HSC',
      institution: "Aditya's Vivekananda Matric Hr Sec School Villupuram",
      period: '2021',
      score: 'Percentage: 93%'
    },
    {
      degree: 'SSLC',
      institution: "Aditya's Vivekananda Matric Hr Sec School Villupuram",
      period: '2019',
      score: 'Percentage: 93%'
    }
  ];

  // Certificates (4 items on right side, matched in total height to Education)
  const certificates = [
    {
      title: 'AI Foundation',
      issuer: 'TCS iON',
      category: 'Artificial Intelligence & Machine Learning Foundations',
      certificateUrl: 'https://drive.google.com/file/d/1YfWytuMu62MpersYX20DKa1Npq0Fp8iy/view?usp=sharing'
    },
    {
      title: 'Python',
      issuer: 'Skillup',
      category: 'Python Programming & Data Scripting',
      certificateUrl: 'https://drive.google.com/file/d/1lAwGiiHj0uMjs5Jf4K0mBNn3nnHg54zO/view?usp=sharing'
    },
    {
      title: 'Fundamentals of AI Agents',
      issuer: 'Hugging Face',
      category: 'Autonomous Agents & Multi-Agent Architecture',
      certificateUrl: 'https://drive.google.com/file/d/1RTECFk5EvtX2TdgxMHSFGqI3iPjolzPl/view?usp=sharing'
    },
    {
      title: 'SQL',
      issuer: 'HackerRank',
      category: 'Relational Databases & Query Optimization',
      certificateUrl: 'https://drive.google.com/file/d/1zj1FpTAug-QtUyRrk74SMHmyyL8M-0nA/view?usp=sharing'
    }
  ];

  // Handle chat query in Gokul's Assistant
  const handleAskAssistant = async (customQuestion) => {
    const question = (customQuestion ?? chatQuery).trim();
    if (!question || chatLoading) return;

    setChatQuery('');
    setChatHistory((prev) => [...prev, { role: 'user', text: question }]);

    // If it matches one of the predefined questions, answer immediately and accurately
    if (PREDEFINED_QA[question]) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: PREDEFINED_QA[question] }
      ]);
      return;
    }

    setChatLoading(true);

    const apiKey = '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    const systemPrompt =
      "You are Gokul's Assistant on Gokul R's portfolio website. Answer in 1 to 3 short, direct, and accurate sentences strictly using the provided resume context. Never mention RAG or internal code.";

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Resume Details:\n${RESUME_CONTEXT}\n\nQuestion: ${question}`
            }
          ]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    };

    let reply = '';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

    if (!reply) {
      reply = getLocalAnswer(question);
    }

    setChatHistory((prev) => [...prev, { role: 'assistant', text: reply }]);
    setChatLoading(false);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2200);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050B12] text-[#F1F5F9] font-sans custom-cursor-active selection:bg-[#00E5D4]/25 selection:text-[#00E5D4] antialiased relative overflow-x-hidden">
      {/* 1. Seamless Diffuse Ambient Glow Following Cursor (No visible edge/circumference) */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: cursorActive ? 1 : 0,
          background: `radial-gradient(circle 450px at ${cursorPos.x}px ${cursorPos.y}px, rgba(0, 229, 212, 0.08) 0%, rgba(0, 200, 255, 0.04) 30%, rgba(8, 19, 31, 0.015) 65%, rgba(5, 11, 18, 0) 100%)`
        }}
        aria-hidden="true"
      />

      {/* 2. Custom Sleek Arrowhead Pointer (Preserved exact shape, themed to Electric Teal & Cyan) */}
      {cursorActive && (
        <div
          className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out hidden md:block"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: `translate(-3px, -3px) ${cursorHovered ? 'scale(1.2)' : 'scale(1)'}`
          }}
          aria-hidden="true"
        >
          <svg
            width="28"
            height="32"
            viewBox="0 0 28 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_14px_rgba(0,229,212,0.7)]"
          >
            <defs>
              <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00E5D4" />
                <stop offset="45%" stopColor="#00C8FF" />
                <stop offset="85%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#082f49" />
              </linearGradient>
            </defs>
            <path
              d="M 4 3 C 2.2 1.5, 0.5 2.8, 0.8 5 L 3.8 24.5 C 4.2 26.8, 6.8 27.6, 8.3 25.8 L 12.8 20.3 L 20.8 21.8 C 22.8 22.2, 24.2 19.8, 22.8 18.2 L 5.8 3.4 C 5.3 2.9, 4.6 2.7, 4 3 Z"
              fill="url(#cursorGrad)"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* 3. Constellation Background (Image 2 Moving Connected Network Lines) */}
      <ConstellationBackground mousePos={cursorPos} />

      {/* Ambient Cosmic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E5D4]/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00C8FF]/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#08131F] rounded-full blur-[140px]" />
      </div>

      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050B12]/85 backdrop-blur-md border-b border-[#00E5D4]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('about')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E5D4] to-[#00C8FF] flex items-center justify-center text-[#050B12] font-black text-lg shadow-lg shadow-[#00E5D4]/20 group-hover:scale-105 transition-transform">
              G
            </span>
            <span className="font-heading font-bold text-lg tracking-tight text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors">
              {profile.name}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A7B3C2]">
            <button onClick={() => scrollTo('about')} className="hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200">
              About
            </button>
            <button onClick={() => scrollTo('experience')} className="hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200">
              Internships
            </button>
            <button onClick={() => scrollTo('projects')} className="hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200">
              Projects
            </button>
            <button onClick={() => scrollTo('skills')} className="hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200">
              Skill sets
            </button>
            <button onClick={() => scrollTo('education-certificates')} className="hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200">
              Education & Certificates
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200">
              Contact
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 text-[#A7B3C2] hover:text-[#F1F5F9] hover:border-[#00E5D4]/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 text-[#A7B3C2] hover:text-[#00C8FF] hover:border-[#00C8FF]/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0B1824] border border-[#00E5D4]/30 text-[#00E5D4] hover:bg-[#00E5D4]/10 hover:border-[#00E5D4] hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(0,229,212,0.2)]"
            >
              <FileText className="w-3.5 h-3.5 text-[#00E5D4]" />
              <span>View Resume</span>
              <ExternalLink className="w-3 h-3 text-[#A7B3C2]" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 text-[#A7B3C2]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#08131F]/95 border-b border-[#00E5D4]/15 px-6 py-4 space-y-2">
            {[
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Internships' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skill sets' },
              { id: 'education-certificates', label: 'Education & Certificates' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-2 text-sm font-medium text-[#A7B3C2] hover:text-[#00E5D4]"
              >
                {item.label}
              </button>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 text-sm font-semibold text-[#00E5D4]"
            >
              View Resume
            </a>
          </div>
        )}
      </nav>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 space-y-10 md:space-y-12 pb-16 md:pb-20">
        {/* ==========================================
            1. HERO SECTION + GOKUL'S ASSISTANT (CHAT ONLY)
        ========================================== */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start scroll-mt-16">
          {/* Left Column: Intro & Bio */}
          <div className="lg:col-span-7 space-y-5 pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#00E5D4]/10 border border-[#00E5D4]/30 text-[#00E5D4] shadow-sm hover:border-[#00E5D4]/60 transition-colors duration-200">
              <span className="w-2 h-2 rounded-full bg-[#00E5D4] animate-pulse" />
              <span>{profile.status}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-[#F1F5F9] leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5D4] via-[#00C8FF] to-sky-300">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-heading text-[#F1F5F9] tracking-tight">
                AI Engineer & Software Developer
              </p>
            </div>

            <p className="text-[#A7B3C2] text-base sm:text-lg leading-relaxed">
              {profile.summary}
            </p>

            {/* Contact Info Pills */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 text-xs sm:text-sm text-[#A7B3C2] hover:border-[#00E5D4]/30 hover:text-[#F1F5F9] hover:-translate-y-0.5 transition-all duration-200">
                <MapPin className="w-4 h-4 text-[#00E5D4] shrink-0" />
                <span>{profile.location}</span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 text-xs sm:text-sm text-[#A7B3C2] hover:border-[#00E5D4]/40 hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-[#00C8FF] shrink-0" />
                <span>{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 text-xs sm:text-sm text-[#A7B3C2] hover:border-[#00E5D4]/40 hover:text-[#00E5D4] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{profile.phone}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5D4] to-[#00C8FF] text-[#050B12] font-bold text-sm hover:opacity-95 shadow-lg shadow-[#00E5D4]/20 hover:shadow-[#00E5D4]/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Explore Projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B1824] border border-[#00E5D4]/40 hover:bg-[#00E5D4]/10 text-sm font-semibold text-[#00E5D4] hover:scale-105 active:scale-95 shadow-sm hover:shadow-[0_0_15px_rgba(0,229,212,0.15)] transition-all duration-300"
              >
                <FileText className="w-4 h-4 text-[#00E5D4]" />
                <span>View Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 text-sm font-medium text-[#F1F5F9] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B1824] border border-[#00E5D4]/15 hover:border-[#00C8FF]/40 text-sm font-medium text-[#F1F5F9] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-[#00C8FF]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Gokul's Assistant (Clean Chat Interface Only) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0B1824]/90 border border-[#00E5D4]/20 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Chatbot Header */}
            <div className="px-5 py-3.5 bg-[#08131F]/90 border-b border-[#00E5D4]/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00E5D4]/15 border border-[#00E5D4]/30 flex items-center justify-center text-[#00E5D4]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-[#F1F5F9] leading-none">
                    Gokul's Assistant
                  </h3>
                  <p className="text-[11px] text-[#00E5D4] mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5D4] animate-pulse" />
                    Online • Ask me anything about Gokul
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-4">
              <div
                ref={chatContainerRef}
                className="h-60 overflow-y-auto space-y-3 pr-1"
              >
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#00E5D4]/15 to-[#00C8FF]/15 border border-[#00E5D4]/30 text-[#F1F5F9] ml-8'
                      : 'bg-[#08131F]/90 border border-[#00E5D4]/15 text-[#F1F5F9] mr-4'
                      }`}
                  >
                    <div className="font-semibold text-[10px] uppercase tracking-wider mb-1 text-[#A7B3C2]">
                      {msg.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    {renderMessageWithLinks(msg.text)}
                  </div>
                ))}
                {chatLoading && (
                  <div className="p-3 rounded-xl bg-[#08131F]/90 border border-[#00E5D4]/15 text-xs text-[#00E5D4] animate-pulse">
                    Assistant is typing...
                  </div>
                )}
              </div>

              {/* Simple Predefined Questions */}
              <div className="space-y-1.5">
                <p className="text-[11px] text-[#A7B3C2] font-medium">
                  Quick questions:
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    'Skills?',
                    'Internships?',
                    'Projects?',
                    'Educational details?',
                    'Certifications?',
                    'Contact details?'
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskAssistant(q)}
                      className="text-[11px] px-2 py-2 rounded-lg bg-[#08131F] border border-[#00E5D4]/20 text-[#A7B3C2] hover:border-[#00E5D4]/50 hover:text-[#00E5D4] hover:bg-[#00E5D4]/5 transition-all text-center flex items-center justify-center leading-snug"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAssistant();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="Ask a question about Gokul..."
                  className="flex-1 bg-[#08131F] border border-[#00E5D4]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#F1F5F9] placeholder-[#A7B3C2]/60 focus:outline-none focus:border-[#00E5D4]/60"
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5D4] to-[#00C8FF] text-[#050B12] font-semibold text-xs hover:opacity-90 disabled:opacity-50 transition-colors flex items-center gap-1 shadow-md shadow-[#00E5D4]/20"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. INTERNSHIPS EXPERIENCE SECTION
        ========================================== */}
        <section id="experience" className="space-y-4 scroll-mt-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00E5D4] mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Industry Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#F1F5F9]">
              Internships
            </h2>
            <p className="text-sm text-[#A7B3C2] mt-1">
              Hands-on industry experience building AI workflows, autonomous agent systems, and full-stack software solutions.
            </p>
          </div>

          <div className="space-y-4">
            {internships.map((internship, index) => (
              <TiltCard
                key={index}
                className="cinematic-card p-6 sm:p-8 rounded-2xl bg-[#0B1824]/90 border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:shadow-[0_10px_30px_-10px_rgba(0,229,212,0.15)] transition-colors duration-300 space-y-5 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#00E5D4]/15">
                  <div className="flex items-start gap-3.5">
                    <div>
                      <h3 className="text-xl font-bold font-heading text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors duration-200">
                        {internship.company}
                      </h3>
                      <p className="text-[#00E5D4] text-sm font-medium mt-0.5">
                        {internship.role}
                      </p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#08131F] text-[#A7B3C2] border border-[#00E5D4]/15 w-fit group-hover:border-[#00E5D4]/40 group-hover:text-[#F1F5F9] transition-colors duration-200">
                    {internship.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {internship.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#A7B3C2]">
                      <span className="w-2 h-2 rounded-full bg-[#00E5D4] mt-2 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {internship.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-[#08131F] text-[#A7B3C2] border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:text-[#00E5D4] transition-all duration-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ==========================================
            3. FEATURED PROJECTS SECTION (3 SIDE BY SIDE + LARGER GITHUB CTA)
        ========================================== */}
        <section id="projects" className="space-y-4 scroll-mt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00C8FF] mb-1">
                <Brain className="w-4 h-4" />
                <span>AI & Engineering Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#F1F5F9]">
                Featured Projects
              </h2>
              <p className="text-sm text-[#A7B3C2] mt-1">
                Core systems built across Retrieval-Augmented Generation, Computer Vision, and Conversational NLP.
              </p>
            </div>

            {/* Enlarged Prominent GitHub Repositories Button */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base sm:text-lg font-bold font-heading rounded-2xl bg-gradient-to-r from-[#00E5D4]/15 via-[#00C8FF]/15 to-[#08131F] border-2 border-[#00E5D4]/50 text-[#00E5D4] hover:bg-gradient-to-r hover:from-[#00E5D4] hover:to-[#00C8FF] hover:text-[#050B12] hover:border-[#00E5D4] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#00E5D4]/10 shrink-0"
            >
              <Github className="w-5 h-5" />
              <span>View all repositories on GitHub</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* 3 Projects Side-by-Side Grid with Mouse-Position 3D Tilt */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {projects.map((project, idx) => (
              <TiltCard
                key={idx}
                className="cinematic-card p-6 rounded-2xl bg-[#0B1824]/90 border border-[#00E5D4]/15 hover:border-[#00C8FF]/50 hover:shadow-[0_10px_30px_-10px_rgba(0,200,255,0.15)] flex flex-col justify-between h-full shadow-lg group"
              >
                <div className="space-y-4">
                  {/* Top Icon & Badge (Sequential number removed) */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-xl bg-[#08131F] border border-[#00E5D4]/20 text-[#00E5D4] group-hover:scale-110 group-hover:border-[#00C8FF]/50 transition-all duration-300">
                      {project.icon}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#00C8FF]/10 text-[#00C8FF] border border-[#00C8FF]/30 group-hover:border-[#00C8FF]/50 group-hover:bg-[#00C8FF]/20 transition-all duration-300">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold font-heading text-[#F1F5F9] tracking-tight group-hover:text-[#00C8FF] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-[#A7B3C2] text-xs sm:text-sm mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Bullet Points */}
                  <ul className="space-y-2 pt-1">
                    {project.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-[#A7B3C2]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer: Tools & Specific GitHub Repo Link */}
                <div className="pt-5 mt-6 border-t border-[#00E5D4]/15 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-[#08131F] text-[#00C8FF] border border-[#00C8FF]/20 hover:border-[#00C8FF]/50 transition-colors duration-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#08131F] hover:bg-gradient-to-r hover:from-[#00E5D4] hover:to-[#00C8FF] text-xs font-bold text-[#F1F5F9] hover:text-[#050B12] border border-[#00E5D4]/20 hover:border-[#00E5D4] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Open Repository on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. SKILL SETS SECTION (SUBTLE POP-UP HOVER INTERACTION - NO ROTATION/TILT)
        ========================================== */}
        <section id="skills" className="space-y-4 scroll-mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00E5D4] mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Technical Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#F1F5F9]">
                Skill sets
              </h2>
              <p className="text-sm text-[#A7B3C2] mt-1">
                Search or filter individual technical skill blocks across AI, programming languages, web technologies, and databases.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#A7B3C2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Search skills e.g. Python, RAG, React.js..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0B1824] border border-[#00E5D4]/20 text-xs sm:text-sm text-[#F1F5F9] placeholder-[#A7B3C2]/60 focus:outline-none focus:border-[#00E5D4]/60 transition-colors"
              />
              {skillSearch && (
                <button
                  onClick={() => setSkillSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A7B3C2] hover:text-[#F1F5F9] transition-colors"
                  aria-label="Clear skill search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {skillCategoriesList.map((category) => {
              const active = selectedSkillCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedSkillCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${active
                    ? 'bg-gradient-to-r from-[#00E5D4] to-[#00C8FF] text-[#050B12] shadow-md shadow-[#00E5D4]/20'
                    : 'bg-[#0B1824] text-[#A7B3C2] border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:text-[#F1F5F9]'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Individual Skill Blocks Grid (Pop-up Hover Effect - No 3D tilt, No rotate) */}
          {filteredSkills.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0B1824]/60 border border-[#00E5D4]/15 text-center text-sm text-[#A7B3C2]">
              No matching skill found for "{skillSearch}". Try another keyword or select "All".
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="cinematic-card p-4 rounded-2xl bg-[#0B1824]/90 border border-[#00E5D4]/15 hover:border-[#00E5D4]/50 hover:shadow-[0_12px_24px_-8px_rgba(0,229,212,0.22)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200 ease-out flex flex-col justify-between gap-3 shadow-sm group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/20 text-[#00E5D4] group-hover:border-[#00E5D4]/60 group-hover:scale-110 transition-all duration-300">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#08131F] text-[#A7B3C2] border border-[#00E5D4]/15 truncate max-w-[110px]">
                      {skill.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-heading text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] text-[#A7B3C2] mt-0.5 leading-snug">
                      {skill.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ==========================================
            5. EDUCATION & CERTIFICATES SIDE-BY-SIDE (EQUAL TOTAL HEIGHT)
        ========================================== */}
        <section
          id="education-certificates"
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch scroll-mt-16"
        >
          {/* Left Column: Education */}
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00C8FF] mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Background</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#F1F5F9]">
                Education
              </h2>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-between">
              {education.map((edu, idx) => (
                <TiltCard
                  key={idx}
                  className="cinematic-card flex-1 p-6 rounded-2xl bg-[#0B1824]/90 border border-[#00E5D4]/15 hover:border-[#00C8FF]/50 hover:shadow-[0_10px_30px_-10px_rgba(0,200,255,0.15)] flex flex-col justify-center gap-3 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-[#08131F] text-[#00C8FF] border border-[#00E5D4]/15 group-hover:border-[#00C8FF]/40 transition-colors duration-200">
                        {edu.period}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-3.5 py-1 rounded-xl text-xs font-mono font-bold bg-[#00C8FF]/10 text-[#00C8FF] border border-[#00C8FF]/30">
                      {edu.score}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-[#F1F5F9] group-hover:text-[#00C8FF] transition-colors duration-200">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-[#A7B3C2] mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Right Column: Certificates */}
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00E5D4] mb-2">
                <Award className="w-4 h-4" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#F1F5F9]">
                Certificates
              </h2>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-between">
              {certificates.map((cert, idx) => (
                <TiltCard
                  key={idx}
                  className="cinematic-card flex-1 p-5 rounded-2xl bg-[#0B1824]/90 border border-[#00E5D4]/15 hover:border-[#00E5D4]/50 hover:shadow-[0_10px_30px_-10px_rgba(0,229,212,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#08131F] border border-[#00E5D4]/20 group-hover:border-[#00E5D4]/50 group-hover:scale-110 flex items-center justify-center text-[#00E5D4] shrink-0 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors duration-200">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-[#A7B3C2] mt-0.5">{cert.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-[#08131F] text-[#00E5D4] border border-[#00E5D4]/20">
                      {cert.issuer}
                    </span>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#00E5D4]/10 hover:bg-gradient-to-r hover:from-[#00E5D4] hover:to-[#00C8FF] text-[#00E5D4] hover:text-[#050B12] border border-[#00E5D4]/30 hover:border-[#00E5D4] shadow-sm hover:shadow-[0_0_15px_rgba(0,229,212,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            6. CONTACT SECTION (EXPLICITLY EXCLUDED FROM 3D TILT - SIMPLE BORDER GLOW ONLY)
        ========================================== */}
        <section
          id="contact"
          className="contact-box p-6 sm:p-8 rounded-3xl bg-[#0B1824] border border-[#00E5D4]/20 hover:border-[#00E5D4]/40 hover:shadow-[0_0_35px_rgba(0,229,212,0.12)] text-center space-y-4 scroll-mt-16 transition-shadow duration-300"
          style={{ transform: 'none' }}
        >
          <div className="max-w-xl mx-auto space-y-3 text-center">
            <h2 className="text-3xl font-extrabold font-heading text-[#F1F5F9]">
              Let's Connect & Collaborate
            </h2>
            <p className="text-sm sm:text-base text-[#A7B3C2] leading-relaxed max-w-lg mx-auto">
              Available for AI Engineer &amp; Software developer Roles. Reach out directly via email, LinkedIn, GitHub, or phone call.
            </p>
          </div>

          {/* Copyable Contact Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleCopy('6380802728', 'phone')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:shadow-md text-xs text-[#A7B3C2] hover:text-[#F1F5F9] font-mono transition-all duration-200"
            >
              {copiedItem === 'phone' ? (
                <Check className="w-4 h-4 text-[#00C8FF]" />
              ) : (
                <Copy className="w-4 h-4 text-[#00C8FF]" />
              )}
              <span>6380802728</span>
            </button>

            <button
              onClick={() => handleCopy(profile.email, 'email')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:shadow-md text-xs text-[#A7B3C2] hover:text-[#F1F5F9] font-mono transition-all duration-200"
            >
              {copiedItem === 'email' ? (
                <Check className="w-4 h-4 text-[#00E5D4]" />
              ) : (
                <Copy className="w-4 h-4 text-[#00E5D4]" />
              )}
              <span>gokul05102003@gmail.com</span>
            </button>
          </div>

          {/* Direct Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5D4] to-[#00C8FF] text-[#050B12] font-bold text-sm hover:opacity-95 shadow-lg shadow-[#00E5D4]/25 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#08131F] hover:bg-[#0B1824] text-[#F1F5F9] font-medium text-sm border border-[#00E5D4]/20 hover:border-[#00E5D4]/40 transition-all duration-200 shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#00E5D4]" />
              <span>Call</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#08131F] hover:bg-[#0B1824] text-[#F1F5F9] font-medium text-sm border border-[#00E5D4]/20 hover:border-[#00C8FF]/40 transition-all duration-200 shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-[#00C8FF]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#08131F] hover:bg-[#0B1824] text-[#F1F5F9] font-medium text-sm border border-[#00E5D4]/20 hover:border-[#00E5D4]/40 transition-all duration-200 shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}