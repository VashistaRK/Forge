// import Cursor from "./cursor";

import { lazy, Suspense, useRef, useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ButtonsGP from "./components/ButtonsGP";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Professional from "./Sections/professional";
// const Professional = lazy(() => import("./Sections/professional"));
const Features = lazy(() => import("./Sections/Features"));
const FutureFee = lazy(() => import("./Sections/FutureFee"));
const UnderConstruction = lazy(() => import("./Sections/UnderCon"));
const Resumes = lazy(() => import("./components/Resumes"));
const ContactPage = lazy(() => import("./components/ContactPage"));

const App = () => {
  const targetSectionRef = useRef<HTMLDivElement | null>(null);
  const targetLink = useRef<HTMLDivElement | null>(null);
  const [showUnderConstruction, setShowUnderConstruction] = useState(false);
  const [showResumeTemplates, setShowResumeTemplates] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading

  // Simulate loading time (for better UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = () =>
    targetSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToHero = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToLink = () =>
    targetLink.current?.scrollIntoView({ behavior: "smooth" });

  const showConstructionPage = () => setShowUnderConstruction(true);
  const showResumePage = () => setShowResumeTemplates(true);
  const goBackToMainPage = () => setShowResumeTemplates(false);

  if (loading) return <Loading />; // Show loading screen while app is loading

  if (showResumeTemplates) {
    return (
      <Suspense fallback={<Loading />}>
        <Resumes scrollToPage={goBackToMainPage} />
      </Suspense>
    );
  }

  if (showUnderConstruction) {
    return (
      <Suspense fallback={<Loading />}>
        <UnderConstruction goBack={() => setShowUnderConstruction(false)} />
      </Suspense>
    );
  }

  return (
    <div>
      <Header
        scrollToSection1={showConstructionPage}
        scrollToPage={showResumePage}
        scrollTOHero={scrollToHero}
      />
      <HeroSection />
      <ButtonsGP
        scrollToSection={scrollToSection}
        scrollToLink={scrollToLink}
      />

      <Suspense fallback={<Loading />}>
        <div ref={targetSectionRef}>
          <Professional />
        </div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <div ref={targetLink}>
          <Features scrollToPage={showResumePage} />
        </div>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <FutureFee />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <ContactPage />
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
