import ragShot from "../assets/RAG.png";
import retinopathyShot from "../assets/Classification.png";
import chatbotShot from "../assets/Chatbot.png";

// Gokul's Central Portfolio Data (Strictly Preserving All Original Content & Data)

export const PROFILE = {
  name: "Gokul R",
  role: "AI Engineer & Software Developer",
  status: "Available for AI Engineer & Software Developer Roles",
  location: "Chennai, Tamil Nadu",
  email: "gokul05102003@gmail.com",
  phone: "+91 6380802728",
  phoneRaw: "6380802728",
  github: "https://github.com/GOKUL05102003",
  linkedin: "https://www.linkedin.com/in/gokulrajakumar/",
  resumeUrl: "https://drive.google.com/file/d/1Mnh4HnoW_59kZV_PLA4BJDWTlc4vGX-S/view?usp=sharing",
  summary:
    "AI Engineer and CS graduate specializing in Generative AI, RAG pipelines, and voice-driven workflows (STT/TTS). Skilled in Python, LangChain, LangGraph, MCP, and REST APIs, with hands-on experience integrating LLMs and webhooks into scalable CRM automation solutions.",
  roles: [
    "AI Engineer & Software Developer",
    "Generative AI Specialist",
    "RAG & Agent Architect"
  ]
};

export const PROJECTS = [
  {
    id: "pdf-rag",
    number: "01",
    title: "PDF RAG Pipeline",
    badge: "Voice-Interactive RAG",
    category: "VOICE RAG & SEMANTIC RETRIEVAL",
    tagline: "Voice-interactive document synthesis with vector semantic search",
    description:
      "Built a voice-interactive Retrieval-Augmented Generation (RAG) pipeline (STT - LLM - TTS) to parse, embed, and query PDF documents using LangChain, Google’s Gemini API and ChromaDB.",
    tools: ["Python", "LangChain", "ChromaDB", "PyPDF", "Google Gemini API", "SpeechRecognition"],
    technologies: ["Python", "LangChain", "ChromaDB", "PyPDF", "Gemini API", "SpeechRecognition"],
    githubUrl: "https://github.com/GOKUL05102003/PDF_RAG_Pipeline",
    github: "https://github.com/GOKUL05102003/PDF_RAG_Pipeline",
    screenshot: ragShot,
    screenshotSmall: ragShot,
  },
  {
    id: "retinopathy",
    number: "02",
    title: "Hypertensive Retinopathy Classification",
    badge: "96% Clinical Accuracy",
    category: "COMPUTER VISION & DEEP LEARNING",
    tagline: "Automated deep learning classification into 5 clinical stages",
    description:
      "Architected an automated deep learning system to classify Hypertensive Retinopathy into five clinical severity stages, achieving 96% accuracy.",
    tools: ["Python", "PyTorch", "EfficientNet-B7", "OpenCV", "NumPy", "Scikit-learn"],
    technologies: ["Python", "PyTorch", "EfficientNet-B7", "OpenCV", "Scikit-learn", "NumPy"],
    githubUrl: "https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy",
    github: "https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy",
    screenshot: retinopathyShot,
    screenshotSmall: retinopathyShot,
  },
  {
    id: "ecommerce-chatbot",
    number: "03",
    title: "Chatbot for E-commerce Website",
    badge: "PyTorch NLP Agent",
    category: "CONVERSATIONAL NLP & DEEP LEARNING",
    tagline: "End-to-end conversational AI for customer support and recommendations",
    description:
      "Built an end-to-end NLP-driven conversational AI in PyTorch to automate customer support and product recommendations for an e-commerce platform.",
    tools: ["Python", "PyTorch", "NLTK"],
    technologies: ["Python", "PyTorch", "NLTK", "NLP", "Neural Network"],
    githubUrl: "https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website",
    github: "https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website",
    screenshot: chatbotShot,
    screenshotSmall: chatbotShot,
  }
];

