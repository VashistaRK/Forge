import { Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";
// import ResumeImagePreview from "./ResumeImagePreview";

type ResumeItemProps = {
  resume: {
    documentId: string;
    Title: string;
    themeColor: string;
  };
  refreshData: () => void;
};

function ResumeItem({ resume, refreshData }: ResumeItemProps) {
  const navigation = useNavigate();
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.Title);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId)
      .then(() => {
        toast("Resume Deleted!");
        refreshData();
        setOpenDeleteAlert(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const onRename = () => {
    if (!newTitle.trim()) {
      toast("Title cannot be empty.");
      return;
    }

    setLoading(true);
    GlobalApi.UpdateResumeDetails(resume.documentId, {
      data: { Title: newTitle.trim() },
    })
      .then(() => {
        toast("Resume renamed!");
        refreshData();
        setOpenRenameDialog(false);
      })
      .catch((err) => {
        console.error("Rename failed:", err);
        toast("Failed to rename resume.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
        <div
          className="flex items-center justify-center p-26 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 rounded-t-lg border-t-4"
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex items-center justify-center">
            <Notebook />
          </div>
        </div>
        {/* <ResumeImagePreview resume={resume} /> */}
      </Link>

      <div
        className="border border-y-violet-400 bg-violet-500 p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        // style={{ background: violet-400 }}
      >
        <h2 className="text-sm">{resume.Title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpenRenameDialog(true)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.documentId + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/my-resume/" + resume.documentId + "/view")
              }
            >
              View / Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={openDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete your
                resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDeleteAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Rename Dialog */}
        <AlertDialog open={openRenameDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Rename Resume</AlertDialogTitle>
              <AlertDialogDescription>
                Enter a new name for your resume.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mt-3"
            />
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenRenameDialog(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onRename} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Rename"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeItem;
