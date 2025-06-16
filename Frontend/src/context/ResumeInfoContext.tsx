import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import type { ResumeInfo } from "@/components/Dashboard/resume/REcomponents/types";

type ResumeInfoContextType = {
  resumeInfo: ResumeInfo | null;
  setResumeInfo: Dispatch<SetStateAction<ResumeInfo | null>>;
};

export const ResumeInfoContext = createContext<ResumeInfoContextType>({
  resumeInfo: null,
  setResumeInfo: () => {},
});

export const ResumeInfoProvider = ({ children }: { children: ReactNode }) => {
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
