import { TProduct } from "../../interface";
import styles from "../../styles/product.module.css";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <div className={`${styles.product} `}>
      <div>
        <div className={`${styles.productImgContainer} `}>
          <img className="" src={product.images[0]} alt={product.name} />
          <h3 className={`${styles.productName}`}>{product.name}</h3>
        </div>

        <div className="mt-2">
          <p className="text-xs">
            {product.description.length > 50
              ? `${product.description.slice(0, 50)}...`
              : product.description}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <hr className="border " />
        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold">${product.price}</p>
          <a href={`/products/${product._id}`} className="btn-primary">
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
