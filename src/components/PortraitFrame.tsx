import Image from "next/image";
import { siteConfig } from "@/config/site";

type PortraitFrameProps = {
  priority?: boolean;
  variant?: "hero" | "profile" | "contact";
};

export function PortraitFrame({
  priority = false,
  variant = "profile",
}: PortraitFrameProps) {
  return (
    <figure className={`portrait-frame portrait-frame-${variant}`}>
      <div className="portrait-math-layer" aria-hidden="true">
        <span>∂</span>
        <i className="math-inline" dir="ltr">
          (x − a)²
        </i>
      </div>
      <div className="portrait-image-wrap">
        <Image
          src={
            variant === "hero"
              ? "/images/davit-kapanadze-cutout.png"
              : siteConfig.portrait.src
          }
          alt={siteConfig.portrait.alt}
          width={siteConfig.portrait.width}
          height={siteConfig.portrait.height}
          priority={priority}
          sizes={
            variant === "hero"
              ? "(max-width: 900px) 88vw, 42vw"
              : variant === "contact"
                ? "160px"
                : "(max-width: 900px) 80vw, 320px"
          }
        />
      </div>
      <figcaption>
        <strong>{siteConfig.name.georgian}</strong>
        <span>{siteConfig.academic.position}</span>
      </figcaption>
    </figure>
  );
}
