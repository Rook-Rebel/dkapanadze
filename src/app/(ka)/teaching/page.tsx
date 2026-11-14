import { TeachingView, teachingMetadata } from "@/views/teaching";

export const metadata = teachingMetadata("ka");

export default function Page() {
  return <TeachingView locale="ka" />;
}
