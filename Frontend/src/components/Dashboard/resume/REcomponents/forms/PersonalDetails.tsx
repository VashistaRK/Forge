import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircleIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import type { ResumeInfo } from "@/components/Dashboard/resume/REcomponents/types";
import { toast } from "sonner";

interface PersonalDetailsProps {
  enableNext: (enabled: boolean) => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ enableNext }) => {
  const { resumeid } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isInitialized, setIsInitialized] = useState(false);

  const [formData, setFormData] = useState<ResumeInfo>(
    resumeInfo || ({} as ResumeInfo)
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (resumeInfo && !isInitialized) {
      setFormData(resumeInfo);
      setIsInitialized(true);
    }
  }, [resumeInfo, isInitialized]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    enableNext(false);
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);
    setResumeInfo({ ...updatedData });
  };

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Sending PUT payload:", { data: formData });

    if (!resumeid) {
      alert(
        "Resume ID is missing. Please access this page through the resume editor."
      );
      return;
    }

    setLoading(true);
    /*eslint-disable*/
    try {
      // The backend expects the payload in the shape of { data: formData }
      const allowedKeys = [
        "name",
        "phone",
        "email",
        "address",
        "linkedin",
        "github",
      ];

      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => allowedKeys.includes(key))
      );

      const response = await GlobalApi.UpdateResumeDetails(resumeid, {
        data: cleanedFormData,
      });

      console.log("Saved successfully:", response);
      enableNext(true);
      toast("Details saved successfully in the DataBase!");
    } catch (error: any) {
      console.error(
        "Error saving personal details:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-sm">Name</label>
            <Input
              name="name"
              value={formData?.name ?? ""}
              // defaultValue={resumeInfo?.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData?.phone ?? ""}
              // defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData?.email ?? ""}
              // defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData?.address ?? ""}
              // defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">LinkedIn</label>
            <Input
              name="linkedin"
              value={formData?.linkedin ?? ""}
              // defaultValue={resumeInfo?.linkedin}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">GitHub</label>
            <Input
              name="github"
              value={formData?.github ?? ""}
              // defaultValue={resumeInfo?.github}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
