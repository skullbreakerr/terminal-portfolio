
const bar = (level, width = 20) => {
  const filled = Math.round((level / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
};

export const skillLine = (skill) => `  ${skill.name.padEnd(16)} ${bar(skill.level)} ${String(skill.level).padStart(3)}%`;

export const formatProject = (p) => `
╔══════════════════════════════════════════╗
║  ${p.name.padEnd(41).slice(0, 41)}║
╚══════════════════════════════════════════╝

📝 ${p.description}

🧱 Tech:
   ${p.tech.join(' · ')}

✨ Highlights:
${p.highlights.map(h => `   • ${h}`).join('\n')}

📊 Metrics:  ${p.metrics}
`;