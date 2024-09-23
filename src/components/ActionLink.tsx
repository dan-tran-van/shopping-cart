import { Link } from "react-router-dom";

export function ActionLink({ route, children }) {
  return (
    <>
      <Link to={route}>{children}</Link>
    </>
  );
}
