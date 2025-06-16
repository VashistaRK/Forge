import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";
// import { Button } from "./components/ui/button";
import { ResumeInfoProvider } from "@/context/ResumeInfoContext";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

function App() {
  const { isLoaded, isSignedIn } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"auth/sign-in"} />;
  }
  if (loading) return <Loading />;
  return (
    <ResumeInfoProvider>
      <Header />
      <nav className="min-h-screen mb-15">
        <Outlet />
      </nav>
      <Toaster />
      <Footer />
    </ResumeInfoProvider>
  );
}

export default App;
