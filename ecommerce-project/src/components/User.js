import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../features/orderSlice";
import { selectUser, updateUserInfo } from "../features/userSlice";
import { selectOrders } from "../features/orderSlice";
import Order from "./Order";

const User = () => {
  const user = useSelector(selectUser);
  const ordersRecieved = useSelector(selectOrders);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    console.log("deleted");
    await fetch("http://localhost:4000/user", {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      window.location = "/";
    });
  };

  const updateInfo = async () => {
    const infoToUpdate = { firstName, lastName, address };
    dispatch(updateUserInfo(infoToUpdate));
  };

  const revertInfo = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAddress(user.address);
  };

  const orders = () => {
    dispatch(getOrders());
  };
  return (
    <>
      <div className="container-sm">
        <h2 className="mt-5 mb-4 fw-bold">Account Details</h2>
        <table className="table">
          <tbody className="fs-5">
            <tr className="table-warning">
              <td>First Name</td>
              <td>{user.firstName}</td>
            </tr>
            <tr className="table-light">
              <td>Last Name</td>
              <td>{user.lastName}</td>
            </tr>
            <tr className="table-warning">
              <td>e-mail</td>
              <td>{user.email}</td>
            </tr>
            <tr className="table-light">
              <td>Address</td>
              <td>{user.address}</td>
            </tr>
            <tr className="table-warning">
              <td>Date of Birth</td>
              <td>{user.DOB}</td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-success m-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
          onClick={orders}
        >
          View order history
        </button>

        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Edit Account Info
        </button>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteAccountModal"
        >
          Delete Account
        </button>

        {/* accordian code */}
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {ordersRecieved.map((order) => {
                  return (
                    <>
                      <Order
                        id={order.id}
                        date={order.date_of_order}
                        cost={order.total_cost}
                        items={order.items}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal For Deleting Account */}
      <div
        className="modal fade"
        id="deleteAccountModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                To confirm ...
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to permenantly delete your account?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Exit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteAccount}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editting Account Details */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Update Account Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={revertInfo}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="first-name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    value={firstName}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={revertInfo}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={updateInfo}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
