interface CartSummaryProps {
  totalPrice: number;
  isCheckoutDisabled: boolean;
  onCheckout: () => void;
}

const CartSummary = ({
  totalPrice,
  isCheckoutDisabled,
  onCheckout,
}: CartSummaryProps) => {
  return (
    <div className="bg-white rounded-lg my-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Cart Summary</h2>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700 font-medium">Subtotal:</p>
        <p className="text-gray-900 font-semibold">${totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700 font-medium">Delivery Charge:</p>
        <p className="text-gray-900 font-semibold">$0.00</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold text-gray-800">Total:</p>
        <p className="text-lg font-bold text-secondary-700">
          ${(totalPrice + 0).toFixed(2)}
        </p>
      </div>
      <button
        className={`w-full py-3 rounded-md text-white font-medium transition ${
          isCheckoutDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-secondary-700 hover:bg-secondary-800"
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
