import { timeline } from "@/content/site-content";

export function AcademicTimeline() {
  return (
    <ol className="academic-timeline">
      {timeline.map((item) => (
        <li key={`${item.period}-${item.title}`}>
          <div className="timeline-marker" aria-hidden="true">
            <span />
          </div>
          <time>{item.period}</time>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

