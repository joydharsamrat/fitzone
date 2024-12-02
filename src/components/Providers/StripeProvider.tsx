import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

const StripeProvider = ({ children }: { children: ReactNode }) => {
  const stripePromise = loadStripe(
    "pk_test_51M6T5zFQoY71KyEkci3POiCm1ItXqr7KPFSVnIB6w5zT4PC4rp4fpuCcOorrX8il0ZPE1Eb5C4qrCeOjb2YtEKP800fsuF8T62" // Replace with your Stripe public key
  );
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
