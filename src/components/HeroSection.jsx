import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Updated image data with correct paths
const images = [
  {
    src: "./image1.jpg",  // Updated to absolute path from public folder
    title: "Civil & Interior Works",
    category: "construction"
  },
  {
    src: "./image7.jpg",
    title: "Turnkey D&B",
    category: "development"
  },
  {
    src: "./image3.jpg",
    title: "General Contracting",
    category: "construction"
  },
  {
    src: "./image8.jpg",
    title: "Civil & Interior Works",
    category: "interior"
  },
  {
    src: "./image9.jpg",
    title: "Turnkey D&B",
    category: "development"
  },
  {
    src: "./image10.jpg",
    title: "General Contracting",
    category: "construction"
  },
  
  {
    src: "./img6.webp",
    title: "General Contracting",
    category: "construction"
  },
  {
    src: "./shop.webp",
    title: "Turnkey D&B",
    category: "commercial"
  },
  {
    src: "./realestate.jpg",
    title: "Civil & Interior Works",
    category: "residential"
  }
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      let loadedCount = 0;
      const totalImages = images.length;
      
      images.forEach((image, index) => {
        const img = new Image();
        img.src = image.src;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${image.src}`);
          setImageErrors(prev => new Set([...prev, index]));
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
        };
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Increased to 5 seconds for better viewing
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section className="mt-10 w-full bg-gray-50 py-20 px-6 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      {/* Text Content - make it slightly smaller to give more space to images */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ opacity }}
        className="flex-1 lg:flex-[0.8]" // Reduced flex ratio
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Discover Your <br />
          <span className="bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent">
            Dream Space
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl">
          Where real estate meets exceptional design. We transform properties into 
          stunning living spaces that reflect your unique style and elevate your 
          lifestyle. Experience the perfect blend of location and luxury.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="px-6 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] hover:from-[#1E5FD8] hover:to-[#7D3AD8] transition-all shadow-md hover:shadow-lg">
            Explore Properties
          </button>
          <button className="px-6 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent border-2 border-[#2A72F8] transition-all">
            Book Consultation
          </button>
        </div>

        <div className="mt-8 flex gap-8 text-gray-600">
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent">500+</p>
            <p className="text-sm">Properties Sold</p>
          </div>
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent">15+</p>
            <p className="text-sm">Years Experience</p>
          </div>
          <div>
            <p className="text-2xl font-bold bg-gradient-to-r from-[#2A72F8] to-[#8F44EC] bg-clip-text text-transparent">98%</p>
            <p className="text-sm">Client Satisfaction</p>
          </div>
        </div>
      </motion.div>

      {/* Image Slideshow */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ scale, opacity }}
        className="flex-1 lg:flex-[1.2] w-full"
      >
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative bg-white">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2A72F8] animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 rounded-full bg-[#5A5EF5] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-[#8F44EC] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium text-sm">Loading gallery...</p>
            </div>
          ) : (
            <>
              {/* Previous Image for smooth transition */}
              <div className="absolute inset-0 z-0">
                {!imageErrors.has((currentImage - 1 + images.length) % images.length) && (
                  <img
                    src={images[(currentImage - 1 + images.length) % images.length].src}
                    alt="Previous"
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.5 }}
                  />
                )}
              </div>

              {/* Main Image */}
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentImage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  
                  {!imageErrors.has(currentImage) ? (
                    <img
                      src={images[currentImage].src}
                      alt={images[currentImage].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.warn(`Failed to load image: ${images[currentImage].src}`);
                        setImageErrors(prev => new Set([...prev, currentImage]));
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
                      <div className="text-center">
                        <p className="text-2xl font-semibold mb-2">Image not available</p>
                        <p className="text-sm opacity-75">{images[currentImage].title}</p>
                      </div>
                    </div>
                  )}

                  {/* Title Display - Simplified for mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute bottom-8 left-0 right-0 z-20 px-4"
                  >
                    <div className="flex flex-col items-center text-center">
                      <p className="text-white/90 text-xs uppercase tracking-wider mb-1 font-medium">
                        {images[currentImage].category}
                      </p>
                      <h3 className="text-white text-base sm:text-lg font-semibold">
                        {images[currentImage].title}
                      </h3>
                    </div>
                  </motion.div>

                  {/* Progress Dots */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === currentImage
                            ? "bg-white w-6 sm:w-8"
                            : "bg-white/50 w-1 hover:bg-white/70"
                        }`}
                        onClick={() => setCurrentImage(index)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls - Made smaller and more minimal */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-sm transition-all"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
