import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = ({
  scrollToSection1,
  scrollToPage,
  scrollTOHero,
}: {
  scrollToPage: () => void;
  scrollToSection1: () => void;
  scrollTOHero: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // 100px threshold
      setScrolled(true); // Add class when scrolled
    } else {
      setScrolled(false); // Remove class if not scrolled
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`h-auto bg-white text-gray-500 z-10 top-0 left-0 w-full p-4 md:p-6 lg-fixed ${
        scrolled ? "fixed" : "relative"
      }`}
    >
      <nav className="flex items-center justify-between w-full px-4 sm:px-6 xl:px-28">
        <div
          className="flex font-mine text-2xl sm:text-3xl text-violet-700 hover:text-violet-800 cursor-pointer"
          onClick={scrollTOHero}
        >
          <h1 className="font-medium">Resume</h1>
          <h1 className="font-extrabold">Forge</h1>
        </div>

        {/* Mobile Icon */}
        <button
          aria-label="Toggle Menu"
          aria-expanded={menuOpen ? "true" : "false"} // Accessibility improvement
          className="block lg:hidden text-2xl text-gray-700 ml-auto absolute right-10 top-6"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div
          className={`lg:flex lg:items-center lg:gap-12 ml-auto text-gray-800`}
        >
          <ul className="hidden lg:flex gap-8 items-center list-none">
            {["Builders", "Resumes", "Cover Letters", "CVs"].map((item) => (
              <li key={item}>
                <a
                  onClick={item === "Resumes" ? scrollToPage : scrollToSection1}
                  href={`#${item}`}
                  className={`text-[1.25rem] font-medium font-mine2 cursor-pointer no-underline transition-all duration-200 ease-in-out hover:text-primary relative hover:after:content-[''] hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-3 hover:after:h-[3px] hover:after:bg-violet-400 hover:after:rounded-full hover:after:bottom-[-8px]`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex space-x-4">
            <button
              className="bg-violet-700 rounded-xs h-10 px-5 text-white"
              onClick={scrollToSection1}
            >
              Build My Resume
            </button>
            <button
              className="border border-white bg-gray-800 rounded-xs h-10 px-3 text-white"
              onClick={scrollToSection1}
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] right-0 w-full bg-white p-6 shadow-lg z-20 lg:hidden transition-transform ease-in-out duration-300">
            <ul className="flex flex-col gap-4">
              {["Builders", "Resumes", "Cover Letters", "CVs"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="block py-2 text-lg font-medium transition-all duration-200 ease-in-out hover:text-primary"
                    onClick={() => {
                      if (item === "Resumes") {
                        scrollToPage();
                      } else {
                        scrollToSection1();
                      }
                      setMenuOpen(false); // Close the menu when an item is clicked
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-4">
              <button
                className="bg-violet-700 rounded-xs h-10 px-5 text-white"
                onClick={scrollToSection1}
              >
                Build My Resume
              </button>
              <button
                className="border border-white bg-gray-800 rounded-xs h-10 px-3 text-white"
                onClick={scrollToSection1}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
