import { useState } from "react";
import sampleImageOne from "../../assets/images/sample-1.jpg";
function PostCard({ item_name, base_price, item_image, location }) {
  return (
    <>
      <article className="post-card">
        <figure>
          <img src={false && item_image} alt="" className="w-100" />
        </figure>
        <div>
          <p>{location}</p>
          <p>{base_price}</p>
          <p>{item_name}</p>
        </div>
      </article>
    </>
  );
}

export default PostCard;
