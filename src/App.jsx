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
  Zap
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
  "What are Gokul's skills in AI?":
    "Gokul's AI skills include Machine Learning, Deep Learning, LLMs, RAG, LangChain, LangGraph, MCP (Model Context Protocol), Hugging Face, PyTorch, Computer Vision (EfficientNet-B7, OpenCV), and ChromaDB.",
  "Educational details?":
    "• B.E. CSE (2021–2025): University College of Engineering Villupuram — CGPA: 8.14\n• HSC (2021): Aditya's Vivekananda Matric Hr Sec School — 93% (Mathematics, physics, chemistry and biology)\n• SSLC (2019): Aditya's Vivekananda Matric Hr Sec School — 93% (Tamil, English, Maths, Science, Social)",
  "GitHub link and LinkedIn links?":
    "• GitHub: https://github.com/GOKUL05102003\n• LinkedIn: https://www.linkedin.com/in/gokulrajakumar/\n• Email: gokul05102003@gmail.com",
  "Certifications?":
    "• AI Foundation — TCS iON\n• Python — Skillup\n• Java — IBM\n• C Programming — Tech Panchami",
  "Tell me about his projects?":
    "1. PDF RAG Pipeline: https://github.com/GOKUL05102003/PDF_RAG_Pipeline\n2. Hypertensive Retinopathy Classification (96% accuracy): https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy\n3. Chatbot for E-commerce Website: https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website"
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
2. HSC (2021) at Aditya's Vivekananda Matric Hr Sec School Villupuram - 93% (Mathematics, physics, chemistry and biology)
3. SSLC (2019) at Aditya's Vivekananda Matric Hr Sec School Villupuram - 93% (Tamil, English, Maths, Science, Social)
Skills:
- Programming Languages: Python, Java, C, JavaScript
- Artificial Intelligence: Machine Learning, Deep Learning, LLMs, RAG, LangChain, LangGraph, MCP (Model Context Protocol), Hugging Face
- Web Technologies: FastAPI, React.js, HTML, CSS
- Databases & Frameworks: MySQL, ChromaDB, PyTorch, OpenCV, NumPy, Scikit-learn, NLTK
Projects:
1. PDF RAG Pipeline (https://github.com/GOKUL05102003/PDF_RAG_Pipeline): Built a RAG pipeline to parse, embed, and query large PDF documents using Google's Gemini API, ChromaDB, Python, and PyPDF.
2. Hypertensive Retinopathy Classification (https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy): Automated deep learning system classifying Hypertensive Retinopathy into 5 clinical stages with 96% accuracy using Python, PyTorch, EfficientNet-B7, OpenCV, NumPy, Scikit-learn.
3. Chatbot for E-commerce Website (https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website): End-to-end NLP conversational AI in PyTorch and NLTK for customer support and product recommendations.
Internship:
- Neohorizon Analytics Private Limited, Chennai (June 2023 - July 2023): Engineered responsive UI components using React.js and developed automated Python scripts for data processing workflows.
Certificates:
- AI Foundation: TCS iON
- Python: Skillup
- Java: IBM
- C Programming: Tech Panchami
`;

function getLocalAnswer(query) {
  const q = query.toLowerCase().trim();
  if (PREDEFINED_QA[query]) return PREDEFINED_QA[query];
  if (q.includes('ai') || q.includes('langchain') || q.includes('langgraph') || q.includes('mcp')) {
    return PREDEFINED_QA["What are Gokul's skills in AI?"];
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack')) {
    return "• Languages: Python, Java, C, JavaScript\n• AI: Machine Learning, Deep Learning, LLMs, RAG, LangChain, LangGraph, MCP, Hugging Face\n• Web & DB: FastAPI, React.js, HTML, CSS, MySQL";
  }
  if (q.includes('educat') || q.includes('college') || q.includes('school') || q.includes('cgpa') || q.includes('hsc') || q.includes('sslc')) {
    return PREDEFINED_QA["Educational details?"];
  }
  if (q.includes('certificat') || q.includes('course') || q.includes('tcs') || q.includes('skillup') || q.includes('ibm')) {
    return PREDEFINED_QA["Certifications?"];
  }
  if (q.includes('github') || q.includes('linkedin') || q.includes('link') || q.includes('contact') || q.includes('email') || q.includes('phone')) {
    return PREDEFINED_QA["GitHub link and LinkedIn links?"];
  }
  if (q.includes('project') || q.includes('rag') || q.includes('retinopathy') || q.includes('chatbot')) {
    return PREDEFINED_QA["Tell me about his projects?"];
  }
  if (q.includes('intern') || q.includes('experience') || q.includes('neohorizon')) {
    return "Gokul interned at Neohorizon Analytics Private Limited, Chennai (June–July 2023), building interactive React.js UI components and automated Python data-processing scripts.";
  }
  return "Gokul R is an AI Engineer & Software Developer skilled in Python, Machine Learning, RAG, LangChain, LangGraph, MCP, Deep Learning (PyTorch), React.js, FastAPI, and MySQL. Ask about his AI skills, education, certifications, projects, or GitHub/LinkedIn links!";
}

// Helper to render URLs inside chat messages as clickable links
function renderMessageWithLinks(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const parts = line.split(urlRegex);
    return (
      <div key={lineIdx} className={lineIdx > 0 ? 'mt-1' : ''}>
        {parts.map((part, i) =>
          urlRegex.test(part) ? (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300 break-all"
            >
              {part}
            </a>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    );
  });
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Skill sets search & category filter state
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('All');

  // Gokul's Assistant Chat state (Only Chat, no extra tabs)
  const [chatQuery, setChatQuery] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Gokul's Assistant. Ask me about Gokul's AI skills, educational details, certifications, projects, or GitHub & LinkedIn links!"
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
    summary:
      'Aspiring AI Engineer with a solid background in machine learning pipelines, RAG systems, and computer vision models. Eager to combine rigorous analytical capabilities with efficient coding practices to build, test, and deploy intelligent, data-driven solutions in a collaborative engineering team.'
  };

  // Individual Skill Blocks for "Skill sets" section (No Flask)
  const allSkills = useMemo(() => [
    // Programming Languages
    {
      name: 'Python',
      category: 'Programming Languages',
      tag: 'Primary AI & Automation Language',
      icon: <Terminal className="w-5 h-5 text-cyan-400" />
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
      name: 'JavaScript',
      category: 'Programming Languages',
      tag: 'ES6+ Interactive Web Logic',
      icon: <Zap className="w-5 h-5 text-cyan-400" />
    },
    // Artificial Intelligence
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
      tag: 'Gemini API & Prompt Engineering',
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
      name: 'FastAPI',
      category: 'Web Technologies',
      tag: 'High-Speed Python REST APIs',
      icon: <Zap className="w-5 h-5 text-indigo-400" />
    },
    {
      name: 'React.js',
      category: 'Web Technologies',
      tag: 'Component-Driven Frontend UI',
      icon: <Layers className="w-5 h-5 text-indigo-400" />
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
    // Databases & Frameworks
    {
      name: 'MySQL',
      category: 'Databases & Frameworks',
      tag: 'Relational Database Management',
      icon: <Database className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'ChromaDB',
      category: 'Databases & Frameworks',
      tag: 'Vector Store for RAG Systems',
      icon: <Database className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'PyTorch',
      category: 'Databases & Frameworks',
      tag: 'Deep Learning & Vision Models',
      icon: <Brain className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'OpenCV',
      category: 'Databases & Frameworks',
      tag: 'Computer Vision & Image Processing',
      icon: <Eye className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'NumPy',
      category: 'Databases & Frameworks',
      tag: 'Numerical Computing & Arrays',
      icon: <Cpu className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'Scikit-learn',
      category: 'Databases & Frameworks',
      tag: 'Evaluation & Classical ML',
      icon: <Brain className="w-5 h-5 text-amber-400" />
    },
    {
      name: 'NLTK',
      category: 'Databases & Frameworks',
      tag: 'Natural Language Tokenization',
      icon: <MessageSquare className="w-5 h-5 text-amber-400" />
    }
  ], []);

  const skillCategoriesList = [
    'All',
    'Programming Languages',
    'Artificial Intelligence',
    'Web Technologies',
    'Databases & Frameworks'
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
      badge: 'Gemini API + ChromaDB',
      icon: <FileText className="w-6 h-6 text-emerald-400" />,
      description:
        "Built a Retrieval-Augmented Generation (RAG) pipeline to parse, embed, and query large PDF documents using Google's Gemini API and ChromaDB.",
      highlights: [
        'Automated PDF parsing and intelligent text chunking with PyPDF',
        'High-dimensional vector storage and semantic retrieval via ChromaDB',
        'Context-grounded answer synthesis powered by Google Gemini API'
      ],
      tools: ['Python', 'Google Generative AI (Gemini)', 'ChromaDB', 'PyPDF'],
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

  // Internship
  const internship = {
    role: 'Software Engineering Intern',
    company: 'Neohorizon Analytics Private Limited, Chennai',
    period: 'June 2023 – July 2023',
    responsibilities: [
      'Engineered responsive and interactive user interface components using React.js, translating design specifications into functional web features.',
      'Developed and optimized automated Python scripts to streamline data processing workflows and fundamental programming logic.'
    ],
    tech: ['React.js', 'Python', 'JavaScript', 'HTML', 'CSS']
  };

  // Education (3 items on left side)
  const education = [
    {
      degree: 'B.E., Computer Science and Engineering',
      institution: 'University College of Engineering Villupuram',
      period: '2021 – 2025',
      score: 'CGPA: 8.14',
      subjects: 'Computer Science and Engineering'
    },
    {
      degree: 'HSC',
      institution: "Aditya's Vivekananda Matric Hr Sec School Villupuram",
      period: '2021',
      score: 'Percentage: 93%',
      subjects: 'Mathematics, physics, chemistry and biology'
    },
    {
      degree: 'SSLC',
      institution: "Aditya's Vivekananda Matric Hr Sec School Villupuram",
      period: '2019',
      score: 'Percentage: 93%',
      subjects: 'Tamil, English, Maths, Science, Social'
    }
  ];

  // Certificates (4 items on right side, matched in total height to Education)
  const certificates = [
    {
      title: 'AI Foundation',
      issuer: 'TCS ION',
      category: 'Artificial Intelligence & Machine Learning Foundations'
    },
    {
      title: 'Python',
      issuer: 'Skillup',
      category: 'Python Programming & Data Scripting'
    },
    {
      title: 'Java',
      issuer: 'IBM',
      category: 'Object-Oriented Programming & Core Java'
    },
    {
      title: 'C Programming',
      issuer: 'Tech Panchami',
      category: 'Structured Programming & Algorithmic Logic'
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300 antialiased">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[130px]" />
      </div>

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('about')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              G
            </span>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              {profile.name}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('about')} className="hover:text-emerald-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollTo('skills')} className="hover:text-emerald-400 transition-colors">
              Skill sets
            </button>
            <button onClick={() => scrollTo('projects')} className="hover:text-emerald-400 transition-colors">
              Projects
            </button>
            <button onClick={() => scrollTo('experience')} className="hover:text-emerald-400 transition-colors">
              Internship
            </button>
            <button onClick={() => scrollTo('education-certificates')} className="hover:text-emerald-400 transition-colors">
              Education & Certificates
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-emerald-400 transition-colors">
              Contact
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowResumeModal(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:border-emerald-500/50 hover:text-emerald-300 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Resume</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-4 space-y-2">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skill sets' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Internship' },
              { id: 'education-certificates', label: 'Education & Certificates' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-2 text-sm font-medium text-slate-300 hover:text-emerald-400"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowResumeModal(true);
              }}
              className="block w-full text-left py-2 text-sm font-semibold text-emerald-400"
            >
              View Full Resume
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-24">
        {/* ==========================================
            1. HERO SECTION + GOKUL'S ASSISTANT (CHAT ONLY)
        ========================================== */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-24">
          {/* Left Column: Intro & Bio */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile.status}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
                  {profile.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                {profile.role}
              </p>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {profile.summary}
            </p>

            {/* Contact Info Pills */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.location}</span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{profile.phone}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:opacity-95 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Explore Projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowResumeModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-emerald-500/40 hover:bg-slate-800 text-sm font-semibold text-emerald-300 transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>View Full Resume</span>
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-medium text-slate-200 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-sm font-medium text-slate-200 transition-all"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Gokul's Assistant (Clean Chat Interface Only) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Chatbot Header */}
            <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">
                    Gokul's Assistant
                  </h3>
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 ml-8'
                        : 'bg-slate-950/90 border border-slate-800 text-slate-200 mr-4'
                    }`}
                  >
                    <div className="font-semibold text-[10px] uppercase tracking-wider mb-1 text-slate-400">
                      {msg.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                    {renderMessageWithLinks(msg.text)}
                  </div>
                ))}
                {chatLoading && (
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-emerald-400 animate-pulse">
                    Assistant is typing...
                  </div>
                )}
              </div>

              {/* Simple Predefined Questions */}
              <div className="space-y-1.5">
                <p className="text-[11px] text-slate-400 font-medium">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "What are Gokul's skills in AI?",
                    'Educational details?',
                    'GitHub link and LinkedIn links?',
                    'Certifications?'
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskAssistant(q)}
                      className="text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
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
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
                />
                <button
                  type="submit"
                  disabled={chatLoading}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 disabled:opacity-50 transition-colors flex items-center gap-1"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. SKILL SETS SECTION (INDIVIDUAL BLOCKS + SEARCH BAR)
        ========================================== */}
        <section id="skills" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Technical Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Skill sets
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Search or filter individual technical skill blocks across AI, programming languages, web technologies, and databases.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                placeholder="Search skills e.g. Python, RAG, React.js..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
              />
              {skillSearch && (
                <button
                  onClick={() => setSkillSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Individual Skill Blocks Grid */}
          {filteredSkills.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-sm text-slate-400">
              No matching skill found for "{skillSearch}". Try another keyword or select "All".
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group p-4 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-emerald-500/40 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 truncate max-w-[110px]">
                      {skill.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {skill.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ==========================================
            3. FEATURED PROJECTS SECTION (3 SIDE BY SIDE + LARGER GITHUB CTA)
        ========================================== */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                <Brain className="w-4 h-4" />
                <span>AI & Engineering Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Featured Projects
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Core systems built across Retrieval-Augmented Generation, Computer Vision, and Conversational NLP.
              </p>
            </div>

            {/* Enlarged Prominent GitHub Repositories Button */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 text-base sm:text-lg font-bold rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-400 transition-all shadow-lg shadow-emerald-500/10 shrink-0"
            >
              <Github className="w-5 h-5" />
              <span>View all repositories on GitHub</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* 3 Projects Side-by-Side Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between h-full shadow-lg"
              >
                <div className="space-y-4">
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      {project.icon}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Bullet Points */}
                  <ul className="space-y-2 pt-1">
                    {project.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer: Tools & Specific GitHub Repo Link */}
                <div className="pt-5 mt-6 border-t border-slate-800/80 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-950 text-cyan-300 border border-slate-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-emerald-500 text-xs font-bold text-slate-200 hover:text-slate-950 border border-slate-800 hover:border-emerald-400 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>Open Repository on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            4. INTERNSHIP EXPERIENCE SECTION
        ========================================== */}
        <section id="experience" className="space-y-6 scroll-mt-24">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Industry Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Internship
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {internship.company}
                </h3>
                <p className="text-emerald-400 text-sm font-medium mt-0.5">
                  {internship.role}
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-950 text-slate-300 border border-slate-800 w-fit">
                {internship.period}
              </span>
            </div>

            <ul className="space-y-3">
              {internship.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {internship.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. EDUCATION & CERTIFICATES SIDE-BY-SIDE (EQUAL TOTAL HEIGHT)
        ========================================== */}
        <section
          id="education-certificates"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch scroll-mt-24"
        >
          {/* Left Column: Education (B.E, HSC, SSLC stretched to match right column height) */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Background</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Education
              </h2>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-between">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex-1 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-center gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-slate-950 text-emerald-400 border border-slate-800">
                      {edu.period}
                    </span>
                    <span className="inline-flex items-center px-3.5 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {edu.score}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mt-0.5">
                      {edu.institution}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="text-slate-300 font-semibold">Subjects:</span>{' '}
                    {edu.subjects}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certificates (AI, Python, Java, C matched to exact same height) */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                <Award className="w-4 h-4" />
                <span>Verified Credentials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Certificates
              </h2>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-between">
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex-1 p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{cert.category}</p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-950 text-cyan-300 border border-slate-800">
                      {cert.issuer}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            6. CONTACT SECTION
        ========================================== */}
        <section
          id="contact"
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 text-center space-y-6 scroll-mt-24"
        >
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white">
              Let's Connect & Collaborate
            </h2>
            <p className="text-sm text-slate-400">
              {profile.status}. Reach out directly via email, phone, LinkedIn, or GitHub.
            </p>
          </div>

          {/* Copyable Contact Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleCopy(profile.email, 'email')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-mono transition-colors"
            >
              {copiedItem === 'email' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-cyan-400" />
              )}
              <span>{profile.email}</span>
            </button>

            <button
              onClick={() => handleCopy(profile.phone, 'phone')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 font-mono transition-colors"
            >
              {copiedItem === 'phone' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-emerald-400" />
              )}
              <span>{profile.phone}</span>
            </button>
          </div>

          {/* Direct Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-800 transition-all"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-800 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>

      {/* ==========================================
          FULL DIGITAL RESUME MODAL (NO PRINT BUTTON, ALL 6 SECTIONS)
      ========================================== */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white">{profile.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {profile.location} • {profile.email} • {profile.phone}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-medium">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub (GOKUL05102003)
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn (gokulrajakumar)
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close Resume Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Resume Body: All 6 Sections */}
            <div className="space-y-6 text-xs sm:text-sm text-slate-300">
              {/* 1. Executive Summary */}
              <div>
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs mb-2 border-b border-slate-800 pb-1">
                  Executive Summary
                </h4>
                <p className="leading-relaxed">{profile.summary}</p>
              </div>

              {/* 2. Education */}
              <div>
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs mb-2.5 border-b border-slate-800 pb-1">
                  Education
                </h4>
                <div className="space-y-3">
                  {education.map((e, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80"
                    >
                      <div>
                        <div className="font-bold text-white">{e.degree}</div>
                        <div className="text-xs text-slate-300">{e.institution}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Subjects: {e.subjects}
                        </div>
                      </div>
                      <div className="sm:text-right font-mono text-xs text-emerald-300 shrink-0">
                        <div>{e.period}</div>
                        <div className="font-bold">{e.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Skills */}
              <div>
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs mb-2.5 border-b border-slate-800 pb-1">
                  Skills
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="font-bold text-white">Programming Languages: </span>
                    <span className="text-slate-300">Python, Java, C, JavaScript</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Artificial Intelligence: </span>
                    <span className="text-slate-300">
                      Machine Learning, Deep Learning, LLMs, RAG, LangChain, LangGraph, MCP, Hugging Face
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Web Technologies: </span>
                    <span className="text-slate-300">FastAPI, React.js, HTML, CSS</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Databases: </span>
                    <span className="text-slate-300">MySQL</span>
                  </div>
                </div>
              </div>

              {/* 4. Projects */}
              <div>
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs mb-2.5 border-b border-slate-800 pb-1">
                  Projects
                </h4>
                <div className="space-y-3">
                  {projects.map((p, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-white">{p.title}</span>
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
                        >
                          <Github className="w-3.5 h-3.5" /> GitHub Repository
                        </a>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="text-[11px] font-mono text-cyan-300">
                        Tools: {p.tools.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Internship */}
              <div>
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs mb-2.5 border-b border-slate-800 pb-1">
                  Internship
                </h4>
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-white">{internship.company}</span>
                    <span className="text-xs font-mono text-emerald-300">
                      {internship.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {internship.responsibilities.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 6. Certificates */}
              <div>
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-xs mb-2.5 border-b border-slate-800 pb-1">
                  Certificates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {certificates.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between"
                    >
                      <span className="font-bold text-white text-xs">{c.title}</span>
                      <span className="text-xs font-mono text-cyan-300">{c.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gokul R. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}