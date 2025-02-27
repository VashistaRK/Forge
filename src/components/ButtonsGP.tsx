import {
  FaRegLightbulb,
  FaSmile,
  FaUserCircle,
  FaGoogle,
  FaFileAlt,
  FaBriefcase,
  FaShoppingBasket,
  FaGlasses,
  FaFileWord,
} from "react-icons/fa";

const categories = [
  {
    label: "Expert Choice",
    icon: <FaShoppingBasket />,
    gradient:
      "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500  hover:border-transparent",
  },
  {
    label: "Professional",
    icon: <FaBriefcase />,
    color: "border-blue-400 text-blue-500 hover:border-transparent",
  },
  {
    label: "Modern",
    icon: <FaGlasses />,
    color: "border-orange-400 text-orange-500 hover:border-transparent",
  },
  {
    label: "Creative",
    icon: <FaRegLightbulb />,
    color: "border-green-400 text-green-500 hover:border-transparent",
  },
  {
    label: "Simple",
    icon: <FaSmile />,
    color: "border-pink-400 text-pink-500 hover:border-transparent",
  },
  {
    label: "Picture",
    icon: <FaUserCircle />,
    color: "border-purple-400 text-purple-500 hover:border-transparent",
  },
  {
    label: "Google Docs",
    icon: <FaGoogle />,
    color: "border-yellow-500 text-yellow-600 hover:border-transparent",
  },
  {
    label: "CV",
    icon: <FaFileAlt />,
    color: "border-blue-400 text-blue-500 hover:border-transparent",
  },
  {
    label: "Microsoft Word",
    icon: <FaFileWord />,
    color: "border-orange-400 text-orange-500 hover:border-transparent",
  },
];

const ButtonGroup = ({
  scrollToSection,
  scrollToLink,
}: {
  scrollToSection: () => void;
  scrollToLink: () => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-25">
      {categories.map((item, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={
              item.label === "Expert Choice" ? scrollToSection : scrollToLink
            }
            className={`flex items-center gap-2 px-3 py-2 text-[1rem] font-small border rounded-2xl hover:cursor-pointer transition-all duration-300
              ${
                item.label === "Expert Choice"
                  ? `${item.gradient} text-white border-2 `
                  : item.color
              }
              hover:border-transparent 
            `}
          >
            <span className="text-inherit">{item.icon}</span>
            <span
              className={`${
                item.label === "Expert Choice" ? "text-white" : "text-black"
              }`}
            >
              {item.label}
            </span>
          </button>

          {/* Vertical Divider (Added after "Expert Choice") */}
          {item.label === "Expert Choice" && (
            <div className="h-10 w-[1px] bg-gray-300 mx-1"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;
