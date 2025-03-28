import { FaTools } from "react-icons/fa";

const UnderConstruction = ({ goBack }: { goBack?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <FaTools className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Page Under Construction</h1>
      <p className="max-w-xl text-gray-300">
        We're transforming this static page into a dynamic experience where
        students and professionals can generate ATS-friendly resumes instantly
        by providing their job descriptions and details. Please bear with us as
        we work to enhance your experience.
      </p>

      {/* Show "Back" button if goBack is provided */}
      {goBack && (
        <button
          onClick={goBack}
          className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
        >
          Back to Home
        </button>
      )}
      <p className="max-w-xl text-gray-300 mt-14">
        We Dont need any authentication for this page at present conditions.
      </p>
    </div>
  );
};

export default UnderConstruction;
