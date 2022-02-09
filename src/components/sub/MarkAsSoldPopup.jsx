import { useState, useContext } from "react";
import baseUrl from "../../config.js";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

const MarkAsSoldPopup = (props) => {
  const history = useHistory();

  const markAsSold = async () => {
    const response = await fetch(`${baseUrl}/mark-sold/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: window.localStorage.token,
      },
      body: JSON.stringify({ postId: props.postId }),
    });
    try {
      const data = await response.text();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    props.closeFunc(false);
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
          <h1 className="modal-title">Mark as Sold</h1>
          <h2 className="modal-subtitle">
            Do you really want to mark {props.itemName} as Sold, and Delete this
            post?
          </h2>
          <div className="d-flex align-items-center justify-content-center mt-4">
            <button className="btn-v1" type="submit" onClick={markAsSold}>
              Yes
            </button>
            <div className="mx-2" />
            <button
              className="btn-v1"
              type="submit"
              onClick={() => props.closeFunc(false)}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MarkAsSoldPopup;
