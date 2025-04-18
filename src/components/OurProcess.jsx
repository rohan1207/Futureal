import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineCube,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

const steps = [
  {
    title: "Project Initiation",
    description:
      "Understanding the client's requirements and project parameters, to proceed with strategising the project",
    icon: HiOutlineCog,
    iconBg: "#E6F7FF",
    iconColor: "#0089FF",
  },
  {
    title: "Strategy Development",
    description:
      "We develop a holistic strategy leveraging our extensive experience and market research.",
    sub: "Feasibility >> Market Research >> Project Strategy",
    icon: HiOutlineChartBar,
    iconBg: "#E6F7FF",
    iconColor: "#0089FF",
  },
  {
    title: "Implementation",
    description:
      "Implementing all the plans with the assured period and cost. Adhering to all the safety guidelines set by the client.",
    sub: "Construction Management >> Quality Control >> Time Management",
    icon: HiOutlineCube,
    iconBg: "#E6F7FF",
    iconColor: "#0089FF",
  },
  {
    title: "Delivery & Beyond",
    description:
      "Transforming our client's vision into reality by maintaining a perfect balance of cost, time, and quality. We collaborate seamlessly with all stakeholders to ensure every project achieves its full potential and delivers exceptional success.",
    icon: HiOutlineClipboardCheck,
    iconBg: "#E6F7FF",
    iconColor: "#0089FF",
  },
];

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(null);
  const processRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const stepRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    stepRefs.current = Array(steps.length)
      .fill()
      .map((_, i) => stepRefs.current[i] || React.createRef());
  }, []);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection observer for triggering animation when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (processRef.current) {
      observer.observe(processRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Auto-advance steps with a delay
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Handle manual step selection
  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div
      ref={processRef}
      className="relative bg-[#EFF0F5] px-4 md:px-6 py-16 md:py-20 text-[#4B4F65] font-[Inter] min-h-[600px] overflow-hidden"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B3A] mb-4">Our Process</h2>
        <p className="text-lg max-w-2xl mx-auto">
          We follow a structured approach to deliver exceptional results for every project
        </p>
      </div>

      {/* Desktop & Tablet View */}
      <div className={`hidden md:block max-w-6xl mx-auto relative ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${((activeStep + 1) / steps.length) * 100}%`,
              boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)'
            }}
          ></div>
        </div>

        {/* Process Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => stepRefs.current[index] = el}
              className={`relative flex flex-col items-center w-1/4 transition-all duration-500 ${
                index > activeStep ? 'opacity-40' : 'opacity-100'
              }`}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
              onClick={() => handleStepClick(index)}
            >
              {/* Step Number */}
              <div className="absolute top-0 -left-2 text-xs font-bold bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center">
                {index + 1}
              </div>

              {/* Step Icon */}
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10 cursor-pointer transition-all duration-500 ${
                  index <= activeStep
                    ? 'bg-white shadow-lg transform scale-100'
                    : 'bg-gray-100 transform scale-90'
                } ${isHovering === index ? 'transform scale-110' : ''}`}
                style={{
                  backgroundColor: index <= activeStep ? step.iconBg : '#E2E8F0',
                  boxShadow: index <= activeStep ? '0 10px 25px rgba(0, 137, 255, 0.15)' : 'none',
                }}
              >
                {React.createElement(step.icon, {
                  className: `w-8 h-8 md:w-10 md:h-10 transition-colors duration-500 ${
                    index <= activeStep ? 'text-blue-500' : 'text-gray-400'
                  }`,
                })}
              </div>

              {/* Step Content */}
              <div
                className={`mt-6 px-2 md:px-4 pt-4 pb-6 bg-white rounded-lg shadow-md transition-all duration-500 max-w-xs mx-auto ${
                  index <= activeStep
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-4'
                } ${
                  isHovering === index ? 'transform scale-105 shadow-lg z-20' : ''
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  borderLeft: index <= activeStep ? '3px solid #0089FF' : 'none',
                }}
              >
                <h3 className="text-lg font-semibold text-[#2B2B3A] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm mb-1 text-[#4B4F65]">{step.description}</p>
                {step.sub && (
                  <p className="text-sm font-medium text-blue-600 mt-2">
                    {step.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className={`md:hidden ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <div className="relative">
          {/* Vertical Connection Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 rounded-full">
            <div 
              className="w-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
              style={{ 
                height: `${((activeStep + 1) / steps.length) * 100}%`,
                boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)'
              }}
            ></div>
          </div>

          {/* Process Steps */}
          {steps.map((step, index) => (
            <div
              key={index}
              ref={el => stepRefs.current[index] = el}
              className={`relative flex mb-12 transition-all duration-500 ${
                index > activeStep ? 'opacity-40' : 'opacity-100'
              }`}
              onClick={() => handleStepClick(index)}
            >
              {/* Step Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 cursor-pointer transition-all duration-500 mr-5 ${
                  index <= activeStep
                    ? 'bg-white shadow-lg transform scale-100'
                    : 'bg-gray-100 transform scale-90'
                }`}
                style={{
                  backgroundColor: index <= activeStep ? step.iconBg : '#E2E8F0',
                  boxShadow: index <= activeStep ? '0 10px 25px rgba(0, 137, 255, 0.15)' : 'none',
                }}
              >
                {React.createElement(step.icon, {
                  className: `w-6 h-6 transition-colors duration-500 ${
                    index <= activeStep ? 'text-blue-500' : 'text-gray-400'
                  }`,
                })}
              </div>

              {/* Step Content */}
              <div
                className={`flex-1 transition-all duration-500 ${
                  index <= activeStep
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <h3 className="text-lg font-semibold text-[#2B2B3A] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm mb-1 text-[#4B4F65]">{step.description}</p>
                {step.sub && (
                  <p className="text-sm font-medium text-blue-600 mt-2">
                    {step.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators / Navigation */}
      <div className="flex justify-center mt-10 space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= activeStep ? 'bg-blue-500 w-6' : 'bg-gray-300'
            }`}
            onClick={() => handleStepClick(index)}
            aria-label={`Go to step ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default OurProcess;