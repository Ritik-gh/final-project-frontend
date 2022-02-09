import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import baseUrl from "@/config";
import PostCard from "./sub/PostCard.jsx";
import useIsMobile from "../customHooks/useIsMobile";
import ChangePasswordPopup from "./sub/ChangePasswordPopup.jsx";
import { useSelector } from "react-redux";

const Profile = () => {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const [changePasswordPopup, setChangePasswordPopup] = useState(false);
  const user = useSelector((state) => state.user);
  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-profile?posts=true`, {
        headers: {
          auth: window.localStorage.token,
        },
      });
      const data = await response.json();
      setUserDetails(data.user);
      setPosts(data.posts);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user.isAuthorized]);
  return (
    <>
      <ChangePasswordPopup
        show={changePasswordPopup}
        closeFunc={setChangePasswordPopup}
      />
      {loading ? (
        <article className="loader" />
      ) : (
        <div className="container-fluid header-space footer-space">
          <h5 className="mb-3 fw-bold">
            Hello {userDetails?.first_name}
            {posts && posts.length ? (
              <span>, Here are Your Active Posts</span>
            ) : (
              <span>, You haven't created any post yet!</span>
            )}
          </h5>
          <section className="row">
            {posts?.length > 0 ? (
              posts?.map(
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
              )
            ) : (
              <h5 className="centered-msg">Your posts would appear here</h5>
            )}
          </section>
          <button
            className="centered-msg center-bottom btn-v1"
            onClick={() => setChangePasswordPopup(true)}
          >
            Change Password
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
