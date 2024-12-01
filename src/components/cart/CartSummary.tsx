import React from "react";

interface CartSummaryProps {
  totalPrice: number;
  isCheckoutDisabled: boolean;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  isCheckoutDisabled,
  onCheckout,
}) => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold">
        Total Price: ${totalPrice.toFixed(2)}
      </h2>
      <button
        className={`mt-4 px-4 py-2 bg-secondary-700 text-white rounded-md ${
          isCheckoutDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onCheckout}
        disabled={isCheckoutDisabled}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
