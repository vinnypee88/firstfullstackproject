import { Link } from "react-router-dom";
import { logoutApi } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn } from "../features/userSlice";
import { selectCart } from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectLoggedIn);
  const cart = useSelector(selectCart);

  const logout = () => {
    dispatch(logoutApi());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-primary bg-warning">
        <div className="container-fluid ">
          <Link className="navbar-brand fw-bold ms-5 fs-2" to="/">
            Summer Store
          </Link>
          <button
            className="navbar-toggler navbar-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-5" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                {loggedIn ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    onClick={logout}
                    to="/"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    log in
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {loggedIn ? null : (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {loggedIn ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/cart"
                  >
                    <button type="button" className="btn btn-primary">
                      Cart{" "}
                      <span className="badge badge-light">{cart.length}</span>
                    </button>
                  </Link>
                ) : null}
              </li>
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
