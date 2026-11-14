import Image from "next/image";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";

type PortraitFrameProps = {
  preload?: boolean;
  variant?: "hero" | "profile" | "contact";
  locale: Locale;
};

const sizes = {
  hero: "(max-width: 899px) min(84vw, 26rem), 26rem",
  profile: "(max-width: 999px) min(80vw, 22rem), 21rem",
  contact: "96px",
} as const;

/**
 * Editorial portrait: a quiet frame with a faint coordinate grid behind the
 * cut-out (hero), and the caption set beneath the image like a figure note.
 */
export function PortraitFrame({ preload = false, variant = "profile", locale }: PortraitFrameProps) {
  const text = getSiteText(locale);
  const isHero = variant === "hero";
  return (
    <figure className={`portrait portrait-${variant}`}>
      <div className="portrait-frame">
        <div className="portrait-media">
          {isHero ? (
            <span className="portrait-glyph" aria-hidden="true">
              ∂
            </span>
          ) : null}
          <Image
            src={isHero ? "/images/davit-kapanadze-cutout.png" : siteConfig.portrait.src}
            alt={text.portraitAlt}
            width={siteConfig.portrait.width}
            height={siteConfig.portrait.height}
            preload={preload}
            fetchPriority={preload ? "high" : undefined}
            sizes={sizes[variant]}
          />
        </div>
      </div>
      {variant === "contact" ? null : (
        <figcaption>
          <strong>{text.name}</strong>
          <span>{text.position}</span>
        </figcaption>
      )}
    </figure>
  );
}
