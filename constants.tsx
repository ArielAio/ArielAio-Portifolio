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
    role: "COO & Desenvolvedor Full Stack",
    description: "Co-fundador da Skyiit. Combino visão estratégica de negócios com capacidade técnica em React, Node.js e Laravel para criar soluções digitais escaláveis e de alto impacto.",
    ctaProjects: "Ver Projetos",
    ctaContact: "Entrar em Contato",
    ctaResume: "Baixar PDF",
    resumeLabel: "Currículo"
  },
  en: {
    greeting: "Hello, I am",
    name: "Ariel André Aio",
    role: "COO & Full Stack Developer",
    description: "Co-founder of Skyiit. I combine strategic business vision with technical expertise in React, Node.js, and Laravel to create scalable and high-impact digital solutions.",
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
      { title: "Desenvolvimento Full Stack", icon: Code, description: "Criação de aplicações web completas usando React, Node.js e Laravel." },
      { title: "Gestão de Produtos", icon: Smartphone, description: "Liderança técnica e estratégica para transformar ideias em produtos digitais." },
      { title: "Banco de Dados", icon: Database, description: "Modelagem e otimização de dados com PostgreSQL, MySQL e Firebase." },
    ]
  },
  en: {
    title: "About Me",
    services: [
      { title: "Full Stack Development", icon: Code, description: "Creation of complete web applications using React, Node.js, and Laravel." },
      { title: "Product Management", icon: Smartphone, description: "Technical and strategic leadership to transform ideas into digital products." },
      { title: "Database Management", icon: Database, description: "Data modeling and optimization with PostgreSQL, MySQL, and Firebase." },
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
        details: [
          "Condução de operações internas da empresa: organização de demandas, gestão de produtividade e acompanhamento do time de desenvolvimento (3 devs).",
          "Criação e edição de conteúdos digitais para campanhas de marketing em redes sociais.",
          "Atendimento direto ao cliente e suporte pós-venda, com foco em satisfação e retenção.",
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
        details: [
          "Leading internal company operations: organizing demands, productivity management, and monitoring the development team (3 devs).",
          "Creation and editing of digital content for social media marketing campaigns.",
          "Direct customer service and post-sales support, focusing on satisfaction and retention.",
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
        image: "/codewise.png",
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
    description: "Ferramentas que utilizo no dia a dia para transformar problemas complexos em soluções escaláveis e performáticas.",
    skills: [
      {
        name: "React / Next.js",
        time: "+2 anos",
        category: 'frontend',
        description: "Desenvolvimento de SPAs complexas, Dashboards administrativos e otimização de renderização (SSR/CSR)."
      },
      {
        name: "JavaScript / TypeScript",
        time: "+3 anos",
        category: 'frontend',
        description: "Tipagem estática para código escalável, manipulação avançada de DOM e lógica assíncrona."
      },
      {
        name: "Node.js",
        time: "+2 anos",
        category: 'backend',
        description: "Criação de APIs RESTful, microsserviços e integração com sistemas de pagamento e autenticação."
      },
      {
        name: "Laravel / PHP",
        time: "+2 anos",
        category: 'backend',
        description: "Manutenção de sistemas legados, arquitetura MVC robusta e desenvolvimento de aplicações institucionais."
      },
      {
        name: "PostgreSQL / MySQL",
        time: "+2 anos",
        category: 'backend',
        description: "Modelagem de bancos relacionais, otimização de queries complexas e garantia de integridade de dados."
      },
      {
        name: "Firebase",
        time: "+1 ano",
        category: 'backend',
        description: "Implementação de bancos NoSQL em tempo real, autenticação social e hosting de aplicações."
      },
      {
        name: "Git / GitHub",
        time: "+3 anos",
        category: 'tools',
        description: "Controle de versão em equipe, code review, CI/CD básico e gestão de fluxo de trabalho (Git Flow)."
      },
      {
        name: "Metodologias Ágeis",
        time: "+2 anos",
        category: 'tools',
        description: "Organização de sprints, dailies e gestão de backlog utilizando ferramentas como Trello/Jira."
      },
    ]
  },
  en: {
    title: "Tech ",
    titleHighlight: "Stack",
    description: "Tools I use daily to transform complex problems into scalable and performant solutions.",
    skills: [
      {
        name: "React / Next.js",
        time: "+2 years",
        category: 'frontend',
        description: "Development of complex SPAs, Admin Dashboards, and rendering optimization (SSR/CSR)."
      },
      {
        name: "JavaScript / TypeScript",
        time: "+3 years",
        category: 'frontend',
        description: "Static typing for scalable code, advanced DOM manipulation, and asynchronous logic."
      },
      {
        name: "Node.js",
        time: "+2 years",
        category: 'backend',
        description: "Creation of RESTful APIs, microservices, and integration with payment and authentication systems."
      },
      {
        name: "Laravel / PHP",
        time: "+2 years",
        category: 'backend',
        description: "Maintenance of legacy systems, robust MVC architecture, and development of institutional applications."
      },
      {
        name: "PostgreSQL / MySQL",
        time: "+2 years",
        category: 'backend',
        description: "Relational database modeling, complex query optimization, and data integrity assurance."
      },
      {
        name: "Firebase",
        time: "+1 year",
        category: 'backend',
        description: "Implementation of real-time NoSQL databases, social authentication, and application hosting."
      },
      {
        name: "Git / GitHub",
        time: "+3 years",
        category: 'tools',
        description: "Team version control, code review, basic CI/CD, and workflow management (Git Flow)."
      },
      {
        name: "Agile Methodologies",
        time: "+2 years",
        category: 'tools',
        description: "Organization of sprints, dailies, and backlog management using tools like Trello/Jira."
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