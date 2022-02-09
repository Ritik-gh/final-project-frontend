import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "@/components/sub/PostCard.jsx";
import actions from "@/store/actions";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    console.log(actions);
    dispatch(actions.getPosts());
  }, [dispatch]);

  return (
    <>
      {posts.loading ? (
        <article className="loader" />
      ) : (
        <div className="container-fluid header-space footer-space">
          <section className="row">
            {posts.data && posts.data.length > 0 ? (
              posts.data.map(
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
