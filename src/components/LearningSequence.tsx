import type { Locale } from "@/i18n";
import { getContent } from "@/i18n/content";
import { MathIcon, type MathIconName } from "./MathIcon";
import { MathText } from "./MathText";

export function LearningSequence({ locale }: { locale: Locale }) {
  const steps = getContent(locale).learningSequence;
  const en = locale === "en";
  return (
    <ol
      className="learning-sequence"
      aria-label={en ? "Learning sequence" : "სასწავლო თანმიმდევრობა"}
      data-reveal
    >
      {steps.map((step, index) => (
        <li key={step.title} className="learning-step">
          <span className="learning-step-marker">
            <MathIcon name={step.icon as MathIconName} />
          </span>
          <div className="learning-step-copy">
            <span className="learning-step-number">
              {en ? "Step" : "ეტაპი"} {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="learning-step-title">{step.title}</h3>
            <p>
              <MathText>{step.description}</MathText>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
