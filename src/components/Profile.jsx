import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import baseUrl from "../config";
import PostCard from "./sub/PostCard.jsx";
import { Auth } from "../App.js";

const Profile = () => {
  const auth = useContext(Auth);
  const history = useHistory();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-profile?posts=true`, {
        headers: {
          auth: window.localStorage.token,
        },
      });
      const data = await response.json();
      setUser(data.user);
      setPosts(data.posts);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [auth.isAuth]);
  return (
    <>
      {loading ? (
        <article className="loader" />
      ) : (
        <div className="container-fluid header-space footer-space">
          <section className="row mb-3">
            <article className="col-6">
              {user?.first_name}&nbsp;
              {user?.last_name}
            </article>
            <article className="col-6">{user?.email_address}</article>
          </section>
          <h1 className="mb-3">Your Active Posts</h1>
          <section className="row">
            {posts?.map(
              (post, index) =>
                post.post_status === "unsold" && (
                  <div
                    className="col-6 col-md-4 col-xl-3"
                    index={Date.now() - index}
                  >
                    <PostCard
                      key={index + post.id}
                      {...post}
                      clickFunc={() => {
                        history.push(`/post/${post.post_id}`);
                      }}
                    />
                  </div>
                )
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default Profile;
