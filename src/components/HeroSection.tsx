import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { homeContent } from "@/content/site-content";
import { Formula } from "./Formula";
import { MathematicalBackground } from "./MathematicalBackground";
import { PortraitFrame } from "./PortraitFrame";
import { PolynomialVisual } from "./PolynomialVisual";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <MathematicalBackground />
      <div className="site-shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{homeContent.eyebrow}</p>
          <h1 id="hero-title" className="font-archy-bold">
            {homeContent.title}
          </h1>
          <p className="hero-subtitle">{homeContent.subtitle}</p>
          <p className="hero-statement">{homeContent.statement}</p>

          <div className="hero-actions">
            <Link href="/publications" className="button button-primary">
              ნაშრომების ნახვა
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/research" className="button button-secondary">
              კვლევითი მიმართულებები
              <ArrowDownRight aria-hidden="true" />
            </Link>
          </div>

          <div className="hero-formula">
            <span>ცენტრალური კრიტერიუმი</span>
            <Formula display label="ეფ იქსი მინუს ტე ქვეინდექსი ა უდრის იქსი მინუს ა კვადრატში გამრავლებული ქუ იქსზე">
              {"f(x) - T_a(x) = (x - a)^2 Q(x)"}
            </Formula>
          </div>
        </div>

        <div className="hero-visual-wrap">
          <div className="hero-monogram" aria-hidden="true">
            DK
          </div>
          <PortraitFrame priority variant="hero" />
          <div className="hero-polynomial-inset">
            <PolynomialVisual />
          </div>
        </div>
      </div>

      <div className="site-shell marker-row" aria-label="კვლევითი მიმართულებები">
        {homeContent.markers.map((marker, index) => (
          <span key={marker}>
            <i aria-hidden="true">0{index + 1}</i>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}
