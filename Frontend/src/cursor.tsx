import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/*eslint-disable */

export default function GooeyCursor() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      setTrail((prevTrail) => {
        const newTrail = [...prevTrail];
        newTrail.pop();
        newTrail.unshift({ x: e.clientX, y: e.clientY });
        return newTrail;
      });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute invisible">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      {/* Gooey Cursor Circles */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none ">
        {trail.map((pos, index) => (
          <motion.div
            key={index}
            className="absolute bg-violet-700 rounded-full mix-blend-difference"
            style={{
              width: `${10 + index * 10}px`,
              height: `${10 + index * 10}px`,
              filter: "url(#goo)",
            }}
            animate={{
              x: pos.x - (10 + index * 5),
              y: pos.y - (10 + index * 5),
            }}
            transition={{
              type: "spring",
              stiffness: 100 - index * 20,
              damping: 10 + index * 5,
            }}
          />
        ))}
      </div>
    </>
  );
}
