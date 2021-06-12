import { useState, useContext } from "react";
import baseUrl from "../../config.js";
import { useHistory, useLocation } from "react-router-dom";
// import { Auth } from "../../App.js";
import { Modal } from "react-bootstrap";

const BidPopup = (props) => {
  const history = useHistory();
  const [bidPrice, setBidPrice] = useState(null);
  const [bidPriceError, setBidPriceError] = useState(null);
  const handleBid = async (e) => {
    e.preventDefault();
    if (!bidPrice) {
      setBidPriceError("Do you have invisible money?");
      return;
    } else if (parseInt(bidPrice) < parseInt(props.highestPrice)) {
      setBidPriceError(
        "Base Price must be higher than current bid price i.e. " +
          props.highestPrice +
          "!"
      );
      return;
    } else if (bidPrice.includes(".")) {
      setBidPriceError("The Price shouldn't have decimals!");
    } else {
      setBidPriceError("");
    }

    const response = await fetch(`${baseUrl}/place-bid`, {
      method: "PUT",
      headers: {
        auth: window.localStorage.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: props.postId,
        bidPrice: bidPrice,
      }),
    });
    try {
      const data = await response.text();
      if (data === "Bid Placed") {
        props.closeFunc(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.closeFunc(false)}
        centered
        className="custom-modal"
      >
        <div className="wrapper">
          <h1 className="modal-title">Place Your Bid</h1>
          <h2 className="modal-subtitle">
            Type in the amount you would like to pay for {props.postTitle}
          </h2>
          <form
            onSubmit={handleBid}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <label className="mb-3 form-input">
              <input
                type="number"
                name=""
                id="number"
                placeholder="Enter the prefered bid price"
                value={bidPrice}
                onChange={(e) => {
                  setBidPrice(e.target.value);
                }}
                autoFocus
              />
              <p>{bidPriceError}</p>
            </label>
            <button className="btn-v1" type="submit">
              Place Bid
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default BidPopup;
