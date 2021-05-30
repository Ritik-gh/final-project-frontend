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
      <div className="container-fluid">
        <section className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(() => (
            <div className="col-6 col-md-4 col-xl-3">
              <PostCard />
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
