import { useState, useContext } from "react";
import baseUrl from "../../config.js";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

const ChangePasswordPopup = (props) => {
  const history = useHistory();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  async function handleChangePassword(e) {
    e.preventDefault();
    let passwordIsValid = false;
    if (!password) {
      setPasswordError("Password can't be empty");
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password
      )
    ) {
      setPasswordError(
        "Your password must include at least 8 numbers. It must be case sensitive, having at least one number, alphabet and character"
      );
    } else {
      setPasswordError("");
      passwordIsValid = true;
    }
    if (passwordIsValid) {
      const response = await fetch(`${baseUrl}/change-password`, {
        method: "PUT",
        headers: {
          auth: window.localStorage.token,
        },
        body: JSON.stringify({ newPassword: password }),
      });
      const data = await response.json();
      console.log(data.status, data.msg);
      props.closeFunc(false);
    }
  }
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.closeFunc(false)}
        centered
        className="custom-modal"
      >
        <div className="wrapper">
          <h1 className="modal-title">Change Your Password</h1>
          <h2 className="modal-subtitle">
            {props.subtitle || `Type in the new password in the input below`}
          </h2>
          <form
            onSubmit={handleChangePassword}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <label className="mb-3 form-input">
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter your password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>{passwordError}</p>
            </label>
            <button className="btn-v1" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ChangePasswordPopup;
