import { AboutView, aboutMetadata } from "@/views/about";

export const metadata = aboutMetadata("ka");

export default function Page() {
  return <AboutView locale="ka" />;
}
