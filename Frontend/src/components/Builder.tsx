import React, { useEffect, useRef, useState } from "react";
/*eslint-disable*/
interface TextScrambleProps {
  phrases: string[];
}

const TextScramble: React.FC<TextScrambleProps> = ({ phrases }) => {
  const el = useRef<HTMLDivElement | null>(null);

  const chars = "!<>-_\\/[]{}—=+*^?#________";

  const randomChar = (): string =>
    chars[Math.floor(Math.random() * chars.length)];

  const updateText = () => {
    if (!el.current) return; // Check if el.current is not null

    const oldText = el.current.innerText;
    const newText = phrases[counter];
    const length = Math.max(oldText.length, newText.length);

    const queue: {
      from: string;
      to: string;
      start: number;
      end: number;
      char?: string;
    }[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    let frame = 0;
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            queue[i].char = char;
          }
          output += `<span class="text-gray-500">${char}</span>`;
        } else {
          output += from;
        }
      }
      if (el.current) el.current.innerHTML = output; // Safely update the innerHTML
      if (complete === queue.length) {
        setTimeout(next, 2800); // Call next after a short delay
      } else {
        frame++;
        requestAnimationFrame(update);
      }
    };
    update();
  };

  const [counter, setCounter] = useState<number>(0);

  const next = () => {
    updateText();
    setCounter((prevCounter) => (prevCounter + 1) % phrases.length);
  };

  useEffect(() => {
    next();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div
        ref={el}
        className="text-black text-4xl font-bold "
        // style={{ fontFamily: "'Roboto Mono', monospace" }}
      ></div>
    </div>
  );
};

export default TextScramble;
