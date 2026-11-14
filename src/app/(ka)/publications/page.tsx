import { PublicationsView, publicationsMetadata } from "@/views/publications";

export const metadata = publicationsMetadata("ka");

export default function Page() {
  return <PublicationsView locale="ka" />;
}
