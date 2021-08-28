import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import User from "./components/User";
import { useEffect } from "react";
import { getProducts } from "./features/productSlice";
import { selectLoggedIn } from "../src/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  });

  const login = useSelector(selectLoggedIn);

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login}>
          {login ? <Redirect to="/" /> : null}
        </Route>
        <Route path="/register" component={Register}>
          {login ? <Redirect to="/" /> : null}
        </Route>
        <Route path="/cart" component={Cart} exact />
        <Route path="/cart/:id" component={Cart} />
        <Route path="/user" component={User} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
