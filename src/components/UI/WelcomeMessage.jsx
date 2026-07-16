import React from 'react';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
  return (
    <div className="welcome-message">
      <pre className="ascii-art">
{`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   ██████╗  █████╗  ██████╗██╗  ██╗███████╗███╗   ██╗██████╗ 
║   ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝████╗  ██║██╔══██╗
║   ██████╔╝███████║██║     █████╔╝ █████╗  ██╔██╗ ██║██║  ██║
║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██║╚██╗██║██║  ██║
║   ██████╔╝██║  ██║╚██████╗██║  ██╗███████╗██║ ╚████║██████╔╝
║   ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ 
║                                                          ║
║              SYSTEM ARCHITECT & ENGINEER                 ║
╚══════════════════════════════════════════════════════════╝
`}
      </pre>
      <div className="welcome-text">
        <span>Welcome to My terminal portfolio!</span> 🚀
        <br />
        Type <span className="highlight">'help'</span> to see available commands
        <br />
        Ready to explore? Try <span className="highlight">'ls'</span> to begin
      </div>
    </div>
  );
};

export default WelcomeMessage;