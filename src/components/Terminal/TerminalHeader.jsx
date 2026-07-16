import React from 'react';
import './Terminal.css';

const TerminalHeader = () => {
  return (
    <div className="terminal-header">
      <div className="terminal-buttons">
        <span className="terminal-btn close" title="Close"></span>
        <span className="terminal-btn minimize" title="Minimize"></span>
        <span className="terminal-btn maximize" title="Maximize"></span>
      </div>
      <div className="terminal-title glitch-hover">
        dharmik-patel-fullstack@portfolio ~ terminal
      </div>
      <div className="terminal-status">
        <span className="status-indicator"></span>
        Connected
      </div>
    </div>
  );
};

export default TerminalHeader;