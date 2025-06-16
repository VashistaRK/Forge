import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/components/Dashboard/resume/REcomponents/PreviewSection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../service/GlobalApi";
// import { RWebShare } from 'react-web-share';
import type { ResumeInfo } from "@/components/Dashboard/resume/REcomponents/types";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const { resumeid } = useParams<{ resumeid: string }>();

  useEffect(() => {
    if (resumeid) GetResumeInfo(resumeid);
  }, [resumeid]);

  const GetResumeInfo = (id: string) => {
    Promise.all([GlobalApi.GetResumeById(id), GlobalApi.GetOther(id)]).then(
      ([resumeResp, otherResp]) => {
        const resumeData = resumeResp.data.data;
        const otherSkills = otherResp.data.data?.skills?.other || [];

        const mergedResume: ResumeInfo = {
          ...resumeData,
          skills: {
            ...resumeData.skills,
            other: otherSkills,
          },
        };

        setResumeInfo(mergedResume);
      }
    );
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx- flex flex-col gap-4 justify-center items-center">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share your
            unique resume URL with your friends and family.
          </p>
          {/* <div className="flex justify-center px-44 my-10"> */}
            <Button onClick={HandleDownload} className="max-w-40">Download</Button>
          {/* </div> */}
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
