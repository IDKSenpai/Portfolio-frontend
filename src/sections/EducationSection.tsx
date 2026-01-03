import React, { useEffect, useState } from "react";
import { Icons } from "../icons/Icon";
import type { Education } from "../data";
import api from "../api/axios";

const EducationSection: React.FC = () => {
  const [data, setData] = useState<Education[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Education[]>("/education-section");
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="education" className="min-h-screen px-6 md:px-8 lg:px-10">
      <article className="max-w-6xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold inline mb-4 bg-linear-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
            My Education Journey
          </h2>
          <p className="text-gray-400 mt-2 lg:mt-4 text-base lg:text-xl">
            A timeline of my academic achievements
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((edu, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-xl shadow-lg border-2 border-red-600 p-6 hover:shadow-2xl hover:border-red-500 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  {/* <Icon className="text-white text-xl" /> */}
                  {(() => {
                    if (!edu.icon || !(edu.icon in Icons)) return null;

                    const Icon = Icons[edu.icon as keyof typeof Icons];
                    return <Icon className="text-white text-xl" />;
                  })()}
                </div>
                <div>
                  <p className="text-sm text-gray-400">{edu.year}</p>
                  <h3 className="font-bold text-white">{edu.degree}</h3>
                </div>
              </div>
              <p className="text-gray-200 font-medium mb-2">{edu.school}</p>
              <p className="text-gray-400 text-sm">{edu.program}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default EducationSection;
