import React, { useEffect, useState } from "react";
import { LuCodeXml } from "react-icons/lu";
import { RiTelegram2Fill } from "react-icons/ri";
import api from "../api/axios";
import { type Home } from "../data";

const HomeSection: React.FC = () => {
  const [data, setData] = useState<Home | null>(null);

  // Hardcoded phrases
  const texts = "-Stack Developer";
  const period = 2000; // pause after typing
  const speed = 150; // typing speed

  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Home>("/home-section");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching home section data:", error);
      }
    };

    fetchData();
  }, []);

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

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="home"
      className="grid grid-cols-1 mb-20 sm:mb-0 sm:flex justify-center items-center min-h-screen mx-6 sm:mx-20  gap-20 sm:gap-30"
    >
      <article className="order-2 sm:order-1">
        <p className="text-sm inline font-semibold text-red-500 tracking-wider uppercase border border-red-500/30 px-4 py-2 rounded-full bg-red-500/10">
          {data?.welcome_message?.trim() ?? "Welcome to my portfolio"}
        </p>
        <br />
        <br />
        <h1 className="text-5xl lg:text-7xl font-bold">
          <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {data?.greeting?.trim() ?? "Hi, I'm"}{" "}
          </span>
          <span className="bg-linear-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
            {data?.name?.trim() ?? "Kheang"}
          </span>
        </h1>
        <br />
        <h2 className=" my-2 inline-block bg-linear-to-r from-white  to-red-500 bg-clip-text text-transparent text-2xl lg:text-3xl font-semibold h-12">
          Full
          <span className="typing-text">{text}</span>
          <span className="cursor text-gray-400 font-medium">
            {showCursor ? "|" : "\u00A0"}
          </span>
        </h2>

        <p className="text-gray-400 leading-relaxed max-w-xl text-lg lg:text-xl">
          {data?.short_introduction ??
            "Passionate about building modern, responsive, and user-friendly web applications. I transform ideas into practical and interactive digital solutions with seamless experiences."}
        </p>

        <div className="md:grid flex lg:flex items-center justify-center sm:justify-start gap-4 mt-6">
          <a href="#projects" className="sweep-btn">
            <LuCodeXml className="text-base" />
            <span className="ml-1">View Projects</span>
          </a>

          <a href="#contact" className="contact-btn">
            <RiTelegram2Fill className="icon" />
            <span>Contact Me</span>
          </a>
        </div>
      </article>

      <article className="relative flex justify-center animate-fade-in-delay order-1 mt-30 sm:mt-0 sm:order-2">
        <div className="relative group">
          {/* Glowing rings */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-red-500/20 to-purple-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border-2 border-purple-500/20 animate-spin-slow-reverse" />

          {/* Profile image */}
          <div className="relative w-50 h-50 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_80px_rgba(239,68,68,0.5)] transition-all duration-500">
            <div className="w-full h-full bg-linear-to-br from-red-900/20 to-purple-900/20" />
            <div className={`absolute inset-0 bg-cover bg-center`}>
              <img src={data?.profile_image} alt="profile" />
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-bounce-slow" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-bounce-slow delay-500" />
        </div>
      </article>
    </section>
  );
};

export default HomeSection;
