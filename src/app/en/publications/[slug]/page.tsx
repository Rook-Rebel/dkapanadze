import type { Metadata } from "next";
import { PublicationView, publicationMetadata, publicationSlugs } from "@/views/publication";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = publicationSlugs;
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return publicationMetadata(slug, "en");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PublicationView slug={slug} locale="en" />;
}
