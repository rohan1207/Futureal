import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home after animations complete (3 seconds)
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('./bg.jpg')",
          filter: "brightness(0.7)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"/>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] rounded-full blur-2xl opacity-30 animate-pulse" />
              <img
                src="./footer_logo.png"
                alt="Logo"
                className="mx-auto h-40 w-40 md:h-48 md:w-48 object-contain relative z-10 drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.3,
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent">
                Transforming Spaces
              </span>
              <br />
              <span className="text-white">with Art & Elegance</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.5,
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Creating timeless interiors that reflect your unique style and personality
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
