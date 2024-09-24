import { useEffect, useState } from "react";
import { CategoryFilter } from "../home/CategoryFilter";
import { useFormik } from "formik";
import "./ProductForm.css";
import * as yup from "yup";
import { Category } from "../../types/category.type";

let validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  price: yup.number().required("Required").positive("Must be a positive value"),
  description: yup.string().required("Required"),
  image: yup.string().url().required("Required"),
  category: yup.string().test({
    name: "is-not-select",
    skipAbsent: false,
    test(value, ctx) {
      if (value === "select") {
        return ctx.createError({ message: "Must select a value" });
      }
      return true;
    },
  }),
});

export function ProductForm({
  formSubmitStatus,
  setFormSubmitStatus,
  errorMessage,
  setErrorMessage,
}) {
  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "select",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setFormSubmitStatus("pending");
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "POST",
          body: JSON.stringify(values),
        });
        const json = await response.json();
        if (json) {
          setFormSubmitStatus("success");
        }
      } catch (error) {
        setFormSubmitStatus("error");
        setErrorMessage(error);
      }
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryFetchStatus, setCategoryFetchStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [categoryFetchErrorMessage, setCategoryFetchErrorMessage] =
    useState("");
  useEffect(() => {
    async function fetchAllCategories() {
      setCategoryFetchStatus("pending");
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const json = await response.json();
        setCategories(json);
        setCategoryFetchStatus("success");
      } catch (error) {
        setErrorMessage(error.name);
        setCategoryFetchStatus("error");
      }
    }

    fetchAllCategories();
  }, []);
  const [category, setCategory] = useState("select");
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" {...formik.getFieldProps("title")} />
      {formik.touched.title && formik.errors.title ? (
        <div className="error">{formik.errors.title}</div>
      ) : null}
      <label htmlFor="price">Price</label>
      <input type="number" id="price" {...formik.getFieldProps("price")} />
      {formik.touched.price && formik.errors.price ? (
        <div className="error">{formik.errors.price}</div>
      ) : null}
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        {...formik.getFieldProps("description")}
      ></textarea>
      {formik.touched.description && formik.errors.description ? (
        <div className="error">{formik.errors.description}</div>
      ) : null}
      <label htmlFor="image">Image</label>
      <input type="url" id="image" {...formik.getFieldProps("image")} />
      {formik.touched.image && formik.errors.image ? (
        <div className="error">{formik.errors.image}</div>
      ) : null}
      <label htmlFor="category">Category</label>
      {categoryFetchStatus === "error" && (
        <div className="error">{categoryFetchErrorMessage}</div>
      )}
      {categoryFetchStatus === "pending" && (
        <select id="category" disabled>
          <option value="select">Loading...</option>
        </select>
      )}
      {categoryFetchStatus === "success" && (
        <select id="category" {...formik.getFieldProps("category")}>
          <option value="select">Select</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}
      {formik.touched.category && formik.errors.category ? (
        <div className="error">{formik.errors.category}</div>
      ) : null}
    </form>
  );
}

function handleAddProduct(e) {
  const formData = new FormData(e.currentTarget);
  console.log(formData.get("title"));
}
