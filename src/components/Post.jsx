import { useEffect, useState, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import sampleImageOne from "../assets/images/sample-1.jpg";
import BidPopup from "./sub/BidPopup.jsx";
import ContactPopup from "./sub/ContactPopup.jsx";
import MarkAsSoldPopup from "./sub/MarkAsSoldPopup.jsx";
import { useParams } from "react-router-dom";
import { getPost } from "@/store/actions";
import LoginPopup from "@/components/sub/Login";

function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loginPopup, setLoginPopup] = useState(false);
  const [bidPopupBool, setBidPopupBool] = useState(false);
  const [contactPopupBool, setContactPopupBool] = useState(false);
  const [markAsSoldPopup, setMarkAsSoldPopup] = useState(false);
  const detailsRef = useRef();

  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, user.isAuthorized, bidPopupBool, id]);

  useEffect(() => {
    console.log("done", detailsRef.current);
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [post]);

  return (
    <>
      <LoginPopup
        show={loginPopup}
        closeFunc={setLoginPopup}
        subtitle="In order to bid, You need to login first."
      />
      {post.data && (
        <BidPopup
          show={bidPopupBool}
          closeFunc={setBidPopupBool}
          postTitle={post.data?.item_name}
          postId={post.data?.post_id}
          highestPrice={
            post?.highest_bid ? post?.highest_bid : post?.base_price
          }
        />
      )}
      {post.bidderDetails && (
        <>
          <MarkAsSoldPopup
            show={markAsSoldPopup}
            closeFunc={setMarkAsSoldPopup}
            itemName={post.data?.item_name}
            postId={post.data?.post_id}
          />
          <ContactPopup
            show={contactPopupBool}
            closeFunc={setContactPopupBool}
            {...post.data.bidderDetails}
            itemName={post?.item_name}
          />
        </>
      )}
      <div className="container-fluid details footer-space">
        {post.loading ? (
          <article className="loader" />
        ) : post.data ? (
          <>
            <section className="row">
              <article className="col">
                <figure className="img-wrapper">
                  <img
                    src={
                      post.data.item_image ||
                      "https://dummyimage.com/1920x1080/d4d4d4/fff.png&text=Imagine the item"
                    }
                    alt=""
                    className="w-100"
                  />
                </figure>
              </article>
            </section>
            <div
              className="d-flex align-items-center justify-content-between w-100 my-3"
              ref={detailsRef}
            >
              <p className="item-name pe-2">{post.data.item_name}</p>
              <p className="item-age ps-2">
                {post.data.items_estimated_age} years old
              </p>
            </div>
            <table>
              <tr>
                <td>Location </td>
                <td>{post.data.location}</td>
              </tr>
              <tr>
                <td>
                  <span>Current Bid Price</span>
                </td>
                <td>
                  {post.data.highest_bid
                    ? `₹${post.data.highest_bid}`
                    : `No Bid Yet`}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Base Price </span>
                </td>
                <td>₹{post.data.base_price}</td>
              </tr>

              <tr>
                <td>Description </td>
                <td>{post.data.about}</td>
              </tr>
            </table>
            {post.data.postedBySelf ? (
              post.bidderDetails && (
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
                  user.isAuthorized
                    ? setBidPopupBool(true)
                    : setLoginPopup(true);
                }}
              >
                Buy
              </button>
            )}
          </>
        ) : (
          "No Post found"
        )}
      </div>
    </>
  );
}

export default Post;
