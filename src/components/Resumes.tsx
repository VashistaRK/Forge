import type { ResumeTemplate } from "../types/resumeTemplate";
import { resumeTemplates } from "../data/resumeTemplates";
import { categories } from "../data/categories"; // Import categories
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaFileAlt, FaArrowLeft } from "react-icons/fa";
import Footer from "./Footer";
import { useEffect } from "react";

//Button Group Component
const ButtonGroup = () => {
  const handleScroll = (label: string) => {
    const section = document.getElementById(label);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-10">
      {Object.entries(categories).map(([label, item], index) => (
        <button
          key={index}
          onClick={() => handleScroll(label)}
          className={`flex items-center gap-2 px-4 py-2 text-lg font-medium border-2 rounded-2xl transition-all duration-300 hover:cursor-pointer hover:border-transparent ${item.border} w-full sm:w-auto`}
        >
          <span>{item.icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

const ResumeTemplates = ({ scrollToPage }: { scrollToPage: () => void }) => {
  const groupedTemplates: Record<string, ResumeTemplate[]> =
    resumeTemplates.reduce((acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    }, {} as Record<string, ResumeTemplate[]>);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setZoomLevel(1); // Reset zoom
        setPosX(0);
        setPosY(0); // Reset position
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="bg-[#ece6f7] min-h-screen flex flex-col bg-opacity-100 relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#bc45f7 0.65px, #ece6f7 0.65px)",
            backgroundSize: "13px 13px",
          }}
        ></div>

        {/* Content */}
        <div className="relative flex flex-col items-center md:px-8 px-0 py-10">
          <div className="px-6 relative flex flex-col items-center">
            <button
              onClick={scrollToPage}
              className="flex items-center gap-2 px-4 py-2 mb-6 text-lg font-medium border rounded-2xl transition-all duration-300 hover:bg-gray-200"
            >
              <FaArrowLeft /> Back to Home
            </button>

            <h2 className="text-5xl font-bold text-gray-700 mb-6">
              Find the Perfect Resume Template
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mb-10">
              Choose from a wide range of resume templates categorized by style
              and profession.
            </p>

            <ButtonGroup />
          </div>

          {Object.entries(groupedTemplates).map(([category, templates]) => {
            const { icon, gradient, border } = categories[category] || {
              icon: <FaFileAlt className="text-white text-3xl" />,
              gradient: "linear-gradient(to right, #9ca3af, #4b5563)",
              border: "border-gray-400",
            };

            return (
              <div
                key={category}
                id={category}
                className={`w-full mt-10 p-6 rounded-3xl border ${border} shadow-lg `}
                style={{ background: gradient }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-full shadow-md">
                    {icon}
                  </div>
                  <h3 className="md:text-3xl text-2xl font-semibold text-gray-600">
                    {category} Resumes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="relative bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer w-full"
                      onClick={() => setSelectedImage(template.image)}
                    >
                      {/* Image Wrapper */}
                      <div className="relative w-full h-60 md:h-120 group">
                        {/* Image */}
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover object-top"
                        />

                        {/* Top Left Text */}
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {template.name}
                        </div>

                        {/* Bottom Right Button */}
                        <button
                          className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents parent click event
                            window.open(template.downloadUrl);
                          }}
                        >
                          Download Me
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-gray-700">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Full-Screen Image Preview Modal */}
                {selectedImage && (
                  <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onWheel={(e) => e.preventDefault()} // Prevent page scroll while zooming
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setZoomLevel(1); // Reset zoom on close
                        setPosX(0);
                        setPosY(0); // Reset position
                      }}
                      className="absolute top-4 right-6 text-white text-3xl hover:text-gray-300 cursor-pointer z-50"
                    >
                      <FaTimes />
                    </button>

                    {/* Image Container */}
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Full Preview"
                        className="w-full h-full object-contain cursor-grab active:cursor-grabbing transition-transform duration-300"
                        style={{
                          transform: `scale(${zoomLevel}) translate(${posX}px, ${posY}px)`,
                        }}
                        onWheel={(e) => {
                          e.preventDefault();
                          setZoomLevel((prev) =>
                            Math.min(Math.max(prev + e.deltaY * -0.001, 1), 3)
                          );
                        }}
                        onMouseDown={(e) => {
                          if (zoomLevel > 1) {
                            setDragging(true);
                            setStartY(e.clientY - posY);
                          }
                        }}
                        onMouseMove={(e) => {
                          if (dragging) {
                            setPosY(e.clientY - startY);
                          }
                        }}
                        onMouseUp={() => setDragging(false)}
                        onMouseLeave={() => setDragging(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResumeTemplates;
