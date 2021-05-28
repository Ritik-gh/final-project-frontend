import { useState } from "react";
import PostCard from "./sub/PostCard.jsx";
const Home = () => {
  const [data, setData] = useState();

  let response;
  async function getData() {
    response = await fetch("http://localhost:3030/");
    try {
      let data = await response.text();
      console.log("this is " + data);
      setData(data);
    } catch (err) {
      throw err;
    }
  }

  getData();

  return (
    <>
      <div className="container">
        <section className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
            <div className="col-3">
              <PostCard />
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
