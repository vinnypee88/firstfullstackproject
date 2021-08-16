import { useSelector } from "react-redux";
import { selectProducts } from "../features/productSlice";
import { useDispatch } from "react-redux";
import { addToCartApi } from "../features/userSlice";
import { selectLoggedIn } from "../features/userSlice";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const Home = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const login = useSelector(selectLoggedIn);

  const addToCart = (itemId) => {
    login
      ? dispatch(addToCartApi(itemId))
      : alert("Please login/register to continue");
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-5 mb-5 text-primary">Get Summer Ready</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => {
            return (
              <div className="col" key={product.id}>
                <div className="card bg-warning">
                  <img src={product.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      {product.item_name}
                    </h5>
                    <p className="card-text">{product.description}</p>
                    <p className="text-success fw-bold fs-4">
                      {formatter.format(product.price)}
                    </p>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        addToCart({ itemId: product.id, quantity: 1 })
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
