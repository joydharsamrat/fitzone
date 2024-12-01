import { TCartItem } from "../../interface";

interface CartItemRowProps {
  item: TCartItem;
  latestStock: number | undefined;
  isUpdating: string | null;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItemRow = ({
  item,
  latestStock,
  isUpdating,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white box-shadow rounded-lg p-5 mb-5">
      {/* Product Image and Details */}
      <div className="flex items-center w-full md:w-2/3">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-md mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {item.product.name}
          </h2>
          <p className="text-gray-600">
            Price: ${item.product.price.toFixed(2)}
          </p>
          <p
            className={`text-sm ${
              latestStock && item.quantity > latestStock
                ? "text-red-500"
                : "text-gray-600"
            }`}
          >
            Stock: {latestStock ?? "Loading..."}
          </p>
          <div className="flex items-center mt-2">
            {/* Decrease Quantity Button */}
            <button
              className={`px-2 py-1 border rounded-md ${
                item.quantity <= 1 || isUpdating === item._id
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-800 border-gray-400 hover:bg-gray-100"
              }`}
              onClick={() =>
                onQuantityChange(item._id, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1 || isUpdating === item._id}
            >
              -
            </button>

            {/* Quantity Display */}
            <p className="px-4 font-semibold text-gray-800">{item.quantity}</p>

            {/* Increase Quantity Button */}
            <button
              className={`px-2 py-1 border rounded-md ${
                (latestStock !== undefined && item.quantity >= latestStock) ||
                isUpdating === item._id
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-800 border-gray-400 hover:bg-gray-100"
              }`}
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

      {/* Remove Button */}
      <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
        <button
          className={`text-sm font-medium text-red-500 hover:underline ${
            isUpdating === item._id ? "cursor-not-allowed opacity-50" : ""
          }`}
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
