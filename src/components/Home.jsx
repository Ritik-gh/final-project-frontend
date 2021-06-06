import { useState, useEffect } from "react";
import PostCard from "./sub/PostCard.jsx";
const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const response = await fetch("http://localhost:3030/get-posts");
    try {
      let data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        <section className="row">
          {posts &&
            posts.map((post, index) => (
              <div className="col-6 col-md-4 col-xl-3">
                <PostCard {...post} key={index} />
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Home;
