import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import JobDescription, { JobAnalysisProvider } from "./forms/JobDescription";
import PersonalDetails from "./forms/PersonalDetails";
import Summery from "./forms/Summery";
import Skills from "./forms/Skills";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Certificates from "./forms/Certificates";
import Projects from "./forms/Projects";

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
          {activeFormIndex === 4 && <Experience enableNext={setEnableNext}/>}
          {/* Education Details */}
          {activeFormIndex === 5 && <Education enableNext={setEnableNext}/>}
          {/* Skills */}
          {activeFormIndex === 6 && <Skills enableNext={setEnableNext}/>}
          {/* Certificates */}
          {activeFormIndex === 7 && <Certificates enableNext={setEnableNext}/>}
          {/* Projects */}
          {activeFormIndex === 8 && <Projects enableNext={setEnableNext}/>}
          {activeFormIndex === 9 && (
            <Navigate to={`/my-resume/${resumeid}/view`} />
          )}
        </div>
      </JobAnalysisProvider>
    </div>
  );
};

export default FormSection;
