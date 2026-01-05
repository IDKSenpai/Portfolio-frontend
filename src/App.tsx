import Navbar from "./components/Navbar";
import HomeSection from "./sections/HomeSection";
import AboutMeSection from "./sections/AboutMeSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillSection";
import ProjectSection from "./sections/ProjectSection";
import ContactSection from "./sections/ContactSection";

function App() {
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