export const INTERNSHIPS = [
  {
    role: "AI Engineer Intern",
    company: "Dakini AI",
    period: "October 2026 – Present",
    current: true,
    location: "Chennai, India",
    responsibilities: [
      "Engineered AI-driven voice workflows integrating Speech-to-Text (STT) and Text-to-Speech (TTS) pipelines with CRM systems to automate real-time customer interactions and lead management.",
      "Developed automated webhook subscriptions, Meta Graph API integrations, and MCP server tooling to synchronize multi-channel conversational data directly into CRM workflows."
    ],
    tech: ["Python", "STT", "TTS", "CRM Integration", "Webhooks", "Meta Graph API", "MCP"]
  },
  {
    role: "Software Engineer Intern",
    company: "Neohorizon Analytics Private Limited",
    period: "June 2023 – July 2023",
    current: false,
    location: "Chennai, India",
    responsibilities: [
      "Engineered responsive and interactive user interface components using React.js, translating design specifications into functional web features.",
      "Developed and optimized automated Python scripts to streamline data processing workflows and fundamental programming logic."
    ],
    tech: ["React.js", "Python", "JavaScript", "HTML", "CSS"]
  }
];

export const EDUCATION = [
  {
    degree: "B.E., Computer Science and Engineering",
    institution: "University College of Engineering Villupuram",
    period: "2021 – 2025",
    score: "CGPA: 8.14"
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "Aditya's Vivekananda Matric Higher Secondary School Villupuram",
    period: "2021",
    score: "Percentage: 93%"
  },
  {
    degree: "SSLC (Secondary School Leaving Certificate)",
    institution: "Aditya's Vivekananda Matric Higher Secondary School Villupuram",
    period: "2019",
    score: "Percentage: 93%"
  }
];

export const CERTIFICATES = [
  {
    title: "AI Foundation",
    issuer: "TCS iON",
    category: "Artificial Intelligence & Machine Learning Foundations",
    certificateUrl: "https://drive.google.com/file/d/1YfWytuMu62MpersYX20DKa1Npq0Fp8iy/view?usp=sharing"
  },
  {
    title: "Python",
    issuer: "Skillup",
    category: "Python Programming & Data Scripting",
    certificateUrl: "https://drive.google.com/file/d/1lAwGiiHj0uMjs5Jf4K0mBNn3nnHg54zO/view?usp=sharing"
  },
  {
    title: "Fundamentals of AI Agents",
    issuer: "Hugging Face",
    category: "Autonomous Agents & Multi-Agent Architecture",
    certificateUrl: "https://drive.google.com/file/d/1RTECFk5EvtX2TdgxMHSFGqI3iPjolzPl/view?usp=sharing"
  },
  {
    title: "SQL",
    issuer: "HackerRank",
    category: "Relational Databases & Query Optimization",
    certificateUrl: "https://drive.google.com/file/d/1zj1FpTAug-QtUyRrk74SMHmyyL8M-0nA/view?usp=sharing"
  }
];

