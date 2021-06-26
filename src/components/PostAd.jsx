import { useState, useEffect, useRef } from "react";
import baseUrl from "../config.js";
import { useHistory } from "react-router-dom";
const PostAd = () => {
  const history = useHistory();
  const imageUploaderRef = useRef();

  const [itemTitle, setItemTitle] = useState(null);
  const [itemAge, setItemAge] = useState(null);
  const [itemLocation, setItemLocation] = useState(null);
  const [basePrice, setBasePrice] = useState(null);
  const [itemDescription, setItemDescription] = useState(null);
  const [itemImgStatus, setItemImgStatus] = useState(true);

  const [itemTitleError, setItemTitleError] = useState(null);
  const [itemAgeError, setItemAgeError] = useState(null);
  const [itemLocationError, setItemLocationError] = useState(null);
  const [basePriceError, setBasePriceError] = useState(null);
  const [itemDesciptionError, setItemDescriptionError] = useState(null);

  const [itemImgMsg, setItemImgMsg] = useState(
    "DROP IMAGE HERE OR Click here to upload"
  );

  const data = new FormData();

  // does the browser support drag and drop
  const advanceUploadSupported = (function () {
    let div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

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
          setItemImgStatus(true);
          setItemImgMsg(e.dataTransfer.files[0].name);
        }
      });
      imageUploaderRef.current.addEventListener("change", function (e) {
        e.preventDefault();
        if (imageUploaderRef.current.children[0].files.length) {
          setItemImgStatus(true);
          setItemImgMsg(imageUploaderRef.current.children[0].files[0].name);
        }
      });
    } else {
      setItemImgMsg("Click here to upload!");
    }
  });

  function handlePost(e) {
    e.preventDefault();
    let greenFormFields = 0;
    // check errors
    if (!itemTitle) {
      setItemTitleError("We don't sell anonymous stuff!");
    } else {
      setItemTitleError("");
      greenFormFields++;
    }
    if (!itemAge) {
      setItemAgeError("How old is your item?");
    } else if (itemAge < 50) {
      setItemAgeError("We don't sell new stuff!");
    } else {
      setItemAgeError("");
      greenFormFields++;
    }
    if (!itemLocation) {
      setItemLocationError("We can't sell the stuff which has no location!");
    } else {
      setItemLocationError("");
      greenFormFields++;
    }
    if (!basePrice) {
      setBasePriceError(
        "Don't you have any expectations from the stuff you're selling?"
      );
    } else {
      setBasePriceError("");
      greenFormFields++;
    }
    if (!itemDescription) {
      setItemDescriptionError("Don't you want to lure buyers?");
    } else {
      setItemDescriptionError("");
      greenFormFields++;
    }
    if (!imageUploaderRef.current.children[0].files) {
      setItemImgStatus(false);
      setItemImgMsg("We don't sell stuff which we have not seen!");
    } else {
      setItemImgStatus(true);
      setItemImgMsg("");
      greenFormFields++;
    }
    // finally
    if (greenFormFields === 6) {
      data.append("name", itemTitle);
      data.append("age", itemAge);
      data.append("location", itemLocation);
      data.append("basePrice", basePrice);
      data.append("description", itemDescription);
      data.append("img", imageUploaderRef.current.children[0].files[0]);

      fetch(`${baseUrl}/post-ad`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          auth: window.localStorage.token,
        },
        body: data,
      })
        .then((res) => res.text())
        .then((data) => console.log("post msg", data))
        .catch((err) => console.log(err));
      history.push("/");
    }
  }
  return (
    <>
      <div className="container-fluid header-space footer-space">
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
            <p>{itemTitleError}</p>
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
            <p>{itemAgeError}</p>
          </label>
          <label className="form-input">
            In which city do you live?
            <input
              type="search"
              name=""
              placeholder="Type in the location"
              id=""
              value={itemLocation}
              onChange={(e) => setItemLocation(e.target.value)}
            />
            <p>{itemLocationError}</p>
          </label>
          <label className="form-input">
            What is the base price you want?
            <input
              type="number"
              placeholder="Type in the base price here(in rupees)"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <p>{basePriceError}</p>
          </label>
          <label className="form-input">
            Describe your item
            <textarea
              rows="10"
              placeholder="Write something about your property"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            ></textarea>
            <p>{itemDesciptionError}</p>
          </label>
          <label className="image-uploader" ref={imageUploaderRef}>
            <input
              type="file"
              name=""
              placeholder="Add some images"
              id=""
              capture="image/*"
            />
            <p className={`upload-status ${!itemImgStatus ? "error" : ""}`}>
              {itemImgMsg}
            </p>
            <p />
          </label>
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className={`btn-v1`} type="submit">
                SELL
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default PostAd;
