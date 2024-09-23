import { Key } from "react";
import { ProductCard } from "./ProductCard";

export function ProductList({ products }) {
  const productItems = products.map((product: { id: Key }) => {
    return <ProductCard key={product.id} product={product}></ProductCard>;
  });
  return (
    <>
      <ul id="product-list">{productItems}</ul>
    </>
  );
}
