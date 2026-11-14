import Link from "next/link";
import { localizePath } from "@/i18n/paths";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n";
import { getContent, getPageText } from "@/i18n/content";
import { Formula } from "./Formula";
import { HeroMotif } from "./MathMotif";
import { PortraitFrame } from "./PortraitFrame";
import { PolynomialVisual } from "./PolynomialVisual";

export function HeroSection({ locale }: { locale: Locale }) {
  const { homeContent } = getContent(locale);
  const t = getPageText(locale).home;
  const en = locale === "en";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroMotif />
      <div className="site-shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{homeContent.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            {homeContent.title}
          </h1>
          <p className="hero-subtitle">{homeContent.subtitle}</p>
          <p className="hero-statement">{homeContent.statement}</p>

          <div className="hero-actions">
            <Link href={localizePath("/publications", locale)} className="button button-primary">
              {t.heroPublications}
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="#research-focus" className="button button-secondary">
              {t.heroResearch}
              <ArrowDown aria-hidden="true" />
            </Link>
          </div>

          <figure className="hero-criterion">
            <figcaption>{t.heroCriterion}</figcaption>
            <div className="equation">
              <Formula
                display
                label={
                  en
                    ? "f of x minus T sub a of x equals x minus a, squared, times Q of x"
                    : "ეფ იქსს მინუს ტე ა იქსი უდრის იქს მინუს ა კვადრატში, გამრავლებული ქიუ იქსზე"
                }
              >
                {"f(x) - T_a(x) = (x - a)^2 Q(x)"}
              </Formula>
              <span className="equation-number" aria-hidden="true">
                (1)
              </span>
            </div>
          </figure>
        </div>

        <div className="hero-visual">
          <PortraitFrame preload variant="hero" locale={locale} />
          <div className="hero-graph">
            <PolynomialVisual locale={locale} />
          </div>
        </div>
      </div>

      <div className="site-shell">
        <ol className="hero-areas" aria-label={t.heroAreas} data-reveal>
          {homeContent.markers.map((marker, index) => (
            <li key={marker}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {marker}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
