import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const PreviewSection = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  if (!resumeInfo) return <p>Loading...</p>;

  const {
    name,
    phone,
    email,
    linkedin,
    github,
    summary,
    education: educationList = [],
    skills,
    certifications = [],
    projects = [],
    Experience: experiences = [],
  } = resumeInfo;

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p>
          {phone} |{" "}
          <a href={`mailto:${email}`} className="text-blue-600">
            {email}
          </a>
        </p>
        <p>
          {linkedin && (
            <a
              href={linkedin}
              className="text-blue-600 mr-4"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}
          {github && (
            <a
              href={github}
              className="text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
        </p>
      </div>

      {summary && (
        <section>
          <h2 className="font-semibold text-xl border-b mb-1">Summary</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {educationList.length > 0 && (
        <section className="mt-4">
          <h2 className="font-semibold text-xl border-b mb-1">Education</h2>
          {educationList.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold">{edu.universityName}</p>
              <p className="text-sm">{edu.degree}</p>
              <p className="text-sm">
                {edu.startDate} to {edu.endDate} | Major: {edu.major}
              </p>
              <p className="text-sm">{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {skills && (
        <section className="mt-4">
          <h2 className="font-semibold text-xl border-b mb-1">
            Technical Skills
          </h2>
          <ul className="text-sm list-disc ml-4">
            <li>
              <b>Languages:</b> {skills.languages}
            </li>
            <li>
              <b>Tools:</b> {skills.tools}
            </li>
            <li>
              <b>Coursework:</b> {skills.coursework}
            </li>
            {skills.other?.map((item, i) => (
              <li key={i}>{item.name}</li>
            ))}
          </ul>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mt-4">
          <h2 className="font-semibold text-xl border-b mb-1">Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold text-sm">
                {exp.title} - {exp.companyName}
              </p>
              <p className="text-sm text-gray-600">
                {exp.city}, {exp.state} | {exp.startDate} - {exp.endDate}
              </p>
              {exp.workSummery && (
                <div
                  className="text-sm mt-1"
                  dangerouslySetInnerHTML={{ __html: exp.workSummery }}
                />
              )}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="mt-4">
          <h2 className="font-semibold text-xl border-b mb-1">
            Certifications / Achievements
          </h2>
          <ul className="text-sm list-disc ml-4">
            {certifications.map((cert, i) => (
              <li key={i}>
                {cert.title}
                {cert.link && (
                  <a
                    href={cert.link}
                    className="text-blue-600 ml-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    (Certificate)
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-4">
          <h2 className="font-semibold text-xl border-b mb-1">Projects</h2>
          {projects.map((project, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold text-sm">
                {project.name} | <i>{project.tech}</i>
              </p>
              <p className="text-sm">{project.desc}</p>
              {project.link && (
                <a
                  href={project.link}
                  className="text-blue-600 text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  (View Project)
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default PreviewSection;
