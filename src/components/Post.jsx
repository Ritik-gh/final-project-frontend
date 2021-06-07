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
      <div className="container-fluid details">
        {post && (
          <>
            <section className="row">
              <article className="col px-0">
                <figure>
                  <img src={post.item_image} alt="" className="w-100" />
                </figure>
              </article>
            </section>
            <div className="d-flex align-items-center justify-content-between w-100 my-3">
              <p className="item-name pr-2">{post.item_name}</p>
              <p className="item-age pl-2">
                {post.items_estimated_age} years old
              </p>
            </div>
            <table>
              <tr>
                <td>Location </td>
                <td>{post.location}</td>
              </tr>
              <tr>
                <td>
                  <span>Base Price </span>
                </td>
                <td>&#8377;{post.base_price}</td>
              </tr>
              <tr>
                <td>Description </td>
                <td>{post.about}</td>
              </tr>
            </table>
            <button className="btn-v1 mx-auto my-3">Buy</button>
          </>
        )}
      </div>
    </>
  );
}

export default Post;
