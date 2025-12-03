import { Project, Experience, Skill, SocialLink, Education } from './types';
import { Github, Linkedin, Mail, Code, Terminal, Database, Smartphone } from 'lucide-react';

export const NAV_LINKS = {
  pt: [
    { name: 'Sobre', href: '#about' },
    { name: 'Experiência', href: '#experience' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' },
  ],
  en: [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]
};

export const HERO_CONTENT = {
  pt: {
    greeting: "Olá, eu sou o",
    name: "Ariel André Aio",
    role: "COO & Desenvolvedor em Crescimento",
    description: "Co-fundador da Skyiit. Combino visão estratégica de negócios com habilidades técnicas em desenvolvimento web para transformar ideias em produtos digitais reais. Experiência profissional com React, Laravel e banco de dados + projetos pessoais com Next.js.",
    ctaProjects: "Ver Projetos",
    ctaContact: "Entrar em Contato",
    ctaResume: "Baixar PDF",
    resumeLabel: "Currículo"
  },
  en: {
    greeting: "Hello, I am",
    name: "Ariel André Aio",
    role: "COO & Growing Developer",
    description: "Co-founder of Skyiit. I combine strategic business vision with technical skills in web development to transform ideas into real digital products. Professional experience with React, Laravel, and databases + personal projects with Next.js.",
    ctaProjects: "View Projects",
    ctaContact: "Get in Touch",
    ctaResume: "Download PDF",
    resumeLabel: "Resume"
  }
};

export const ABOUT_CONTENT = {
  pt: {
    title: "Sobre Mim",
    services: [
      { title: "Desenvolvimento Web", icon: Code, description: "Experiência profissional com React, Laravel e TypeScript na EnterScience. Projetos pessoais com Next.js e Firebase." },
      { title: "Gestão de Produtos", icon: Smartphone, description: "Coordenação operacional e visão estratégica como COO para transformar ideias em produtos viáveis." },
      { title: "Banco de Dados", icon: Database, description: "Experiência em manutenção de PostgreSQL em ambiente de produção e projetos com Firebase." },
    ]
  },
  en: {
    title: "About Me",
    services: [
      { title: "Web Development", icon: Code, description: "Professional experience with React, Laravel, and TypeScript at EnterScience. Personal projects with Next.js and Firebase." },
      { title: "Product Management", icon: Smartphone, description: "Operational coordination and strategic vision as COO to transform ideas into viable products." },
      { title: "Database Management", icon: Database, description: "Experience in PostgreSQL maintenance in production environments and projects with Firebase." },
    ]
  }
};

export const EXPERIENCE_CONTENT = {
  pt: {
    title: "Minha Trajetória",
    professionalTitle: "Experiência Profissional",
    educationTitle: "Formação Acadêmica",
    experience: [
      {
        id: 1,
        role: "COO & Co-Fundador",
        company: "Skyiit",
        period: "2025 - Atual",
        description: "Co-fundador da holding Skyiit, responsável pelo produto digital Memoryiit, consolidado no mercado de presentes digitais em menos de 1 ano.",
        projectLink: "https://memoryiit.com",
        details: [
          "Coordenação de operações internas: organização de demandas, gestão de fluxo de trabalho e acompanhamento do time técnico utilizando metodologias ágeis via Linear.",
          "Liderança das equipes de suporte ao cliente e edição de conteúdo, garantindo qualidade no atendimento e produção consistente de materiais.",
          "Criação e edição de vídeos para campanhas de marketing em redes sociais, resultando em aumento de engajamento e alcance orgânico.",
          "Estruturação de processos de marketing, operações e produto visando crescimento escalável."
        ]
      },
      {
        id: 2,
        role: "Estagiário em Desenvolvimento",
        company: "EnterScience",
        period: "2024 - 2025",
        description: "Atuação direta no desenvolvimento e manutenção de software.",
        details: [
          "Implementação de novas funcionalidades no site institucional, utilizando Laravel e React.",
          "Correção de bugs e otimização de código.",
          "Manutenção de banco de dados PostgreSQL."
        ]
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bacharelado em Sistemas de Informação",
        institution: "IFSP - Votuporanga",
        period: "2027",
        description: "Ensino superior em andamento, período matutino."
      },
      {
        id: 2,
        degree: "Técnico em Informática",
        institution: "ETEC - Armando José Farinazzo",
        period: "2023",
        description: "Formação técnica focada em desenvolvimento de sistemas."
      }
    ]
  },
  en: {
    title: "My Journey",
    professionalTitle: "Professional Experience",
    educationTitle: "Education",
    experience: [
      {
        id: 1,
        role: "COO & Co-Founder",
        company: "Skyiit",
        period: "2025 - Present",
        description: "Co-founder of the Skyiit holding, responsible for the digital product Memoryiit, consolidated in the digital gifts market in less than 1 year.",
        projectLink: "https://memoryiit.com",
        details: [
          "Internal operations coordination: organizing demands, workflow management, and monitoring the technical team using Agile methodologies with Linear.",
          "Leadership of customer support and content editing teams, ensuring quality service and consistent material production.",
          "Creation and editing of videos for social media marketing campaigns, resulting in increased engagement and organic reach.",
          "Structuring marketing, operations, and product processes aiming for scalable growth."
        ]
      },
      {
        id: 2,
        role: "Development Intern",
        company: "EnterScience",
        period: "2024 - 2025",
        description: "Direct involvement in software development and maintenance.",
        details: [
          "Implementation of new functionalities in the institutional website using Laravel and React.",
          "Bug fixing and code optimization.",
          "PostgreSQL database maintenance."
        ]
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor in Information Systems",
        institution: "IFSP - Votuporanga",
        period: "2027",
        description: "Higher education in progress, morning period."
      },
      {
        id: 2,
        degree: "IT Technician",
        institution: "ETEC - Armando José Farinazzo",
        period: "2023",
        description: "Technical education focused on systems development."
      }
    ]
  }
};

export const FEATURED_PROJECT = {
  pt: {
    sectionTitle: "Projeto em Destaque",
    title: "Memoryiit — Plataforma de Presentes Digitais",
    subtitle: "COO & Co-Fundador | Skyiit",
    description: "Como COO e Co-fundador da Skyiit, coordenei o lançamento e operação do Memoryiit, produto consolidado no mercado de presentes digitais em menos de 1 ano.",
    responsibilities: [
      "Gestão de fluxo de trabalho e organização do time técnico com metodologias ágeis",
      "Liderança das equipes de suporte ao cliente e edição de conteúdo, garantindo atendimento de qualidade e produção consistente",
      "Criação e edição de vídeos para campanhas de marketing em redes sociais, aumentando engajamento e alcance orgânico",
      "Estruturação de processos operacionais e acompanhamento de entregas via Linear"
    ],
    tags: ["Product Management", "Operations", "Team Leadership", "Marketing"],
    image: "/memoryiit.png",
    link: "https://memoryiit.com",
    badge: "🚀 Em Produção",
    cta: "Visitar Projeto"
  },
  en: {
    sectionTitle: "Featured Project",
    title: "Memoryiit — Digital Gifts Platform",
    subtitle: "COO & Co-Founder | Skyiit",
    description: "As COO and Co-founder of Skyiit, I coordinated the launch and operations of Memoryiit, a product consolidated in the digital gifts market in less than 1 year.",
    responsibilities: [
      "Workflow management and technical team coordination using Agile methodologies",
      "Leadership of customer support and content editing teams, ensuring quality service and consistent production",
      "Creation and editing of videos for social media marketing campaigns, increasing engagement and organic reach",
      "Operational process structuring and delivery tracking via Linear"
    ],
    tags: ["Product Management", "Operations", "Team Leadership", "Marketing"],
    image: "/memoryiit.png",
    link: "https://memoryiit.com",
    badge: "🚀 In Production",
    cta: "Visit Project"
  }
};

export const PROJECTS_CONTENT = {
  pt: {
    title: "Projetos Recentes",
    portfolioLabel: "Portfólio",
    demo: "Demo",
    code: "Código",
    projects: [
      {
        id: 1,
        title: "Sistema para Barbearias",
        description: "Plataforma completa para barbearias, com agendamentos em tempo real, gestão de clientes e painel administrativo intuitivo. Utilizado diariamente em produção por estabelecimentos reais.",
        tags: ["Next.js", "Firebase", "SaaS", "Agendamentos"],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
        link: "https://barber-agenda.vercel.app",
        githubRepo: "https://github.com/ArielAio/Barber.git",
      },
      {
        id: 2,
        title: "Strike System — Gestão para Academias",
        description: "Sistema completo para academias, incluindo controle de acesso, gestão de alunos, treinos, planos e dashboard administrativo. Desenvolvido com foco em escalabilidade e alta performance.",
        tags: ["Next.js", "Gestão de Academia", "Dashboard Administrativo", "SaaS"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        link: "https://strike-system.vercel.app/signIn",
        githubRepo: "https://github.com/ArielAio/strike.git",
      },
      {
        id: 3,
        title: "Assistente de IA",
        description: "Chatbot inteligente integrado à API Sabiá 3, com processamento de linguagem natural, respostas contextuais e fluxo otimizado para interações rápidas e naturais.",
        tags: ["IA", "Chatbot", "NLP", "API Sabiá 3", "Integração de API"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        link: "https://chat-bot-gules-chi.vercel.app",
        githubRepo: "https://github.com/ArielAio/ChatBot.git",
      },
      {
        id: 4,
        title: "CodeWise — Plataforma EAD",
        description: "Plataforma de cursos online desenvolvida em Next.js, com foco em usabilidade, fluxo intuitivo de aprendizado e experiência otimizada para estudantes e criadores.",
        tags: ["Next.js", "LMS", "Educação Online"],
        image: "/CodeWise.png",
        link: "http://codewise-liart.vercel.app/",
        githubRepo: "https://github.com/ArielAio/codewise.git",
      },
    ]
  },
  en: {
    title: "Recent Projects",
    portfolioLabel: "Portfolio",
    demo: "Demo",
    code: "Code",
    projects: [
      {
        id: 1,
        title: "Barbershop System",
        description: "Complete platform for barbershops featuring real-time scheduling, client management, and an intuitive administrative panel. Used daily in production by real establishments.",
        tags: ["Next.js", "Firebase", "SaaS", "Scheduling"],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
        link: "https://barber-agenda.vercel.app",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
      {
        id: 2,
        title: "Strike System — Gym Management",
        description: "Complete system for gyms including access control, student management, workouts, plans, and administrative dashboard. Developed with a focus on scalability and high performance.",
        tags: ["Next.js", "Gym Management", "Admin Dashboard", "SaaS"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        link: "https://strike-system.vercel.app/signIn",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
      {
        id: 3,
        title: "AI Assistant",
        description: "Intelligent chatbot integrated with Sabiá 3 API, featuring natural language processing, contextual responses, and an optimized flow for fast and natural interactions.",
        tags: ["AI", "Chatbot", "NLP", "Sabiá 3 API", "API Integration"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        link: "https://chat-bot-gules-chi.vercel.app",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
      {
        id: 4,
        title: "CodeWise — E-Learning Platform",
        description: "Online course platform developed in Next.js, focusing on usability, intuitive learning flow, and optimized experience for students and creators.",
        tags: ["Next.js", "LMS", "Online Education"],
        image: "/CodeWise.png",
        link: "http://codewise-liart.vercel.app/",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
    ]
  }
};

export const SKILLS_CONTENT = {
  pt: {
    title: "Stack ",
    titleHighlight: "Tecnológico",
    description: "Tecnologias que venho desenvolvendo através de experiência profissional e projetos pessoais.",
    skills: [
      {
        name: "Laravel / PHP",
        time: "1 ano (profissional)",
        category: 'backend',
        description: "Experiência profissional: manutenção de sistemas em produção, correção de bugs e implementação de features no site institucional da EnterScience."
      },
      {
        name: "PostgreSQL / MySQL",
        time: "1 ano (profissional)",
        category: 'backend',
        description: "Manutenção de banco de dados PostgreSQL em ambiente de produção durante estágio na EnterScience."
      },
      {
        name: "React",
        time: "1 ano (prof.) + 1 ano (pessoal)",
        category: 'frontend',
        description: "Implementação de features no site da EnterScience + projetos pessoais (sistemas de agendamento, dashboards)."
      },
      {
        name: "TypeScript",
        time: "1 ano (prof.) + 1 ano (pessoal)",
        category: 'frontend',
        description: "Uso profissional na EnterScience e em projetos pessoais. Conhecimento intermediário de tipagem e interfaces."
      },
      {
        name: "Next.js",
        time: "1 ano (pessoal)",
        category: 'frontend',
        description: "Projetos pessoais: plataformas EAD e dashboards com SSR/CSR. Desenvolvimento com auxílio de IA e documentação."
      },
      {
        name: "Firebase",
        time: "1 ano (pessoal)",
        category: 'backend',
        description: "Implementação em projetos pessoais: autenticação, banco de dados em tempo real e hosting."
      },
      {
        name: "Node.js",
        time: "1 ano (pessoal)",
        category: 'backend',
        description: "Projetos pessoais com criação de APIs básicas e integrações simples."
      },
      {
        name: "Git / GitHub",
        time: "2 anos",
        category: 'tools',
        description: "Controle de versão individual e em equipe. Experiência com commits, branches e pull requests."
      },
      {
        name: "Metodologias Ágeis",
        time: "2 anos",
        category: 'tools',
        description: "Aplicação em estágio (EnterScience), projetos pessoais e como COO (Skyiit). Experiência com Scrum, sprints e gestão de fluxo via Linear."
      },
    ]
  },
  en: {
    title: "Tech ",
    titleHighlight: "Stack",
    description: "Technologies I've been developing through professional experience and personal projects.",
    skills: [
      {
        name: "Laravel / PHP",
        time: "1 year (professional)",
        category: 'backend',
        description: "Professional experience: maintenance of production systems, bug fixes, and feature implementation on EnterScience's institutional website."
      },
      {
        name: "PostgreSQL / MySQL",
        time: "1 year (professional)",
        category: 'backend',
        description: "PostgreSQL database maintenance in production environment during internship at EnterScience."
      },
      {
        name: "React",
        time: "1 year (prof.) + 1 year (personal)",
        category: 'frontend',
        description: "Feature implementation at EnterScience + personal projects (scheduling systems, dashboards)."
      },
      {
        name: "TypeScript",
        time: "1 year (prof.) + 1 year (personal)",
        category: 'frontend',
        description: "Professional use at EnterScience and in personal projects. Intermediate knowledge of typing and interfaces."
      },
      {
        name: "Next.js",
        time: "1 year (personal)",
        category: 'frontend',
        description: "Personal projects: e-learning platforms and dashboards with SSR/CSR. Development with AI assistance and documentation."
      },
      {
        name: "Firebase",
        time: "1 year (personal)",
        category: 'backend',
        description: "Implementation in personal projects: authentication, real-time database, and hosting."
      },
      {
        name: "Node.js",
        time: "1 year (personal)",
        category: 'backend',
        description: "Personal projects with basic API creation and simple integrations."
      },
      {
        name: "Git / GitHub",
        time: "2 years",
        category: 'tools',
        description: "Individual and team version control. Experience with commits, branches, and pull requests."
      },
      {
        name: "Agile Methodologies",
        time: "2 years",
        category: 'tools',
        description: "Applied in internship (EnterScience), personal projects, and as COO (Skyiit). Experience with Scrum, sprints, and workflow management via Linear."
      },
    ]
  }
};

export const CONTACT_CONTENT = {
  pt: {
    title: "Vamos trabalhar ",
    titleHighlight: "juntos?",
    description: "Tem um projeto em mente ou quer apenas dar um oi? Sinta-se à vontade para me mandar uma mensagem.",
    copyEmail: "Email",
    copied: "Copiado!",
    formName: "Nome",
    formNamePlaceholder: "Seu nome",
    formEmail: "Email",
    formEmailPlaceholder: "seu@email.com",
    formMessage: "Mensagem",
    formMessagePlaceholder: "Fale sobre seu projeto...",
    sendButton: "Enviar Mensagem",
    sending: "Enviando...",
    sent: "Mensagem Enviada!",
    footerRights: "Todos os direitos reservados."
  },
  en: {
    title: "Let's work ",
    titleHighlight: "together?",
    description: "Have a project in mind or just want to say hi? Feel free to send me a message.",
    copyEmail: "Email",
    copied: "Copied!",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "your@email.com",
    formMessage: "Message",
    formMessagePlaceholder: "Tell me about your project...",
    sendButton: "Send Message",
    sending: "Sending...",
    sent: "Message Sent!",
    footerRights: "All rights reserved."
  }
};

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/ArielAio", icon: Github },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/ariel-aio/", icon: Linkedin },
  { platform: "Email", url: "mailto:arielaio@hotmail.com", icon: Mail },
];