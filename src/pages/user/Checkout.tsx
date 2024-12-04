import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import Form from "../../components/shared/form/Form";
import InputField from "../../components/shared/form/InputField";
import { checkoutSchema } from "../../schemas/Checkoutschema";
import { useGetItemsByUserQuery } from "../../redux/features/cart/cart.api";
import { TCartItem } from "../../interface";
import Loader from "../../components/shared/Loader";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useInitiatePaymentMutation } from "../../redux/features/payment/payment.api";
import { useCreateOrderMutation } from "../../redux/features/order/order.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { data: cartData, isLoading } = useGetItemsByUserQuery(undefined);
  const shippingCharge = 0;

  const [createOrder] = useCreateOrderMutation();
  const [initiatePayment] = useInitiatePaymentMutation();
  const navigate = useNavigate();
  // Total price calculation
  const total = cartData?.data?.reduce(
    (acc: number, item: TCartItem) => acc + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!isLoading && (!cartData || cartData.data.length === 0)) {
      navigate("/user/cart");
    }
  }, [cartData, isLoading, navigate]);

  // Stripe hooks (inside the component)
  const stripe = useStripe();
  const elements = useElements();

  // Loading states for submit and API requests
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: FieldValues) => {
    if (!stripe || !elements) {
      return; // Ensure Stripe and Elements are loaded
    }

    setIsProcessing(true);
    setErrorMessage(null); // Clear previous errors

    const finalTotal = total
      ? parseFloat(total.toFixed(2)) + shippingCharge
      : 0;

    const products = cartData?.data?.map((item: TCartItem) => ({
      productId: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
      image: item.product.images[0],
    }));

    try {
      // Create PaymentIntent on your backend and get the clientSecret
      const response = await initiatePayment(finalTotal).unwrap();
      const clientSecret = response.data.data;

      // Get the CardElement
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: data.fullName,
              email: data.email,
              address: {
                line1: data.address,
                city: data.city,
                state: data.state,
                postal_code: data.zip,
              },
            },
          },
        }
      );

      if (error) {
        setErrorMessage(`Payment failed: ${error.message}`);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment Successful!");

        const orderData = {
          transactionId: paymentIntent.id,
          customerDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
          products: products || [],
          shippingCharge: shippingCharge,
          totalPrice: finalTotal,
        };

        await createOrder(orderData);
        navigate("/user/success");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setErrorMessage("An error occurred during checkout. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {isProcessing && (
        <div className="fixed inset-0 z-[999] ">
          <Loader />
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
          }}
          resolver={zodResolver(checkoutSchema)}
        >
          <div className="space-y-6">
            {/* Billing Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
              <InputField type="text" name="fullName" label="Full Name" />
              <InputField type="email" name="email" label="Email Address" />
              <InputField type="tel" name="phone" label="Phone Number" />
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <InputField type="text" name="address" label="Street Address" />
              <InputField type="text" name="city" label="City" />
              <div className="grid grid-cols-2 gap-4">
                <InputField type="text" name="state" label="State/Province" />
                <InputField type="text" name="zip" label="ZIP Code" />
              </div>
            </div>

            <input
              disabled={isProcessing}
              id="payment_submit"
              type="submit"
              className="hidden"
            />
          </div>
        </Form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        <ul className="space-y-4">
          {cartData?.data?.map((item: TCartItem) => (
            <li key={item._id} className="mb-2">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                <img
                  className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-lg mb-2 md:mb-0"
                  src={item.product.images[0]}
                  alt={item.product.name}
                />
                <div className="flex-1 md:ml-4 text-center md:text-left">
                  <p className="font-medium text-lg">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.product.price}
                  </p>
                </div>
                <span className="font-medium text-lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <hr className="mt-2" />
            </li>
          ))}
          <li className="flex justify-between">
            <span className="font-medium">Shipping</span>
            <span>${shippingCharge.toFixed(2)}</span>
          </li>
        </ul>

        <hr className="my-4" />

        {/* Total Price */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${(total ? total + shippingCharge : 0).toFixed(2)}</span>
        </div>

        {/* Payment Details */}
        <div className="mt-12 mb-5 py-10 px-5 rounded-md box-shadow bg-gradient">
          <h2 className="text-xl text-white font-semibold mb-4">
            Payment Details
          </h2>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "16px",
                  color: "white",
                  letterSpacing: "0.025em",
                  padding: "10px",
                  fontFamily: "Arial, sans-serif",
                  "::placeholder": {
                    color: "white",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                  iconColor: "#e53e3e",
                },
              },
            }}
          />
        </div>

        {/* Payment Button */}
        <div>
          <label
            htmlFor="payment_submit"
            className={`block w-full mt-6 py-2 text-white text-center rounded-lg cursor-pointer ${
              isProcessing
                ? "bg-gray-400"
                : "bg-primary-700 hover:bg-primary-900"
            }`}
          >
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </label>
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
