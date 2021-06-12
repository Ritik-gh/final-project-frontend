import { useState, useContext } from "react";
import baseUrl from "../../config.js";
import { useHistory, useLocation } from "react-router-dom";
// import { Auth } from "../../App.js";
import { Modal } from "react-bootstrap";

const BidPopup = (props) => {
  const history = useHistory();

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
            // onSubmit={}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <label className="mb-3 form-input">
              <input
                type="number"
                name=""
                id="number"
                placeholder="Enter the prefered bid price"
                autoFocus
              />
              <p />
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
