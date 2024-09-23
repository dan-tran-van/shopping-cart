import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import "./ProductPage.css";
import { Nav } from "../Nav";
import { Main } from "../Main";
import { Action } from "../Action";
import { ActionItem } from "../ActionItem";

export function ProductPage() {
  const { productId } = useParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [product, setProduct] = useState<Product>(null);
  useEffect(() => {
    async function fetchProduct() {
      try {
        setStatus("pending");
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const product = await response.json();
        setStatus("success");
        setProduct(product);
      } catch (error) {
        setErrorMessage(error.name);
        setStatus("error");
      }
    }
    fetchProduct();
  }, []);
  if (status === "pending")
    return (
      <>
        <Nav isDetail={true}></Nav>
        <Action>
          <ActionItem>Buy</ActionItem>
          <ActionItem>Add to cart</ActionItem>
          <ActionItem>Favorite</ActionItem>
        </Action>
        <Main>"loading..."</Main>
      </>
    );
  return (
    <>
      <Nav isDetail={true}></Nav>
      <Action>
        <ActionItem>Buy</ActionItem>
        <ActionItem>Add to cart</ActionItem>
        <ActionItem>Favorite</ActionItem>
      </Action>
      <Main>
        <div id="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div id="product-info">
          <div id="info__title">{product.title}</div>
        </div>
      </Main>
    </>
  );
}
