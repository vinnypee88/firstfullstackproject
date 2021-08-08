import { useEffect } from "react";

const Home = () => {
  //This ensures that when you navigate to another route  you go to the top of the page
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <h1>This is the Home Page</h1>
    </>
  );
};

export default Home;
