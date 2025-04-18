import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Eye, Target, Award } from "lucide-react";

export default function WhoAreWe() {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
    "image7.jpg",
  ];

  const cards = [
    {
      icon: <Briefcase className="text-white" size={24} />,
      title: "About Us",
      description:
        "We deliver turnkey solutions for diverse sectors. With global insight and local knowledge, we execute seamless and efficient project delivery.",
    },
    {
      icon: <Eye className="text-white" size={24} />,
      title: "Vision",
      description:
        "To revolutionize turnkey project delivery as a service—blending innovation, precision, and empathy to create exceptional value for our clients.",
    },
    {
      icon: <Target className="text-white" size={24} />,
      title: "Mission",
      description:
        "To deliver seamless, service-driven solutions that create value, optimize returns, and set new benchmarks in quality, innovation, and standards.",
    },
    {
      icon: <Award className="text-white" size={24} />,
      title: "Values",
      description:
        "Excellence, integrity, innovation, and client-centricity guide our approach, ensuring we consistently deliver exceptional results that exceed expectations.",
    },
  ];

  // Image carousel interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mobile card swiper interval
  useEffect(() => {
    const cardInterval = setInterval(() => {
      if (window.innerWidth < 768) {
        setActiveCard((prev) => (prev + 1) % cards.length);
      }
    }, 3000);
    return () => clearInterval(cardInterval);
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-20 overflow-hidden">
      {/* Background image carousel */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImage === index ? 0.5 : 0,
              scale: currentImage === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                filter: "brightness(0.4)",
              }}
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-indigo-900/40 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Who Are We?
          </h2>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
            We specialise in turnkey solutions for healthcare, industrial,
            hospitality, office spaces and educational sectors. Leveraging our
            global experience and local expertise, we bring your vision to life
            seamlessly and efficiently.
          </p>
        </motion.div>

        {/* Desktop layout (2x2 grid) */}
        <div className="mt-16 hidden md:grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:bg-white hover:scale-105 transition-all duration-300"
            >
              <div className="w-14 h-14 mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile swiper layout */}
        <div className="mt-12 md:hidden relative">
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeCard * 100}%)` }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="min-w-full px-2"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-6 gap-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeCard === index ? "bg-white scale-125" : "bg-white/40"
                }`}
                aria-label={`View card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Image progress indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentImage === index ? "bg-white scale-125" : "bg-white/40"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
