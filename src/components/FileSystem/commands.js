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
  
🎯 Quick Access:
  skills      - View technical skills
  projects    - Browse projects
  contact     - Contact information
  neofetch    - System information
  
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
  
  whoami: () => `
╔════════════════════════════╗
║  Backend System Architect  ║
║  Java | Spring | React     ║
║  Vue  | Node  | Docker     ║
╚════════════════════════════╝
  `,
  
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
    }, 1000);
    return 'Closing connection... Goodbye! 👋';
  },
  
  date: () => new Date().toString(),
  
  echo: (args) => args.join(' ')
});