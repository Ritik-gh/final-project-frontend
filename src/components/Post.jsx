import { useEffect, useState } from "react";
import sampleImageOne from "../assets/images/sample-1.jpg";
import { useParams } from "react-router-dom";
import baseUrl from "../config.js";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState();
  console.log("params", id);
  useEffect(async () => {
    const response = await fetch(`${baseUrl}/get-posts?postId=${id}`);
    try {
      let data = await response.json();
      setPost(data);
      console.log("post", data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="container header-space">
        {post && (
          <>
            <section className="row">
              <article className="col">
                <figure>
                  <img src={post.item_image} alt="" className="w-100" />
                </figure>
              </article>
            </section>
            <div>
              <p>{post.location}</p>
              <p>{post.base_price}</p>
              <p>{post.item_name}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Post;
