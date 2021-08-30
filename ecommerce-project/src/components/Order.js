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
    <div className="card">
      <h5 className="card-header">Order Id - {id}</h5>
      <div className="card-body">
        <p className="card-text fw-bold text-success">
          Date of Purchase - {date}
        </p>
        <p className="card-text fw-bold">Total Cost - ${cost}</p>
        <button className="btn btn-primary" id={id} onClick={orderDetails}>
          View order details
        </button>
        {items ? <OrderedItems items={items} /> : ""}
      </div>
    </div>
  );
};

export default Order;
