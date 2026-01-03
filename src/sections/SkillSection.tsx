import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import SkillCard from "../components/SkillCard";

const SkillsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();

      // Watch for scroll events
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);

      // Watch for content size changes
      const resizeObserver = new ResizeObserver(() => {
        checkScrollButtons();
      });
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="skills"
      className="min-h-screen px-6 md:px-8 lg:px-16 md:mb-10"
    >
      <article className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-6xl font-bold inline bg-linear-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent mb-4">
            My Skills
          </h2>
          <p className="text-gray-400 lg:text-lg text-base mt-4">
            Technical expertise and soft skills I bring to the table
          </p>
        </div>

        {/* Skill Level Legend */}
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-white text-sm font-medium">
              Advanced (80-100%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-white text-sm font-medium">
              Intermediate (60-79%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-white text-sm font-medium">
              Basic (0-59%)
            </span>
          </div>
        </div>

        {/* Horizontal Scrolling Skills */}
        <div className="relative flex items-center gap-4">
          {/* Left Scroll Button */}
          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="invisible lg:visible absolute -left-10 cursor-pointer shrink-0 bg-red-600 hover:bg-red-700 text-black p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/50 z-10"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
          )}

          {/* Skills Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory grow"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <SkillCard />
          </div>

          {/* Right Scroll Button */}
          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="invisible lg:visible absolute -right-10 cursor-pointer shrink-0 bg-red-600 hover:bg-red-700 text-black p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/50 z-10"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-2xl" />
            </button>
          )}
        </div>
      </article>
    </section>
  );
};

export default SkillsSection;
