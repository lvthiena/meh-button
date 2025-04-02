import React, { useState } from "react";
import { motion } from "framer-motion";
import generateRandomItem from "./MehButton"; // Giphy and text generation function

export default function App() {
  const [item, setItem] = useState(null); // Content: GIF or text
  const [clicks, setClicks] = useState(0); // Click counter
  const [showWave, setShowWave] = useState(false); // Surf animation state

  // Handle button click
  const handleClick = async () => {
    setClicks(prev => prev + 1); // Increment the click count
    const newItem = await generateRandomItem(); // Fetch a new item
    setItem(newItem); // Set new content in state

    // Show surf animation on every 10th click
    if ((clicks + 1) % 10 === 0) {
      setShowWave(true);
      setTimeout(() => setShowWave(false), 2000); // Hide wave after 2 seconds
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-black font-mono p-4 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold text-center mb-6 border border-black bg-white px-4 py-2 shadow-lg"
      >
        Sıkıldın mı? Harika! Bu buton senin için.
      </motion.h1>

      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.95, rotate: [-1, 1, -2, 0] }}
        transition={{ duration: 0.2 }}
        className="bg-white text-black border border-black px-6 py-2 text-lg font-bold shadow-md hover:bg-gray-200 cursor-pointer glitch"
      >
        ¯\\\\_(ツ)_/¯
      </motion.button>

      {/* Display new content */}
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8 w-full max-w-md border border-black bg-white shadow-xl"
        >
          <div className="bg-gray-300 text-left px-2 py-1 font-semibold text-sm border-b border-black flex justify-between items-center">
            <span>meh.exe</span>
            <span className="space-x-1">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            </span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center">
            {item.type === "gif" ? (
              <img src={item.content} alt="Mood GIF" className="rounded border border-black" />
            ) : (
              <p className="text-base text-center italic">{item.content}</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Show surf animation after the 10th click */}
      {showWave && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300 bg-opacity-70 flex items-center justify-center text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          🌊 Sörf Zamanı! Wuhuuu!
        </motion.div>
      )}

      <div className="mt-12 opacity-30 text-sm italic">Tekrar basma. Ya da bas. Ne fark eder?</div>
    </div>
  );
}
