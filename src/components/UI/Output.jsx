import React from 'react';
import './Output.css';

const Output = ({ text }) => {
  return (
    <div className="output-container fade-in">
      <pre className="output-text">{text}</pre>
    </div>
  );
};

export default Output;