import React from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalInput from './TerminalInput';
import WelcomeMessage from '../UI/WelcomeMessage';
import Output from '../UI/Output';
import { useTerminal } from '../../hooks/useTerminal';
// import { useFileSystem } from '../../hooks/useFileSystem';
import { createFileSystem } from '../../data/fileSystem';
import { portfolioData } from '../../data/portfolio';
import { createCommands } from '../FileSystem/commands';
import { parseCommand } from '../../utils/commandParser';
import './Terminal.css';

const Terminal = () => {
  const fileSystem = createFileSystem(portfolioData);
  const {
    history,
    addToHistory,
    clearHistory,
    currentDir,
    setCurrentDir,
    inputRef,
    navigateUp,
    commandHistory,
    navigateDown,
    addCommandToHistory
  } = useTerminal(fileSystem);

  //   const { getNode, isDirectory, getChildren } = useFileSystem(fileSystem);

  const commands = createCommands(
    fileSystem,
    currentDir,
    setCurrentDir,
    addToHistory,
    clearHistory
  );

  const executeCommand = async (input) => {
    const { command, args } = parseCommand(input);

    if (!command) return;

    addCommandToHistory(input);

    addToHistory({
      type: 'command',
      text: `visitor@portfolio:${currentDir}$ ${input}`
    });

    if (commands[command]) {
      // Show loading for async commands
      if (['curl', 'fetch', 'api', 'ping', 'github', 'weather'].includes(command)) {
        addToHistory({
          type: 'output',
          text: '⏳ Executing...'
        });
      }

      // Execute command (handle both sync and async)
      const output = await commands[command](args);
      if (output) {
        addToHistory({
          type: 'output',
          text: output
        });
      }
    } else {
      addToHistory({
        type: 'output',
        text: `Command not found: ${command}. Type 'help' for available commands.`
      });
    }
  };

  const handleKeyDown = (setInput,key) => {
    if (key === 'ArrowUp') {
      const prevCommand = navigateUp();
      if (prevCommand !== null) {
        setInput(prevVal => prevVal = prevCommand);
      }
      console.log('ArrowUp pressed, previous command:', prevCommand);
    } else if (key === 'ArrowDown') {
      // e.preventDefault();
      const nextCommand = navigateDown();
      if (nextCommand !== null) {
        setInput(prevVal => prevVal = nextCommand);
      }
      console.log('ArrowDown pressed, next command:', nextCommand);
    }
    console.log('command History : ', commandHistory);
  };

  return (
    <>
      <div className="terminal-container">
        <TerminalHeader />

        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          <WelcomeMessage />


          {history.map((entry, index) => (
            entry.type === 'command' ? (
              <div key={index} className="command-line fade-in">
                <span className="prompt">❯</span> {entry.text}
              </div>
            ) : (
              <Output key={index} text={entry.text} />
            )
          ))}

          <TerminalInput
            onSubmit={executeCommand}
            onKeyDown={handleKeyDown}
            currentDir={currentDir}
            inputRef={inputRef}
          />
        </div>
      </div>

    </>
  );
};

export default Terminal;