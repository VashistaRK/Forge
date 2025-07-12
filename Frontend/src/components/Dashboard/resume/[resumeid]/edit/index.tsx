import { useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import type { ResumeInfo } from "../../REcomponents/types";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import React from "react";
/*eslint-disable*/
const FormSection = React.lazy(() => import("../../REcomponents/FormSection"));
const PreviewSection = React.lazy(() => import("../../REcomponents/PreviewSection"));

const EditResume = () => {
  const { resumeid } = useParams<{ resumeid: string }>();
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    if (!resumeid) return;
    // console.log(resumeid);
    Promise.all([
      GlobalApi.GetResumeById(resumeid),
      GlobalApi.GetOther(resumeid),
    ]).then(([resumeResp, otherResp]) => {
      const resumeData = resumeResp.data.data;
      const otherSkills = otherResp.data.data?.skills?.other || [];

      // Merge otherSkills into skills
      const mergedResume = {
        ...resumeData,
        skills: {
          ...resumeData.skills,
          other: otherSkills,
        },
      };

      setResumeInfo(mergedResume);
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <nav className="border-2 p-6 bg-white rounded-lg">
          <PreviewSection />
        </nav>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
