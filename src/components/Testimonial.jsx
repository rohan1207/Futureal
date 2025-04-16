import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi"; // Import the user icon

export default function Testimonial() {
  const feedbacks = [
    {
      stars: 5,
      text: "Got interiors of my new flat done by Futureal. The scope included tiles work, paint, false ceiling, kitchen, wardrobes and storage units. The team managed complete work without any hassle. There was no need to micro manage them.",
      name: "Nitesh",
      city: "Bangalore",
      
    },
    {
      stars: 5,
      text: "Hiring them was the best decision made. They finished the project at unbelievable speed with high precision. Since then we have recommended them to many people.",
      name: "Esha",
      city: "Bangalore",
      
    },
    {
      stars: 5,
      text: "Hired them for turnkey interior of my apartment. They have done an exceptional work.",
      name: "Apoorva",
      city: " Noida",
      
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [feedbacks.length]);

  return (
    <section className="bg-white py-16 text-center px-4 md:px-6 mb-[-30px]">
      <h2 className="text-3xl font-bold text-gradient-to-r from-[#2A72F8] to-[#8F44EC]">Client Testimonials</h2>
      <p className="text-gray-600 mb-8">
        Our clients appreciate our dedicated  services.
      </p>

      {/* Carousel Section */}
      <div className="relative flex justify-center items-center overflow-hidden w-full h-[410px]">
        {feedbacks.map((feedback, index) => {
          const isActive = index === currentIndex;
          const isLeft =
            index === (currentIndex - 1 + feedbacks.length) % feedbacks.length;
          const isRight = index === (currentIndex + 1) % feedbacks.length;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: isActive ? 1 : 0.9,
                scale: isActive ? 1.1 : 0.85,
                zIndex: isActive ? 2 : 1,
                x: isActive ? 0 : isLeft ? -250 : 250,
                y: isActive ? -20 : 20,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className={`absolute bg-white shadow-lg p-6 rounded-lg w-[82%] sm:w-[600px] h-[290px] md:h-[310px] text-left border border-gray-200 ${
                isActive ? "shadow-2xl" : "shadow-md"
              }`}
              style={{
                filter: isActive ? "none" : "blur(2px)",
              }}
            >
              <div className="text-orange-500 text-lg">
                {"★".repeat(feedback.stars)}
              </div>

              {/* Show only 2 lines of text on small screens, full text on large screens */}
              <p className="text-gray-700 italic mt-2 line-clamp-4 lg:line-clamp-none">
                "{feedback.text}"
              </p>

              <div className="flex items-center mt-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                  {feedback.image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={feedback.image}
                    />
                  ) : (
                    <FiUser className="text-gray-500 w-6 h-6" />
                  )}
                </div>

                <div className="ml-3">
                  <p className="text-gray-800 font-semibold">{feedback.name}</p>
                  <p className="text-gray-500 text-sm">{feedback.city}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
