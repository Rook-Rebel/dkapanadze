import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Formula } from "./Formula";
import { GlassCard } from "./GlassCard";

type ResearchCardProps = {
  index: string;
  title: string;
  description: string;
  formula: string | null;
  href: string;
};

export function ResearchCard({
  index,
  title,
  description,
  formula,
  href,
}: ResearchCardProps) {
  return (
    <GlassCard className={`research-card research-card-${index}`}>
      <div className="research-card-topline">
        <span>{index}</span>
        <Link href={href} aria-label={`${title} — ვრცლად`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {formula ? (
        <div className="research-formula">
          <Formula display>{formula}</Formula>
        </div>
      ) : (
        <div className="learning-miniature" aria-hidden="true">
          <span>ალგებრა</span>
          <i>→</i>
          <span>გეომეტრია</span>
          <i>→</i>
          <span>ანალიზი</span>
        </div>
      )}
      <Link className="text-link" href={href}>
        მიმართულების ნახვა
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </GlassCard>
  );
}
