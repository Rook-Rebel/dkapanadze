import type { Locale } from "@/i18n";
import { getContent } from "@/i18n/content";

export function AcademicTimeline({ locale, headingLevel = 3 }: { locale: Locale; headingLevel?: 3 | 4 }) {
  const timeline = getContent(locale).timeline;
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <ol className="timeline" data-reveal>
      {timeline.map((item) => (
        <li key={`${item.period}-${item.title}`} className="timeline-item">
          <p className="timeline-period">{item.period}</p>
          <Heading className="timeline-title">{item.title}</Heading>
          <p className="timeline-text">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
