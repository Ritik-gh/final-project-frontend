import { useState } from "react";
import sampleImageOne from "../../assets/images/sample-1.jpg";
function PostCard({ item_name, base_price, item_image, location, clickFunc }) {
  return (
    <>
      <article className="post-card" onClick={clickFunc}>
        <figure>
          <img src={item_image} alt="" className="w-100" />
        </figure>
        <div>
          <p>{base_price}</p>
          <p>{item_name}</p>
          <p>{location}</p>
        </div>
      </article>
    </>
  );
}

export default PostCard;
