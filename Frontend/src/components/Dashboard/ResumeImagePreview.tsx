import { useEffect, useState } from "react";
import { Download } from "lucide-react";
/*eslint-disable*/
const ResumeImagePreview = ({ resume }: { resume: any }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async () => {
    setIsGenerating(true);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Canvas context not available");
        setIsGenerating(false);
        return;
      }

      const scale = 2;
      canvas.width = 256 * scale;
      canvas.height = 280 * scale;
      canvas.style.width = "256px";
      canvas.style.height = "280px";

      ctx.scale(scale, scale);
      ctx.textBaseline = "top";
      ctx.imageSmoothingEnabled = true;

      const gradient = ctx.createLinearGradient(0, 0, 0, 280);
      gradient.addColorStop(0, "#fce7f3");
      gradient.addColorStop(0.5, "#ddd6fe");
      gradient.addColorStop(1, "#dbeafe");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 280);

      ctx.fillStyle = resume?.themeColor || "#3B82F6";
      ctx.fillRect(0, 0, 256, 4);

      ctx.fillStyle = "white";
      ctx.roundRect(16, 16, 224, 248, 8);
      ctx.fill();

      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = "white";
      ctx.roundRect(16, 16, 224, 248, 8);
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      let yPosition = 35;

      const avatarRadius = 12;
      ctx.fillStyle = resume?.themeColor || "#3B82F6";
      ctx.beginPath();
      ctx.arc(128, yPosition, avatarRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      const initial = resume?.firstName?.charAt(0)?.toUpperCase() || "U";
      ctx.fillText(initial, 128, yPosition - 6);

      yPosition += 25;

      ctx.fillStyle = resume?.themeColor || "#3B82F6";
      ctx.font = "bold 16px Arial";
      const fullName = `${resume?.firstName || "John"} ${resume?.lastName || "Doe"}`;
      ctx.fillText(fullName, 128, yPosition);

      yPosition += 20;

      ctx.fillStyle = "#6B7280";
      ctx.font = "12px Arial";
      const jobTitle = resume?.jobTitle || "Professional Title";
      ctx.fillText(jobTitle, 128, yPosition);

      yPosition += 25;

      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, yPosition);
      ctx.lineTo(210, yPosition);
      ctx.stroke();

      yPosition += 15;
      ctx.textAlign = "left";

      if (resume?.email) {
        ctx.fillStyle = "#6B7280";
        ctx.font = "10px Arial";
        ctx.fillText("✉", 30, yPosition);
        ctx.fillText(
          resume.email.length > 25 ? `${resume.email.substring(0, 25)}...` : resume.email,
          45,
          yPosition
        );
        yPosition += 15;
      }

      if (resume?.phone) {
        ctx.fillText("📞", 30, yPosition);
        ctx.fillText(resume.phone, 45, yPosition);
        yPosition += 15;
      }

      if (resume?.address) {
        ctx.fillText("📍", 30, yPosition);
        const address = resume.address.length > 20 ? `${resume.address.substring(0, 20)}...` : resume.address;
        ctx.fillText(address, 45, yPosition);
        yPosition += 20;
      }

      if (resume?.summary && yPosition < 180) {
        ctx.fillStyle = resume?.themeColor || "#3B82F6";
        ctx.font = "bold 11px Arial";
        ctx.fillText("Summary", 30, yPosition);
        yPosition += 15;

        ctx.fillStyle = "#6B7280";
        ctx.font = "9px Arial";
        const summaryText = resume.summary.length > 80 ? `${resume.summary.substring(0, 80)}...` : resume.summary;
        const words = summaryText.split(" ");
        let line = "";
        for (const word of words) {
          const testLine = line + word + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 180) {
            ctx.fillText(line, 30, yPosition);
            line = word + " ";
            yPosition += 12;
            if (yPosition > 200) break;
          } else {
            line = testLine;
          }
        }
        if (line && yPosition <= 200) {
          ctx.fillText(line, 30, yPosition);
          yPosition += 15;
        }
      }

      if (resume?.experience?.length > 0 && yPosition < 200) {
        const exp = resume.experience[0];
        ctx.fillStyle = resume?.themeColor || "#3B82F6";
        ctx.font = "bold 11px Arial";
        ctx.fillText("💼 Experience", 30, yPosition);
        yPosition += 15;

        ctx.fillStyle = "#374151";
        ctx.font = "bold 10px Arial";
        ctx.fillText(exp.title?.substring(0, 20) || "Position", 30, yPosition);
        yPosition += 12;

        ctx.fillStyle = "#6B7280";
        ctx.font = "9px Arial";
        ctx.fillText(exp.companyName?.substring(0, 25) || "Company", 30, yPosition);
        yPosition += 15;
      }

      if (resume?.skills?.length > 0 && yPosition < 230) {
        ctx.fillStyle = resume?.themeColor || "#3B82F6";
        ctx.font = "bold 11px Arial";
        ctx.fillText("Skills", 30, yPosition);
        yPosition += 15;

        let xPosition = 30;
        const maxSkills = 4;
        for (let i = 0; i < Math.min(resume.skills.length, maxSkills); i++) {
          const skill = resume.skills[i];
          const skillText = skill.name?.substring(0, 8) || "Skill";
          ctx.fillStyle = resume?.themeColor || "#3B82F6";
          const padding = 6;
          const textWidth = ctx.measureText(skillText).width;
          ctx.roundRect(xPosition, yPosition, textWidth + padding * 2, 16, 8);
          ctx.fill();

          ctx.fillStyle = "white";
          ctx.font = "8px Arial";
          ctx.fillText(skillText, xPosition + padding, yPosition + 4);

          xPosition += textWidth + padding * 2 + 5;
          if (xPosition > 180) break;
        }

        if (resume.skills.length > maxSkills) {
          ctx.fillStyle = "#6B7280";
          ctx.font = "9px Arial";
          ctx.fillText(`+${resume.skills.length - maxSkills}`, xPosition, yPosition + 6);
        }
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
          }
          setIsGenerating(false);
        },
        "image/png",
        0.95
      );
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (
    typeof CanvasRenderingContext2D !== "undefined" &&
    !CanvasRenderingContext2D.prototype.roundRect
  ) {
    CanvasRenderingContext2D.prototype.roundRect = function (
      x: number,
      y: number,
      width: number,
      height: number,
      radius?: number
    ) {
      const r = typeof radius === "number" ? radius : 8; // fallback if radius is undefined
      this.beginPath();
      this.moveTo(x + r, y);
      this.lineTo(x + width - r, y);
      this.quadraticCurveTo(x + width, y, x + width, y + r);
      this.lineTo(x + width, y + height - r);
      this.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
      this.lineTo(x + r, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - r);
      this.lineTo(x, y + r);
      this.quadraticCurveTo(x, y, x + r, y);
      this.closePath();
    };
  }

    generateImage();

    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [resume]);

  return (
    <div className="space-y-4">
      <div className="w-64">
        {isGenerating ? (
          <div className="h-[280px] bg-gray-100 rounded-t-lg border-t-4 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Generating preview...</p>
            </div>
          </div>
        ) : imageUrl ? (
          <div className="relative group">
            <img
              src={imageUrl}
              alt="Resume Preview"
              className="w-full h-[280px] object-cover rounded-t-lg cursor-pointer hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-t-lg"></div>
          </div>
        ) : (
          <div className="h-[280px] bg-gray-100 rounded-t-lg border-t-4 flex items-center justify-center">
            <p className="text-sm text-gray-600">Failed to generate preview</p>
          </div>
        )}

        <div className="bg-white p-3 rounded-b-lg border border-t-0 border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-sm truncate">
                {resume?.firstName} {resume?.lastName}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {resume?.jobTitle || "Resume"}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={generateImage}
                disabled={isGenerating}
                className="p-1 text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50"
                title="Regenerate preview"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeImagePreview;