import Link from "next/link";
import { localizePath } from "@/i18n/paths";
import { Award, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";
import { CertificateDialog } from "./CertificateDialog";

export function MembershipCard({
  locale,
  compact = false,
  headingId = "membership-title",
}: {
  locale: Locale;
  compact?: boolean;
  headingId?: string;
}) {
  const text = getSiteText(locale);
  const en = locale === "en";
  const membership = siteConfig.membership;
  const certificateSrc: string | null = membership.certificateImage;

  return (
    <article className={`membership ${compact ? "membership-compact" : ""}`.trim()} aria-labelledby={headingId} data-reveal>
      <div className="membership-seal" aria-hidden="true">
        <Award />
        <span>{membership.postNominal}</span>
      </div>
      <div className="membership-copy">
        <p className="eyebrow">{en ? "Professional membership" : "პროფესიული წევრობა"}</p>
        <h2 id={headingId} className="membership-title" lang="en">
          {membership.name}
        </h2>
        <p className="membership-role">
          {text.membershipRole}
          <span aria-hidden="true"> · </span>
          <abbr title={`${membership.grade} Member of the Institute of Mathematics and its Applications`} translate="no">
            {membership.postNominal}
          </abbr>
          <span aria-hidden="true"> · </span>
          {text.membershipCountry}
        </p>
        <p className="membership-date">
          {en ? "Elected" : "არჩევის თარიღი"}: <time dateTime={membership.electionDateIso}>{text.electionDate}</time>
        </p>
        {compact ? (
          <Link className="text-link" href={localizePath("/davit-kapanadze", locale)}>
            {en ? "Academic profile" : "აკადემიური პროფილი"}
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <p className="membership-note">
            {en
              ? "Membership reflects a professional affiliation; it does not imply the Institute’s endorsement or assessment of the research."
              : "წევრობა ასახავს პროფესიულ კავშირს და არ გულისხმობს ინსტიტუტის მიერ კვლევის მხარდაჭერას ან შეფასებას."}
          </p>
        )}
        {certificateSrc && !compact ? <CertificateDialog src={certificateSrc} locale={locale} /> : null}
      </div>
    </article>
  );
}