export const ALL_SKILLS = [
  // Programming Languages
  {
    name: "Python",
    category: "Programming Languages",
    tag: "Primary AI, RAG & Automation Language",
    officialLogo: "python",
    iconUrl: "https://cdn.simpleicons.org/python/0F766E"
  },
  {
    name: "Java",
    category: "Programming Languages",
    tag: "Object-Oriented Architecture & Core Logic",
    officialLogo: "java",
    iconUrl: "https://api.iconify.design/devicon-plain/java.svg?color=%230F766E"
  },
  {
    name: "JavaScript",
    category: "Programming Languages",
    tag: "Modern Dynamic ES6+ Web Applications",
    officialLogo: "javascript",
    iconUrl: "https://cdn.simpleicons.org/javascript/0F766E"
  },
  {
    name: "C",
    category: "Programming Languages",
    tag: "Systems Programming & Memory Management",
    officialLogo: "c",
    iconUrl: "https://cdn.simpleicons.org/c/0F766E"
  },

  // Artificial Intelligence
  {
    name: "Machine Learning",
    category: "Artificial Intelligence",
    tag: "Supervised & Unsupervised Modeling",
    officialLogo: "scikitlearn",
    iconUrl: "https://api.iconify.design/lucide/brain-circuit.svg?color=%230F766E"
  },
  {
    name: "Deep Learning",
    category: "Artificial Intelligence",
    tag: "Convolutional & Deep Neural Architectures",
    officialLogo: "pytorch",
    iconUrl: "https://api.iconify.design/lucide/network.svg?color=%230F766E"
  },
  {
    name: "Generative AI",
    category: "Artificial Intelligence",
    tag: "Foundation Models, Synthesis & LLM Solutions",
    officialLogo: "genai",
    iconUrl: "https://api.iconify.design/lucide/sparkles.svg?color=%230F766E"
  },
  {
    name: "LLMs",
    category: "Artificial Intelligence",
    tag: "Large Language Models & Inference Workflows",
    officialLogo: "gemini",
    iconUrl: "https://api.iconify.design/lucide/bot.svg?color=%230F766E"
  },
  {
    name: "AI Agents",
    category: "Artificial Intelligence",
    tag: "Autonomous Agent Orchestration & Tool Use",
    officialLogo: "langgraph",
    iconUrl: "https://api.iconify.design/lucide/workflow.svg?color=%230F766E"
  },
  {
    name: "Prompt Engineering",
    category: "Artificial Intelligence",
    tag: "Structured, Few-Shot & Calibrated Prompting",
    officialLogo: "anthropic",
    iconUrl: "https://api.iconify.design/lucide/terminal.svg?color=%230F766E"
  },
  {
    name: "RAG",
    category: "Artificial Intelligence",
    tag: "Retrieval-Augmented Generation Pipelines",
    officialLogo: "chromadb",
    iconUrl: "https://api.iconify.design/lucide/file-search.svg?color=%230F766E"
  },
  {
    name: "LangChain",
    category: "Artificial Intelligence",
    tag: "LLM Chaining, Ingestion & Tool Orchestration",
    officialLogo: "langchain",
    iconUrl: "https://cdn.simpleicons.org/langchain/0F766E"
  },
  {
    name: "LangGraph",
    category: "Artificial Intelligence",
    tag: "Cyclic Stateful Multi-Agent Graphs",
    officialLogo: "langgraph",
    iconUrl: "https://cdn.simpleicons.org/langgraph/0F766E"
  },
  {
    name: "MCP",
    category: "Artificial Intelligence",
    tag: "Model Context Protocol Server & Tooling",
    officialLogo: "mcp",
    iconUrl: "https://cdn.simpleicons.org/modelcontextprotocol/0F766E"
  },
  {
    name: "Hugging Face",
    category: "Artificial Intelligence",
    tag: "Transformers, Datasets & Model Hubs",
    officialLogo: "huggingface",
    iconUrl: "https://cdn.simpleicons.org/huggingface/0F766E"
  },

  // Web Technologies & APIs
  {
    name: "FastAPI",
    category: "Web Technologies & APIs",
    tag: "High-Performance Asynchronous Python APIs",
    officialLogo: "fastapi",
    iconUrl: "https://cdn.simpleicons.org/fastapi/0F766E"
  },
  {
    name: "REST APIs",
    category: "Web Technologies & APIs",
    tag: "JSON Endpoints, Webhooks & Protocols",
    officialLogo: "rest",
    iconUrl: "https://api.iconify.design/lucide/webhook.svg?color=%230F766E"
  },
  {
    name: "React.js",
    category: "Web Technologies & APIs",
    tag: "Component Architecture, Virtual DOM & State",
    officialLogo: "react",
    iconUrl: "https://cdn.simpleicons.org/react/0F766E"
  },
  {
    name: "HTML",
    category: "Web Technologies & APIs",
    tag: "Semantic Structure & Modern Markup",
    officialLogo: "html",
    iconUrl: "https://cdn.simpleicons.org/html5/0F766E"
  },
  {
    name: "CSS",
    category: "Web Technologies & APIs",
    tag: "Modern Responsive Layouts & Tailwind CSS",
    officialLogo: "css",
    iconUrl: "https://api.iconify.design/devicon-plain/css3.svg?color=%230F766E"
  },
  {
    name: ".NET",
    category: "Web Technologies & APIs",
    tag: "Enterprise Application Framework",
    officialLogo: "dotnet",
    iconUrl: "https://cdn.simpleicons.org/dotnet/0F766E"
  },

  // Databases & Vector Stores
  {
    name: "MySQL",
    category: "Databases & Vector Stores",
    tag: "Relational Schemas, Indexing & Query Tuning",
    officialLogo: "mysql",
    iconUrl: "https://cdn.simpleicons.org/mysql/0F766E"
  },
  {
    name: "ChromaDB",
    category: "Databases & Vector Stores",
    tag: "High-Dimensional Vector Embeddings & Search",
    officialLogo: "chromadb",
    iconUrl: "https://api.iconify.design/lucide/database.svg?color=%230F766E"
  },

  // Tools & Version Control
  {
    name: "Git",
    category: "Tools & Version Control",
    tag: "Distributed Version Control & Rebase Logic",
    officialLogo: "git",
    iconUrl: "https://cdn.simpleicons.org/git/0F766E"
  },
  {
    name: "GitHub",
    category: "Tools & Version Control",
    tag: "Repositories, Pull Requests & CI/CD",
    officialLogo: "github",
    iconUrl: "https://cdn.simpleicons.org/github/0F766E"
  }
];

