import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Network, Rocket, Briefcase } from "lucide-react";

const features = [
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

export default function ATSOptimizedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-[#3a285e] via-[#4b1d60] to-[#732c78] shadow-lg shadow-purple-900/50 text-white py-16 px-6"
    >
      {/* Main Container */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section (Text) */}
        <div className="max-w-4xl text-center lg:text-left xl:ml-25">
          <h1 className="text-4xl md:text-5xl font-extrabold font-mine2 mb-4 text-[#D6CFFF] ">
            Future Scope
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Resumes optimized based on job description (ATS)
          </h2>
          <p className="text-lg mb-6">
            We have a strong vision for scaling this service to its full
            potential. Our goal is to develop a dynamic platform where users can
            simply input their job description, select a resume template, and
            receive a high-quality, ATS-optimized resume tailored to the
            required specifications. Your support will enable us to enhance this
            platform further, making it even more efficient and user-friendly.
          </p>
        </div>

        {/* Right Section (Features) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-10 lg:mt-0 xl:mr-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
  );
}
