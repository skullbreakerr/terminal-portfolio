import React, { useState } from 'react';
import './Terminal.css';

const TerminalInput = ({ onSubmit, onKeyDown, currentDir, inputRef }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSubmit(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      onKeyDown(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <span className="prompt">❯</span>
      <span className="current-path">visitor@portfolio:{currentDir}$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="terminal-input"
        spellCheck="false"
        autoComplete="off"
        placeholder="Type a command..."
      />
    </form>
  );
};

export default TerminalInput;