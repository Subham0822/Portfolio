/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, 
  Settings, 
  Rocket, 
  Terminal, 
  Cpu, 
  Globe, 
  Code, 
  Database, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronRight, 
  X,
  CheckCircle2,
  Microscope,
  Zap,
  Activity,
  Shield,
  Layers,
  Menu,
  Trophy,
  Award,
  Phone
} from 'lucide-react';

// --- Types ---

interface Project {
  id: string;
  title: string;
  label: string;
  objective: string;
  dataHandling?: string;
  modelApproach?: string;
  systemBuilt: string;
  techStack: string[];
  keyChallenge: string;
  outcome: string;
  status: 'Deployed' | 'Prototype' | 'Completed' | 'Research / Experimental';
  statusIcon: React.ReactNode;
  github?: string;
  live?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  highlight: string;
  icon: React.ReactNode;
  certificateLink?: string;
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    id: 'voyagenie',
    title: 'VoyaGenie',
    label: '🧪 AI Travel Planner',
    objective: 'Built an automated travel planning tool that generates itineraries from user requirements.',
    systemBuilt: 'Developed a full-stack platform using LLMs to process destination data and group preferences into optimized schedules.',
    techStack: ['Next.js', 'TypeScript', 'Gemini API', 'Tailwind CSS'],
    keyChallenge: 'Handled non-deterministic AI outputs by implementing strict schema validation for reliable UI rendering.',
    outcome: 'Deployed a functional planner that provides personalized, multi-day itineraries with fast response times.',
    status: 'Deployed',
    statusIcon: <Rocket className="w-4 h-4" />,
    github: 'https://github.com/Subham0822/VoyaGenie',
    live: 'https://voya-genie.vercel.app/'
  },
  {
    id: 'github-assistant',
    title: 'Repo Intelligence Engine',
    label: '🧪 Codebase Analysis',
    objective: 'Created a natural language interface for exploring codebases and understanding repository structures.',
    systemBuilt: 'Built a local tool that indexes repository files and provides semantic search for architectural queries.',
    techStack: ['Python', 'LLM Integration', 'Vector Embeddings'],
    keyChallenge: 'Managed context window limits to process large codebases while maintaining structural relationships.',
    outcome: 'Improved developer onboarding by providing accurate answers to complex codebase questions.',
    status: 'Prototype',
    statusIcon: <FlaskConical className="w-4 h-4" />,
    github: 'https://github.com/Subham0822/github-ai-assistant'
  },
  {
    id: 'forkware',
    title: 'ForkWare',
    label: '🧪 Logistics Coordinator',
    objective: 'Designed a coordination system to manage surplus food distribution across urban networks.',
    systemBuilt: 'Implemented a multi-tenant platform connecting suppliers, NGOs, and volunteers with real-time updates.',
    techStack: ['Next.js', 'Supabase', 'TypeScript', 'PostgreSQL'],
    keyChallenge: 'Built a state machine to handle multi-party handoffs and inventory synchronization.',
    outcome: 'Deployed a coordination hub with specialized dashboards for all user roles.',
    status: 'Deployed',
    statusIcon: <Rocket className="w-4 h-4" />,
    github: 'https://github.com/Subham0822/ForkWare',
    live: 'https://fork-ware.vercel.app/'
  },
  {
    id: 'khorcha-khata',
    title: 'Khorcha Khata',
    label: '🧪 Expense Tracker',
    objective: 'Built a minimal interface for fast personal expense management.',
    systemBuilt: 'Developed a lightweight tracking system focused on input speed and clear data visualization.',
    techStack: ['TypeScript', 'React', 'Local Storage'],
    keyChallenge: 'Optimized UI responsiveness for zero-latency logging while ensuring data persistence.',
    outcome: 'Completed a utility that simplifies daily financial logging through an intuitive interface.',
    status: 'Completed',
    statusIcon: <CheckCircle2 className="w-4 h-4" />,
    github: 'https://github.com/Subham0822/Khorcha-Khata',
    live: 'https://khorcha-khata.vercel.app/'
  },
  {
    id: 'victory-forecast',
    title: 'Victory Forecast',
    label: '🧪 Esports Prediction',
    objective: 'Built a machine learning system to predict esports match outcomes using historical data.',
    dataHandling: 'Cleaned and preprocessed noisy match data from Valorant and CS:GO, focusing on feature selection for player performance and team synergy.',
    modelApproach: 'Implemented classification models including XGBoost and Logistic Regression, evaluated using accuracy trends and cross-validation.',
    systemBuilt: 'Developed a platform that analyzes match data from Valorant, CS:GO, and League of Legends using classification models.',
    techStack: ['Python', 'XGBoost', 'Logistic Regression', 'Scikit-learn'],
    keyChallenge: 'Handled inconsistent esports data through robust preprocessing to improve model reliability.',
    outcome: 'Implemented an ML-based system that forecasts match outcomes with validated accuracy trends.',
    status: 'Research / Experimental',
    statusIcon: <Microscope className="w-4 h-4" />,
    github: 'https://github.com/Subham0822/Victory-Forecast'
  }
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ideatex',
    title: 'IdeateX – AI/ML Track',
    description: 'Ranked in the Top 32 among 600+ teams in a high-stakes competitive AI/ML track.',
    badge: 'Top 32 Finalist',
    highlight: '🏆',
    icon: <Trophy className="w-6 h-6 text-yellow-500" />,
    certificateLink: 'https://drive.google.com/file/d/1FMeSxYfZXezp3LnZVpIK5QF7kwRNVKmh/view?usp=drive_link'
  },
  {
    id: 'hackheritage-25',
    title: 'HackHeritage’25',
    description: 'Selected in the Top 50 teams for the Smart India Hackathon (SIH) internal qualifier.',
    badge: 'Top 50 Team',
    highlight: '🚀',
    icon: <Rocket className="w-6 h-6 text-neon-cyan" />,
    certificateLink: 'https://drive.google.com/file/d/10qnvLG0bIPc93i-QM8YZ9LM_ZINON4hq/view?usp=drive_link'
  },
  {
    id: 'hackheritage-24',
    title: 'HackHeritage’24',
    description: 'Selected in the Top 100 teams during the early-stage SIH internal hackathon qualifier.',
    badge: 'Top 100 Team',
    highlight: '🧪',
    icon: <FlaskConical className="w-6 h-6 text-neon-purple" />,
    certificateLink: 'https://drive.google.com/file/d/1-8zokDjyTnbBCimluLlRWKE4A5N08F1z/view?usp=drive_link'
  }
];

