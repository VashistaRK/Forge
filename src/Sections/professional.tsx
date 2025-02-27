import { resumeTemplates } from "../data/resumeTemplates";

const ResumeTemplates = () => {
  return (
    <div className="flex justify-center items-center xl:px-18 flex-col">
      <div className="flex mt-10 text-center text-3xl max-w-260 font-bold font-mine2 text-gray-800 md:text-6xl">
        Free & Best Resume Templates to Download & Edit
      </div>
      <div className="w-full mt-10 p-6 rounded-3xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border border-gray-200 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-3 rounded-full shadow-md">
            <span className="text-green-500 text-3xl">👑</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Expert's Choice Resume Templates
          </h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Looking for a resume template that can help you get more interviews?
          The following resume templates were picked by our in-house certified
          resume writers as top options for job seekers navigating today's
          competitive job market.
        </p>

        {/* Resume Templates */}
        <div className="flex flex-wrap justify-center gap-5">
          {resumeTemplates
            .filter((template) => template.featured) // Only featured resumes
            .map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300"
              >
                <div className="relative w-full md:h-120 group h-auto">
                  {/* Image */}
                  <img
                    src={template.image}
                    alt={template.name}
                    className="md:w-full md:h-120 h-auto w-auto object-center"
                  />

                  {/* Top Left Text */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {template.name}
                  </div>

                  {/* Bottom Right Button */}
                  <button
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => window.open(template.downloadUrl)}
                  >
                    Download Me
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
