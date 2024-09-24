import { useState } from "react";
import { Action } from "../Action";
import { ActionItem } from "../ActionItem";
import { Main } from "../Main";
import { Nav } from "../Nav";
import { ProductForm } from "./ProductForm";
import "./ProductForm.css";

export function ProductAddPage() {
  const [formSubmitStatus, setFormSubmitStatus] = useState<
    "notSubmitting" | "pending" | "error" | "success"
  >("notSubmitting");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <Nav isDetail={true}></Nav>
      <Main>
        {formSubmitStatus === "success" && (
          <div className="success-message">Success</div>
        )}

        {formSubmitStatus === "error" && (
          <div className="error-message">{errorMessage}</div>
        )}
        {formSubmitStatus === "pending" && (
          <div className="pending">Uploading...</div>
        )}
        {formSubmitStatus === "notSubmitting" && (
          <ProductForm
            formSubmitStatus={formSubmitStatus}
            setFormSubmitStatus={setFormSubmitStatus}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </Main>
      <Action>
        <ActionItem handleClick={handleConfirm}>Confirm</ActionItem>
      </Action>
    </>
  );
}

function handleConfirm() {
  const addProductForm = document.querySelector("form");
  addProductForm.requestSubmit();
}
