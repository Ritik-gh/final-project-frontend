import { useState, useEffect, useRef } from "react";
import baseUrl from "../config.js";
const Post = () => {
  const [itemTitle, setItemTitle] = useState(null);
  const [itemAge, setItemAge] = useState(null);
  const [itemLocation, setItemLocation] = useState(null);
  const [basePrice, setBasePrice] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);

  const data = new FormData();

  const advanceUploadSupported = (function () {
    let div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  const imageUploaderRef = useRef();
  useEffect(() => {
    let droppedFiles = false;
    if (advanceUploadSupported) {
      imageUploaderRef.current.classList.add("supports-advance-upload");
      imageUploaderRef.current.addEventListener(
        "dragenter" || "dragover",
        function (e) {
          imageUploaderRef.current.classList.add("is-dragover");
        }
      );
      imageUploaderRef.current.addEventListener(
        "dragleave" || "drop",
        function () {
          imageUploaderRef.current.classList.remove("is-dragover");
        }
      );
      imageUploaderRef.current.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      imageUploaderRef.current.addEventListener("drop", function (e) {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          imageUploaderRef.current.children[0].files = e.dataTransfer.files;
          imageUploaderRef.current.children[1].innerHTML =
            e.dataTransfer.files[0].name;
        }
      });
      imageUploaderRef.current.addEventListener("change", function (e) {
        e.preventDefault();
        if (imageUploaderRef.current.children[0].files.length) {
          imageUploaderRef.current.children[1].innerHTML =
            imageUploaderRef.current.children[0].files[0].name;
        }
      });
    }
  });

  function handlePost(e) {
    e.preventDefault();
    data.append("name", itemTitle);
    data.append("age", itemAge);
    data.append("location", itemLocation);
    data.append("basePrice", basePrice);
    data.append("description", "th");
    data.append("img", imageUploaderRef.current.children[0].files[0]);

    for (var key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    // data.append("img", imageUploaderRef.current.children[0].files[0].name);
    fetch(`${baseUrl}/post`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: data,
    })
      .then((res) => res.body)
      .then((body) => body.json)
      .then((data) => console.log("post msg", data))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="container">
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={handlePost}
        >
          <label className="form-input">
            Give a suitable title for the item
            <input
              type="text"
              name=""
              placeholder="Type in the title"
              id=""
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              autoFocus
            />
          </label>
          <label htmlFor="" className="form-input">
            How many years old is the item?
            <input
              type="number"
              name=""
              placeholder="Type in the item age in years"
              id=""
              value={itemAge}
              onChange={(e) => setItemAge(e.target.value)}
            />
          </label>
          <label className="form-input">
            What is your location?
            <input
              type="search"
              name=""
              placeholder="Type in the location"
              id=""
              value={itemLocation}
              onChange={(e) => setItemLocation(e.target.value)}
            />
          </label>
          <label className="form-input">
            What is the base price you want?
            <input
              type="number"
              placeholder="Type in the base price here(in rupees)"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
          </label>
          <label className="form-input">
            Describe your item
            <textarea
              rows="10"
              placeholder="Write something about your property"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            ></textarea>
          </label>
          <label className="image-uploader" ref={imageUploaderRef}>
            <input
              type="file"
              name=""
              placeholder="Add some images"
              id=""
              capture="image/*"
            />
            <p className="upload-status">
              DROP IMAGE HERE OR Click here to upload
            </p>
          </label>
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className="btn-v1" type="submit">
                SELL
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Post;
