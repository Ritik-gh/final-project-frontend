import { useState, useContext } from "react";
import baseUrl from "../../config.js";
import { useHistory, useLocation } from "react-router-dom";
// import { Auth } from "../../App.js";
import { Modal } from "react-bootstrap";

const ContactPopup = (props) => {
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
          <h1 className="modal-title">Contact Bidder</h1>
          <h2 className="modal-subtitle">
            You may call, email or chat with the top bidder
          </h2>
          <div className="d-flex flex-column align-items-center">
            <p>Call : {props.phone_no}</p>
            <p className="my-1">OR</p>
            <p>
              Email :{" "}
              <a
                href={`mailto:${props.email_address}?subject=Bid for ${props.itemName}`}
              >
                {props.email_address}
              </a>
            </p>
            <p className="my-1">OR</p>
            <button
              className="btn-v1"
              onClick={() => {
                history.push(`/chats/${props.id}`);
                props.closeFunc(false);
              }}
            >
              Chat
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactPopup;
