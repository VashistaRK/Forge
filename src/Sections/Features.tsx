import {
  CheckCircle,
  Droplet,
  Layout,
  LayoutGrid,
  Search,
  Zap,
} from "lucide-react";

const features = [
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
  {
    link: {
      text: "Browse All Resume Templates →",
      href: "#",
    },
  },
];

export default function ResumeFeatures({
  scrollToPage,
}: {
  scrollToPage: () => void;
}) {
  return (
    <section className="flex flex-col justify-center mt-18 items-center bg-gray-100 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-600 mb-16">
        Why Choose{" "}
        <span className="bg-gradient-to-r from-[#818cf8] to-[#7e22ce] text-transparent bg-clip-text">
          ResumeForge
        </span>
        ?
      </h2>
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            {feature.icon}
            <p className="text-gray-700 text-[16px] md:text-lg font-medium">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
      <div className="flex text-center items-center justify-center">
        <a
          id="link"
          href="#link"
          onClick={scrollToPage}
          className="text-purple-600 mt-10 text-lg font-semibold hover:underline"
        >
          Browse All Resume Templates →
        </a>
      </div>
    </section>
  );
}
