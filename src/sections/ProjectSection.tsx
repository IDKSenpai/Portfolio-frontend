import React, { useState, useEffect, useRef } from "react";
import { Icons } from "../icons/Icon";
import ProjectCard from "../components/ProjectCard";
import type { ContactInformation } from "../data/index";
import api from "../api/axios";

const ProjectsSection: React.FC = () => {
  const IconChevronRight = Icons.chevronRight;
  const IconChevronLeft = Icons.chevronLeft;
  const IconGithub = Icons.github;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [contactInfo, setContactInfo] = useState<ContactInformation | null>(
    null
  );

  useEffect(() => {
    const fetchContactInformation = async () => {
      try {
        // Replace with your actual API URL
        const response = await api.get("information-section");
        // Assuming the API returns an array, take the first item
        setContactInfo(response.data);
      } catch (err) {
        console.error("Error fetching contact information:", err);
      }
    };
    fetchContactInformation();
  }, []);

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
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
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
    <section id="projects" className="min-h-screen px-6 md:px-8 lg:px-16 mb-10">
      <article className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-6xl font-bold inline mb-4 bg-linear-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-gray-400 text-lg mt-4">
            A showcase of my recent work and accomplishments
          </p>
        </div>

        {/* Horizontal Scrolling Projects with Side Buttons */}
        <div className="relative flex items-center gap-4">
          {/* Left Scroll Button */}
          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="invisible  lg:visible shrink-0 cursor-pointer absolute -left-8 bg-red-600 hover:bg-red-700 text-black p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/50 z-10"
              aria-label="Scroll left"
            >
              <IconChevronLeft className="text-2xl" />
            </button>
          )}

          {/* Projects Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <ProjectCard />
          </div>
          {/* Right Scroll Button */}
          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="invisible  lg:visible shrink-0 absolute -right-8 cursor-pointer bg-red-600 hover:bg-red-700 text-black p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-red-600/50 z-10"
              aria-label="Scroll right"
            >
              <IconChevronRight className="text-2xl" />
            </button>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-4 text-center">
          <div className="bg-neutral-900 border-2 border-red-600 rounded-lg p-8 inline-block">
            <h3 className="text-white text-2xl font-bold mb-4">
              Want to see more?
            </h3>
            <p className="text-gray-400 mb-6">
              Check out my GitHub for more projects and contributions
            </p>
            <a
              href={contactInfo?.github_acc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              <IconGithub className="text-2xl" />
              <span>Visit My GitHub</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProjectsSection;
