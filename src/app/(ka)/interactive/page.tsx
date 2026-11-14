import { InteractiveView, interactiveMetadata } from "@/views/interactive";

export const metadata = interactiveMetadata("ka");

export default function Page() {
  return <InteractiveView locale="ka" />;
}
