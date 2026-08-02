import { portfolioData } from '../../data/portfolio'; // adjust path as needed
import { skillLine, formatProject } from '../../data/helpers'; // adjust path as needed

export const createCommands = (fileSystem, currentDir, setCurrentDir, addToHistory, clearHistory) => ({
  help: () => `
╔══════════════════════════════════════════╗
║           AVAILABLE COMMANDS              ║
╚══════════════════════════════════════════╝

📁 Navigation:
  ls          - List directory contents
  cd <dir>    - Change directory
  pwd         - Print working directory

📄 File Operations:
  cat <file>  - View file contents

🛠️ System:
  whoami      - Display user info
  clear       - Clear terminal
  history     - Command history
  date        - Show current date/time
  echo <text> - Print text back
  exit        - Close the terminal

🎯 Quick Access:
  skills [category] - View technical skills (backend/frontend/devops/databases)
  projects [id]      - Browse projects, add an id for details
  contact            - Contact information
  neofetch           - System information

🌐 Network:
  ping <host>        - Check host latency
  curl <url> [opts]  - Make an HTTP request
  github [username]  - Fetch a GitHub profile
  weather <city>     - Get current weather
  mail <message>     - Send me a message (opens your mail app)
                        optional: mail -from "<name>" <message>

🎮 Fun:
  matrix      - Enter the matrix

Type any command to get started!
  `,

  ls: () => {
    const current = fileSystem[currentDir];
    if (current && current.type === 'dir' && current.children) {
      return current.children.map(child => {
        const path = `${currentDir}/${child}`.replace('//', '/');
        const item = fileSystem[path];
        if (!item) return null;
        return item.type === 'dir' ? `📁 ${child}/` : `📄 ${child}`;
      }).filter(Boolean).join('\n');
    }
    return 'ls: cannot access: Not a directory';
  },

  cd: (args) => {
    if (!args[0]) return 'cd: missing operand';

    const target = args[0];
    let newDir;

    if (target === '..') {
      const parts = currentDir.split('/');
      parts.pop();
      newDir = parts.join('/') || '~';
    } else if (target === '~' || target === '/') {
      newDir = '~';
    } else {
      newDir = `${currentDir}/${target}`.replace('//', '/');
    }

    if (fileSystem[newDir] && fileSystem[newDir].type === 'dir') {
      setCurrentDir(newDir);
      return '';
    }
    return `cd: no such directory: ${target}`;
  },

  cat: (args) => {
    if (!args[0]) return 'cat: missing operand';

    const path = `${currentDir}/${args[0]}`.replace('//', '/');
    if (fileSystem[path] && fileSystem[path].type === 'file') {
      return fileSystem[path].content;
    }
    return `cat: ${args[0]}: No such file or directory`;
  },

  pwd: () => currentDir,

  whoami: () => {
    const { name, role, tagline, summary } = portfolioData.personal;
    return `
╔══════════════════════════════════════════╗
║  ${name.padEnd(41).slice(0, 41)}║
║  ${role.padEnd(41).slice(0, 41)}║
╚══════════════════════════════════════════╝

"${tagline}"

${summary}
  `;
  },

  skills: (args) => {
    const { backend, frontend, devops, databases } = portfolioData.skills;
    const category = args[0]?.toLowerCase();
    const categories = { backend, frontend, devops, databases };

    if (category && categories[category]) {
      return `
╔══════════════════════════════════════════╗
║  ${category.toUpperCase().padEnd(41)}║
╚══════════════════════════════════════════╝

${categories[category].map(skillLine).join('\n')}
      `;
    }

    if (category) {
      return `skills: unknown category: ${category}\nAvailable: backend, frontend, devops, databases`;
    }

    return `
╔══════════════════════════════════════════╗
║            TECHNICAL SKILLS               ║
╚══════════════════════════════════════════╝

🔧 Backend:
${backend.map(skillLine).join('\n')}

🖥️  Frontend:
${frontend.map(skillLine).join('\n')}

☁️  DevOps:
${devops.map(skillLine).join('\n')}

🗄️  Databases:
${databases.map(skillLine).join('\n')}

Tip: 'skills <category>' to filter, e.g. skills backend
  `;
  },

  projects: (args) => {
    const { projects } = portfolioData;

    if (args[0] !== undefined) {
      const idOrName = args[0].toLowerCase();
      const match = projects.find(
        p => String(p.id) === idOrName || p.name.toLowerCase().includes(idOrName)
      );
      if (!match) return `projects: no such project: ${args[0]}\nType 'projects' to list all.`;
      return formatProject(match);
    }

    const rows = projects
      .map(p => `  [${p.id}] 📁 ${p.name.padEnd(28)} ${p.tech.slice(0, 2).join(', ')}`)
      .join('\n');

    return `
╔══════════════════════════════════════════╗
║              MY PROJECTS                 ║
╚══════════════════════════════════════════╝

${rows}

Type 'projects <id>' for details, e.g:
  projects ${projects[0].id}
  `;
  },

  contact: () => {
    const { github, linkedin, email } = portfolioData.social;
    return `
╔══════════════════════════════════════════╗
║           CONTACT INFORMATION            ║
╚══════════════════════════════════════════╝

  🐙 GitHub    ${github}
  💼 LinkedIn  ${linkedin}
  📧 Email     ${email}

Feel free to reach out — always open to interesting work.
  `;
  },
  clear: () => {
    clearHistory();
    return '';
  },

  neofetch: () => `
        ┌──────────────────────────┐
    ▄▄▄▄▄ │ SYSTEM INFORMATION       │
   █     █│                          │
  █       █│ OS: PortfolioOS v2.0    │
  █       █│ Kernel: React 18.x      │
  █       █│ Shell: Terminal/v1.0    │
   █     █ │ Uptime: 99.99%          │
    ▀▀▀▀▀  │ Architecture: x64_64    │
        └──────────────────────────┘
  `,

  matrix: () => {
    return '🌐 Entering the Matrix...\n[SYSTEM] Connection encrypted\n[SYSTEM] Welcome to the backend realm\n\n"Unfortunately, no one can be told what the Matrix is. You have to see it for yourself."';
  },

  exit: () => {
    setTimeout(() => {
      window.location.reload();
      // console.time('Closing connection...');
      setTimeout(()=>{
        window.close();
        // console.timeEnd('Closing connection...');
      },200);
    }, 1000);
    return 'Closing connection... Goodbye! 👋';
  },

  date: () => new Date().toString(),

  echo: (args) => args.join(' '),
  curl: async (args) => {
    if (!args[0]) return 'curl: missing URL\nUsage: curl <url> [--method GET|POST] [--data <json>]';

    const url = args[0];
    let method = 'GET';
    let data = null;
    let headers = {};

    // Parse arguments
    for (let i = 1; i < args.length; i++) {
      if (args[i] === '--method' || args[i] === '-X') {
        method = args[i + 1]?.toUpperCase() || 'GET';
        i++;
      } else if (args[i] === '--data' || args[i] === '-d') {
        try {
          data = JSON.parse(args[i + 1]);
        } catch {
          data = args[i + 1];
        }
        i++;
      } else if (args[i] === '--header' || args[i] === '-H') {
        const headerParts = args[i + 1]?.split(':');
        if (headerParts?.length === 2) {
          headers[headerParts[0].trim()] = headerParts[1].trim();
        }
        i++;
      }
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: data ? JSON.stringify(data) : undefined
      });

      const responseData = await response.json();
      return `
╔══════════════════════════════════════════╗
║              API RESPONSE                ║
╚══════════════════════════════════════════╝

Status: ${response.status} ${response.statusText}
Time: ${new Date().toLocaleTimeString()}

Response:
${JSON.stringify(responseData, null, 2)}
    `;
    } catch (error) {
      return `curl: Failed to fetch\nError: ${error.message}`;
    }
  },
  // Test API endpoints
  ping: async (args) => {
    const host = args[0] || 'google.com';
    const startTime = Date.now();

    try {
      await fetch(`https://${host}`, { mode: 'no-cors' });
      const latency = Date.now() - startTime;
      return `PING ${host}: ${latency}ms ✅`;
    } catch {
      return `PING ${host}: Failed ❌`;
    }
  },

  // GitHub specific command
  github: async (args) => {
    const username = args[0] || 'yourusername';

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      return `
╔══════════════════════════════════════════╗
║           GITHUB PROFILE                 ║
╚══════════════════════════════════════════╝

👤 Username: ${data.login}
📝 Name: ${data.name || 'N/A'}
📧 Bio: ${data.bio || 'N/A'}
📦 Public Repos: ${data.public_repos}
👥 Followers: ${data.followers}
🔗 Profile: ${data.html_url}
    `;
    } catch (error) {
      return `GitHub API Error: ${error.message}`;
    }
  },

  // Weather command (using free API)
  weather: async (args) => {
    const city = args[0] || 'London';

    try {
      // Using Open-Meteo free API (no key required)
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoResponse.json();

      if (!geoData.results?.length) return `City not found: ${city}`;

      const { latitude, longitude, name } = geoData.results[0];
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherResponse.json();

      return `
╔══════════════════════════════════════════╗
║           WEATHER REPORT                 ║
╚══════════════════════════════════════════╝

📍 Location: ${name}
🌡️  Temperature: ${weatherData.current_weather.temperature}°C
💨 Wind Speed: ${weatherData.current_weather.windspeed} km/h
🧭 Wind Direction: ${weatherData.current_weather.winddirection}°
⏰ Time: ${weatherData.current_weather.time}
    `;
    } catch (error) {
      return `Weather API Error: ${error.message}`;
    }
  },

  // Mail Sender Command
  mail: (args) => {
    let raw = args.join(' ');
    let fromName = 'Anonymous';

    // Extract --from/-from if present, and remove it from the raw string
    const fromPattern = /(--?from)\s+"([^"]*)"|(--?from)\s+(\S+)/;
    const fromMatch = raw.match(fromPattern);
    if (fromMatch) {
      fromName = fromMatch[2] !== undefined ? fromMatch[2] : fromMatch[4];
      raw = raw.replace(fromMatch[0], '').trim();
    }

    // Strip an optional --message/-message flag if someone still includes it,
    // but it's no longer required
    raw = raw.replace(/^(--?message|--?msg)\s+/, '');

    const message = raw.replace(/^"|"$/g, '').trim();

    if (!message) {
      return `mail: missing message\nUsage: mail <your message>\n   or: mail -from "<name>" <your message>`;
    }

    const to = portfolioData.social.email;
    const subject = encodeURIComponent(`Portfolio contact from ${fromName}`);
    const body = encodeURIComponent(`From: ${fromName}\n\n${message}`);
    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;

    const anchor = document.createElement('a');
    anchor.href = mailtoLink;
    anchor.click();

    return `
╔══════════════════════════════════════════╗
║           OPENING MAIL CLIENT            ║
╚══════════════════════════════════════════╝

👤 From:    ${fromName}
📝 Message: "${message}"
📧 To:      ${to}

Your default email app should now be open.
Didn't pop up? Email me directly at ${to}
    `;
  },
});