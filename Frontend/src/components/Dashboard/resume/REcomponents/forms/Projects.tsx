import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PlusCircle, Trash2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import type { Project } from "../types";
import { JobAnalysisContext, JobAnalysisDisplay } from "./JobDescription";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { resumeid } = useParams<{ resumeid: string }>();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { jobAnalysis } = useContext(JobAnalysisContext);

  useEffect(() => {
    if (
      resumeInfo?.projects &&
      JSON.stringify(resumeInfo.projects) !== JSON.stringify(projects)
    ) {
      setProjects(resumeInfo.projects);
    }
  }, [resumeInfo, projects]);

  const updateProjects = (updated: Project[]) => {
    setProjects(updated);
    if (resumeInfo) {
      setResumeInfo({ ...resumeInfo, projects: updated });
    }
  };

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateProjects(updated);
  };

  const addProject = () => {
    updateProjects([...projects, { name: "", tech: "", desc: "", link: "" }]);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    updateProjects(updated);
  };

  const onSave = async () => {
    if (!resumeid) {
      toast.error("Resume ID is missing");
      return;
    }

    setLoading(true);
    const data = {
      data: {
        projects,
      },
    };

    try {
      await GlobalApi.UpdateResumeDetails(resumeid, data);
      toast.success("Projects updated!");
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-green-500 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>List your personal, academic, or professional projects.</p>

      <div className="space-y-6 mt-4">
        {projects.map((proj, index) => (
          <div key={index} className="border-b pb-4 space-y-3">
            <Input
              placeholder="Project Name"
              value={proj.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Technologies Used"
              value={proj.tech}
              onChange={(e) => handleChange(index, "tech", e.target.value)}
            />
            <Textarea
              placeholder="Project Description"
              value={proj.desc}
              onChange={(e) => handleChange(index, "desc", e.target.value)}
            />
            <Input
              placeholder="Project Link (optional)"
              value={proj.link || ""}
              onChange={(e) => handleChange(index, "link", e.target.value)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="text-primary"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="flex justify-end mt-6">
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
      {jobAnalysis && (
        <div className="mt-8 border-t pt-6">
          <JobAnalysisDisplay showMinimized={false} />
        </div>
      )}
    </div>
  );
}

export default Projects;
