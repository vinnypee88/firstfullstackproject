import React from "react";

const OrderedItems = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        return (
          <>
            <div className="card mb-3 mt-3 fs-9">
              <h5 className="card-header">
                {">>>"} {item.item_name}
              </h5>
              <div className="card-body">
                <h5 className="card-title">Price : {item.price}</h5>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default OrderedItems;
