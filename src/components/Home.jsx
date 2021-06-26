import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PostCard from "./sub/PostCard.jsx";
import baseUrl from "../config.js";
const Home = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-posts`);
      let data = await response.json();
      setPosts(data);
      setLoading(false);
      console.log("posts", data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <article className="loader" />
      ) : (
        <div className="container-fluid header-space footer-space">
          <section className="row">
            {posts && posts.length > 0 ? (
              posts.map(
                (post, index) =>
                  post.post_status === "unsold" && (
                    <div
                      className="col-6 col-md-4 col-xl-3"
                      key={index + Date.now()}
                    >
                      <PostCard
                        {...post}
                        key={index}
                        clickFunc={() => {
                          history.push(`/post/${post.post_id}`);
                        }}
                      />
                    </div>
                  )
              )
            ) : (
              <p className="text-center">No Posts Found</p>
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
