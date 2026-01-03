import Navbar from "./components/Navbar";
import HomeSection from "./sections/HomeSection";
import AboutMeSection from "./sections/AboutMeSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillSection";
import ProjectSection from "./sections/ProjectSection";
import ContactSection from "./sections/ContactSection";
import { useEffect, useState } from "react";
import { LuCodeXml } from "react-icons/lu";

function App() {
  const [loading, setLoading] = useState(true);
  const texts = "... ...";
  const period = 2000; // pause after typing
  const speed = 150; // typing speed
  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setText(texts.substring(0, text.length - 1));
        } else {
          setText(texts.substring(0, text.length + 1));
        }

        if (!isDeleting && text === texts) {
          setTimeout(() => setIsDeleting(true), period);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [text, texts, isDeleting, loopNum]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center gap-2">
        <LuCodeXml className="text-4xl text-red-500 group-hover:rotate-180 transition-transform duration-500" />
        <p className="my-2 inline-block bg-linear-to-r from-white  to-red-500 bg-clip-text text-transparent text-2xl lg:text-3xl font-semibold h-12">
          Loading Portfolio
          <span>{text}</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <AboutMeSection />
        <EducationSection />
        <SkillsSection />
        <ProjectSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
