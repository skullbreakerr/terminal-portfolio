import React, { useState, useEffect } from 'react';
import './Terminal.css';

const TerminalHeader = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isFullscreenSupported = () => {
    return document.fullscreenEnabled || 
           document.webkitFullscreenEnabled || 
           document.mozFullScreenEnabled ||
           document.msFullscreenEnabled;
  };

  const enterFullscreen = () => {
    const element = document.documentElement; 
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { 
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { 
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { 
      element.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) { 
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) { 
      document.msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreenSupported()) {
      alert('Fullscreen is not supported in your browser');
      return;
    }

    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };
  const toggleMinimizeScreen = () => {
    if (!isFullscreenSupported()) {
      alert('Fullscreen is not supported in your browser');
      return;
    }

    if (isFullscreen) {
      exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || 
           document.webkitFullscreenElement || 
           document.mozFullScreenElement ||
           document.msFullscreenElement)
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div className="terminal-header">
      <div className="terminal-buttons">
        <span className="terminal-btn close" title="Close" onClick={() => window.close()}></span>
        <span className="terminal-btn minimize" title="Minimize" onClick={toggleMinimizeScreen}></span>
        <span 
          className={`terminal-btn maximize ${isFullscreen ? 'fullscreen-active' : ''}`} 
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          onClick={toggleFullscreen}
        ></span>
      </div>
      <div className="terminal-title glitch-hover">
        dharmik-patel@fullstack ~ terminal
      </div>
      <div className="terminal-status">
        <span className="status-indicator"></span>
        Connected
      </div>
    </div>
  );
};

export default TerminalHeader;