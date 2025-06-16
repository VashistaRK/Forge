// types.ts

export interface EducationItem {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
  // cgpa: string;
}

export interface Skills {
  languages: string;
  tools: string;
  coursework: string;
  other: OtherSkills[];
}

export interface OtherSkills {
  name: string;
}

// export interface Internship {
//   title: string;
//   certificate?: string;
// }

export interface Certification {
  title: string;
  link?: string;
}

export interface Project {
  name: string;
  tech: string;
  desc: string;
  link?: string;
}
export interface ExperienceItem {
  id?: string | undefined;
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  workSummery: string;
}

export interface ResumeInfo {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  jobTitle?: string;
  education: EducationItem[];
  skills: Skills;
  // internships: Internship[];
  Experience: ExperienceItem[];
  certifications: Certification[];
  projects: Project[];
  [key: string]: unknown;
}
