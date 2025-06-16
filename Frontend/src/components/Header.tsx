import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isResumePage = location.pathname === "/Resumes";
  const isOnDashboard = location.pathname === "/dashboard";
  const { isSignedIn } = useUser();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPage = () => navigate("/Resumes");
  const scrollToSection1 = () => navigate("/UnderConstruct");
  const screenTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine header class
  let headerClass = "h-auto z-10 w-full p-4 md:p-6 text-gray-500";
  if (isResumePage) {
    headerClass += " relative";
  } else {
    headerClass += scrolled ? " fixed top-0" : " relative";
  }

  return (
    <header
      className={headerClass}
      style={
        isResumePage
          ? {
              backgroundImage:
                "radial-gradient(#bc45f7 0.65px, #ece6f7 0.65px)",
              backgroundSize: "13px 13px",
            }
          : {}
      }
    >
      <nav className="flex items-center justify-between w-full px-4 sm:px-6 xl:px-28">
        {/* Logo */}
        <div
          className="flex font-mine text-2xl sm:text-3xl text-violet-700 hover:text-violet-800 cursor-pointer"
          onClick={screenTop}
        >
          <h1 className="font-medium">Resume</h1>
          <h1 className="font-extrabold">Forge</h1>
        </div>

        {/* Mobile Icon */}
        <button
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          className="block lg:hidden text-2xl text-gray-700 ml-auto absolute right-10 top-6"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-12 ml-auto text-gray-800">
          <ul className="flex gap-8 items-center list-none">
            {["Builders", "Resumes", "Cover Letters", "CVs"].map((item) => (
              <li key={item}>
                <a
                  onClick={() => {
                    if (item === "Resumes") scrollToPage();
                    else scrollToSection1();
                  }}
                  className="text-[1.25rem] font-medium font-mine2 cursor-pointer no-underline transition-all duration-200 ease-in-out hover:text-primary relative hover:after:content-[''] hover:after:absolute hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-3 hover:after:h-[3px] hover:after:bg-violet-400 hover:after:rounded-full hover:after:bottom-[-8px]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex space-x-4">
            {isSignedIn ? (
              <>
                {!isOnDashboard && (
                  <button
                    className="bg-violet-600 hover:bg-violet-800 rounded-sm h-10 px-5 text-white"
                    onClick={() => navigate("/dashboard")}
                  >
                    Build My Resume
                  </button>
                )}
                <UserButton />
              </>
            ) : (
              <Link to="/auth/sign-in">
                <button className="border border-white bg-gray-800 rounded-xs h-10 px-3 text-white">
                  Login/Signup
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] right-0 w-full bg-white p-6 shadow-lg z-20 lg:hidden transition-transform ease-in-out duration-300">
            <ul className="flex flex-col gap-4">
              {["Builders", "Resumes", "Cover Letters", "CVs"].map((item) => (
                <li key={item}>
                  <a
                    className="block py-2 text-lg font-medium transition-all duration-200 ease-in-out hover:text-primary cursor-pointer"
                    onClick={() => {
                      if (item === "Resumes") scrollToPage();
                      else scrollToSection1();
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-4">
              {isSignedIn ? (
                <>
                  {!isOnDashboard && (
                    <button
                      className="bg-violet-700 rounded-xs h-10 px-5 text-white"
                      onClick={() => {
                        navigate("/dashboard");
                        setMenuOpen(false);
                      }}
                    >
                      Build My Resume
                    </button>
                  )}
                  <UserButton />
                </>
              ) : (
                <Link to="/auth/sign-in">
                  <button
                    className="border border-white bg-gray-800 rounded-xs h-10 px-3 text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login/Signup
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
