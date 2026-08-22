import React, { useState } from "react";
import type { CategorySkill, Skill } from "../data";
import { Icons } from "../icons/Icon"; // Import your Icons object

const SkillCard: React.FC = () => {
  const [categories] = useState<CategorySkill[]>([
    { id: 1, title: 'languages' } as CategorySkill,
    { id: 2, title: 'frameworks' } as CategorySkill,
    { id: 3, title: 'libraries' } as CategorySkill,
    { id: 4, title: 'databases' } as CategorySkill,
    { id: 5, title: 'softSkills' } as CategorySkill,
  ]);
  const [skills] = useState<Skill[]>([
    { id: 1, title_id: 1, name: "HTML", percentage: 90, level: "Advanced", icon: 'Html5', color: "#E34F26" } as Skill,
    { id: 2, title_id: 1, name: "CSS", percentage: 70, level: "Intermediate", icon: 'css3', color: "#1572B6" } as Skill,
    { id: 3, title_id: 1, name: "JavaScript", percentage: 70, level: "Intermediate", icon: 'javascript', color: "#F7DF1E" } as Skill,
    { id: 4, title_id: 1, name: "TypeScript", percentage: 50, level: "Basic", icon: 'typescript', color: "#3178C6" } as Skill,
    { id: 5, title_id: 1, name: "PHP", percentage: 80, level: "Advanced", icon: 'Php', color: "#777BB4" } as Skill,
    { id: 6, title_id: 1, name: "Python", percentage: 50, level: "Basic", icon: 'Python', color: "#3776AB" } as Skill,
    { id: 7, title_id: 1, name: "Java", percentage: 50, level: "Basic", icon: 'Java', color: "#007396" } as Skill,
    { id: 8, title_id: 2, name: "Laravel", percentage: 80, level: "Advanced", icon: 'Laravel', color: "#FF2D20" } as Skill,
    { id: 9, title_id: 2, name: "Tailwind CSS", percentage: 70, level: "Intermediate", icon: 'tailwindcss', color: "#06B6D4" } as Skill,
    { id: 10, title_id: 2, name: "Bootstrap", percentage: 50, level: "Basic", icon: 'Bootstrap', color: "#7952B3" } as Skill,
    { id: 11, title_id: 3, name: "React", percentage: 50, level: "Basic", icon: 'React', color: "#61DAFB" } as Skill,
    { id: 12, title_id: 4, name: "MySQL", percentage: 70, level: "Intermediate", icon: 'mysql', color: "#4479A1" } as Skill,
    { id: 13, title_id: 4, name: "MS SQL Server", percentage: 70, level: "Intermediate", icon: 'sqlserver', color: "#ffff" } as Skill,
    { id: 14, title_id: 4, name: "Git", percentage: 60, level: "Intermediate", icon: 'git', color: "#F05032" } as Skill,
    { id: 15, title_id: 5, name: "Communication", percentage: 90, level: "Advanced", icon: 'comment', color: "#10B981" } as Skill,
    { id: 16, title_id: 5, name: "Teamwork", percentage: 85, level: "Advanced", icon: 'User', color: "#3B82F6" } as Skill,
    { id: 17, title_id: 5, name: "Problem Solving", percentage: 88, level: "Advanced", icon: 'problemSolving', color: "#F59E0B" } as Skill,
    { id: 18, title_id: 5, name: "Time Management", percentage: 75, level: "Intermediate", icon: 'Clock', color: "#8B5CF6" } as Skill,
    { id: 19, title_id: 5, name: "Project Management", percentage: 70, level: "Intermediate", icon: 'Task', color: "#EC4899" } as Skill,
  ]);


  const getProgressColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-red-600";
      case "Intermediate":
        return "bg-red-500";
      case "Basic":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  // Helper function to get skills for a category
  const getSkillsForCategory = (categoryId: number | string) => {
    return skills.filter((skill) => skill.title_id === categoryId);
  };

  return (
    <>
      {categories.map((category, categoryIndex) => (
        <div
          key={category.id || categoryIndex}
          className="shrink-0 w-fit sm:w-100 bg-neutral-900 border-2 border-red-600 rounded-lg p-6 snap-start"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {category.title}
            </h3>
            <div className="w-24 h-1 bg-red-600"></div>
          </div>
          <div>
            {category.id !== undefined &&
              getSkillsForCategory(category.id).map((skill, skillIndex) => {
                // Map icon string to actual icon component
                const iconKey = skill.icon?.toLowerCase();
                const Icon =
                  iconKey && Icons[iconKey as keyof typeof Icons]
                    ? Icons[iconKey as keyof typeof Icons]
                    : () => <span>🔧</span>;

                return (
                  <div
                    key={skill.id || skillIndex}
                    className="flex items-center justify-between py-3 border-b border-red-600/30 hover:border-red-600 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className="text-xl shrink-0"
                        style={{ color: skill.color }}
                      />
                      <span className="text-white text-sm lg:text-base font-medium whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="w-24 bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        {skill.level && (
                          <div
                            className={`h-full ${getProgressColor(
                              skill.level
                            )} transition-all duration-500`}
                            style={{ width: `${skill.percentage}%` }}
                          />
                        )}
                      </div>
                      <span className="text-gray-400 text-sm w-10 text-right">
                        {skill.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </>
  );
};

export default SkillCard;
