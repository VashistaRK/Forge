import { useUser } from "@clerk/clerk-react";
import AddResume from "./AddResume";
import GlobalApi from "../../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItem from "./ResumeItem";
/*eslint-disable*/

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const GetResumeList = () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.warn("User email not found.");
      return;
    }

    setLoading(true);
    GlobalApi.GetUserResumes(email)
      .then((resp) => {
        setResumeList(resp.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch resumes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) GetResumeList();
  }, [user]);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 py-10 min-h-screen">
      <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900">
        My Resumes
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 mt-2">
        Start creating resumes for your next job roles
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10">
        <AddResume />

        {loading ? (
          <div className="col-span-full text-center text-gray-600 text-base sm:text-lg animate-pulse">
            Fetching your resume details...
          </div>
        ) : resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <div key={index} className="pb-8">
              <ResumeItem resume={resume} refreshData={GetResumeList} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-base sm:text-lg">
            No resumes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
