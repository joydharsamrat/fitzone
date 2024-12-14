import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteCartItemMutation,
  useGetItemsByUserQuery,
  useUpdateItemQuantityMutation,
} from "../../redux/features/cart/cart.api";
import { useGetProductsStockQuery } from "../../redux/features/product/product.api";
import { TCartItem } from "../../interface";
import Loader from "../../components/shared/Loader";
import CartItemRow from "../../components/cart/CartItemRow";
import CartSummary from "../../components/cart/CartSummary";

const CartPage = () => {
  const navigate = useNavigate();

  const { data: cartData, isLoading: cartLoading } =
    useGetItemsByUserQuery(undefined);
  const [removeFromCart] = useDeleteCartItemMutation();
  const [updateCartQuantity] = useUpdateItemQuantityMutation();

  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [latestStock, setLatestStock] = useState<{ [key: string]: number }>({});

  const productIds =
    cartData?.data?.map((item: TCartItem) => item.product._id) || [];
  const { data: stockData } = useGetProductsStockQuery(productIds, {
    skip: productIds.length === 0,
  });

  useEffect(() => {
    if (stockData?.data) {
      setLatestStock(stockData.data);
    }
  }, [stockData]);

  const totalPrice = cartData?.data?.reduce(
    (total: number, item: TCartItem) =>
      total + item.product.price * item.quantity,
    0
  );

  const isCheckoutDisabled = cartData?.data?.some(
    (item: TCartItem) =>
      item.quantity > (latestStock[item.product._id] || 0) ||
      (latestStock[item.product._id] || 0) === 0
  );

  const handleRemoveItem = async (itemId: string) => {
    try {
      setIsRemoving(itemId);
      await removeFromCart({ id: itemId }).unwrap();
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      setIsUpdating(itemId);
      await updateCartQuantity({ id: itemId, quantity }).unwrap();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const proceedToCheckout = () => navigate(`/user/checkout`);

  if (cartLoading || isRemoving || isUpdating) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 min-h-screen">
      <h1 className="section-title">Cart Items</h1>
      <div className="">
        {cartData?.data?.length === 0 ? (
          <div className="text-center flex flex-col justify-center items-center ">
            <p className="text-red-600 mb-5">Your cart is empty.</p>
            <Link to="/products" className="btn-primary mt-5">
              Shop Now
            </Link>
          </div>
        ) : (
          cartData?.data?.map((item: TCartItem) => (
            <CartItemRow
              key={item._id}
              item={item}
              latestStock={latestStock[item.product._id]}
              isUpdating={isUpdating}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))
        )}
      </div>

      {cartData?.data?.length > 0 && (
        <CartSummary
          totalPrice={totalPrice}
          isCheckoutDisabled={isCheckoutDisabled}
          onCheckout={proceedToCheckout}
        />
      )}
    </div>
  );
};

export default CartPage;
