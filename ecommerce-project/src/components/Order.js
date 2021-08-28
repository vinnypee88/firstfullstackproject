import React from "react";
import { useDispatch } from "react-redux";
import { getOrderDetails } from "../features/orderSlice";
import OrderedItems from "./OrderedItems";
const Order = ({ id, date, cost, items }) => {
  const dispatch = useDispatch();

  const orderDetails = (e) => {
    dispatch(getOrderDetails(e.target.id));
  };

  return (
    <div class="card">
      <h5 class="card-header">Order Id - {id}</h5>
      <div class="card-body">
        <p class="card-text fw-bold text-success">Date of Purchase - {date}</p>
        <p class="card-text fw-bold">Total Cost - {cost}</p>
        <button class="btn btn-primary" id={id} onClick={orderDetails}>
          View order details
        </button>
        {items ? <OrderedItems items={items} /> : ""}
      </div>
    </div>
  );
};

export default Order;
