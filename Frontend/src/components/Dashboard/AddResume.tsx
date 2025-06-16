import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, PlusSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router"; // ✅ useNavigate comes from react-router-dom

const AddResume: React.FC = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [resumeTitle, setResumeTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  // const { DocumentId } = useParams();
  // const navigate = useNavigate(); // ✅ renamed to `navigate` for clarity

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && resumeTitle && !loading) {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (!user) return;

    setLoading(true);

    const resumeId = uuidv4();
    const resumeData = {
      data: {
        Title: resumeTitle,
        resumeid: resumeId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName ?? undefined,
      },
    };

    try {
      const response = await GlobalApi.CreateNewResume(resumeData);
      console.log("Resume created:", response);

      // const documentId = response?.data?.id;

      // if (!documentId) {
      //   throw new Error("No document ID returned from backend.");
      // }

      // Reset form and close dialog
      setResumeTitle("");
      setOpenDialog(false);

      // ✅ Correct navigation using generated resumeid
      // navigate(`/dashboard/resume/${documentId}/edit`);
    } catch (error) {
      console.error("Failed to create resume:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md hover:cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume.
              <Input
                className="my-3"
                placeholder="Ex: Full Stack Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </DialogDescription>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!resumeTitle || loading}
                onClick={onCreate}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
