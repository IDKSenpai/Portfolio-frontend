import React, { useState, useEffect } from "react";
import type { CategorySkill, Skill } from "../data";
import api from "../api/axios";
import { Icons } from "../icons/Icon"; // Import your Icons object

const SkillCard: React.FC = () => {
  const [categories, setCategories] = useState<CategorySkill[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, skillsRes] = await Promise.all([
          api.get<CategorySkill[]>("/category-skill"),
          api.get<Skill[]>("/skill-section"),
        ]);
        setCategories(categoriesRes.data);
        setSkills(skillsRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

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
