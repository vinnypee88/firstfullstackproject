import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Shop Banner</h1>
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
