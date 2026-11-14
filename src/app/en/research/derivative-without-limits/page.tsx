import { DerivativeView, derivativeMetadata } from "@/views/derivative";

export const metadata = derivativeMetadata("en");

export default function Page() {
  return <DerivativeView locale="en" />;
}
