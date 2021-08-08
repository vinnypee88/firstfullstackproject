import { useState } from "react";
import { loginUserApi, logoutApi } from "../features/userSlice";
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

  const logout = () => {
    dispatch(logoutApi());
  };

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={loginUser}>
        <label>email</label>
        <input onChange={(e) => setEmail(e.target.value)} />
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Login;
