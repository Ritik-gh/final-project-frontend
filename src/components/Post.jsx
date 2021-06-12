import { useEffect, useState } from "react";
import sampleImageOne from "../assets/images/sample-1.jpg";
import BidPopup from "./sub/BidPopup.jsx";
import { useParams } from "react-router-dom";
import baseUrl from "../config.js";

function Post() {
  const { id } = useParams();
  const [bidPopupBool, setBidPopupBool] = useState(false);
  const [post, setPost] = useState();
  console.log("params", id);
  const getPost = async () => {
    const response = await fetch(
      `${baseUrl}/get-posts?postId=${id}&user=${window.localStorage.token}`
    );
    try {
      let data = await response.json();
      setPost(data);
      console.log("post", data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost();
  }, [bidPopupBool]);
  return (
    <>
      <BidPopup
        show={bidPopupBool}
        closeFunc={setBidPopupBool}
        postTitle={post?.item_name}
        postId={post?.post_id}
        highestPrice={post?.highest_bid ? post?.highest_bid : post?.base_price}
      />
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
                  <span>Current Bid Price</span>
                </td>
                <td>
                  {post.highest_bid ? `₹${post.highest_bid}` : `No Bid Yet`}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Base Price </span>
                </td>
                <td>₹{post.base_price}</td>
              </tr>

              <tr>
                <td>Description </td>
                <td>{post.about}</td>
              </tr>
            </table>
            {!post.postedBySelf && (
              <button
                className="btn-v1 mx-auto my-3"
                onClick={() => {
                  setBidPopupBool(true);
                }}
              >
                Buy
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Post;
