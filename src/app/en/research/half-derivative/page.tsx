import { HalfDerivativeView, halfDerivativeMetadata } from "@/views/half-derivative";

export const metadata = halfDerivativeMetadata("en");

export default function Page() {
  return <HalfDerivativeView locale="en" />;
}
