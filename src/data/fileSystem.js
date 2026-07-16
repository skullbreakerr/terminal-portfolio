export const createFileSystem = (portfolioData) => ({
  '~': {
    type: 'dir',
    children: ['about', 'skills', 'projects', 'architecture', 'contact']
  },
  
  '~/about': {
    type: 'file',
    content: `
╔══════════════════════════════════════════╗
║          SYSTEM ARCHITECT PROFILE        ║
╚══════════════════════════════════════════╝

> ${portfolioData.personal.role}
> ${portfolioData.personal.tagline}

🛠️ Core Competencies:
  • JS,Java/Spring Boot Microservices
  • Distributed System Design
  • Cloud Architecture (AWS/GCP)
  • Performance Optimization
  • API Design & Development

⚡ Current Focus:
  Building scalable systems that handle 
  millions of transactions daily
    `
  },
  
  '~/skills': {
    type: 'file',
    content: generateSkillsContent(portfolioData.skills)
  },
  
  '~/projects': {
    type: 'dir',
    children: ['paypal-clone', 'codepen-clone', 'idempotency-engine', 'windmill-saas-portfolio']
  },
  
  '~/projects/paypal-clone': {
    type: 'file',
    content: generateProjectContent(portfolioData.projects[3])
  },
  
  '~/projects/codepen-clone': {
    type: 'file',
    content: generateProjectContent(portfolioData.projects[1])
  },
  
  '~/projects/idempotency-engine': {
    type: 'file',
    content: generateProjectContent(portfolioData.projects[2])
  },
  
  '~/projects/windmill-saas-portfolio': {
    type: 'file',
    content: generateProjectContent(portfolioData.projects[0])
  },
  
  '~/architecture': {
    type: 'file',
    content: `
╔══════════════════════════════════════════╗
║        SYSTEM ARCHITECTURE EXPERTISE     ║
╚══════════════════════════════════════════╝

🏗️ Architectural Patterns:
  • Microservices & Event-Driven
  • CQRS & Event Sourcing
  • Domain-Driven Design (DDD)

📐 System Design Skills:
  • Distributed Systems Design
  • High Availability & Fault Tolerance
  • Performance Optimization
  • Data Consistency Patterns
  • Security Architecture

🎯 Design Philosophy:
  "Build systems that are scalable, 
   maintainable, and a joy to work with"

╔══════════════════════════════════════════╗
║ [SYSTEM STATUS: OPERATIONAL]            ║
║ [UPTIME: 99.99%]                        ║
║ [PERFORMANCE: OPTIMAL]                  ║
╚══════════════════════════════════════════╝
    `
  },
  
  '~/contact': {
    type: 'file',
    content: `
╔══════════════════════════════════════════╗
║            ESTABLISH CONNECTION           ║
╚══════════════════════════════════════════╝

📧 Email:    ${portfolioData.social.email}
🐙 GitHub:   ${portfolioData.social.github}
💼 LinkedIn: ${portfolioData.social.linkedin}
🌐 Website:  ${portfolioData.social.website}

> Ready to architect the future together?
    `
  }
});

function generateSkillsContent(skills) {
  return `
╔══════════════════════════════════════════╗
║             TECHNICAL SKILLSET            ║
╚══════════════════════════════════════════╝

[████████████████████] BACKEND
${skills.backend.map(s => `  • ${s.name} (${s.level}%)`).join('\n')}

[████████████████░░░░] FRONTEND
${skills.frontend.map(s => `  • ${s.name} (${s.level}%)`).join('\n')}

[████████████████████] DEVOPS & TOOLS
${skills.devops.map(s => `  • ${s.name} (${s.level}%)`).join('\n')}

[████████████████████] DATABASES
${skills.databases.map(s => `  • ${s.name} (${s.level}%)`).join('\n')}
  `;
}

function generateProjectContent(project) {
  return `
╔══════════════════════════════════════════╗
║        ${project?.name?.toUpperCase() ||'Unknown Project'}        ║
╚══════════════════════════════════════════╝

📦 ${project.description}
🚀 Stack: ${project.tech.join(', ')}

Highlights:
${project.highlights.map(h => `  • ${h}`).join('\n')}
${project.metrics ? `\nPerformance:\n  • ${project.metrics}` : ''}
  `;
}