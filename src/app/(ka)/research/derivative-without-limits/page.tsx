import { DerivativeView, derivativeMetadata } from "@/views/derivative";

export const metadata = derivativeMetadata("ka");

export default function Page() {
  return <DerivativeView locale="ka" />;
}
