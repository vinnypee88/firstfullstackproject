import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import { useEffect } from "react";
import { getProducts } from "./features/productSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cart" component={Cart} exact />
          <Route path="/cart/:id" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
