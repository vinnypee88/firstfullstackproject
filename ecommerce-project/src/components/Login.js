import { useState } from "react";
import { loginUserApi } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginUser = (e) => {
    e.preventDefault();
    //call api and log in user
    const credentials = {
      email,
      password,
    };
    dispatch(loginUserApi(credentials));
  };
  return (
    <>
      <div className="container">
        <h1 className="mt-5">Login Page</h1>

        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Log in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
