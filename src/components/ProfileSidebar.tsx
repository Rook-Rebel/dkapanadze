import Link from "next/link";
import { Building2, Mail, MapPin, Network } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PortraitFrame } from "./PortraitFrame";
import { SocialLinks } from "./SocialLinks";

export function ProfileSidebar() {
  return (
    <aside className="profile-sidebar" aria-label="აკადემიური პროფილის მოკლე მონაცემები">
      <PortraitFrame variant="profile" />
      <dl>
        <div>
          <dt>
            <Building2 aria-hidden="true" />
            აკადემიური სტატუსი
          </dt>
          <dd>{siteConfig.academic.status}</dd>
        </div>
        <div>
          <dt>
            <Building2 aria-hidden="true" />
            თანამდებობა
          </dt>
          <dd>{siteConfig.academic.position}</dd>
        </div>
        <div>
          <dt>
            <Building2 aria-hidden="true" />
            აკადემიური კავშირი
          </dt>
          <dd>{siteConfig.affiliation.name}</dd>
        </div>
        <div>
          <dt>
            <Building2 aria-hidden="true" />
            ფაკულტეტი
          </dt>
          <dd>{siteConfig.affiliation.faculty}</dd>
        </div>
        <div>
          <dt>
            <Network aria-hidden="true" />
            პროფესიული წევრობა
          </dt>
          <dd>
            {siteConfig.membership.role}, {siteConfig.membership.name} ·{" "}
            {siteConfig.membership.postNominal}
          </dd>
        </div>
        <div>
          <dt>
            <MapPin aria-hidden="true" />
            მდებარეობა
          </dt>
          <dd>{siteConfig.affiliation.location}</dd>
        </div>
        <div>
          <dt>
            <Mail aria-hidden="true" />
            აკადემიური ელფოსტა
          </dt>
          <dd>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </dd>
        </div>
      </dl>
      <Link
        className="orcid-link"
        href={siteConfig.profiles.orcid}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ORCID პროფილის გახსნა ახალ ჩანართში"
      >
        <span>iD</span>
        0009-0006-8112-5084
      </Link>
      <SocialLinks compact />
    </aside>
  );
}
