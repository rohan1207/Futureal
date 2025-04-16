import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const processSteps = [
  {
    title: "Project Initiation",
    description: "Understanding the client's requirements and project parameters, to proceed with strategising the project",
    icon: HiOutlineLightBulb,
    color: "#4F46E5",
    pathPosition: { x: 100, y: 50 },
    pathTrigger: 100
  },
  {
    title: "Strategy Development",
    description: "We develop a holistic strategy leveraging our extensive experience and market research.",
    sub: "Feasibility >> Market Research >> Project Strategy",
    icon: HiOutlineChartBar,
    color: "#06B6D4",
    pathPosition: { x: 600, y: 175 },
    pathTrigger: 350
  },
  {
    title: "Implementation",
    description: "Implementing all the plans with the assured period and cost. Adhering to all the safety guidelines set by the client.",
    sub: "Construction Management >> Quality Control >> Time Management",
    icon: HiOutlineCog,
    color: "#8B5CF6",
    pathPosition: { x: 100, y: 300 },
    pathTrigger: 600
  },
  {
    title: "Delivery & Beyond",
    description: "Transforming our client's vision into reality by maintaining a perfect balance of cost, time, and quality. We collaborate seamlessly with all stakeholders to ensure every project achieves its full potential and delivers exceptional success.",
    icon: HiOutlineClipboardCheck,
    color: "#EC4899",
    pathPosition: { x: 600, y: 425 },
    pathTrigger: 850
  },
];

const Process = () => {
  const [revealedSteps, setRevealedSteps] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const sectionRef = useRef(null);
  const animationRef = useRef(null);

  // Reset animation function
  const resetAnimation = () => {
    // First fade out the revealed steps
    setRevealedSteps(new Set());
    // Wait a bit for the fade out animation to complete, then reset progress
    setTimeout(() => {
      setProgress(0);
      startAnimation();
    }, 400); // Wait for fade out animation
  };

  // Animation function
  const startAnimation = () => {
    if (!pathRef.current || !isInView) return;

    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    let currentProgress = 0;

    // Clear any existing interval
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    animationRef.current = setInterval(() => {
      if (currentProgress > totalLength) {
        // Reset after 10 seconds delay
        setTimeout(() => {
          resetAnimation();
        }, 10000); // Increased to 10 seconds
        clearInterval(animationRef.current);
        return;
      }

      const point = path.getPointAtLength(currentProgress);
      if (dotRef.current) {
        dotRef.current.setAttribute("cx", point.x);
        dotRef.current.setAttribute("cy", point.y);
      }

      setProgress(currentProgress);

      setRevealedSteps(prevSteps => {
        const newSteps = new Set(prevSteps);
        processSteps.forEach((step, index) => {
          const distance = Math.sqrt(
            Math.pow(point.x - step.pathPosition.x, 2) + 
            Math.pow(point.y - step.pathPosition.y, 2)
          );
          if (distance < 20) {
            newSteps.add(index);
          }
        });
        return newSteps;
      });

      currentProgress += 5; // Slightly slower dot movement
    }, 15);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Start when 30% of the component is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  // Start animation when component comes into view
  useEffect(() => {
    if (isInView) {
      startAnimation();
    } else {
      // Clear animation when out of view
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      setProgress(0);
      setRevealedSteps(new Set());
    }
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden"
    >
      {/* Header Section */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Our Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          We believe in efficiency and transparency. Our proven process ensures successful project delivery while building lasting trust with our clients.
        </motion.p>
      </div>

      {/* Process Visualization */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Desktop View */}
        <div className="hidden md:block">
          <svg
            viewBox="0 0 800 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[800px] mx-auto"
          >
            {/* Background Path */}
            <path
              d="M600 50H100C50 50 50 175 100 175H600C650 175 650 300 600 300H100C50 300 50 425 100 425H600C650 425 650 550 600 550H100C50 550 50 675 100 675H600"
              stroke="#E2E8F0"
              strokeWidth="4"
              fill="none"
            />
            {/* Animated Path */}
            <path
              ref={pathRef}
              d="M600 50H100C50 50 50 175 100 175H600C650 175 650 300 600 300H100C50 300 50 425 100 425H600C650 425 650 550 600 550H100C50 550 50 675 100 675H600"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={pathRef.current ? pathRef.current.getTotalLength() : "0"}
              strokeDashoffset={pathRef.current ? pathRef.current.getTotalLength() - progress : "0"}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Animated Dot */}
            <circle
              ref={dotRef}
              r="8"
              fill="url(#gradient)"
              filter="url(#glow)"
            />

            {/* Process Icons on Path */}
            {processSteps.map((step, index) => (
              <g key={index} transform={`translate(${step.pathPosition.x}, ${step.pathPosition.y})`}>
                <circle
                  r="24"
                  fill="white"
                  className="shadow-lg"
                  style={{
                    opacity: revealedSteps.has(index) ? 1 : 0.3,
                    transform: `scale(${revealedSteps.has(index) ? 1 : 0.8})`,
                    transition: 'all 0.4s ease'
                  }}
                />
                <foreignObject x="-16" y="-16" width="32" height="32">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ 
                      color: step.color,
                      opacity: revealedSteps.has(index) ? 1 : 0.3,
                      transform: `scale(${revealedSteps.has(index) ? 1 : 0.8})`,
                      transition: 'all 0.4s ease'
                    }}
                  >
                    {React.createElement(step.icon, { className: "w-5 h-5" })}
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>

          {/* Process Content */}
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={revealedSteps.has(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.4,
                delay: 0,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute w-72"
              style={{
                left: `${step.pathPosition.x}px`,
                top: `${step.pathPosition.y + 40}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div 
                className="text-center p-4 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(229, 231, 235, 0.5)'
                }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {step.sub && (
                  <p className="text-sm font-medium text-gray-800 mt-2">{step.sub}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div 
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{
                background: 'linear-gradient(to bottom, #4F46E5, #8B5CF6, #EC4899)',
                animation: isInView ? 'expandLine 1s ease-out forwards' : 'none'
              }}
            />
            
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.3,  // Faster animation
                  delay: index * 0.2,  // Quicker sequence
                  ease: "easeOut"
                }}
                className="relative pl-24 pb-12 last:pb-0"
              >
                <div 
                  className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg transform transition-all duration-300 ${
                    isInView ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
                  }`}
                  style={{ 
                    color: step.color,
                    transitionDelay: `${index * 200}ms`  // Match the motion delay
                  }}
                >
                  {React.createElement(step.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  {step.sub && (
                    <p className="text-sm font-medium text-gray-800 mt-2">{step.sub}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process; 