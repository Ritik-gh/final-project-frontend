import { useEffect, useState, useContext, useRef } from "react";
import sampleImageOne from "../assets/images/sample-1.jpg";
import BidPopup from "./sub/BidPopup.jsx";
import ContactPopup from "./sub/ContactPopup.jsx";
import MarkAsSoldPopup from "./sub/MarkAsSoldPopup.jsx";
import { useParams } from "react-router-dom";
import baseUrl from "../config.js";
import { Auth } from "../App.js";

function Post() {
  const auth = useContext(Auth);
  const { id } = useParams();
  const [post, setPost] = useState();
  const [bidderDetails, setBidderDetails] = useState();
  const [bidPopupBool, setBidPopupBool] = useState(false);
  const [contactPopupBool, setContactPopupBool] = useState(false);
  const [markAsSoldPopup, setMarkAsSoldPopup] = useState(false);
  const detailsRef = useRef();
  console.log("params", id);
  const getPost = async () => {
    try {
      let response;
      if (window.localStorage.token) {
        response = await fetch(
          `${baseUrl}/get-posts?postId=${id}&user=${window.localStorage.token}`
        );
      } else {
        response = await fetch(`${baseUrl}/get-posts?postId=${id}`);
      }
      let data = await response.json();
      if (data.bidderDetails) {
        setBidderDetails(data.bidderDetails);
        setPost(data.post);
      } else {
        setPost(data);
      }
      console.log("post data", data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost();
  }, [auth.isAuth, bidPopupBool]);
  useEffect(() => {
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, [detailsRef.current]);
  return (
    <>
      {post && (
        <BidPopup
          show={bidPopupBool}
          closeFunc={setBidPopupBool}
          postTitle={post?.item_name}
          postId={post?.post_id}
          highestPrice={
            post?.highest_bid ? post?.highest_bid : post?.base_price
          }
        />
      )}
      {bidderDetails && (
        <>
          <MarkAsSoldPopup
            show={markAsSoldPopup}
            closeFunc={setMarkAsSoldPopup}
            itemName={post?.item_name}
            postId={post?.post_id}
          />
          <ContactPopup
            show={contactPopupBool}
            closeFunc={setContactPopupBool}
            {...bidderDetails}
            itemName={post?.item_name}
          />
        </>
      )}
      <div className="container-fluid details footer-space">
        {post && (
          <>
            <section className="row">
              <article className="col">
                <figure className="img-wrapper">
                  <img src={post.item_image} alt="" className="w-100" />
                </figure>
              </article>
            </section>
            <div
              className="d-flex align-items-center justify-content-between w-100 my-3"
              ref={detailsRef}
            >
              <p className="item-name pe-2">{post.item_name}</p>
              <p className="item-age ps-2">
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
            {post.postedBySelf ? (
              bidderDetails && (
                <>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn-v1 my-3 "
                      onClick={() => {
                        setMarkAsSoldPopup(true);
                      }}
                    >
                      Mark as Sold
                    </button>
                    <div className="mx-2" />
                    <button
                      className="btn-v1 my-3"
                      onClick={() => {
                        setContactPopupBool(true);
                      }}
                    >
                      Contact Bidder
                    </button>
                  </div>
                </>
              )
            ) : (
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