const LOGS = [
  "Optimized prompt engineering pipelines for deterministic JSON outputs",
  "Implemented advanced state management for multi-tenant logistics systems",
  "Engineered latency-reduction strategies for real-time AI interactions",
  "Refined architectural patterns for scalable full-stack deployments"
];

const LAB_EQUIPMENT = [
  {
    category: "Frontend Architecture",
    icon: <Globe className="w-5 h-5 text-neon-cyan" />,
    tools: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "JavaScript"]
  },
  {
    category: "Backend & Infrastructure",
    icon: <Database className="w-5 h-5 text-neon-purple" />,
    tools: ["Node.js", "Supabase", "PostgreSQL", "SQL", "Git"]
  },
  {
    category: "AI & Intelligence",
    icon: <Cpu className="w-5 h-5 text-blue-500" />,
    tools: ["Python", "C", "R", "Gemini API", "ML Frameworks", "Prompt Engineering"]
  }
];

const ONGOING = [
  "Integrating RAG pipelines for enhanced repository analysis",
  "Exploring distributed system design for AI agents",
  "Optimizing serverless architectures for high-concurrency apps"
];

// --- Components ---

const LiveTerminal = () => {
  const [history, setHistory] = useState<string[]>([
    "Initializing AI Systems Lab Kernel v2.0.4...",
    "Loading secure_interface_v2.0...",
    "Kernel_Output: research_logs.sys loaded.",
    "Type 'help' for available commands."
  ]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push("Available commands: help, ls, clear, whoami, status, date, exit");
        break;
      case 'ls':
        newHistory.push("projects/  research/  logs/  equipment/");
        break;
      case 'clear':
        setHistory(["Terminal cleared. Type 'help' for commands."]);
        setInput("");
        return;
      case 'whoami':
        newHistory.push("Lead Researcher • Full-Stack Architect • AI Systems Explorer");
        break;
      case 'status':
        newHistory.push("System Status: Operational", "Core_Systems: Optimal", "AI_Engine: Active", "Uplink: Stable");
        break;
      case 'date':
        newHistory.push(new Date().toString());
        break;
      case 'exit':
        newHistory.push("Session termination requested. Access denied.");
        break;
      default:
        newHistory.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div 
      onClick={focusInput}
      className="glass-panel p-8 neon-border-purple bg-black/60 relative overflow-hidden h-[400px] flex flex-col cursor-text group/terminal"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
          </div>
          <Terminal className="w-5 h-5 text-neon-purple" />
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">Kernel_Output: research_logs.sys</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono text-neon-purple/60 animate-pulse uppercase tracking-widest hidden sm:block">Interactive_Console</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto overscroll-y-contain font-mono text-xs md:text-sm leading-relaxed space-y-2 custom-scrollbar pr-2"
      >
        {history.map((line, i) => (
          <div key={i} className="flex gap-4 group">
            <span className="text-neon-purple opacity-40">[{i.toString().padStart(2, '0')}]</span>
            <span className={line.startsWith('>') ? "text-neon-cyan" : "text-gray-400"}>{line}</span>
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-4 items-center">
          <span className="text-neon-purple opacity-40">[{history.length.toString().padStart(2, '0')}]</span>
          <span className="text-neon-cyan">$</span>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type 'help' to begin..."
            className="bg-transparent border-none outline-none flex-grow text-neon-cyan caret-neon-cyan placeholder:text-neon-cyan/20"
          />
          {!isFocused && input === "" && (
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-24 text-[10px] font-mono text-neon-cyan/30 pointer-events-none"
            >
              _ CLICK TO INTERACT
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

const HUDOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
    <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-neon-cyan/20" />
    <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-neon-cyan/20" />
    <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-neon-cyan/20" />
    <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-neon-cyan/20" />
    
    <div className="absolute top-1/2 left-4 -translate-y-1/2 space-y-3 hidden lg:block">
      {[1, 2, 3].map(i => (
        <div key={i} className="w-[1px] h-6 bg-neon-cyan/10 rounded-full" />
      ))}
    </div>
    
    <div className="absolute top-1/2 right-4 -translate-y-1/2 space-y-3 hidden lg:block">
      {[1, 2, 3].map(i => (
        <div key={i} className="w-[1px] h-6 bg-neon-purple/10 rounded-full" />
      ))}
    </div>
  </div>
);

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => (
  <motion.div 
    layoutId={project.id}
    onClick={onClick}
    className={`glass-panel p-10 cursor-pointer group relative overflow-hidden flex flex-col h-full transition-all duration-300 ${
      project.status === 'Research / Experimental' 
        ? 'neon-border-purple shadow-[0_0_15px_rgba(188,19,254,0.03)] hover:shadow-[0_0_25px_rgba(188,19,254,0.1)]' 
        : 'neon-border-cyan hover:shadow-[0_0_25px_rgba(0,243,255,0.08)]'
    }`}
    whileHover={{ y: -5, scale: 1.005 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-all duration-500 ${
      project.status === 'Research / Experimental' 
        ? 'bg-neon-purple/5 group-hover:bg-neon-purple/10' 
        : 'bg-neon-cyan/5 group-hover:bg-neon-cyan/10'
    }`} />
    
    <div className="flex items-center justify-between mb-10">
      <span className={`text-[10px] font-mono border px-3 py-1 rounded-sm uppercase tracking-widest ${
        project.status === 'Research / Experimental'
          ? 'text-neon-purple border-neon-purple/20 bg-neon-purple/5'
          : 'text-neon-cyan border-neon-cyan/20 bg-neon-cyan/5'
      }`}>
        {project.label}
      </span>
      <div className={`flex items-center gap-2 text-[10px] font-mono px-3 py-1 rounded-sm border ${
        project.status === 'Deployed' ? 'text-green-400 border-green-400/20 bg-green-400/5' : 
        project.status === 'Prototype' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' : 
        project.status === 'Research / Experimental' ? 'text-neon-purple border-neon-purple/20 bg-neon-purple/5' :
        'text-blue-400 border-blue-400/20 bg-blue-400/5'
      }`}>
        {project.statusIcon}
        {project.status.toUpperCase()}
      </div>
    </div>
    
    <h3 className="text-3xl font-bold mb-6 tracking-tighter group-hover:text-white transition-colors">
      {project.title}
    </h3>
    
    <div className="h-[1px] w-full bg-white/5 mb-6" />

    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
      {project.objective}
    </p>
    
    <div className="flex flex-wrap gap-2 mb-10">
      {project.techStack.slice(0, 3).map(tech => (
        <span key={tech} className="text-[9px] font-mono text-gray-500 border border-white/5 px-2.5 py-1 rounded bg-white/5">
          {tech}
        </span>
      ))}
      {project.techStack.length > 3 && (
        <span className="text-[9px] font-mono text-gray-700 self-center">+{project.techStack.length - 3}</span>
      )}
    </div>
    
    <div className="flex items-center justify-between pt-6 border-t border-white/5">
      <span className={`text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] transition-colors ${
        project.status === 'Research / Experimental' ? 'group-hover:text-neon-purple' : 'group-hover:text-neon-cyan'
      }`}>
        View Report
      </span>
      <ChevronRight className={`w-4 h-4 text-gray-600 group-hover:translate-x-1 transition-all ${
        project.status === 'Research / Experimental' ? 'group-hover:text-neon-purple' : 'group-hover:text-neon-cyan'
      }`} />
    </div>
  </motion.div>
);

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      layoutId={project.id}
      className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative neon-border-cyan shadow-[0_0_50px_rgba(0,243,255,0.1)]"
      onClick={e => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded border border-neon-cyan/20">
            {project.label}
          </span>
          <span className="text-xs font-mono text-gray-500">REF: {project.id.toUpperCase()}_SYS_LOG</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter text-gradient-cyan">{project.title}</h2>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-gray-400">
            <Activity className="w-3 h-3" />
            <span>STATUS:</span>
            <span className="text-neon-cyan">{project.status.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-3 h-3" />
            <span>SECURITY:</span>
            <span className="text-green-500">VERIFIED</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="space-y-8">
          <section>
            <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <Zap className="w-3 h-3 text-neon-cyan" /> 01. Objective
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm">{project.objective}</p>
          </section>

          {project.dataHandling && (
            <section>
              <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <Database className="w-3 h-3 text-neon-cyan" /> 02. Data Handling
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm">{project.dataHandling}</p>
            </section>
          )}

          {project.modelApproach && (
            <section>
              <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <Cpu className="w-3 h-3 text-neon-cyan" /> 03. Model Approach
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm">{project.modelApproach}</p>
            </section>
          )}

          {!project.dataHandling && (
            <section>
              <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <Settings className="w-3 h-3 text-neon-cyan" /> 02. System Architecture
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm">{project.systemBuilt}</p>
            </section>
          )}

          <section>
            <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <Layers className="w-3 h-3 text-neon-cyan" /> {project.dataHandling ? '04' : '03'}. Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 rounded text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="p-6 bg-neon-purple/5 border border-neon-purple/20 rounded-lg">
            <h4 className="text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> {project.dataHandling ? '05' : '04'}. Technical Challenge
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm italic">
              "{project.keyChallenge}"
            </p>
          </section>

          <section className="p-6 bg-neon-cyan/5 border border-neon-cyan/20 rounded-lg">
            <h4 className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" /> {project.dataHandling ? '06' : '05'}. System Outcome
            </h4>
            <p className="text-gray-300 leading-relaxed text-sm">{project.outcome}</p>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <Github className="w-4 h-4" /> Source Code
          </a>
        )}
        {project.live && (
          <a 
            href={project.live} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/30 rounded font-mono text-[10px] uppercase tracking-widest text-neon-cyan hover:bg-neon-cyan/20 transition-all"
          >
            <Globe className="w-4 h-4" /> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// --- Main App ---

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 5, backgroundColor: "rgba(0, 243, 255, 0.01)" }}
    className="glass-panel p-8 flex flex-col md:flex-row items-start md:items-center gap-8 border-white/5 group relative overflow-hidden transition-all duration-300"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-neon-cyan to-neon-purple opacity-20 group-hover:opacity-60 transition-opacity" />
    <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-cyan/30 transition-all shrink-0">
      {achievement.icon}
    </div>
    <div className="flex-1">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h3 className="text-2xl font-bold tracking-tight group-hover:text-white transition-colors">{achievement.title}</h3>
        <div className={`px-4 py-1 rounded-sm border text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 ${
          achievement.id === 'ideatex' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
          achievement.id === 'hackheritage-25' ? 'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan' :
          'bg-neon-purple/10 border-neon-purple/20 text-neon-purple'
        }`}>
          <span>{achievement.highlight}</span>
          <span>{achievement.badge}</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed max-w-3xl mb-6">
        {achievement.description}
      </p>
      {achievement.certificateLink && (
        <a 
          href={achievement.certificateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest hover:text-neon-cyan transition-colors"
        >
          <Code className="w-3 h-3" /> View Verification
        </a>
      )}
    </div>
    <div className="hidden md:block opacity-0 group-hover:opacity-10 transition-opacity">
      <Award className="w-10 h-10 text-white" />
    </div>
  </motion.div>
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experiments', href: '#experiments' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Research', href: '#research' },
    { name: 'Equipment', href: '#lab' },
    { name: 'Researcher', href: '#about' },
  ];

  return (
    <div className="min-h-screen relative bg-lab-bg">
      <HUDOverlay />
      <div className="scanline" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-lab-bg/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg flex items-center justify-center neon-glow-cyan">
              <FlaskConical className="w-6 h-6 text-neon-cyan" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black tracking-tighter text-xl leading-none">AI SYSTEMS LAB</span>
              <span className="text-[8px] font-mono text-gray-500 tracking-[0.4em] mt-1">SECURE_INTERFACE_V2.0</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-neon-cyan transition-all hover:tracking-[0.4em]">{link.name}</a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-400 hover:text-neon-cyan transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-lab-bg/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em] py-2 hover:text-neon-cyan"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 space-y-32 relative z-10">
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan text-[10px] font-mono uppercase tracking-[0.3em] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                </span>
                System Status: Operational
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-gradient-cyan">
                Subham <br />
                Rakshit.
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl font-light">
                I build AI-powered applications and full-stack systems focused on solving real-world problems.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-12">
                <div className="flex items-center gap-3 px-5 py-2.5 glass-panel border-white/5 text-xs font-mono group hover:border-neon-cyan/30 transition-all">
                  <span className="text-neon-cyan group-hover:animate-pulse">🧪</span> 
                  <span className="text-gray-500">EXPERIMENTS:</span> {PROJECTS.length.toString().padStart(2, '0')}
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 glass-panel border-white/5 text-xs font-mono group hover:border-neon-purple/30 transition-all">
                  <span className="text-neon-purple group-hover:animate-pulse">⚙️</span> 
                  <span className="text-gray-500">STACK:</span> FULL_STACK
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 glass-panel border-white/5 text-xs font-mono group hover:border-blue-500/30 transition-all">
                  <span className="text-blue-500 group-hover:animate-pulse">🚀</span> 
                  <span className="text-gray-500">FOCUS:</span> AI_LOGISTICS
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <motion.a 
                  href="#experiments" 
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 243, 255, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-sm transition-all flex items-center gap-3"
                >
                  Initialize Exploration <ChevronRight className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  href="https://drive.google.com/file/d/1xnEFlN9PSgfCn0IGgOub3bsCF_eJqTEE/view?usp=drive_link" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, borderColor: "rgba(188, 19, 254, 0.5)", boxShadow: "0 0 20px rgba(188, 19, 254, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-sm transition-all flex items-center gap-3"
                >
                  Download Resume <Code className="w-4 h-4" />
                </motion.a>
                <div className="text-[10px] font-mono text-gray-500 border-l border-neon-cyan/20 pl-8 py-1 uppercase tracking-[0.2em]">
                  Lead Researcher • Full-Stack Architect • AI Systems Explorer
                </div>
              </div>
            </motion.div>

            {/* Hero Visual - Right Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="hidden lg:flex justify-center items-center relative"
            >
              <div className="relative w-full max-w-lg aspect-square">
                {/* Outer Rotating Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-neon-cyan/10 rounded-full"
                />
                {/* Inner Rotating Ring */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-12 border border-neon-purple/10 rounded-full border-dashed"
                />
                {/* Core Lab Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse" />
                    <div className="w-48 h-48 bg-black/40 backdrop-blur-sm border border-white/5 rounded-full flex items-center justify-center relative z-10">
                      <FlaskConical className="w-20 h-20 text-neon-cyan opacity-80" />
                      
                      {/* Floating Data Bits */}
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [0, -20, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            delay: i * 0.8,
                            ease: "easeInOut"
                          }}
                          className="absolute text-[8px] font-mono text-neon-cyan/40"
                          style={{
                            top: `${20 + i * 20}%`,
                            left: i % 2 === 0 ? '-20px' : 'auto',
                            right: i % 2 !== 0 ? '-20px' : 'auto',
                          }}
                        >
                          {['0101', 'DATA', 'SYNC', 'CORE'][i]}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Orbiting Nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div 
                      className="absolute w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_10px_#00f3ff]"
                      style={{
                        top: '50%',
                        left: '0',
                        transform: `translateY(-50%) translateX(${i * 20}px)`
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experiments Section */}
        <section id="experiments" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">Experiments</h2>
              <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-[0.5em]">System_Logs / Project_Registry</p>
            </div>
            <div className="hidden lg:block h-[1px] flex-1 bg-white/5 mx-16 mb-4" />
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Total_Entries: {PROJECTS.length.toString().padStart(2, '0')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            ))}
          </div>
        </section>

        {/* Lab Achievements Section */}
        <section id="achievements" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">Lab Achievements</h2>
              <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-[0.5em]">Competitive_Recognition / Hackathon_Selections</p>
            </div>
            <div className="hidden lg:block h-[1px] flex-1 bg-white/5 mx-16 mb-4" />
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Verified_Milestones: 03
            </div>
          </div>
          
          <div className="space-y-6">
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </section>

        {/* Research Logs Section */}
        <section id="research" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl font-black mb-8 tracking-tighter">Research Logs</h2>
              <LiveTerminal />
            </div>

            <div>
              <h2 className="text-5xl font-black mb-8 tracking-tighter">Active Pipeline</h2>
              <div className="space-y-6">
                {ONGOING.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 15, backgroundColor: "rgba(0, 243, 255, 0.03)" }}
                    className="glass-panel p-6 flex items-center gap-6 border-white/5 group cursor-default transition-all"
                  >
                    <div className="w-14 h-14 rounded-lg bg-blue-500/5 flex items-center justify-center border border-blue-500/10 group-hover:border-blue-500/40 transition-all neon-glow-cyan">
                      <Microscope className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-1">In_Progress</span>
                      <span className="text-gray-300 font-bold text-lg tracking-tight">{item}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lab Equipment Section */}
        <section id="lab" className="scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">Lab Equipment</h2>
              <p className="text-neon-cyan font-mono text-[10px] uppercase tracking-[0.5em]">Hardware_Stack / Core_Technologies</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LAB_EQUIPMENT.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-panel p-10 neon-border-cyan relative group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  {cat.icon}
                </div>
                <div className="mb-8 flex items-center justify-between">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:border-neon-cyan/30 transition-all">
                    {cat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-8 tracking-tight">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.tools.map(tool => (
                    <div key={tool} className="flex items-center gap-4 text-gray-400 group/item">
                      <div className="w-2 h-2 rounded-sm bg-neon-cyan/20 group-hover/item:bg-neon-cyan group-hover/item:rotate-45 transition-all" />
                      <span className="text-xs font-mono uppercase tracking-widest">{tool}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-32">
          <div className="glass-panel p-10 md:p-20 relative overflow-hidden neon-border-purple">
            <div className="absolute -top-20 -right-20 p-20 opacity-5 pointer-events-none">
              <FlaskConical className="w-96 h-96" />
            </div>
            
            <div className="max-w-4xl relative z-10">
              <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">The Researcher</h2>
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl text-gray-300 leading-tight font-light">
                    Subham Rakshit – B.Tech in CSE (AIML) at Heritage Institute of Technology.
                  </p>
                  <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                    Proficient in end-to-end Machine Learning workflows and Generative AI. Experienced in Python, ML frameworks, and backend development. Focused on creating scalable, production-ready AI solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-mono text-neon-purple uppercase tracking-[0.3em] mb-4">Academic_History</h4>
                    <div className="space-y-6">
                      <div className="border-l border-neon-purple/30 pl-6 relative">
                        <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-neon-purple" />
                        <h5 className="text-white font-bold text-lg">Heritage Institute of Technology</h5>
                        <p className="text-gray-400 text-xs font-mono">B.Tech in CSE (AIML) • 2023 - Present</p>
                        <p className="text-neon-purple text-[10px] font-mono mt-1">YGPA [2nd Year]: 8.23</p>
                      </div>
                      <div className="border-l border-white/10 pl-6 relative">
                        <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-gray-600" />
                        <h5 className="text-gray-300 font-bold text-lg">St. Thomas' Boys' School</h5>
                        <p className="text-gray-500 text-xs font-mono">ISC (XII) • 2023</p>
                        <p className="text-gray-600 text-[10px] font-mono mt-1">Score: 80%</p>
                      </div>
                      <div className="border-l border-white/10 pl-6 relative">
                        <div className="absolute -left-[4.5px] top-0 w-2 h-2 rounded-full bg-gray-600" />
                        <h5 className="text-gray-300 font-bold text-lg">St. Thomas' Boys' School</h5>
                        <p className="text-gray-500 text-xs font-mono">ISCE (X) • 2021</p>
                        <p className="text-gray-600 text-[10px] font-mono mt-1">Score: 92.7%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4">Technical_Core</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded">
                        <p className="text-[8px] font-mono text-gray-500 uppercase mb-2">ML_Frameworks</p>
                        <p className="text-xs text-gray-300">XGBoost, Gradient Boosting, Logistic Regression</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded">
                        <p className="text-[8px] font-mono text-gray-500 uppercase mb-2">Data_Science</p>
                        <p className="text-xs text-gray-300">Feature Engineering, Preprocessing, Analytics</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded">
                        <p className="text-[8px] font-mono text-gray-500 uppercase mb-2">Gen_AI</p>
                        <p className="text-xs text-gray-300">LLM Integration, Prompt Engineering</p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded">
                        <p className="text-[8px] font-mono text-gray-500 uppercase mb-2">Infrastructure</p>
                        <p className="text-xs text-gray-300">Next.js, Supabase, PostgreSQL, SQL</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-gradient-cyan">Initialize Contact</h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-light">
            Currently available for high-impact collaborations, internships, and architectural consultations.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 relative z-10">
            <a 
              href="mailto:rwik0822@gmail.com" 
              className="flex items-center gap-4 px-10 py-5 glass-panel neon-border-cyan hover:bg-neon-cyan/5 transition-all group"
            >
              <Mail className="w-6 h-6 text-neon-cyan group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Secure_Email</span>
            </a>
            <a 
              href="https://github.com/Subham0822" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-10 py-5 glass-panel neon-border-purple hover:bg-neon-purple/5 transition-all group"
            >
              <Github className="w-6 h-6 text-neon-purple group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Source_Registry</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/subham-rakshit-a96323290/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-10 py-5 glass-panel border-blue-500/30 hover:bg-blue-500/5 transition-all group"
            >
              <Linkedin className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Professional_Node</span>
            </a>
            <a 
              href="https://x.com/subharnava" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-10 py-5 glass-panel border-white/10 hover:bg-white/5 transition-all group"
            >
              <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Neural_Network</span>
            </a>
            <a 
              href="tel:+917980756658" 
              className="flex items-center gap-4 px-10 py-5 glass-panel border-green-500/30 hover:bg-green-500/5 transition-all group"
            >
              <Phone className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Voice_Uplink</span>
            </a>
            <a 
              href="https://drive.google.com/file/d/1xnEFlN9PSgfCn0IGgOub3bsCF_eJqTEE/view?usp=drive_link" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-10 py-5 glass-panel border-neon-purple/30 hover:bg-neon-purple/5 transition-all group"
            >
              <FlaskConical className="w-6 h-6 text-neon-purple group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-[0.3em]">Download_Resume</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-10 text-gray-600 font-mono text-[9px] uppercase tracking-[0.4em] pb-12">
          <div className="flex flex-col items-center lg:items-start gap-2">
            <span>© 2026 AI SYSTEMS LAB • ALL_RIGHTS_RESERVED</span>
            <span className="text-gray-800">ENCRYPTION_TYPE: AES-256-GCM</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10">
            <a href="https://drive.google.com/file/d/1xnEFlN9PSgfCn0IGgOub3bsCF_eJqTEE/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="hover:text-neon-purple transition-colors">RESUME_ACCESS</a>
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              CORE_SYSTEMS: OPTIMAL
            </span>
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
              AI_ENGINE: ACTIVE
            </span>
            <span className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.5)]" />
              UPLINK: STABLE
            </span>
          </div>
        </footer>

      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
