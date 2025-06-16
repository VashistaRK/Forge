import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  Droplet,
  Layout,
  LayoutGrid,
  Search,
  Zap,
  Network,
  Rocket,
  Briefcase,
} from "lucide-react";
import { resumeTemplates } from "../data/resumeTemplates";
import ButtonGroup from "../components/ButtonsGP";
import ContactPage from "../components/ContactPage";
import HeroSection from "../components/HeroSection";
import TextScramble from "@/components/Builder";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const myPhrases = ["Free & Best Resume Templates to Download and Edit"];

const RESUME_FEATURES = [
  {
    icon: <CheckCircle className="w-8 h-8 text-violet-500" />,
    title: "ATS-friendly professionally designed resumes",
  },
  {
    icon: <Droplet className="w-8 h-8 text-violet-500" />,
    title: "Change the font, color and background combinations",
  },
  {
    icon: <LayoutGrid className="w-8 h-8 text-violet-500" />,
    title: "Two-column, single-column, and multi-page layouts",
  },
  {
    icon: <Layout className="w-8 h-8 text-violet-500" />,
    title: "Expertly crafted templates that help you make a lasting impression",
  },
  {
    icon: <Zap className="w-8 h-8 text-violet-500" />,
    title: "Simple to edit in Microsoft Word with clear instructions",
  },
  {
    icon: <Search className="w-8 h-8 text-violet-500" />,
    title: "Keyword-Optimized Resumes for Higher ATS Scores",
  },
];

const ATS_FEATURES = [
  {
    icon: <Briefcase className="w-10 h-10 text-purple-600" />,
    title: "Company-specific resumes",
  },
  {
    icon: <Network className="w-10 h-10 text-purple-600" />,
    title: "Full experience section parsing",
  },
  {
    icon: <Rocket className="w-10 h-10 text-purple-600" />,
    title: "Optimized skills section",
  },
];

const ResumeLandingPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(secRef, { once: false, margin: "-100px" });
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Resumes");
  };

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (label: string) => {
    toast(`Click on Resumes to navigate: ${label}`);
  };

  const featuredTemplates = resumeTemplates.filter(
    (template) => template.featured
  );

  return (
    <>
      <HeroSection />
      <ButtonGroup
        onExpertClick={scrollToSection}
        onCategoryClick={handleCategoryClick}
      />

      {/* Resume Templates Section */}
      <div
        ref={sectionRef}
        id="targetSectionRef"
        className="flex justify-center items-center xl:px-18 flex-col"
      >
        <div className="flex mt-10 text-center text-3xl max-w-260 font-bold font-mine2 text-gray-800 md:text-6xl">
          <TextScramble phrases={myPhrases} />
        </div>

        <div className="w-full mt-10 p-6 rounded-3xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border border-gray-200 shadow-lg">
          <header className="flex items-center gap-4 mb-6">
            <div className="bg-white p-3 rounded-full shadow-md">
              <span
                className="text-green-500 text-3xl"
                role="img"
                aria-label="crown"
              >
                👑
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Expert's Choice Resume Templates
            </h2>
          </header>

          <p className="text-gray-600 mb-8">
            Looking for a resume template that can help you get more interviews?
            These were picked by certified resume writers as top options in
            today's job market.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            {featuredTemplates.map((template, index) => (
              <article
                key={`${template.name}-${index}`}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full md:h-120 group h-auto">
                  <img
                    src={template.image}
                    alt={`${template.name} resume template preview`}
                    className="md:w-full md:h-120 h-auto w-auto object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {template.name}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Features */}
      <section className="flex flex-col justify-center mt-18 items-center bg-gray-100 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-600 mb-16">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#818cf8] to-[#7e22ce] text-transparent bg-clip-text">
            ResumeForge
          </span>
          ?
        </h2>
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          {RESUME_FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              {feature.icon}
              <p className="text-gray-700 text-[16px] md:text-lg font-medium">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex text-center items-center justify-center">
          <button
            // onClick={handleCategoryClick()}
            onClick={handleNavigate}
            className="text-purple-600 mt-10 text-lg font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded"
          >
            Browse All Resume Templates →
          </button>
        </div>
      </section>

      {/* ATS Optimized Section */}
      <section
        ref={secRef}
        className="relative bg-gradient-to-b from-[#3a285e] via-[#4b1d60] to-[#732c78] shadow-lg shadow-purple-900/50 text-white py-16 px-6"
      >
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-4xl text-center lg:text-left xl:ml-25">
            <h1 className="text-4xl md:text-5xl font-extrabold font-mine2 mb-4 text-[#D6CFFF]">
              Future Scope
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Resumes optimized based on job description (ATS)
            </h2>
            <p className="text-lg mb-6">
              Our platform aims to dynamically generate ATS-optimized resumes by
              letting users input job descriptions. We're scaling this vision
              with more intelligent tools and features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-10 lg:mt-0 xl:mr-10">
            {ATS_FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg"
              >
                <div className="bg-white p-3 rounded-md">{feature.icon}</div>
                <p className="text-white font-medium">{feature.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <nav className="bg-gradient-to-br from-purple-50 to-purple-100 py-6" />
      <ContactPage />
    </>
  );
};

export default ResumeLandingPage;
