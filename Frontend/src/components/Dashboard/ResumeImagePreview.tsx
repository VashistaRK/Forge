import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const ResumeImagePreview = ({ resume }: { resume: any }) => {
  //   const previewRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to draw resume preview on canvas
  const generateImage = async () => {
    setIsGenerating(true);

    try {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Canvas context not available");
        setIsGenerating(false);
        return;
      }

      const scale = 2; // For high DPI displays
      canvas.width = 256 * scale;
      canvas.height = 280 * scale;
      canvas.style.width = "256px";
      canvas.style.height = "280px";

      ctx.scale(scale, scale);

      // Set text rendering quality
      ctx.textBaseline = "top";
      ctx.imageSmoothingEnabled = true;

      // Create background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 280);
      gradient.addColorStop(0, "#fce7f3");
      gradient.addColorStop(0.5, "#ddd6fe");
      gradient.addColorStop(1, "#dbeafe");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 280);

      // Add top border
      ctx.fillStyle = resume?.themeColor || "#3B82F6";
      ctx.fillRect(0, 0, 256, 4);

      // Add white content background with rounded corners
      ctx.fillStyle = "white";
      ctx.roundRect(16, 16, 224, 248, 8);
      ctx.fill();

      // Add subtle shadow to content area
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

      // Draw avatar circle
      const avatarRadius = 12;
      ctx.fillStyle = resume?.themeColor || "#3B82F6";
      ctx.beginPath();
      ctx.arc(128, yPosition, avatarRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Draw avatar initial
      ctx.fillStyle = "white";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      const initial = resume?.firstName?.charAt(0)?.toUpperCase() || "U";
      ctx.fillText(initial, 128, yPosition - 6);

      yPosition += 25;

      // Draw name
      ctx.fillStyle = resume?.themeColor || "#3B82F6";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      const fullName = `${resume?.firstName || "John"} ${
        resume?.lastName || "Doe"
      }`;
      ctx.fillText(fullName, 128, yPosition);

      yPosition += 20;

      // Draw job title
      ctx.fillStyle = "#6B7280";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      const jobTitle = resume?.jobTitle || "Professional Title";
      ctx.fillText(jobTitle, 128, yPosition);

      yPosition += 25;

      // Draw separator line
      ctx.strokeStyle = "#E5E7EB";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, yPosition);
      ctx.lineTo(210, yPosition);
      ctx.stroke();

      yPosition += 15;

      // Reset text alignment for left-aligned content
      ctx.textAlign = "left";

      // Draw contact info
      if (resume?.email) {
        ctx.fillStyle = "#6B7280";
        ctx.font = "10px Arial";
        ctx.fillText("✉", 30, yPosition);
        ctx.fillText(
          resume.email.length > 25
            ? resume.email.substring(0, 25) + "..."
            : resume.email,
          45,
          yPosition
        );
        yPosition += 15;
      }

      if (resume?.phone) {
        ctx.fillStyle = "#6B7280";
        ctx.font = "10px Arial";
        ctx.fillText("📞", 30, yPosition);
        ctx.fillText(resume.phone, 45, yPosition);
        yPosition += 15;
      }

      if (resume?.address) {
        ctx.fillStyle = "#6B7280";
        ctx.font = "10px Arial";
        ctx.fillText("📍", 30, yPosition);
        const address =
          resume.address.length > 20
            ? resume.address.substring(0, 20) + "..."
            : resume.address;
        ctx.fillText(address, 45, yPosition);
        yPosition += 20;
      }

      // Draw summary if available
      if (resume?.summary && yPosition < 180) {
        ctx.fillStyle = resume?.themeColor || "#3B82F6";
        ctx.font = "bold 11px Arial";
        ctx.fillText("Summary", 30, yPosition);
        yPosition += 15;

        ctx.fillStyle = "#6B7280";
        ctx.font = "9px Arial";
        const summaryText =
          resume.summary.length > 80
            ? resume.summary.substring(0, 80) + "..."
            : resume.summary;
        const words = summaryText.split(" ");
        let line = "";
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > 180 && i > 0) {
            ctx.fillText(line, 30, yPosition);
            line = words[i] + " ";
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

      // Draw experience if available and space permits
      if (
        resume?.experience &&
        resume.experience.length > 0 &&
        yPosition < 200
      ) {
        ctx.fillStyle = resume?.themeColor || "#3B82F6";
        ctx.font = "bold 11px Arial";
        ctx.fillText("💼 Experience", 30, yPosition);
        yPosition += 15;

        const exp = resume.experience[0];
        ctx.fillStyle = "#374151";
        ctx.font = "bold 10px Arial";
        const title =
          exp.title?.length > 20
            ? exp.title.substring(0, 20) + "..."
            : exp.title;
        ctx.fillText(title || "Position", 30, yPosition);
        yPosition += 12;

        ctx.fillStyle = "#6B7280";
        ctx.font = "9px Arial";
        const company =
          exp.companyName?.length > 25
            ? exp.companyName.substring(0, 25) + "..."
            : exp.companyName;
        ctx.fillText(company || "Company", 30, yPosition);
        yPosition += 15;
      }

      // Draw skills if available and space permits
      if (resume?.skills && resume.skills.length > 0 && yPosition < 230) {
        ctx.fillStyle = resume?.themeColor || "#3B82F6";
        ctx.font = "bold 11px Arial";
        ctx.fillText("Skills", 30, yPosition);
        yPosition += 15;

        let xPosition = 30;
        const maxSkills = 4;
        for (let i = 0; i < Math.min(resume.skills.length, maxSkills); i++) {
          const skill = resume.skills[i];
          const skillText =
            skill.name?.length > 8
              ? skill.name.substring(0, 8) + "..."
              : skill.name;

          // Draw skill badge
          ctx.fillStyle = resume?.themeColor || "#3B82F6";
          const padding = 6;
          const textWidth = ctx.measureText(skillText).width;
          ctx.roundRect(xPosition, yPosition, textWidth + padding * 2, 16, 8);
          ctx.fill();

          // Draw skill text
          ctx.fillStyle = "white";
          ctx.font = "8px Arial";
          ctx.fillText(skillText, xPosition + padding, yPosition + 4);

          xPosition += textWidth + padding * 2 + 5;
          if (xPosition > 180) break;
        }

        if (resume.skills.length > maxSkills) {
          ctx.fillStyle = "#6B7280";
          ctx.font = "9px Arial";
          ctx.fillText(
            `+${resume.skills.length - maxSkills}`,
            xPosition,
            yPosition + 6
          );
        }
      }

      // Convert canvas to blob URL
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
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
    // Add roundRect polyfill for older browsers
    if (
      typeof CanvasRenderingContext2D !== "undefined" &&
      !CanvasRenderingContext2D.prototype.roundRect
    ) {
      CanvasRenderingContext2D.prototype.roundRect = function (
        x,
        y,
        width,
        height,
        radius
      ) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.lineTo(x + width, y + height - radius);
        this.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        );
        this.lineTo(x + radius, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.lineTo(x, y + radius);
        this.quadraticCurveTo(x, y, x + radius, y);
        this.closePath();
      };
    }

    // Generate image on mount
    generateImage();

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [resume]);

  return (
    <div className="space-y-4">
      {/* Hidden Preview Removed - Using Canvas Generation */}

      {/* Display Generated Image */}
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

        {/* Action Buttons */}
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
