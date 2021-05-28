import { useState } from "react";
import sampleImageOne from "../../assets/images/sample-1.jpg";
function PostCard() {
  return (
    <>
      <article>
        <figure>
          <img src={sampleImageOne} alt="" className="w-100" />
        </figure>
        <div>
          <p>Line 1</p>
          <p>Line 2</p>
          <p>Line 3</p>
        </div>
      </article>
    </>
  );
}

export default PostCard;
