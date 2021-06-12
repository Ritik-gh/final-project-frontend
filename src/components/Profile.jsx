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
  const getProfile = async () => {
    const response = await fetch(`${baseUrl}/get-profile`, {
      headers: {
        auth: window.localStorage.token,
      },
    });
    try {
      const data = await response.json();
      setUser(data.user);
      setPosts(data.posts);
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
      <div className="container-fluid header-space">
        <section className="row mb-3">
          <article className="col-6">{user?.first_name}</article>
          <article className="col-6">{user?.last_name}</article>
        </section>
        <section className="row mb-3">
          <article className="col-6">{user?.email_address}</article>
        </section>
        <h1 className="mb-3">Your Posts</h1>
        <section className="row">
          {posts?.map((post, index) => (
            <div className="col-6 col-md-4 col-xl-3">
              <PostCard
                key={index + post.id}
                {...post}
                clickFunc={() => {
                  history.push(`/post/${post.post_id}`);
                }}
              />
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Profile;