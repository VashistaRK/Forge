import { useRef, useState, useEffect } from "react";
import { FaFileAlt, FaSearch, FaTimes } from "react-icons/fa";
import type { ResumeTemplate } from "../types/resumeTemplate";
import { resumeTemplates } from "../data/resumeTemplates";
import { categories } from "../data/categories";
import Loading from "../components/Loading";
import ButtonGroup from "../components/ButtonsGP";

const ResumeTemplates = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const groupedTemplates = resumeTemplates.reduce<
    Record<string, ResumeTemplate[]>
  >((acc, template) => {
    (acc[template.category] ||= []).push(template);
    return acc;
  }, {});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setLoading(false), 1000);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") resetImageZoom();
    };
    const handleScroll = () => setScrolled(window.scrollY > 480);

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const resetImageZoom = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const handleExpertClick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const targetElement = sectionRefs.current[category];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative">
      {/* Header */}
      <div
        className="absolute "
        style={{
          backgroundImage: "radial-gradient(#bc45f7 0.65px, #ece6f7 0.65px)",
          backgroundSize: "13px 13px",
        }}
      />

      {/* Intro Section - Made Responsive */}
      <div className="relative flex justify-center flex-col items-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16 min-h-[500px] sm:min-h-[600px] md:min-h-[700px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
        <div className="relative flex flex-col items-center max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-gray-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8 backdrop-blur-sm">
            <FaFileAlt className="mr-2 text-sm" />
            Professional Resume Templates
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 mb-4 sm:mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Resume Template
            </span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mb-8 sm:mb-10 text-sm sm:text-base md:text-lg px-4">
            Choose from a wide range of professionally designed resume templates
            categorized by style and profession to help you stand out.
          </p>
          <div
            className={`${
              scrolled ? " relative md:fixed top-0 z-10 text-black " : "relative"
            }`}
          >
            <ButtonGroup
              onExpertClick={handleExpertClick}
              onCategoryClick={handleCategoryClick}
              activeCategory={selectedCategory ?? undefined}
            />
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {Object.entries(groupedTemplates).map(
          ([category, categoryTemplates]) => {
            const { icon = <FaFileAlt className="text-gray-600" /> } =
              categories[category] || {};

            return (
              <div key={category} className="mb-12 sm:mb-16">
                {/* Category Header - Fixed ref assignment */}
                <div 
                  className="relative mb-8 sm:mb-12" 
                  ref={(el) => { sectionRefs.current[category] = el; }}
                >
                  <div className="relative flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                    <div className="text-3xl sm:text-4xl">{icon}</div>
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 tracking-tight">
                        {category} Resumes
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed px-4 md:px-0">
                        Discover professionally crafted {category.toLowerCase()}{" "}
                        resume templates designed to make a lasting impression
                        on employers.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-sm font-semibold border border-gray-300">
                        {categoryTemplates.length} Templates
                      </div>
                    </div>
                  </div>
                  <div className="absolute h-4 w-full py-8">
                    <hr className="border-gray-200" />
                  </div>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 gap-6 sm:gap-8">
                  {categoryTemplates.map(
                    ({ id, image, name, description, downloadUrl }) => (
                      <div
                        key={id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
                      >
                        {/* Template Image */}
                        <div
                          className="relative cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        >
                          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                            <img
                              src={image}
                              alt={name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex gap-3">
                              <button
                                className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(image);
                                }}
                              >
                                <FaSearch className="w-4 h-4" />
                              </button>
                              <button
                                className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(downloadUrl, "_blank");
                                }}
                              >
                                <FaFileAlt className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Template Info */}
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {description}
                          </p>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => setSelectedImage(image)}
                              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => window.open(downloadUrl, "_blank")}
                              className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col sm:flex-row overflow-hidden border">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-600 hover:text-gray-900 bg-white rounded-full p-2 shadow-md z-10"
            >
              <FaTimes size={16} className="sm:w-5 sm:h-5" />
            </button>
            <div className="w-full sm:w-2/3 h-1/2 sm:h-full flex items-center justify-center bg-gray-50 p-2 sm:p-4 overflow-auto">
              <img
                src={selectedImage}
                alt="Full Preview"
                className="object-contain max-h-full rounded-md transition-transform"
                style={{ transform: `scale(${zoomLevel})` }}
                onWheel={(e) => {
                  e.preventDefault();
                  setZoomLevel((prev) =>
                    Math.min(Math.max(prev + e.deltaY * -0.001, 1), 3)
                  );
                }}
              />
            </div>
            <div className="w-full sm:w-1/3 h-1/2 sm:h-full p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Spotlight
                </h2>
                <p className="text-gray-700 text-sm sm:text-base">
                  Grab a recruiter's attention with this polished, up-to-date
                  design perfect for candidates in a creative field.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplates;