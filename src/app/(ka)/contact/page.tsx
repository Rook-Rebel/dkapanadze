import { ContactView, contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("ka");

export default function Page() {
  return <ContactView locale="ka" />;
}
