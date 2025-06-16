import type { Schema, Struct } from '@strapi/strapi';

export interface ArrayArray extends Struct.ComponentSchema {
  collectionName: 'components_array_arrays';
  info: {
    displayName: 'array';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.Text;
  };
}

export interface CertificateCertificate extends Struct.ComponentSchema {
  collectionName: 'components_certificate_certificates';
  info: {
    displayName: 'Certificate';
    icon: 'file';
  };
  attributes: {
    link: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface EducationEducation extends Struct.ComponentSchema {
  collectionName: 'components_education_educations';
  info: {
    displayName: 'Education';
    icon: 'book';
  };
  attributes: {
    degree: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.Date;
    major: Schema.Attribute.String;
    startDate: Schema.Attribute.Date;
    universityName: Schema.Attribute.String;
  };
}

export interface ExperienceExperience extends Struct.ComponentSchema {
  collectionName: 'components_experience_experiences';
  info: {
    displayName: 'Experience';
    icon: 'briefcase';
  };
  attributes: {
    city: Schema.Attribute.String;
    companyName: Schema.Attribute.String;
    endDate: Schema.Attribute.Date;
    startDate: Schema.Attribute.Date;
    state: Schema.Attribute.String;
    title: Schema.Attribute.String;
    workSummery: Schema.Attribute.Text;
  };
}

export interface ProjectsProjects extends Struct.ComponentSchema {
  collectionName: 'components_projects_projects';
  info: {
    displayName: 'Projects';
    icon: 'stack';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    link: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    tech: Schema.Attribute.String;
  };
}

export interface SkillsSkills extends Struct.ComponentSchema {
  collectionName: 'components_skills_skills';
  info: {
    description: '';
    displayName: 'Skills';
    icon: 'star';
  };
  attributes: {
    coursework: Schema.Attribute.Text;
    languages: Schema.Attribute.Text;
    other: Schema.Attribute.Component<'array.array', true>;
    tools: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'array.array': ArrayArray;
      'certificate.certificate': CertificateCertificate;
      'education.education': EducationEducation;
      'experience.experience': ExperienceExperience;
      'projects.projects': ProjectsProjects;
      'skills.skills': SkillsSkills;
    }
  }
}
