import { InteractiveView, interactiveMetadata } from "@/views/interactive";

export const metadata = interactiveMetadata("en");

export default function Page() {
  return <InteractiveView locale="en" />;
}
