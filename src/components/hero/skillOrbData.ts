export interface SkillNodeData {
  cat: string;
  label: string;
  sub: string;
  text: string;
  chips: string[];
  used: string;
}

// Top to bottom on the orb: intelligence up top, delivery at the base
export const ORDER = ["orch", "web", "ret", "api", "voice", "data", "ml", "infra"] as const;

export type SkillId = (typeof ORDER)[number];

export const DATA: Record<SkillId, SkillNodeData> = {
  orch: {
    cat: "Intelligence",
    label: "Agent Workflows",
    sub: "LangGraph, MCP",
    text: "I design autonomous multi-agent systems and structured workflows with tool calling.",
    chips: ["LangGraph", "LangChain", "MCP", "AI Agents"],
    used: "Dakini AI production systems",
  },
  web: {
    cat: "Interfaces",
    label: "Web Apps",
    sub: "React.js, JavaScript",
    text: "I build responsive, high-performance web applications and interactive UI architectures.",
    chips: ["React.js", "FastAPI", "Tailwind CSS", "JavaScript"],
    used: "Neohorizon Analytics, Portfolio",
  },
  ret: {
    cat: "Intelligence",
    label: "Retrieval (RAG)",
    sub: "LangChain, ChromaDB",
    text: "I build voice-interactive RAG pipelines to parse, embed, and query complex unstructured documents.",
    chips: ["LangChain", "ChromaDB", "Gemini API", "Vector Search"],
    used: "PDF RAG Pipeline",
  },
  api: {
    cat: "Services",
    label: "API Services",
    sub: "FastAPI, REST APIs",
    text: "I build high-throughput asynchronous REST services, webhook integrations, and CRM sync pipelines.",
    chips: ["FastAPI", "REST APIs", "Python", "Webhooks"],
    used: "Dakini AI & Full-Stack Projects",
  },
  voice: {
    cat: "Voice AI",
    label: "Voice Workflows",
    sub: "STT & TTS Pipelines",
    text: "I engineer voice-driven AI workflows integrating Speech-to-Text and Text-to-Speech directly into CRM workflows.",
    chips: ["STT", "TTS", "Whisper", "CRM Integration"],
    used: "Dakini AI",
  },
  data: {
    cat: "Data Stores",
    label: "Data Stores",
    sub: "MySQL, ChromaDB",
    text: "I manage relational database schemas and dense vector embeddings behind production AI systems.",
    chips: ["MySQL", "ChromaDB", "SQL"],
    used: "AI & Web Applications",
  },
  ml: {
    cat: "Machine Learning",
    label: "Deep Learning",
    sub: "PyTorch, EfficientNet",
    text: "I train and fine-tune convolutional neural architectures for automated clinical computer vision.",
    chips: ["PyTorch", "OpenCV", "EfficientNet-B7", "Scikit-learn"],
    used: "Hypertensive Retinopathy Classification",
  },
  infra: {
    cat: "Tools",
    label: "Developer Tools",
    sub: "Git, GitHub, MCP",
    text: "I manage version control, webhook pipelines, and MCP server tooling.",
    chips: ["Git", "GitHub", "MCP"],
    used: "Dakini AI & Open Source",
  },
};
