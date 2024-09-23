import { Action } from "../Action";
import { ActionItem } from "../ActionItem";
import { Main } from "../Main";
import { Nav } from "../Nav";
import { ProductForm } from "./ProductForm";
import "./ProductForm.css";

export function ProductAddPage() {
  return (
    <>
      <Nav isDetail={true}></Nav>
      <Main>
        <ProductForm />
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
