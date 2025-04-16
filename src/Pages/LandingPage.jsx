import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation and data handling here
    navigate('/home');
  };

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
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md mx-auto"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold text-white mb-6 text-center"
                >
                  Let's Design Your Dream
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#2A72F8] transition-all"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#2A72F8] transition-all"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#2A72F8] transition-all"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <input
                      type="text"
                      placeholder="Company (Optional)"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#2A72F8] transition-all"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <button
                      type="submit"
                      className="w-full mt-6 bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Let's Begin
                    </button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
