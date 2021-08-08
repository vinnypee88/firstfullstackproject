import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { getOrders } from "../features/orderSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  // this will enable access to the param in the path
  // const { id } = useParams();
  // //this will enable to get queries from url
  // const query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch();
  const getPreviousOrders = () => {
    console.log("clicked");
    dispatch(getOrders());
  };

  return (
    <>
      <h1>Cart page</h1>
      {/* <h2>Id is ={id}</h2> */}
      {/* <h2>{query.get("firstquery")}</h2>
      <h2>{query.get("secondquery")}</h2> */}
      <button onClick={() => getPreviousOrders()}>GET ORDERS</button>
    </>
  );
};

export default Cart;
