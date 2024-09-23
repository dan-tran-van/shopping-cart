export function ActionItem({ children, handleClick = defaultHandleClick }) {
  return (
    <>
      <div className="action-item" onClick={handleClick}>
        {children}
      </div>
    </>
  );
}

function defaultHandleClick() {
  console.log("hey");
}
