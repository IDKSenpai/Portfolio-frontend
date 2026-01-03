import React, { useState, useEffect } from "react";
// import { FaGithub, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { Icons } from "../icons/Icon";
import type { Project } from "../data/index";
import api from "../api/axios";

const ProjectCard: React.FC = () => {
  const IconCode = Icons.code;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Replace with your actual API URL
      const response = await api.get("/project-section");

      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to determine if URL is a GitHub link
  const isGitHubLink = (url: string): boolean => {
    return url.toLowerCase().includes("github.com");
  };

  // Function to parse tools (handle both JSON string and array)
  const parseTools = (tools: string | string[]): string[] => {
    if (Array.isArray(tools)) {
      return tools;
    }
    try {
      const parsed = JSON.parse(tools);
      return Array.isArray(parsed) ? parsed : [tools];
    } catch {
      return [tools];
    }
  };

  // Function to get link button properties based on URL
  const getLinkProps = (url: string) => {
    const GitIcon = Icons.github;
    const LinkIcon = Icons.link;
    const isGitHub = isGitHubLink(url);
    return {
      icon: isGitHub ? (
        <GitIcon className="text-lg" />
      ) : (
        <LinkIcon className="text-sm" />
      ),
      text: isGitHub ? "GitHub" : "Visit Site",
      isGitHub,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center bg-neutral-900 border-2 border-red-600 rounded-lg p-8 max-w-md">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={fetchProjects}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <p className="text-gray-400 text-lg">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const linkProps = getLinkProps(project.link);
            const toolsArray = parseTools(project.tools);

            return (
              <div
                key={project.id}
                className="bg-neutral-900 rounded-lg border-2 border-red-600 overflow-hidden hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 flex flex-col"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-neutral-800">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback image if image fails to load
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col grow">
                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 grow">
                    <div className="flex items-center gap-2 mb-2">
                      <IconCode className="text-red-600 text-sm" />
                      <span className="text-white text-xs font-semibold">
                        Technologies:
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {toolsArray.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-black border border-red-600 text-red-500 text-xs px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Single Link Button */}
                  <div className="mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${
                        linkProps.isGitHub
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "border-2 border-red-600 hover:bg-red-600 text-white"
                      } font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2`}
                    >
                      {linkProps.icon}
                      <span className="text-sm">{linkProps.text}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
