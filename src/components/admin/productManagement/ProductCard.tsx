/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiFillEdit } from "react-icons/ai";
import { TProduct } from "../../../interface";
import toast from "react-hot-toast";
import { useDeleteProductMutation } from "../../../redux/features/product/product.api";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const ProductTableRow = ({ product }: { product: TProduct }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id: string) => {
    const loadingToast = toast.loading("Deleting...");
    try {
      const res = await deleteProduct(id);
      if (res.error) throw res.error;
      toast.success("Delete successful!", { id: loadingToast });
    } catch (error: any) {
      toast.error(error?.data?.message || "Delete failed. Try again.", {
        id: loadingToast,
      });
    }
  };

  return (
    <tr>
      <td className="py-2  border-b">
        <img
          className="w-12 h-12 object-cover rounded"
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
        />
      </td>
      <td className="py-2 px-4 border-b ">{product.name}</td>
      <td className="py-2 px-4 border-b ">${product.price}</td>
      <td className="py-2 px-4 border-b ">{product.quantity}</td>
      <td className="py-2 px-4 border-b ">
        <div className="flex gap-3">
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="text-red-600 flex items-center gap-2"
          >
            <FaTrashAlt />
            Delete
          </button>
          <Link
            to={`/admin/dashboard/product-management/products/edit/${product._id}`}
            className="text-blue-600 flex items-center gap-2"
          >
            <AiFillEdit />
            Edit
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;
