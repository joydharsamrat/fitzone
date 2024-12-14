/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetLowStockProductsQuery,
  useUpdateProductMutation,
} from "../../../redux/features/product/product.api";
import { TProduct } from "../../../interface";
import ProductTableSkeleton from "../../shared/loaders/ProductTableSkeleton";
import toast from "react-hot-toast";

const LowStockProductsTable = () => {
  const { data, isLoading } = useGetLowStockProductsQuery(undefined);

  const [updateQuantity] = useUpdateProductMutation();

  // State for modal visibility and selected product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [newQuantity, setNewQuantity] = useState<number | "">(0);

  const openModal = (product: TProduct) => {
    setSelectedProduct(product);
    setNewQuantity(product.quantity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setNewQuantity(0);
  };

  const handleUpdate = async () => {
    const loadingToast = toast.loading("Updating...");
    try {
      const res = await updateQuantity({
        data: { quantity: newQuantity },
        id: selectedProduct?._id,
      }).unwrap();

      if (res.error) throw res.error;
      toast.success("Stock updated successfully!", { id: loadingToast });
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || "update failed. Try again.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-5 ">Low Stock Products</h3>
      <div className="overflow-x-auto border px-2">
        <table className="min-w-full table-auto border-collapse border-b border-gray-300">
          <thead>
            <tr>
              <th className="py-2 min-w-[20px] border-b text-start">Image</th>
              <th className="py-2 px-4 min-w-[150px] border-b text-start">
                Name
              </th>
              <th className="py-2 px-4  border-b text-start">Price</th>
              <th className="py-2 px-4  border-b text-center">Quantity</th>
              <th className="py-2 px-4 min-w-[150px] border-b text-start">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            ) : data?.data.length ? (
              data?.data.map((product: TProduct) => (
                <tr key={product._id}>
                  <td className="py-2 border-b">
                    <img
                      className="w-12 h-12 object-cover rounded"
                      src={product.images[0] || "/placeholder.png"}
                      alt={product.name}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {product.quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-3">
                      <button
                        className="bg-primary-700 text-white px-2 py-1 text-sm rounded hover:bg-primary-900"
                        onClick={() => openModal(product)}
                      >
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Restock Product</h3>
            <p className="mb-2">
              <strong>Product:</strong> {selectedProduct.name}
            </p>
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium mb-1">
                Current Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                defaultValue={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LowStockProductsTable;
