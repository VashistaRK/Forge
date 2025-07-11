import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { toast } from "sonner";
import type { EducationItem } from "../types";
import { JobAnalysisContext, JobAnalysisDisplay } from "./JobDescription";

interface EducationProps{
  enableNext: (enabled : boolean) => void;
}

const Education:React.FC<EducationProps>=({enableNext}) =>{
  const [loading, setLoading] = useState<boolean>(false);
  const { jobAnalysis } = useContext(JobAnalysisContext); //
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeid } = useParams<{ resumeid: string }>();
  const [educationalList, setEducationalList] = useState<EducationItem[]>([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Sync resumeInfo.education to local state when resumeInfo changes
  useEffect(() => {
    if (
      resumeInfo?.education &&
      JSON.stringify(resumeInfo.education) !== JSON.stringify(educationalList)
    ) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo, educationalList]);

  const updateBothStateAndContext = (newList: EducationItem[]) => {
    setEducationalList(newList);
    if (resumeInfo) {
      setResumeInfo({ ...resumeInfo, education: newList });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    const newEntries = [...educationalList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    enableNext(false);
    updateBothStateAndContext(newEntries);
  };

  const AddNewEducation = () => {
    const updatedList = [
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    updateBothStateAndContext(updatedList);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      const updatedList = educationalList.slice(0, -1);
      updateBothStateAndContext(updatedList);
    }
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
        education: educationalList,
      },
    };

    try {
      const resp = await GlobalApi.UpdateResumeDetails(resumeid, data);
      console.log(resp);
      toast.success("Details updated!");
      enableNext(true);
    } catch (error) {
      toast.error("Server Error, Please try again!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>

      <form onSubmit={onSave}>
        {educationalList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
          >
            <div className="col-span-2">
              <label>University Name</label>
              <Input
                name="universityName"
                value={item.universityName}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input
                name="degree"
                value={item.degree}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Major</label>
              <Input
                name="major"
                value={item.major}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={item.startDate}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>End Date</label>
              <Input
                type="date"
                name="endDate"
                value={item.endDate}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="col-span-2">
              <label>Description</label>
              <Textarea
                name="description"
                value={item.description}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between gap-2">
          <div className="flex gap-2 flex-col md:flex-row">
            <Button
              variant="outline"
              onClick={AddNewEducation}
              type="button"
              className="text-primary"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={RemoveEducation}
              type="button"
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
      {jobAnalysis && (
        <div className="mt-8 border-t pt-6">
          <JobAnalysisDisplay showMinimized={false} />
        </div>
      )}
    </div>
  );
}

export default Education;
