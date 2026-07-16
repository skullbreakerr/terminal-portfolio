export const parseCommand = (input) => {
  const trimmed = input.trim();
  if (!trimmed) return { command: '', args: [] };
  
  const parts = trimmed.split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

export const isBuiltInCommand = (command) => {
  const builtInCommands = [
    'help', 'ls', 'cd', 'cat', 'pwd', 
    'clear', 'whoami', 'skills', 'projects',
    'contact', 'matrix', 'exit', 'neofetch',
    'echo', 'date', 'history'
  ];
  return builtInCommands.includes(command);
};