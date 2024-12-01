/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/product/product.api";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import ProductDetailsBanner from "../../components/product/ProductDetailsBanner";
import SimilarProducts from "../../components/product/SimilarProducts";
import { useAddToCartMutation } from "../../redux/features/cart/cart.api";
import toast from "react-hot-toast";
import { getCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/features/hooks";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product = data?.data;
  const { name, description, price, images, category, quantity, _id } =
    product || {};
  const [imgUrl, setImg] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [addToCart] = useAddToCartMutation();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const user = useAppSelector(getCurrentUser);

  useEffect(() => {
    if (images?.length) {
      setImg(images[0]);
    }
  }, [images]);

  const handleIncreaseQuantity = () => {
    setCurrentQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    const loadingToast = toast.loading("Loading...");
    try {
      setLoading(true);
      const cartItem = {
        user: user?._id,
        product: product._id,
        quantity: currentQuantity,
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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 h-screen  my-20">
        Error loading product details.
      </p>
    );
  }

  return (
    <div>
      <ProductDetailsBanner />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <img
              src={imgUrl}
              alt={name || "Product"}
              className={`w-full max-h-96 object-cover rounded-lg shadow-lg ${
                imageLoading ? "hidden" : "block"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="w-full h-60 sm:h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                <span className="text-gray-400"></span>
              </div>
            )}

            <div className="flex gap-2 justify-center overflow-x-auto">
              {images?.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  onClick={() => setImg(image)}
                  alt={`Product Image ${index + 1}`}
                  className={`w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer ${
                    imgUrl === image ? "border-2 border-secondary-700" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary-700 mb-4">{name}</h1>
            <p className="text-lg text-gray-700 mb-4">{description}</p>
            <p className="text-2xl font-semibold text-primary-500 mb-4">
              ${price}
            </p>
            <p className="text-md text-gray-600 mb-2">
              Category: {category?.title}
            </p>
            <p className="text-md text-gray-600 mb-2">Available: {quantity}</p>

            <div className="mt-6">
              <div className="flex items-center gap-5">
                <p>Quantity</p>
                <div className="flex items-center justify-center gap-10 bg-white px-5 py-2 rounded">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="text-xl hover:text-primary font-bold"
                  >
                    -
                  </button>
                  <p>{currentQuantity}</p>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="text-xl hover:text-primary font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-outline btn-primary hover:text-white w-full"
                >
                  {loading ? "Adding to cart..." : " Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimilarProducts category={category} id={_id} />
    </div>
  );
};

export default ProductDetails;
