import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Project Gallery", path: "/projects" }
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center h-[85px]">
        {/* Logo */}
        <div className="flex items-center mr-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Link to="/home">
              <img
                src="/newlogo.png"
                alt="Logo"
                className="h-16 w-auto object-contain md:h-20 transition-all duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white text-base font-medium">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group transition-all duration-300"
            >
              <Link to={item.path} className="text-white hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC]">
                {item.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Contact Us Button */}
        <div className="hidden md:flex ml-auto">
          <Link
            to="/contact"
            className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-white px-5 py-2 rounded-full text-sm font-medium hover:from-[#1E5FD8] hover:to-[#7D3AD8] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 120
            }}
            className="fixed top-0 right-0 w-full h-screen bg-black/95 backdrop-blur-md z-50 md:hidden"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-[#2A72F8] transition-colors"
                  >
                    <X className="rotate-90" />
                  </button>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      className="relative group text-lg font-medium text-white py-3 border-b border-gray-800 transition-all duration-300"
                    >
                      <Link 
                        to={item.path}
                        className="block w-full hover:text-transparent bg-clip-text bg-gradient-to-r from-[#2A72F8] to-[#8F44EC]"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                        <span className="absolute bottom-[-1px] left-0 w-0 h-[2px] bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] group-hover:w-full transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-800">
                <Link
                  to="/contact"
                  className="block w-full bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] text-white py-3 px-6 rounded-lg font-medium hover:from-[#1E5FD8] hover:to-[#7D3AD8] transition-all duration-300 text-center transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;