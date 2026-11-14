import { HomeView, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("ka");

export default function Page() {
  return <HomeView locale="ka" />;
}
