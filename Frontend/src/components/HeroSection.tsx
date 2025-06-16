import { useState, useEffect } from "react";
// import FileCounter from "../Sections/FileCount";

const HeroSection = () => {
  const images = [
    "/images/modern_resume.png",
    "/images/modern_impact.jpg",
    "/images/Creative_Edge.jpg",
    "/images/Resume_template.jpg",
  ];

  //Both in Single Event
  const handleCombinedMouseDown = (
    index: number,
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    handleDrag(index, e); // Calls the existing drag handler
    handleImageClick(index); // Calls the existing image click handler
  };

  // Random positions for scattering effect
  const generateRandomPosition = () => ({
    x: Math.random() * 300 - 175, // Random offset between -50px and 50px
    y: Math.random() * 200 - 150,
  });

  // Initialize all images at the center
  const [positions, setPositions] = useState(
    images.map(() => ({ x: 0, y: 0 }))
  );

  // Add a state to track when the animation starts
  const [scattered, setScattered] = useState(false);

  // State to track which image is clicked (active)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  /*eslint-disable */
  // Scatter images after the component mounts
  useEffect(() => {
    setTimeout(() => {
      setPositions(images.map(() => generateRandomPosition()));
      setScattered(true);
    }, 500);
  }, []);

  const handleDrag = (index: number, e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const startX = e.clientX - positions[index].x;
    const startY = e.clientY - positions[index].y;

    const onMouseMove = (event: MouseEvent) => {
      const newX = event.clientX - startX;
      const newY = event.clientY - startY;

      setPositions((prev) =>
        prev.map((pos, i) => (i === index ? { x: newX, y: newY } : pos))
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleImageClick = (index: number) => {
    setActiveIndex(index); // Set the clicked image as active
  };

  /* File Count  */
  const [fileCount, setFileCount] = useState(null);
  useEffect(() => {
    fetch("https://ai-resume-builder-strapi-k452.onrender.com/api/contact/file-count")
      .then((res) => res.json())
      .then((data) => setFileCount(data.fileCount))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-2 py-12 max-w-7xl mx-auto">
      {/* Left Content */}
      <div className="max-w-2xl space-y-4">
        <span className="text-violet-700 font-semibold sm:text-sm  text-[11px] border border-violet-700 rounded-2xl px-3 py-1">
          {fileCount == null ? 30 : fileCount} + FREE TEMPLATES TO DOWNLOAD
        </span>
        <h1 className="my-5 md:text-6xl text-5xl font-bold text-gray-900">
          Resume Templates for Students
        </h1>
        <p className="text-gray-600 text-lg">
          {/* Looking for a job? Our huge range of{" "}
          <a href="#" className="text-violet-700 font-semibold">
            free resume templates
          </a>{" "}
          can help. Choose your favorite, download for Word or Google Docs, and
          fill your resume template. */}
          Access our free, ATS-optimized resume templates designed with
          well-structured sections, tailored to job descriptions for maximum
          visibility and easy customization in Word or Google Docs.
        </p>
        {/* Buttons */}
        {/* <div className="flex gap-4">
          <button className="bg-violet-700 text-white font-semibold py-3 px-6 rounded-md">
            Build New Resume
          </button>
          <button className="border border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-md">
            Upload Existing Resume
          </button>
        </div> */}
      </div>

      {/* Right Image Section */}
      <div className="relative hidden lg:block w-[400px] h-[300px]">
        {images.map((img, index) => (
          <img
            key={index}
            alt={`Template ${index + 1}`}
            src={img}
            draggable="false"
            loading="lazy"
            className="absolute object-cover shadow-lg cursor-grab active:cursor-grabbing transition-transform rounded-2xl"
            style={{
              left: "50%",
              top: "20%",
              transition: scattered ? "transform 0.3s ease-out" : "none",
              transform: `translate(${positions[index].x}px, ${
                positions[index].y
              }px) scale(1) rotate(${index * 5 - 10}deg)`,
              width: "200px",
              zIndex: activeIndex === index ? 10 : 1, // Set higher z-index for active image
            }}
            onMouseDown={(e) => handleCombinedMouseDown(index, e)}
            // onMouseDown={(e) => handleDrag(index, e)}
            // onClick={() => handleImageClick(index)} // Set active image on click
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
