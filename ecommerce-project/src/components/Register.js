import { useState } from "react";
import { registerUserApi, loginUserApi } from "../features/userSlice";
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
        // dispatch(loginUserApi({ email, password }));
      }
    });
  };

  return (
    <>
      <h1>Register Page</h1>
      <form onSubmit={registerUser}>
        <label>First Name</label>
        <input onChange={(e) => setFirstName(e.target.value)} />
        <label>Last Name</label>
        <input onChange={(e) => setLastName(e.target.value)} />
        <label>date of birth</label>
        <input onChange={(e) => setDateOfBirth(e.target.value)} />
        <label>email</label>
        <input onChange={(e) => setEmail(e.target.value)} />
        <label>address</label>
        <input onChange={(e) => setAddress(e.target.value)} />
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} />
        {/* <label>verify password</label>
        <input onChange={(e) => setVerifyPassword(e.target.value)} /> */}
        {/* add some logic to disable button if passwords do not match */}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
