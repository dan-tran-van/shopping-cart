import { Link } from "react-router-dom";

export function NavItem({ route, children }) {
  return (
    <>
      <Link to={route}>
        <div className="nav-item">{children}</div>
      </Link>
    </>
  );
}
