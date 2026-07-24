import { ArrowUpRight, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function DigitalProjects() {
  return (
    <div className="digital-projects-grid">
      {siteConfig.projects.map((project, index) => (
        <article
          className={`digital-project-card digital-project-card-${index + 1}`}
          key={project.url}
        >
          <div className="project-topline">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <ExternalLink aria-hidden="true" />
          </div>
          <div className="project-geometry" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="project-category">{project.category}</p>
          <h3>{project.georgianTitle}</h3>
          <p className="project-english-title" lang="en">
            {project.title}
          </p>
          <p>{project.description}</p>
          <a
            className="button button-secondary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.georgianTitle} — გარე პლატფორმის გახსნა ახალ ჩანართში`}
          >
            პროექტის გახსნა
            <ArrowUpRight aria-hidden="true" />
          </a>
          <small>იხსნება გარე პლატფორმაზე</small>
        </article>
      ))}
    </div>
  );
}
