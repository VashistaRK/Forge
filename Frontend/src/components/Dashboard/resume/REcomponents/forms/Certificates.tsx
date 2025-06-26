import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PlusCircle, Trash2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import type { Certification } from "../types";
import { JobAnalysisContext, JobAnalysisDisplay } from "./JobDescription";

interface CertificateProps{
  enableNext : (enabled:boolean) =>void;
}

const Certificates:React.FC<CertificateProps>=({enableNext})=> {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const { resumeid } = useParams<{ resumeid: string }>();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { jobAnalysis } = useContext(JobAnalysisContext);

  useEffect(() => {
    if (
      resumeInfo?.certifications &&
      JSON.stringify(resumeInfo.certifications) !==
        JSON.stringify(certifications)
    ) {
      setCertifications(resumeInfo.certifications);
    }
  }, [resumeInfo, certifications]);

  const updateCertifications = (updated: Certification[]) => {
    setCertifications(updated);
    if (resumeInfo) {
      setResumeInfo({ ...resumeInfo, certifications: updated });
    }
  };

  const handleChange = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    updateCertifications(updated);
    enableNext(false);
  };

  const addCertification = () => {
    updateCertifications([...certifications, { title: "", link: "" }]);
  };

  const removeCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    updateCertifications(updated);
  };

  const onSave = async () => {
    if (!resumeid) {
      toast.error("Resume ID is missing");
      return;
    }

    setLoading(true);
    const data = {
      data: {
        certifications,
      },
    };

    try {
      await GlobalApi.UpdateResumeDetails(resumeid, data);
      toast.success("Certifications updated!");
      enableNext(true);
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Certifications</h2>
      <p>List your professional certifications or achievements.</p>

      <div className="space-y-4 mt-4">
        {certifications.map((cert, index) => (
          <div key={index} className="space-y-2 mb-4 border-b pb-2">
            <Input
              placeholder="Certificate Title"
              value={cert.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
            <Input
              placeholder="Link (optional)"
              value={cert.link || ""}
              onChange={(e) => handleChange(index, "link", e.target.value)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => removeCertification(index)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addCertification}
          className="text-primary"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
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

export default Certificates;
