import { useState, useCallback, useRef, useEffect } from 'react';

export const useTerminal = (fileSystem) => {
  const [history, setHistory] = useState([]);
  const [currentDir, setCurrentDir] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  const addToHistory = useCallback((entry) => {
    setHistory(prev => [...prev, entry]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const navigateUp = useCallback(() => {
    if (historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    }
    return null;
  }, [historyIndex, commandHistory]);

  const navigateDown = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      return '';
    }
    return null;
  }, [historyIndex, commandHistory]);

  const addCommandToHistory = useCallback((command) => {
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    currentDir,
    setCurrentDir,
    inputRef,
    commandHistory,
    navigateUp,
    navigateDown,
    addCommandToHistory
  };
};