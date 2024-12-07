/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TProduct } from "../../interface";
import styles from "../../styles/product.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import { useAppSelector } from "../../redux/features/hooks";
import { getCurrentUser, getToken } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useAddToCartMutation } from "../../redux/features/cart/cart.api";

const ProductCard = ({ product }: { product: TProduct }) => {
  const token = useAppSelector(getToken);
  const user = useAppSelector(getCurrentUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addToCart] = useAddToCartMutation();
  const location = useLocation();

  const handleAddToCart = async () => {
    const loadingToast = toast.loading("Loading...");
    if (!token) {
      toast.error("Please log in to continue", { id: loadingToast });
      navigate(`/login`, { state: { from: location }, replace: true });
      return;
    }
    try {
      setLoading(true);
      const cartItem = {
        user: user?._id,
        product: product._id,
        quantity: 1,
      };
      const res = await addToCart(cartItem);
      if (res.error) {
        throw res.error;
      }
      toast.success("Item added to cart", { id: loadingToast });
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message ||
          error?.data?.message ||
          "Sign up failed. Please try again.",
        {
          id: loadingToast,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.product} border-4 `}>
      <div>
        <div className={`${styles.productImgContainer} `}>
          <img className="" src={product.images[0]} alt={product.name} />
        </div>

        <div className="px-2">
          <p className="font-semibold mt-2 text-red-600 md:text-lg">
            ${product.price}
          </p>

          <h3 className="text-xs md:text-sm font-semibold">{product.name}</h3>

          <div className="my-2">
            <p className="text-[10px] md:text-xs">
              {product.description.length > 50
                ? `${product.description.slice(0, 50)}...`
                : product.description}
            </p>
          </div>
        </div>
      </div>

      <div className=" px-2">
        <hr className="border" />
        <div className="flex items-center justify-around py-3">
          <Link
            title="view product details"
            className="text-primary-700 font-semibold text-sm md:text-base"
            to={`/products/${product._id}`}
          >
            View Details
          </Link>
          <button
            disabled={loading || product.quantity < 1}
            onClick={handleAddToCart}
            title="Add to cart"
            className="text-xl text-primary-700"
          >
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
