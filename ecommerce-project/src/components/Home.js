import { useSelector } from "react-redux";
import { selectProducts } from "../features/productSlice";

const Home = () => {
  //This ensures that when you navigate to another route  you go to the top of the page
  // useEffect(() => {
  //   window.scroll(0, 0);
  // }, []);

  const products = useSelector(selectProducts);

  return (
    <>
      <h1>This is the Home Page</h1>
      {products.map((product) => {
        return (
          <>
            <p>{product.item_name}</p>
            <p>{product.description}</p>
          </>
        );
      })}
    </>
  );
};

export default Home;
