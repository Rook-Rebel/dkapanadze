"use client";

import { motion, useReducedMotion } from "framer-motion";
import { learningSequence } from "@/content/site-content";

export function LearningSequence() {
  const reduceMotion = useReducedMotion();
  const inlineFormula = "(x − a)²";

  return (
    <ol className="learning-sequence" aria-label="სასწავლო თანმიმდევრობა">
      {learningSequence.map((step, index) => (
        <motion.li
          key={step.title}
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.07 }}
        >
          <div
            className={`learning-step-icon learning-step-icon-${step.icon}`}
            aria-hidden="true"
          >
            <span />
            <span />
          </div>
          <div className="learning-step-copy">
            <span>ეტაპი {String(index + 1).padStart(2, "0")}</span>
            <strong>{step.title}</strong>
            <p>
              {step.description.includes(inlineFormula) ? (
                <>
                  {step.description.split(inlineFormula)[0]}
                  <span className="math-inline" dir="ltr">
                    {inlineFormula}
                  </span>
                  {step.description.split(inlineFormula)[1]}
                </>
              ) : (
                step.description
              )}
            </p>
          </div>
          {index < learningSequence.length - 1 ? (
            <i className="learning-step-arrow" aria-hidden="true">
              →
            </i>
          ) : null}
        </motion.li>
      ))}
    </ol>
  );
}
