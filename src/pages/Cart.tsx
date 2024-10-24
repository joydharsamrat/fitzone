import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/features/cart/cartSlice";
import { CartItem } from "../interface";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { useGetProductsStockQuery } from "../redux/features/product/product.api";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

  // Extract product IDs from cartItems for the stock query.
  const productIds = cartItems.map((item) => item._id);

  // Fetch the stock data using the custom hook.
  const { data: stockData, isLoading } = useGetProductsStockQuery(productIds);

  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  // Store the latest stock data in a state for easy access.
  const [latestStock, setLatestStock] = useState<{ [key: string]: number }>({});

  // Update the latestStock state whenever stockData changes.
  useEffect(() => {
    if (stockData) {
      setLatestStock(stockData.data);
    }
  }, [stockData]);

  // Handle increasing the quantity.
  const handleIncreaseQuantity = (productId: string) => {
    const stock = latestStock[productId] || 0;
    const item = cartItems.find((item) => item._id === productId);
    if (item && item.quantity < stock) {
      dispatch(increaseQuantity({ _id: productId }));
    } else {
      alert("Sorry, no more stock available for this product.");
    }
  };

  // Handle decreasing the quantity.
  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity({ _id: productId }));
  };

  // Handle removing item from the cart .
  const handleRemove = (productId: string) => {
    if (confirmRemove === productId) {
      dispatch(removeFromCart(productId));
      setConfirmRemove(null);
    } else {
      setConfirmRemove(productId);
    }
  };

  // Calculate the total price of items in the cart.
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Proceed to the checkout page.
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <h1 className="text-2xl font-semibold mb-5">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-5">
        {isLoading ? (
          <p>Loading stock data...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item: CartItem) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Stock: {latestStock[item._id] || "Loading..."}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-2"
                      onClick={() => handleDecreaseQuantity(item._id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <p className="px-5">{item.quantity}</p>
                    <button
                      className="px-2"
                      onClick={() => handleIncreaseQuantity(item._id)}
                      disabled={
                        latestStock[item._id] !== undefined &&
                        item.quantity >= latestStock[item._id]
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <button
                  className="text-red-500 underline"
                  onClick={() => handleRemove(item._id)}
                >
                  {confirmRemove === item._id ? "Confirm Remove" : "Remove"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && !isLoading && (
        <div className="mt-5">
          <h2 className="text-xl font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button
            className={`mt-4 px-4 py-2 bg-secondary-700 text-white rounded-md ${
              cartItems.some(
                (item) =>
                  item.quantity <= 0 ||
                  item.quantity > (latestStock[item._id] ?? 0)
              )
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={proceedToCheckout}
            disabled={cartItems.some(
              (item) =>
                item.quantity <= 0 ||
                item.quantity > (latestStock[item._id] ?? 0)
            )}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