export const SKILL_CATEGORIES = [
  "ALL",
  "Programming Languages",
  "Artificial Intelligence",
  "Web Technologies & APIs",
  "Databases & Vector Stores",
  "Tools & Version Control"
];

// Predefined QA & Knowledge Base for Chatbot
export const PREDEFINED_QA = {
  "About Gokul?":
    "Gokul R is an AI Engineer and CS graduate from Chennai specializing in Generative AI, RAG pipelines, Voice AI workflows (STT/TTS), and MCP server integrations using Python, LangChain, and REST APIs.",

  "Resume?":
    "You can view or download Gokul's latest resume here:\n" +
    `• [View](${PROFILE.resumeUrl})`,

  "Availability & Roles?":
    "• Status: Open to full-time opportunities\n" +
    "• Target Roles: AI Engineer and Software Developer\n" +
    "• Location: Chennai, Tamil Nadu (Open to Chennai & across India)",

  "Skills?":
    "Gokul's technical skill set:\n" +
    "• Programming Languages: Python, Java, JavaScript, C\n" +
    "• Artificial Intelligence: Machine Learning, Deep Learning, Generative AI, LLMs, AI Agents, Prompt Engineering, RAG, LangChain, LangGraph, MCP, Hugging Face\n" +
    "• Web Technologies & APIs: FastAPI, REST APIs, React.js, HTML, CSS, .NET\n" +
    "• Databases & Vector Stores: MySQL, ChromaDB\n" +
    "• Tools & Version Control: Git, GitHub",

  "Internships?":
    "Gokul's experience:\n" +
    "• Dakini AI — AI Engineer Intern (Oct 2026 – Present): Engineered AI voice workflows (STT/TTS) integrated with CRM systems, automated webhooks, Meta Graph API, and MCP server tooling.\n" +
    "• Neohorizon Analytics Pvt Ltd, Chennai — Software Engineer Intern (Jun–Jul 2023): Built responsive React.js UI components and automated Python data-processing scripts.",

  "AI & Voice AI experience?":
    "• Voice AI & CRM: Built real-time STT/TTS voice workflows synced with CRM systems using webhooks, Meta Graph API, and MCP servers at Dakini AI.\n" +
    "• RAG & LLMs: Created a voice-interactive PDF RAG pipeline using LangChain, Gemini API, and ChromaDB.\n" +
    "• Deep Learning: Achieved 96% accuracy classifying Hypertensive Retinopathy with PyTorch and EfficientNet-B7.",

  "Projects?":
    "1. PDF RAG Pipeline (Voice STT–LLM–TTS): [https://github.com/GOKUL05102003/PDF_RAG_Pipeline](https://github.com/GOKUL05102003/PDF_RAG_Pipeline)\n" +
    "2. Hypertensive Retinopathy Classification (96% accuracy): [https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy](https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy)\n" +
    "3. Chatbot for E-commerce Website (PyTorch & NLTK): [https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website](https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website)",

  "Educational details?":
    "• B.E. CSE (2021–2025): University College of Engineering Villupuram — CGPA: 8.14\n" +
    "• HSC (2021): Aditya's Vivekananda Matric Hr Sec School, Villupuram — 93%\n" +
    "• SSLC (2019): Aditya's Vivekananda Matric Hr Sec School, Villupuram — 93%",

  "Certifications?":
    "• Artificial Intelligence — TCS iON\n" +
    "• Python — Skillup\n" +
    "• Fundamentals of AI Agents — Hugging Face\n" +
    "• SQL — HackerRank",

  "Contact details?":
    "• Location: Chennai, Tamil Nadu\n" +
    "• Email: gokul05102003@gmail.com\n" +
    "• Call: +91 6380802728\n" +
    "• GitHub: [https://github.com/GOKUL05102003](https://github.com/GOKUL05102003)\n" +
    "• LinkedIn: [https://www.linkedin.com/in/gokulrajakumar/](https://www.linkedin.com/in/gokulrajakumar/)"
};

