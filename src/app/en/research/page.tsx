import { ResearchView, researchMetadata } from "@/views/research";

export const metadata = researchMetadata("en");

export default function Page() {
  return <ResearchView locale="en" />;
}
