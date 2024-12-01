import React from "react";
import { TCartItem } from "../../interface";

interface CartItemRowProps {
  item: TCartItem;
  latestStock: number | undefined;
  isUpdating: string | null;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  latestStock,
  isUpdating,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="flex justify-between items-center  p-4 bg-white box-shadow rounded-lg mb-5">
      <div className="flex items-center">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="h-16 w-16 md:w-24 md:h-24 object-cover mr-4"
        />
        <div>
          <h2 className="md:text-lg font-semibold">{item.product.name}</h2>
          <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
          <p className="text-gray-600">Stock: {latestStock ?? "Loading..."}</p>
          <div className="flex items-center mt-2">
            <button
              className="px-2"
              onClick={() =>
                onQuantityChange(item._id, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1 || isUpdating === item._id}
            >
              -
            </button>
            <p className="px-5">{item.quantity}</p>
            <button
              className="px-2"
              onClick={() => onQuantityChange(item._id, item.quantity + 1)}
              disabled={
                (latestStock !== undefined && item.quantity >= latestStock) ||
                isUpdating === item._id
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
          onClick={() => onRemove(item._id)}
          disabled={isUpdating === item._id}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;
