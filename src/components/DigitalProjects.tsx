import { ArrowUpRight } from "lucide-react";
import { getUi, type Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";
import { hostFromUrl } from "@/lib/format";
import { ProjectPreview } from "./ProjectPreview";

const previewLabels = {
  en: [
    "Plot of the number of ways to write each even number up to 500 as a sum of two primes",
    "The parabola y = x² with a tangent line and its slope triangle",
  ],
  ka: [
    "500-მდე ყოველი ლუწი რიცხვის ორი მარტივი რიცხვის ჯამად წარმოდგენის რაოდენობის გრაფიკი",
    "პარაბოლა y = x², მისი მხები წრფე და დახრილობის სამკუთხედი",
  ],
} as const;

export function DigitalProjects({ locale, headingLevel = 3 }: { locale: Locale; headingLevel?: 2 | 3 | 4 }) {
  const projects = getSiteText(locale).projects;
  const labels = getUi(locale);
  const en = locale === "en";
  const Heading = headingLevel === 2 ? "h2" : headingLevel === 4 ? "h4" : "h3";

  return (
    <ul className="projects" data-reveal>
      {projects.map((project, index) => (
        <li key={project.url} className={`project project-${index + 1}`}>
          <ProjectPreview index={index} label={previewLabels[locale][index] ?? project.localizedTitle} />
          <div className="project-body">
            <p className="project-category">
              <span className="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.category}
            </p>
            <Heading className="project-title">{project.localizedTitle}</Heading>
            {project.localizedTitle !== project.title ? (
              <p className="project-official" lang="en">
                {project.title}
              </p>
            ) : null}
            <p className="project-text">{project.description}</p>
            <div className="project-footer">
              <a
                className="button button-secondary"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {en ? "Open project" : "პროექტის გახსნა"}
                <span className="sr-only">: {project.localizedTitle}</span>
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {labels.newTab}</span>
              </a>
              <span className="project-host" translate="no">
                {hostFromUrl(project.url)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
