import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCartApi,
  checkoutApi,
  reduceQuantityApi,
  selectCart,
} from "../features/userSlice";
import { useSelector } from "react-redux";
import { deleteItemApi } from "../features/userSlice";
import StripeCheckout from "react-stripe-checkout";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);

  let totalCost = 0;
  cartItems.forEach((item) => {
    totalCost += parseFloat(item.price * item.quantity);
  });

  const [product, setproduct] = useState({
    name: "Users Cart Items",
    price: totalCost,
    Productby: "Summer Store",
  });

  const deleteItem = (itemId) => {
    dispatch(deleteItemApi(itemId));
  };

  const incrementer = (item) => {
    dispatch(addToCartApi(item));
  };
  const decrementer = (item, quantity) => {
    if (quantity === 1) {
      deleteItem({ itemId: item.itemId });
    } else {
      dispatch(reduceQuantityApi(item));
    }
  };
  const checkout = async () => {
    await dispatch(checkoutApi());
    await dispatch(addToCartApi());
  };

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:4000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .then(() => checkout())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container-sm">
        <h1 className="mt-5">Cart</h1>
        {cartItems.map((item) => {
          return (
            <>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.item_name}</div>
                    {item.description}
                    <div className="fw-bold text-success">
                      {formatter.format(item.price)}
                    </div>
                  </div>
                  <button
                    className="badge bg-primary rounded-pill me-3"
                    onClick={() =>
                      decrementer(
                        {
                          itemId: item.item_id,
                          quantity: 1,
                        },
                        item.quantity
                      )
                    }
                  >
                    -
                  </button>
                  <p> {item.quantity} </p>
                  <button
                    className="badge bg-primary rounded-pill ms-3"
                    onClick={() =>
                      incrementer({ itemId: item.item_id, quantity: 1 })
                    }
                  >
                    +
                  </button>
                  <button
                    className="badge rounded-pill bg-danger"
                    onClick={() => deleteItem({ itemId: item.item_id })}
                  >
                    Remove From Cart
                  </button>
                </li>
              </ul>
              <br></br>
            </>
          );
        })}
        <div className="card mb-5">
          <h5 className="card-header">Cart Summary</h5>
          <div className="card-body">
            <h5 className="card-title">Cost {formatter.format(totalCost)}</h5>
            <p className="card-text">VAT {formatter.format(totalCost * 0)}</p>
            <h5 className="card-title text-success fw-bold">
              Total Cost + VAT {formatter.format(totalCost * 1.0)}
            </h5>

            <StripeCheckout
              stripeKey="pk_test_51JTPxbB6tcB5SeSOYpXo5JMEeXOJ4TqTsNSkjmf8Ru6c0mkpKvBkk9OTzt0vzBoHfrlUWLClH5eMnYK5rtkeRzHi00hlTtqoE8"
              token={makePayment}
              name="Checkout"
              amount={totalCost * 100}
            >
              <button className="btn btn-primary">Pay with Card</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
