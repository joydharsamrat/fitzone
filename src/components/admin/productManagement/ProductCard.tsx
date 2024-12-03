import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TProduct } from "../../../interface";
import styles from "../../../styles/product.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: TProduct }) => {
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

      <button className="bg-secondary-700 text-white text-lg flex items-center justify-center gap-2 py-2 rounded-lg mt-5">
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
