// export default {
//   firstName: "James",
//   lastName: "Carter",
//   jobTitle: "full stack developer",
//   address: "525 N tryon Street, NC 28117",
//   phone: "(123)-456-7890",
//   email: "exmaple@gmail.com",
//   themeColor: "#ff6666",
//   summery:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   experience: [
//     {
//       id: 1,
//       title: "Full Stack Developer",
//       companyName: "Amazon",
//       city: "New York",
//       state: "NY",
//       startDate: "Jan 2021",
//       endDate: "",
//       currentlyWorking: true,
//       workSummery:
//         " Designed, developed, and maintained full-stack applications using React and Node.js.\n" +
//         "• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n" +
//         "various devices and browsers.\n" +
//         "• Maintaining the React Native in-house organization application." +
//         "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
//         "and back-end systems.",
//     },
//     {
//       id: 2,
//       title: "Frontend Developer",
//       companyName: "Google",
//       city: "Charlotte",
//       state: "NC",
//       startDate: "May 2019",
//       endDate: "Jan 2021",
//       currentlyWorking: false,
//       workSummery:
//         " Designed, developed, and maintained full-stack applications using React and Node.js." +
//         "• Implemented responsive user interfaces with React, ensuring seamless user experiences across" +
//         "various devices and browsers." +
//         "• Maintaining the React Native in-house organization application." +
//         "• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end" +
//         "and back-end systems.",
//     },
//   ],
//   education: [
//     {
//       id: 1,
//       universityName: "Western Illinois University",
//       startDate: "Aug 2018",
//       endDate: "Dec:2019",
//       degree: "Master",
//       major: "Computer Science",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
//     },
//     {
//       id: 2,
//       universityName: "Western Illinois University",
//       startDate: "Aug 2018",
//       endDate: "Dec:2019",
//       degree: "Master",
//       major: "Computer Science",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
//     },
//   ],
//   skills: [
//     {
//       id: 1,
//       name: "Angular",
//       rating: 80,
//     },
//     {
//       id: 1,
//       name: "React",
//       rating: 100,
//     },
//     {
//       id: 1,
//       name: "MySql",
//       rating: 80,
//     },
//     {
//       id: 1,
//       name: "React Native",
//       rating: 100,
//     },
//   ],
// };

// dummy.ts
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
