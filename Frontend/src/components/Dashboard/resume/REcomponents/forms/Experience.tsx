import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import type { ExperienceItem } from "../types";
import type { FormEvent } from "react";
import { JobAnalysisContext, JobAnalysisDisplay } from "./JobDescription";
/*eslint-disable*/
// Lazy load the heavy component
const RichTextEditor = React.lazy(() => import("../RichTextEditor"));

const defaultFormField: ExperienceItem = {
  id: "",
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

interface ExperienceProps{
  enableNext: (enabled: boolean) => void;
}

const Experience: React.FC<ExperienceProps> = ({enableNext}) => {
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  // 🔐 SAFE CONTEXT ACCESS
  const jobCtx = useContext(JobAnalysisContext);
  const jobAnalysis = jobCtx?.jobAnalysis;

  useEffect(() => {
    if (resumeInfo?.Experience?.length) {
      setExperienceList(resumeInfo.Experience);
    }
  }, [resumeInfo?.Experience]);

  const updateResumeInfo = (updatedList: ExperienceItem[]) => {
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        Experience: updatedList,
      });
    }
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedList = [...experienceList];
    updatedList[index][name as keyof ExperienceItem] = value;
    enableNext(false);
    setExperienceList(updatedList);
    updateResumeInfo(updatedList);
  };

  const addNewExperience = () => {
    const updatedList = [...experienceList, { ...defaultFormField }];
    setExperienceList(updatedList);
    updateResumeInfo(updatedList);
  };

  const removeExperience = () => {
    const updatedList = experienceList.slice(0, -1);
    setExperienceList(updatedList);
    updateResumeInfo(updatedList);
  };

  const handleRichTextEditor = (
    value: string,
    name: keyof ExperienceItem,
    index: number
  ) => {
    const updatedList = [...experienceList];
    updatedList[index][name] = value;
    setExperienceList(updatedList);
    updateResumeInfo(updatedList);
  };

  const onSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!resumeid) {
      toast.error("Resume ID is missing");
      return;
    }

    setLoading(true);

    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    try {
      await GlobalApi.UpdateResumeDetails(resumeid, data);
      setLoading(false);
      toast.success("Details updated!");
      enableNext(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Failed to update experience");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience.</p>
      {experienceList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
        >
          <div>
            <label className="text-xs">Position Title</label>
            <Input
              name="title"
              onChange={(e) => handleChange(index, e)}
              value={item.title}
            />
          </div>
          <div>
            <label className="text-xs">Company Name</label>
            <Input
              name="companyName"
              onChange={(e) => handleChange(index, e)}
              value={item.companyName}
            />
          </div>
          <div>
            <label className="text-xs">City</label>
            <Input
              name="city"
              onChange={(e) => handleChange(index, e)}
              value={item.city}
            />
          </div>
          <div>
            <label className="text-xs">State</label>
            <Input
              name="state"
              onChange={(e) => handleChange(index, e)}
              value={item.state}
            />
          </div>
          <div>
            <label className="text-xs">Start Date</label>
            <Input
              type="date"
              name="startDate"
              onChange={(e) => handleChange(index, e)}
              value={item.startDate}
            />
          </div>
          <div>
            <label className="text-xs">End Date</label>
            <Input
              type="date"
              name="endDate"
              onChange={(e) => handleChange(index, e)}
              value={item.endDate}
            />
          </div>
          <div className="col-span-2">
            <Suspense fallback={<div>Loading editor...</div>}>
              <RichTextEditor
                index={index}
                defaultValue={item.workSummery}
                onRichTextEditorChange={(value) =>
                  handleRichTextEditor(value, "workSummery", index)
                }
              />
            </Suspense>
          </div>
        </div>
      ))}
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 flex-col md:flex-row">
          <Button
            variant="outline"
            onClick={addNewExperience}
            className="text-primary w-40"
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            onClick={removeExperience}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
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

export default Experience;
