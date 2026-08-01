import { useState, useCallback, useRef, useEffect } from 'react';

const STORAGE_KEY = 'terminal_command_history';

const loadCommandHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Failed to load command history:', err);
    return [];
  }
};

const saveCommandHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save command history:', err);
  }
};

export const useTerminal = (fileSystem) => {
  const [history, setHistory] = useState([]);
  const [currentDir, setCurrentDir] = useState('~');
  const [commandHistory, setCommandHistory] = useState(loadCommandHistory);
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
    setCommandHistory(prev => {
      const updated = [...prev, command];
      saveCommandHistory(updated);
      return updated;
    });
    setHistoryIndex(-1);
  }, []);

  const clearCommandHistory = useCallback(() => {
    setCommandHistory([]);
    saveCommandHistory([]);
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
    addCommandToHistory,
    clearCommandHistory
  };
};