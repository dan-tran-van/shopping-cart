import { useNavigate } from "react-router-dom";
import { NavItem } from "./NavItem";
import "./Nav.css";

export function Nav({ isDetail = false }) {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        {isDetail && (
          <>
            <div className="nav-item" onClick={() => navigate(-1)}>
              Back
            </div>
          </>
        )}
        <NavItem route={`/`}>Home</NavItem>
        <NavItem route={`/cart`}>Cart</NavItem>
      </nav>
    </>
  );
}
