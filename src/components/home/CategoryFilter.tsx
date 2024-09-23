import { useEffect, useState } from "react";
import { Category } from "../../types/category.type";
import { Option } from "./Option";

export function CategoryFilter({ defaultCategory, setCategory }) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    async function fetchAllCategories() {
      setStatus("pending");
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const json = await response.json();
        setCategories(json);
        setStatus("success");
      } catch (error) {
        setErrorMessage(error.name);
        setStatus("error");
      }
    }

    fetchAllCategories();
  }, []);

  return (
    <>
      {status === "error" && <>{errorMessage}</>}
      {status === "pending" && (
        <select name="category" id="category" value={"Loading..."} disabled>
          <option value="loading...">Loading...</option>
        </select>
      )}
      {status === "success" && (
        <>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
          >
            <option value={defaultCategory}>{defaultCategory}</option>
            {categories.map((category) => (
              <Option key={category} value={category}></Option>
            ))}
          </select>
        </>
      )}
    </>
  );
}
