import { useState } from "react";
import sampleImageOne from "../../assets/images/sample-1.jpg";

function PostCard({
  item_name,
  base_price,
  highest_bid_price,
  item_image,
  location,
  clickFunc,
}) {
  return (
    <>
      <article className="post-card" onClick={clickFunc}>
        <figure>
          <img
            src={
              item_image ||
              "https://dummyimage.com/1920x1080/d4d4d4/fff.png&text=Imagine the item"
            }
            alt=""
            className="w-100"
          />
        </figure>
        <div>
          <p>&#8377;{highest_bid_price || base_price}</p>
          <p>{item_name}</p>
          <p>{location}</p>
        </div>
      </article>
    </>
  );
}

export default PostCard;
