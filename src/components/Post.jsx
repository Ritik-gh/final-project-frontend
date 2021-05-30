import { useEffect, useRef } from "react";
const Post = () => {
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
    }
  });
  return (
    <>
      <div className="container">
        <form className="d-flex flex-column align-items-center">
          <label className="form-input">
            Select the property type
            <div className="d-flex align-items-center">
              <button className="btn-v1 inactive" type="button">
                FLAT
              </button>
              <button className="btn-v1 inactive" type="button">
                HOUSE
              </button>
            </div>
          </label>
          <label htmlFor="" className="form-input">
            How many rooms it has?
            <div className="d-flex align-items-center">
              <button className="btn-v1 inactive" type="button">
                1
              </button>
              <button className="btn-v1 inactive" type="button">
                2
              </button>
              <button className="btn-v1 inactive" type="button">
                3
              </button>
              <button className="btn-v1 inactive" type="button">
                4
              </button>
              <button className="btn-v1 inactive" type="button">
                5
              </button>
            </div>
          </label>
          <label className="form-input">
            What is the location of the property?
            <input
              type="search"
              name=""
              placeholder="Type in the location"
              id=""
            />
          </label>
          <label className="form-input">
            What is the area of the property?
            <input type="number" name="" placeholder="type in the area" id="" />
          </label>
          <label className="form-input">
            What is the base price you want?
            <input
              type="numbe"
              placeholder="type in the base price here"
            ></input>
          </label>
          <label className="form-input">
            Describe your property
            <textarea
              rows="10"
              placeholder="Write something about your property"
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
