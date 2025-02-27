import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setResponseMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred. Please try again later.");
    }

    setTimeout(() => setResponseMessage(""), 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-6">
      <section className="w-full max-w-xl mb-8">
        <img
          src="./images/contactUs.png"
          alt="Contact Us Banner"
          className="w-full rounded-lg shadow-lg"
        />
      </section>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-gray-200">
        <h1 className="text-4xl font-extrabold font-mine2 text-center text-gray-800 mb-4">
          Get in Touch
        </h1>
        <p className="text-center text-gray-600 mb-6 text-lg">
          We'd love to hear from you! Whether you have suggestions, feedback, or
          need to report a bug, please fill out the form below. Our team will
          review your message and get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-gray-700 font-medium mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your company name (Eg:None)"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Work Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your work email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-1"
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-28"
              placeholder="How can we help you?"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-md"
            >
              <span className="mr-2">Send Message</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-white"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className="mt-4 text-green-600 text-center font-medium text-lg">
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
