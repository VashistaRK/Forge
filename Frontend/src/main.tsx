import React from "react";
import { lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App";
import Signin from "./components/Signin";
import ResumeLandingPage from "./Pages/ResumeLandingPage.tsx";

const Resumes = lazy(() => import("./Pages/Resumes.tsx"));
const Dashboard = React.lazy(() => import("./components/Dashboard/Dashboard"));
const EditResume = React.lazy(
  () => import("./components/Dashboard/resume/[resumeid]/edit")
);
const ViewResume = React.lazy(() => import("./my-resume/[resumeid]/view"));
const UnderConstruction = React.lazy(() => import("./Pages/UnderCon.tsx"));

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
