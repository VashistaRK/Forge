import type { ResumeInfo } from "./types";

const dummy: ResumeInfo = {
  name: "Rangoju Vashista Rama Krishna",
  phone: "+91 9515984423",
  email: "218r1a6752@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/vashista-rama-krishna-rangoju-128a35261/",
  github: "https://github.com/VashistaRK",
  summary:
    "I have a strong foundation in programming languages like C++ and Java...",
  jobTitle: "Frontend developer",
  education: [
    {
      universityName: "CMR Engineering College",
      degree: "Bachelor of Science in Computer Science (Data Science)",
      startDate: "2021-09-01", // ✅ valid
      endDate: "2024-06-15", // ✅ valid
      major: "Computer Science",
      // major: "7.0",
      description: "lorem..........................",
    },
  ],
  skills: {
    languages: "C++, Java, HTML/CSS, React, Tailwind",
    tools: "VS Code, Git",
    coursework: "Data Structures and Algorithms, Database systems",
    other: [
      { name: "Strong demonstrated Debugging and Problem Solving skills" },
      {
        name: "Ability to work independently as well as in a team environment",
      },
    ],
  },
  internships: [
    {
      title: "Eduskills, AICTE internship, Supported by AWS",
      certificate:
        "https://www.credly.com/badges/cf85b296-4465-4dcd-a161-fd16b6144c56/print",
    },
  ],
  Experience: [
    {
      id: "1",
      title: "Intern - Eduskills, AICTE internship, Supported by AWS",
      companyName: "AWS Eduskills",
      city: "Remote",
      state: "India",
      startDate: "2023-10-01",
      endDate: "2023-12-10",
      workSummery:
        "Worked on cloud basics using AWS services. Completed various assignments and earned a certificate.",
    },
  ],
  certifications: [
    {
      title: "Smart Interviews - DSA",
      link: "https://smartinterviews.in/certificate/2f0e7966",
    },
    {
      title: "Spoken Tutorials - C",
      link: "https://drive.google.com/file/d/1Yj57Wy8_8P6pzPe7qrWoZKVWQQ_Av_wZ/view",
    },
    {
      title: "Spoken Tutorials - Computers",
      link: "https://drive.google.com/file/d/1cCNVaA6SN3LEzxhhy_XL_uiE2-dHlWRC/view",
    },
    { title: "Hackerrank - Problem Solving" },
    { title: "Smart India Hackathon - 2023, 2024" },
    {
      title: "Udemy - JS, HTML, CSS",
      link: "https://drive.google.com/file/d/1VThgwgPWRTmo8DcWbgGtEUOQib41mKv6/view",
    },
    {
      title: "Udemy - JAVA",
      link: "https://drive.google.com/file/d/1_NkSsenuSIBEvcI1YNU8jLYjPTeFCwGH/view",
    },
  ],
  projects: [
    {
      name: "AI-Powered College Inquiry Chatbot",
      tech: "Python, HTML/CSS, JavaScript, MongoDB, API",
      desc: "This project aims to develop an AI-powered chatbot to handle admissions-related inquiries...",
    },
    {
      name: "Responsive Portfolio Website",
      tech: "React, TailwindCSS",
      desc: "A portfolio website serves as a digital showcase of my work...",
      link: "https://vashistark.github.io/Portfolio",
    },
    {
      name: "Image Forgery Detection Using ML",
      tech: "Python, Keras, TensorFlow, OpenCV, VGG16",
      desc: "Developed a hybrid system combining CNNs and GANs...",
    },
    {
      name: "Jumble Word",
      tech: "HTML, CSS, JavaScript",
      desc: "A word game where players unscramble jumbled words.",
    },
  ],
};

export default dummy;
