export const typeText = (text, speed = 50) => {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        process.stdout.write(text[index]);
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
};

export const addGlitchEffect = (element) => {
  if (element) {
    element.classList.add('glitch-hover');
  }
};

export const removeGlitchEffect = (element) => {
  if (element) {
    element.classList.remove('glitch-hover');
  }
};