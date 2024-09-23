import { useState } from "react";
import { CategoryFilter } from "../home/CategoryFilter";
import "./ProductForm.css";

export function ProductForm() {
  const [category, setCategory] = useState("select");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddProduct(e);
      }}
    >
      <label htmlFor="title" aria-required>
        Title
      </label>
      <input type="text" name="title" id="title" required={true} />
      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" required={true} />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" required={true}></textarea>
      <label htmlFor="image">Image</label>
      <input
        type="url"
        name="image"
        id="image"
        placeholder="https://example.com"
        required={true}
      />
      <label htmlFor="category">Category</label>
      <CategoryFilter category={category} setCategory={setCategory} />
    </form>
  );
}

function handleAddProduct(e) {
  const formData = new FormData(e.currentTarget);
  console.log(formData.get("title"));
}
