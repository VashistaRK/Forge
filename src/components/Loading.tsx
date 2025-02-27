import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const messages = [
  "Success is where preparation and opportunity meet. – Bobby Unser",
  "Keep your resume concise and relevant—one page is ideal!",
  "Recruiters spend an average of 6 seconds scanning a resume!",
  "Use action words like 'developed,' 'led,' and 'achieved' to stand out.",
  "A well-optimized resume can increase interview chances by 40%!",
  "Your resume is your first impression—make it count!",
  "Dream big, work hard, stay focused!",
  "Opportunities don’t happen. You create them. – Chris Grosser",
  "Every job application is a new opportunity. Stay positive!",
  "Customize your resume for each job application for better results!",
  "Highlight skills that match the job description to beat ATS systems.",
  "Use a clean, professional font like Arial or Calibri.",
  "Adding numbers to your resume (like 'Increased sales by 30%') boosts credibility.",
  "Over 75% of resumes are never seen by human recruiters due to ATS filtering!",
  "The first resume was written by Leonardo da Vinci in 1482!",
];

const NUM_STARS = 5; // Number of stars

const Loading = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  /* ✨ Multiple Shining Stars Animation */
  const generateStars = () => {
    return Array.from({ length: NUM_STARS }).map((_, index) => {
      const startX = Math.random() * 100; // Random horizontal start position (0% - 100%)
      const duration = 1.5 + Math.random() * 1; // Random duration (1.5s - 2.5s)

      return (
        <motion.div
          key={index}
          className="absolute text-white text-6xl"
          initial={{ top: "-5%", left: `${startX}%`, opacity: 1, scale: 0.5 }}
          animate={{
            top: "85%",
            left: "50%",
            opacity: [1, 1, 0], // Gradually disappears
            scale: [1, 1.2, 0], // Grows slightly before vanishing
          }}
          transition={{ duration, ease: "easeInOut", delay: index * 0.3 }} // Staggered effect
        >
          ❆
        </motion.div>
      );
    });
  };
  /*Shining Stars till here */

  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-violet-100 via-purple-200 to-violet-100 text-gray-900 overflow-hidden">
      {/* Logo and Dots Animation */}
      <div className="flex items-center space-x-2 text-xl font-semibold">
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="logo"
          className="sm:h-50 sm:w-auto w-full h-auto"
        />
        {[0.2, 0.4, 0.6].map((delay, index) => (
          <motion.span
            key={index}
            className="text-violet-500"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              delay,
            }}
          >
            .
          </motion.span>
        ))}
      </div>

      {/* Spinning Loader */}
      <motion.div
        className="h-16 w-16 border-t-4 border-violet-500 rounded-full shadow-lg mt-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Random Loading Message */}
      <motion.span
        className="absolute bottom-10 text-lg font-semibold text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {message}
      </motion.span>

      {/* ✨ Multiple Shining Stars Animation */}
      {generateStars()}
    </div>
  );
};

export default Loading;
