import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Certificates from "./forms/Certificates";
import Projects from "./forms/Projects";
import { Link, Navigate, useParams } from "react-router";
import JobDescription, { JobAnalysisProvider } from "./forms/JobDescription";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeid } = useParams();

  return (
    <div>
      <JobAnalysisProvider>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <Link to={"/dashboard"}>
              <Button>
                <Home />
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex gap-2">
              {" "}
              <LayoutGrid /> Theme
            </Button>
          </div>
          <div className="flex gap-2">
            {activeFormIndex > 1 && (
              <Button
                className=""
                size="sm"
                onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              >
                <ArrowLeft />
              </Button>
            )}
            {activeFormIndex < 9 && (
              <Button
                disabled={!enableNext}
                className="flex gap-2"
                size="sm"
                onClick={() => setActiveFormIndex(activeFormIndex + 1)}
              >
                Next <ArrowRight />
              </Button>
            )}
          </div>
        </div>
        <div className="form-stepper">
          {/* Personal details */}
          {activeFormIndex === 1 && (
            <PersonalDetails enableNext={setEnableNext} />
          )}
          {/* Job Description */}
          {activeFormIndex === 2 && (
            <JobDescription enableNext={setEnableNext} />
          )}
          {/* Summary */}
          {activeFormIndex === 3 && <Summery enableNext={setEnableNext} />}
          {/* Expirence */}
          {activeFormIndex === 4 && <Experience />}
          {/* Education Details */}
          {activeFormIndex === 5 && <Education />}
          {/* Skills */}
          {activeFormIndex === 6 && <Skills />}
          {/* Certificates */}
          {activeFormIndex === 7 && <Certificates />}
          {/* Projects */}
          {activeFormIndex === 8 && <Projects />}
          {activeFormIndex === 9 && (
            <Navigate to={`/my-resume/${resumeid}/view`} />
          )}
        </div>
      </JobAnalysisProvider>
    </div>
  );
};

export default FormSection;
