import { useEffect, useRef } from "react";
const Post = () => {
  const itemTitle = useRef(null);
  const itemAge = useRef(null);
  const itemLocation = useRef(null);
  const basePrice = useRef(null);
  const itemDescription = useRef(null);
  const itemImg = useRef(null);

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
          itemImg = e.dataTransfer.files[0].name;
        }
      });
      imageUploaderRef.current.addEventListener("change", function (e) {
        e.preventDefault();
        if (imageUploaderRef.current.children[0].files.length) {
          imageUploaderRef.current.children[1].innerHTML =
            imageUploaderRef.current.children[0].files[0].name;
          itemImg = imageUploaderRef.current.children[0].files[0].name;
        }
      });
    }
  });

  function handlePost(e) {
    e.preventDefault();
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
            />
          </label>
          <label className="form-input">
            What is the base price you want?
            <input
              type="number"
              placeholder="Type in the base price here(in rupees)"
            ></input>
          </label>
          <label className="form-input">
            Describe your item
            <textarea
              rows="10"
              placeholder="Write something about your property"
              value={itemDescription}
            ></textarea>
          </label>
          <label
            className="image-uploader"
            ref={imageUploaderRef}
            value={itemImg}
          >
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
            <li className="list-inline-item">
              <button className="btn-v1" type="submit">
                RENT
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Post;
