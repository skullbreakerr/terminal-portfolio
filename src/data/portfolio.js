export const portfolioData = {
  personal: {
    name: "Dharmik Patel",
    role: "Full Stack Engineer & System Architect",
    tagline: "Crafting robust distributed systems with elegance",
    summary: "Experienced backend engineer specializing in Js, Java/Spring Boot microservices, distributed systems, and scalable architectures."
  },
  
  skills: {
    backend: [
      { name: "Java", level: 95 },
      { name: "Spring Boot", level: 90 },
      { name: "Microservices", level: 75 },
      { name: "Node.js", level: 75 },
      { name: "Laravel", level: 50 },
      { name: "RESTful APIs", level: 95 },
    ],
    frontend: [
      { name: "React.js", level: 75 },
      { name: "Vue.js", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 100 },
      { name: "Element UI", level: 90 },
      { name: "Bootstrap 5", level: 90 },
      { name: "Tailwind", level: 90 },
    ],
    devops: [
      { name: "Docker", level: 85 },
      { name: "CI/CD", level: 85 },
      { name: "AWS/GCP", level: 70 },
    ],
    databases: [
      { name: "PostgreSQL", level: 90 },
      { name: "SQL/MYSQL", level: 85 },
      { name: "Redis", level: 85 },
    ]
  },
  
  projects: [
    {
      id: 0,
      name: "WindMill SAAS Portfolio",
      description: "Scalable WindMill SaaS portfolio",
      tech: ["frontend", "React", "Component Development", "Structure Design"],
      highlights: [
        "Interactive Landing Page Along with pricing,contact and other business related sections",
      ],
      metrics: "99.9% uptime | <100ms p95 latency"
    },
    {
      id: 1,
      name: "CodeEditor - Codepen Clone",
      description: "Famous Clone of Codepen.io, a web-based code editor and social development environment for front-end developers.",
      tech: ["frontend", "React", "Component Development", "Structure Design"],
      highlights: [
        "Implemented a real-time code editor with live preview, allowing users to write and test HTML, CSS, and JavaScript code directly in the browser.",
        "Developed a user-friendly interface with resizable panels, syntax highlighting, and code formatting features to enhance the coding experience.",
      ],
      metrics: "99.9% uptime | <100ms p95 latency"
    },
    {
      id: 2,
      name: "Idempotency Engine",
      description: "Designed and developed a backend idempotency engine in Java to ensure duplicate-safe transaction processing for distributed systems and retry-based API workflows.",
      tech: ["Spring Boot", "Java"],
      highlights: [
        "Implemented request fingerprinting, transaction tracking, and persistence logic to guarantee consistent responses across repeated API calls.",
        "Applied backend design patterns and transactional consistency principles to improve reliability and fault tolerance in concurrent request handling",
      ],
       metrics: "99.9% uptime | <100ms p95 latency"
    },
    {
      id: 3,
      name: "PayPal Clone",
      description: "Designed and developed a distributed payment processing platform using Microservices Architecture, inspired by modern digital wallet and payment ecosystems.",
      tech: ["Spring Boot",'Java', "Apache","Docker", "JWT"],
      highlights: [
        "Implemented independent services including User Service, Wallet Service, Transaction Service, Reward Service, and Notification Service to ensure modularity, scalability, and separation of concerns.",
        "Built an API Gateway layer to centralize request routing, service communication, and external client access across microservices.",
        "Leveraged Apache Kafka for asynchronous event-driven communication between services, enabling reliable transaction processing, reward generation, and notification workflows"
      ],
       metrics: "99.9% uptime | <100ms p95 latency"
    }
  ],
  
  social: {
    github: "https://www.github.com/skullbreakerr",
    linkedin: "https://www.linkedin.com/in/patel-dharmik-364433207",
    email: "patelchintu2002@gmail.com",
    // website: "https://yourportfolio.com"
  }
};