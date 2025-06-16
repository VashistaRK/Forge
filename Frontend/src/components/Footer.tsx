const Footer = () => {
  return (
    <footer className="bg-[#e1e1ff] text-gray-300 py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Left Section - Quote/Description */}
        <div className="md:w-2/3 text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-semibold text-black">
            "Empowering Careers with AI"
          </h2>
          <p className="text-sm mt-2 text-[#494271]">
            Transforming job applications with AI-driven resume generation.
            Simply enter your job details, and let our platform create an
            ATS-friendly resume tailored to your needs.
          </p>
        </div>

        {/* Right Section - Contact & Support */}
        <div className="flex flex-col md:w-1/3 text-center md:text-right">
          <h3 className="text-lg font-medium text-black">Contact Us</h3>
          <p className="text-sm text-[#544d7e]">Zenmatix@outlook.com</p>
          <p className="text-sm text-[#544d7e]">+91 95159 84423</p>
          <p className="text-sm text-[#544d7e]">+91 81066 27080</p>

          <h3 className="text-lg font-medium text-black mt-4">Support Us</h3>
          <p className="text-sm text-[#544d7e]">
            Your support helps us grow. Share and contribute!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
