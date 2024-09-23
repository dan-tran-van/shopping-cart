import { ProductList } from "./ProductList";
import "./Home.css";
import { Product } from "../../types/product";
import { useEffect, useState } from "react";
import { SortBtn } from "./SortBtn";
import { CategoryFilter } from "./CategoryFilter";
import { Nav } from "../Nav";
import { Main } from "../Main";
import { Action } from "../Action";
import { ActionLink } from "../ActionLink";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [category, setCategory] = useState("all");
  useEffect(() => {
    async function fetchAllProducts() {
      setStatus("pending");
      try {
        if (category === "all") {
          const result: Product[] = await fetch(
            `https://fakestoreapi.com/products?limit=20&sort=${sort}`
          ).then((result) => result.json());
          setProducts(result);
          setStatus("success");
        } else {
          const result: Product[] = await fetch(
            `https://fakestoreapi.com/products/category/${category}?limit=20&sort=${sort}`
          ).then((result) => result.json());
          setProducts(result);
          setStatus("success");
        }
      } catch (error) {
        setStatus("error");
        setErrorMessage(error.name);
      }
    }

    fetchAllProducts();
  }, [sort, category]);

  return (
    <>
      <Nav></Nav>
      <Action>
        <ActionLink route={`product/add`}>Add product</ActionLink>
      </Action>
      <Main>
        <header>
          <label htmlFor="sort">
            Sort
            <SortBtn sort={sort} setSort={setSort}></SortBtn>
          </label>
          <label htmlFor="category">
            Category
            <CategoryFilter
              category={category}
              setCategory={setCategory}
            ></CategoryFilter>
          </label>
        </header>
        <div className="list-product">
          {status === "error" && errorMessage}
          {status === "pending" && "loading..."}
          {status === "success" && (
            <>
              <ProductList products={products}></ProductList>
            </>
          )}
        </div>
      </Main>
    </>
  );
}
