import { useState } from "react";
import { registerUserApi } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  // const [verifyPassword, setVerifyPassword] = useState("");

  const dispatch = useDispatch();

  const registerUser = async (e) => {
    e.preventDefault();
    const credentials = {
      firstName,
      lastName,
      dateOfBirth,
      email,
      address,
      password,
    };
    await dispatch(registerUserApi(credentials, password)).then((response) => {
      if (response.payload === "Invalid entries") {
        alert("Invalid Entries");
        return;
      } else if (response.payload === "User already exists") {
        alert("User already exists");
      } else {
        return;
      }
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-5">Register Page</h1>
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="first-name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last-name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
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

          <button className="btn btn-success" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