export const RESUME_CONTEXT = `
Name: Gokul R
Status: Open to full-time opportunities (Target Roles: AI Engineer and Software Developer)
Location: Chennai, Tamil Nadu (Open to Chennai & across India)
Email: gokul05102003@gmail.com | Phone: +91 6380802728
Resume: ${PROFILE.resumeUrl}
GitHub: https://github.com/GOKUL05102003
LinkedIn: https://www.linkedin.com/in/gokulrajakumar/
Summary: Gokul R is an AI Engineer and CS graduate from Chennai specializing in Generative AI, RAG pipelines, Voice AI workflows (STT/TTS), and MCP server integrations using Python, LangChain, and REST APIs.
Education:
1. B.E. CSE (2021-2025): University College of Engineering Villupuram - CGPA: 8.14
2. HSC (2021): Aditya's Vivekananda Matric Hr Sec School, Villupuram - 93%
3. SSLC (2019): Aditya's Vivekananda Matric Hr Sec School, Villupuram - 93%
Skills:
- Programming Languages: Python, Java, JavaScript, C
- Artificial Intelligence: Machine Learning, Deep Learning, Generative AI, LLMs, AI Agents, Prompt Engineering, RAG, LangChain, LangGraph, MCP, Hugging Face
- Web Technologies & APIs: FastAPI, REST APIs, React.js, HTML, CSS, .NET
- Databases & Vector Stores: MySQL, ChromaDB
- Tools & Version Control: Git, GitHub
Projects:
1. PDF RAG Pipeline (Voice STT-LLM-TTS): https://github.com/GOKUL05102003/PDF_RAG_Pipeline
2. Hypertensive Retinopathy Classification (96% accuracy, PyTorch & EfficientNet-B7): https://github.com/GOKUL05102003/Classification-of-Hypertensive-Retinopathy
3. Chatbot for E-commerce Website (PyTorch & NLTK): https://github.com/GOKUL05102003/Chatbot-for-E-commerce-Website
Internships:
- Dakini AI - AI Engineer Intern (Oct 2026 - Present): Engineered AI voice workflows (STT/TTS) integrated with CRM systems, automated webhooks, Meta Graph API, and MCP server tooling.
- Neohorizon Analytics Pvt Ltd, Chennai - Software Engineer Intern (Jun-Jul 2023): Built responsive React.js UI components and automated Python data-processing scripts.
Certifications:
- Artificial Intelligence: TCS iON
- Python: Skillup
- Fundamentals of AI Agents: Hugging Face
- SQL: HackerRank
`;

function hasWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i").test(text);
}

