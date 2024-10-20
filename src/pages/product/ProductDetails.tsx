import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/product/product.api";
import Loader from "../../components/shared/Loader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product = data?.data;
  const { name, description, price, images, category } = product || {};
  const [imgUrl, setImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (images?.length) {
      setImg(images[0]);
    }
  }, [images]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    try {
      setLoading(true);
      const cartItem = {
        _id: product._id,
        name,
        price,
        quantity,
        image: imgUrl,
      };
      dispatch(addToCart(cartItem));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Error loading product details.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <img
            src={imgUrl}
            alt={name || "Product"}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2 justify-center overflow-x-auto">
            {images?.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                onClick={() => setImg(image)}
                alt={`Product Image ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${
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
                <p>{quantity}</p>
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
  );
};

export default ProductDetails;
