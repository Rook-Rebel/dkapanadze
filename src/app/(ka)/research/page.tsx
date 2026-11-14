import { ResearchView, researchMetadata } from "@/views/research";

export const metadata = researchMetadata("ka");

export default function Page() {
  return <ResearchView locale="ka" />;
}
