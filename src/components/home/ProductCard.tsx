import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  return (
    <Link to={`product/${product.id}`}>
      <div className="product-item">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-title">{product.title}</div>
        <div className="product-price">${product.price}</div>
      </div>
    </Link>
  );
}
