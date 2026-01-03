import React, { useState, useEffect } from "react";
import type { AboutMe, CategoryAboutMe } from "../data";
import api from "../api/axios";

const AboutMeSection: React.FC = () => {
  const [category, setCategory] = useState<CategoryAboutMe[]>([]);
  const [inf, setInfo] = useState<AboutMe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories, infos] = await Promise.all([
          api.get<CategoryAboutMe[]>("/category-about-me"),
          api.get<AboutMe[]>("/about-me"),
        ]);
        setCategory(categories.data);
        setInfo(infos.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
