import React, { useState } from "react";
import type { AboutMe, CategoryAboutMe } from "../data";

const AboutMeSection: React.FC = () => {
  const [category] = useState<CategoryAboutMe[]>([
    { id: 1, title: '.Career Objective' } as CategoryAboutMe,
    { id: 2, title: '.Interest & Hobbies' } as CategoryAboutMe,
    { id: 3, title: '.Short Biography' } as CategoryAboutMe,
  ]);
  const [inf] = useState<AboutMe[]>([
    { id: 1, category_about_me_id: undefined, description: 'My name is Kech Kheang. I am from Cambodia. I am currently studying information technology and enjoy learning new skills related to computers and software development.' } as AboutMe,
    { id: 2, category_about_me_id: 1, description: 'My career objective is to become a professional software developer. I aim to improve my programming skills and contribute to building useful and efficient applications.' } as AboutMe,
    { id: 3, category_about_me_id: 2, description: '• Technical interests (coding, learning tech)' } as AboutMe,
    { id: 4, category_about_me_id: 2, description: '• Personal hobbies (music, sports, reading, gaming)' } as AboutMe,
    { id: 5, category_about_me_id: 3, description: 'I am a motivated and curious individual with a strong interest in technology. I enjoy learning about software development and computer systems. My goal is to grow my skills and build a successful career in the IT field.' } as AboutMe,
  ]);

  return (
    <>
      <section
        id="about"
        className="flex flex-col mx-6 mt-10 sm:my-0 min-h-screen md:mx-20 "
      >
        <h1 className="inline text-4xl text-center lg:text-6xl md:h-12 h-22 lg:h-22 font-bold bg-linear-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
          My Personal Background
        </h1>

        {}

        <article className="mt-6 grid grid-cols-1 gap-4">
          {inf
            .filter(
              (info) =>
                info.category_about_me_id === null ||
                info.category_about_me_id === undefined
            )
            .map((data) => (
              <p
                key={data.id}
                className="text-gray-400 text-justify leading-relaxed text-base lg:text-xl mt-2"
              >
                {data.description}
              </p>
            ))}

          {/* First, loop through categories and show their descriptions */}
          {category.map((cate) => (
            <div key={cate.id}>
              <h3 className="inline-block w-fit whitespace-nowrap text-sm font-semibold text-red-500 tracking-wider uppercase border mt-4 border-red-500/30 px-4 py-2 rounded bg-red-500/10">
                {cate.title}
              </h3>

              {inf
                .filter((info) => info.category_about_me_id === cate.id)
                .map((data) => (
                  <p
                    key={data.id}
                    className="text-gray-400 text-justify leading-relaxed text-base lg:text-xl mt-2"
                  >
                    {data.description}
                  </p>
                ))}
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default AboutMeSection;
