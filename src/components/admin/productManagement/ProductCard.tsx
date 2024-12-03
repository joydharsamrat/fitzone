/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TProduct } from "../../../interface";
import styles from "../../../styles/product.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../../../redux/features/product/product.api";
import { useState } from "react";

const ProductCard = ({ product }: { product: TProduct }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [isToastActive, setIsToastActive] = useState(false);

  const handleDeleteProduct = async (id: string) => {
    const toastId = "delete-confirmation";

    if (isToastActive) return;

    setIsToastActive(true);

    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const loadingToast = toast.loading("Deleting...");
                try {
                  const res = await deleteProduct(id);
                  if (res.error) throw res.error;
                  toast.success("Delete successful!", { id: loadingToast });
                } catch (error: any) {
                  toast.error(
                    error?.data?.message || "Delete failed. Try again.",
                    { id: loadingToast }
                  );
                } finally {
                  setIsToastActive(false);
                }
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { id: toastId }
    );
  };

  return (
    <div
      className={`${styles.product} border rounded-lg shadow-md p-4 relative`}
    >
      {/* Image and Name */}
      <div className={`${styles.productImgContainer} relative`}>
        <img
          className="w-full h-40 object-cover rounded-lg"
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
        />
        <h3 className={`${styles.productName} text-lg font-bold mt-2`}>
          {product.name}
        </h3>
      </div>

      {/* Description */}
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          {product.description.length > 50
            ? `${product.description.slice(0, 50)}...`
            : product.description}
        </p>
      </div>

      {/* Price and Actions */}
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-lg">${product.price}</p>
          {/* <a
            href={`/products/${product._id}`}
            className="btn-primary px-3 py-1 text-sm"
            >
            Details
            </a> */}
        </div>
        <hr className="border-gray-300 mb-2" />
      </div>

      {/* Admin Actions */}

      <button
        onClick={() => handleDeleteProduct(product._id)}
        className="bg-secondary-700 text-white text-lg flex items-center justify-center gap-2 py-2 rounded-lg mt-5"
      >
        <AiFillDelete className="text-lg" />
        Delete
      </button>

      <Link
        to={`/admin/dashboard/products/edit/${product._id}`}
        className="absolute top-2 right-2 text-white bg-primary-700 p-2 rounded-full bg-opacity-40 text-xl"
      >
        <AiFillEdit />
      </Link>
    </div>
  );
};

export default ProductCard;
