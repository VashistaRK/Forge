import type { JSX } from "react";
import {
  FaBriefcase,
  FaGlasses,
  FaRegLightbulb,
  FaSmile,
  FaUserCircle,
  FaGoogle,
  FaFileAlt,
  FaFileWord,
  FaShoppingBasket,
} from "react-icons/fa";

// Define Category Type
export interface Category {
  icon: JSX.Element; // ✅ Use JSX.Element instead of ReactNode
  gradient: string;
  border: string;
  sty: string;
  accentColor: string;
}

// Define Categories
export const categories: Record<string, Category> = {
  "Expert Choice": {
    icon: <FaShoppingBasket className="text-white" />,
    gradient:
      "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:border-transparent",
    border: "text-white border-2",
    sty: "",
    accentColor: "blue",
  },
  Professional: {
    icon: <FaBriefcase className="text-blue-500" />, // ✅ Now correctly typed
    gradient: "radial-gradient(circle at top left, #bfdbfe, #dbeafe, #eff6ff)",
    border: "border-blue-500",
    sty: "before:w-24 before:h-24 before:bg-blue-300 before:rounded-full before:top-0 before:left-0 before:opacity-40",
    accentColor: "blue",
  },
  Modern: {
    icon: <FaGlasses className="text-orange-500" />,
    gradient:
      "radial-gradient(circle at bottom right, #fed7aa, #ffedd5, #fff7ed)",
    border: "border-orange-500",
    sty: "before:w-20 before:h-32 before:bg-orange-300 before:skew-x-12 before:bottom-0 before:right-0 before:opacity-30",
    accentColor: "orange",
  },
  Creative: {
    icon: <FaRegLightbulb className="text-green-500" />,
    gradient: "radial-gradient(ellipse at center, #bbf7d0, #dcfce7, #f0fdf4)",
    border: "border-green-500",
    sty: "before:w-32 before:h-16 before:bg-green-300 before:rotate-12 before:top-4 before:left-4 before:opacity-30",
    accentColor: "green",
  },
  Simple: {
    icon: <FaSmile className="text-pink-500" />,
    gradient:
      "radial-gradient(circle at bottom left, #fecdd3, #ffe4e6, #fff1f2)",
    border: "border-pink-500",
    sty: "before:w-16 before:h-16 before:bg-pink-300 before:rounded-lg before:bottom-2 before:right-2 before:opacity-40",
    accentColor: "pink",
  },
  Picture: {
    icon: <FaUserCircle className="text-purple-500" />,
    gradient: "radial-gradient(circle at top right, #ddd6fe, #e9d5ff, #faf5ff)",
    border: "border-purple-500",
    sty: "before:w-28 before:h-28 before:bg-purple-300 before:rounded-tr-full before:top-0 before:right-0 before:opacity-30",
    accentColor: "purple",
  },
  "Google Docs": {
    icon: <FaGoogle className="text-yellow-500" />,
    gradient:
      "radial-gradient(circle at bottom left, #fef08a, #fef9c3, #fefce8)",
    border: "border-yellow-500",
    sty: "before:w-40 before:h-20 before:bg-yellow-300 before:rotate-6 before:bottom-0 before:left-0 before:opacity-40",
    accentColor: "yellow",
  },
  CV: {
    icon: <FaFileAlt className="text-blue-500" />,
    gradient: "radial-gradient(circle at center, #93c5fd, #bfdbfe, #e0f2fe)",
    border: "border-blue-500",
    sty: "before:w-12 before:h-32 before:bg-blue-500 before:skew-y-6 before:top-2 before:right-2 before:opacity-30",
    accentColor: "blue",
  },
  "Microsoft Word": {
    icon: <FaFileWord className="text-orange-500" />,
    gradient: "radial-gradient(circle at center, #fed7aa, #ffedd5, #fffaf0)",
    border: "border-orange-500",
    sty: "before:w-28 before:h-28 before:bg-orange-500 before:rounded-bl-full before:bottom-4 before:left-4 before:opacity-30",
    accentColor: "ornage",
  },
};