export function matchPredefinedAnswer(query) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // Exact match (case-insensitive)
  const exactKey = Object.keys(PREDEFINED_QA).find((k) => k.toLowerCase() === q);
  if (exactKey) return PREDEFINED_QA[exactKey];

  // Smart keyword matching ordered from most specific to general
  if (
    q.includes("resume") ||
    hasWord(q, "cv") ||
    q.includes("download") ||
    q.includes("biodata")
  ) {
    return PREDEFINED_QA["Resume?"];
  }
  if (
    q.includes("availability") ||
    q.includes("available") ||
    q.includes("hire") ||
    q.includes("hiring") ||
    q.includes("open to") ||
    q.includes("relocate") ||
    q.includes("opportunity") ||
    q.includes("opportunities") ||
    q.includes("full-time") ||
    q.includes("full time") ||
    q.includes("target role")
  ) {
    return PREDEFINED_QA["Availability & Roles?"];
  }
  if (
    q.includes("voice ai") ||
    q.includes("voice") ||
    hasWord(q, "stt") ||
    hasWord(q, "tts") ||
    q.includes("speech") ||
    hasWord(q, "crm") ||
    q.includes("webhook") ||
    q.includes("meta graph")
  ) {
    return PREDEFINED_QA["AI & Voice AI experience?"];
  }
  if (
    q.includes("about") ||
    q.includes("who is gokul") ||
    q.includes("who are you") ||
    q.includes("introduce") ||
    q.includes("summary") ||
    q.includes("profile")
  ) {
    return PREDEFINED_QA["About Gokul?"];
  }
  if (
    q.includes("contact") ||
    q.includes("github") ||
    q.includes("linkedin") ||
    hasWord(q, "link") ||
    q.includes("email") ||
    q.includes("mail") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    hasWord(q, "call") ||
    q.includes("location")
  ) {
    return PREDEFINED_QA["Contact details?"];
  }
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("school") ||
    hasWord(q, "cgpa") ||
    hasWord(q, "hsc") ||
    hasWord(q, "sslc") ||
    q.includes("degree")
  ) {
    return PREDEFINED_QA["Educational details?"];
  }
  if (
    q.includes("certificate") ||
    q.includes("certification") ||
    q.includes("course") ||
    hasWord(q, "tcs") ||
    q.includes("skillup") ||
    q.includes("hugging") ||
    q.includes("hackerrank")
  ) {
    return PREDEFINED_QA["Certifications?"];
  }
  if (
    q.includes("intern") ||
    q.includes("intership") ||
    q.includes("experience") ||
    q.includes("internship") ||
    q.includes("neohorizon") ||
    q.includes("dakini")
  ) {
    return PREDEFINED_QA["Internships?"];
  }
  if (
    q.includes("project") ||
    hasWord(q, "rag") ||
    q.includes("projects") ||
    q.includes("chatbot") ||
    q.includes("retinopathy")
  ) {
    return PREDEFINED_QA["Projects?"];
  }
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("stack") ||
    q.includes(".net") ||
    q.includes("fastapi") ||
    q.includes("fast api") ||
    q.includes("langchain") ||
    q.includes("langgraph") ||
    hasWord(q, "mcp") ||
    q.includes("agent") ||
    q.includes("python") ||
    q.includes("java") ||
    q.includes("machine learning") ||
    q.includes("deep learning") ||
    q.includes("pytorch") ||
    q.includes("chromadb") ||
    q.includes("mysql") ||
    q.includes("react") ||
    hasWord(q, "git") ||
    hasWord(q, "sql") ||
    hasWord(q, "ai")
  ) {
    return PREDEFINED_QA["Skills?"];
  }

  return null;
}

export function getLocalAnswer(query) {
  return (
    matchPredefinedAnswer(query) ||
    "Gokul R is an AI Engineer & Software Developer skilled in Python, Machine Learning, RAG, LangChain, LangGraph, MCP, Deep Learning (PyTorch), React.js, FastAPI, and MySQL. Ask about his AI skills, resume, availability, projects, or contact details!"
  );
}
