import React from "react";
import { useLocation, useParams } from "react-router-dom";

const Cart = () => {
  // this will enable access to the param in the path
  const { id } = useParams();
  //this will enable to get queries from url
  const query = new URLSearchParams(useLocation().search);
  return (
    <>
      <h1>Cart page</h1>
      <h2>Id is ={id}</h2>
      <h2>{query.get("firstquery")}</h2>
      <h2>{query.get("secondquery")}</h2>
    </>
  );
};

export default Cart;
