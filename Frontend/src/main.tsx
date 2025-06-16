import React from "react";
import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App";
import Signin from "./components/Signin";
import UnderConstruction from "./Pages/UnderCon.tsx";
import ResumeLandingPage from "./Pages/ResumeLandingPage.tsx";
const Resumes = lazy(() => import("./Pages/Resumes.tsx"));
import Dashboard from "./components/Dashboard/Dashboard";
import EditResume from "./components/Dashboard/resume/[resumeid]/edit";
import ViewResume from "./my-resume/[resumeid]/view";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <ResumeLandingPage />,
      },
      {
        path: "/Resumes",
        element: <Resumes />,
      },
      {
        path: "/UnderConstruct",
        element: <UnderConstruction />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Dashboard/resume/:resumeid/edit",
        element: <EditResume />,
      },
    ],
  },

  {
    path: "/auth/sign-in",
    element: <Signin />,
  },

  {
    path: "/my-resume/:resumeid/view",
    element: <ViewResume />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
