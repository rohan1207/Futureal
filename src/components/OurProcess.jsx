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
    desktopPosition: {
      left: "5%",
      iconTop: "0",
      contentTop: "80px",
    },
    mobilePosition: {
      top: "-15px",
      iconLeft: "calc(78% - 40px)",
      contentPosition: {
        top: "26px",
        left: "calc(36% + 60px)",
        textAlign: "right",
        width: "372px",
      },
    },
    pathTrigger: 150
  },
  {
    title: "Strategy Development",
    description:
      "We develop a holistic strategy leveraging our extensive experience and market research.",
    sub: "Feasibility >> Market Research >> Project Strategy",
    icon: HiOutlineChartBar,
    desktopPosition: {
      left: "35%",
      iconTop: "0",
      contentTop: "-120px",
    },
    mobilePosition: {
      top: "110px",
      iconLeft: "calc(28% - 40px)",
      contentPosition: {
        top: "155px",
        right: "calc(33% + 60px)",
        textAlign: "left",
        width: "343px",
      },
    },
    pathTrigger: 400
  },
  {
    title: "Implementation",
    description:
      "Implementing all the plans with the assured period and cost. Adhering to all the safety guidelines set by the client.",
    sub: "Construction Management >> Quality Control >> Time Management",
    icon: HiOutlineCube,
    desktopPosition: {
      left: "65%",
      iconTop: "0",
      contentTop: "80px",
    },
    mobilePosition: {
      top: "222px",
      iconLeft: "calc(78% - 40px)",
      contentPosition: {
        top: "272px",
        right: "calc(-3% + 60px)",
        textAlign: "left",
        width: "403px",
      },
    },
    pathTrigger: 650
  },
  {
    title: "Delivery & Beyond",
    description:
      "Transforming our client's vision into reality by maintaining a perfect balance of cost, time, and quality. We collaborate seamlessly with all stakeholders to ensure every project achieves its full potential and delivers exceptional success.",
    icon: HiOutlineClipboardCheck,
    desktopPosition: {
      left: "95%",
      iconTop: "0",
      contentTop: "-120px",
    },
    mobilePosition: {
      top: "352px",
      iconLeft: "calc(28% - 40px)",
      contentPosition: {
        top: "401px",
        left: "calc(27% + 60px)",
        textAlign: "left",
        width: "447px",
      },
    },
    pathTrigger: 900
  },
];

const OurProcess = () => {
  const [activeSteps, setActiveSteps] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    let currentProgress = 0;

    const interval = setInterval(() => {
      if (currentProgress > totalLength) {
        clearInterval(interval);
        return;
      }

      const point = path.getPointAtLength(currentProgress);
      if (dotRef.current) {
        dotRef.current.setAttribute("cx", point.x);
        dotRef.current.setAttribute("cy", point.y);
      }

      setProgress(currentProgress);

      const newActiveSteps = new Set(activeSteps);
      steps.forEach((step, index) => {
        if (currentProgress >= step.pathTrigger) {
          newActiveSteps.add(index);
        }
      });
      setActiveSteps(newActiveSteps);

      currentProgress += 20;
    }, 15);

    return () => clearInterval(interval);
  }, []);

  const desktopPath = "M40 50 H560";
  const mobilePath = "M600 50H100C50 50 50 175 100 175H600C650 175 650 300 600 300H100C50 300 50 425 100 425H600C650 425 650 550 600 550H100C50 550 50 675 100 675H600";

  return (
    <div className="relative bg-[#EFF0F5] px-6 py-20 text-[#4B4F65] font-[Inter] min-h-[800px] md:min-h-[400px] overflow-hidden">
      {/* SVG Path with Glowing Dot */}
      <svg
        viewBox={isMobile ? "0 0 800 700" : "0 0 600 100"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-full z-0"
      >
        {/* Gray background path */}
        <path
          d={isMobile ? mobilePath : desktopPath}
          stroke="#E2E8F0"
          strokeWidth="4"
          fill="none"
        />
        {/* Animated blue path */}
        <path
          ref={pathRef}
          d={isMobile ? mobilePath : desktopPath}
          stroke="#007BFF"
          strokeWidth="4"
          fill="none"
          strokeDasharray={pathRef.current ? pathRef.current.getTotalLength() : "0"}
          strokeDashoffset={pathRef.current ? pathRef.current.getTotalLength() - progress : "0"}
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        {/* Glowing dot */}
        <circle
          ref={dotRef}
          r="8"
          fill="#007BFF"
          filter="url(#glow)"
        />
        {/* Enhanced glow filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feFlood floodColor="#007BFF" floodOpacity="0.3" result="glowColor"/>
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index}>
            {/* Icon on Line */}
            <div
              className={`absolute z-10 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center text-[#4B4F65] transition-all duration-500 ${
                activeSteps.has(index) ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
              }`}
              style={isMobile ? {
                top: step.mobilePosition.top,
                left: step.mobilePosition.iconLeft,
              } : {
                top: step.desktopPosition.iconTop,
                left: step.desktopPosition.left,
                transform: 'translateX(-50%)',
              }}
            >
              {React.createElement(step.icon, { 
                className: `w-10 h-10 transition-colors duration-500 ${
                  activeSteps.has(index) ? 'text-[#007BFF]' : 'text-gray-400'
                }` 
              })}
            </div>

            {/* Text Content */}
            <div
              className={`absolute transition-all duration-500 ${
                activeSteps.has(index)
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform -translate-y-4'
              }`}
              style={isMobile ? {
                ...step.mobilePosition.contentPosition,
              } : {
                top: step.desktopPosition.contentTop,
                left: step.desktopPosition.left,
                transform: 'translateX(-50%)',
                width: '300px',
                textAlign: 'center',
              }}
            >
              <div className="px-4">
                <h3 className="text-lg font-semibold text-[#2B2B3A] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm mb-1">{step.description}</p>
                {step.sub && (
                  <p className="text-sm font-semibold text-[#2B2B3A] mt-1">
                    {step.sub}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProcess;