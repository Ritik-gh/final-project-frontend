import { useState } from "react";
import PostCard from "./sub/PostCard.jsx";
const Home = () => {
  const [posts, setPosts] = useState([]);
  async function getData() {
    const response = await fetch("http://localhost:3030/get-posts");
    try {
      let data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  }

  getData();

  return (
    <>
      <div className="container-fluid">
        <section className="row">
          {posts &&
            posts.map((post) => (
              <div className="col-6 col-md-4 col-xl-3">
                <PostCard {...post} />
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Home;
