import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PortraitFrame } from "./PortraitFrame";
import { SocialLinks } from "./SocialLinks";
import { getUi, type Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";

export function ProfileSidebar({ locale, label }: { locale: Locale; label: string }) {
  const text = getSiteText(locale);
  const labels = getUi(locale);
  const en = locale === "en";
  const orcidId = siteConfig.profiles.orcid.replace("https://orcid.org/", "");

  const rows = [
    { term: en ? "Academic degree" : "აკადემიური ხარისხი", value: text.academicStatus },
    { term: en ? "Position" : "თანამდებობა", value: text.position },
    { term: en ? "Faculty" : "ფაკულტეტი", value: text.faculty },
    {
      term: en ? "Professional membership" : "პროფესიული წევრობა",
      value: `${text.membershipRole}, ${siteConfig.membership.name} (${siteConfig.membership.postNominal})`,
    },
    { term: en ? "Location" : "მდებარეობა", value: text.location },
  ];

  return (
    <aside className="profile-card" aria-label={label}>
      <PortraitFrame variant="profile" locale={locale} />
      <dl className="profile-facts">
        {rows.map((row) => (
          <div key={row.term}>
            <dt>{row.term}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
        <div>
          <dt>{en ? "Academic email" : "აკადემიური ელფოსტა"}</dt>
          <dd>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </dd>
        </div>
        <div>
          <dt>ORCID iD</dt>
          <dd>
            <a href={siteConfig.profiles.orcid} target="_blank" rel="noopener noreferrer" translate="no">
              {orcidId}
              <ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> {labels.newTab}</span>
            </a>
          </dd>
        </div>
      </dl>
      <SocialLinks locale={locale} exclude={["ORCID"]} />
    </aside>
  );
}
