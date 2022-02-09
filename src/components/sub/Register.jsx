import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import baseUrl from "../../config.js";
import { Modal } from "react-bootstrap";

const Register = (props) => {
  const history = useHistory();
  const location = useLocation();

  function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById("first_name");
    const lastName = document.getElementById("last_name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");

    let formIsValid = false;
    if (!firstName.value) {
      console.log(firstName.value);
      firstName.nextElementSibling.innerText = "First name can't be empty";
    } else {
      firstName.nextElementSibling.innerText = "";
    }
    if (!lastName.value) {
      lastName.nextElementSibling.innerText = "Last name can't be empty";
    } else {
      lastName.nextElementSibling.innerText = "";
    }
    if (!email.value) {
      email.nextElementSibling.innerText = "Email can't be empty";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(
        email.value
      )
    ) {
      email.nextElementSibling.innerText = "Enter a valid email!";
    } else {
      email.nextElementSibling.innerText = "";
    }
    if (!phone.value) {
      phone.nextElementSibling.innerText = "Phone number can't be empty";
    } else if (
      !/^(\+[0-9]{1,3})?( |-)?([0-9]{3})( |-)?([0-9]{3})( |-)?([0-9]{4})$/.test(
        phone.value
      )
    ) {
      phone.nextElementSibling.innerText =
        "Enter a valid 10 digit phone number!";
    } else {
      phone.nextElementSibling.innerText = "";
    }
    if (!password.value) {
      password.nextElementSibling.innerText = "Password can't be empty";
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password.value
      )
    ) {
      password.nextElementSibling.innerText =
        "Your password must include at least 8 numbers. It must be case sensitive, having at least one number, alphabet and character";
    } else {
      password.nextElementSibling.innerText = "";
    }
    if (!confirmPassword.value) {
      confirmPassword.nextElementSibling.innerText =
        "This field can't be empty";
    } else if (confirmPassword.value != password.value) {
      confirmPassword.nextElementSibling.innerText =
        "This field must match the password above!";
    } else {
      confirmPassword.nextElementSibling.innerText = "";
      formIsValid = true;
    }

    if (formIsValid) {
      fetch(`${baseUrl}/register`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          window.sessionStorage.data = data;
          if (data == "already exists") {
            window.location.reload();
          } else {
            props.closeFunc(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <Modal
        show={props.show}
        centered
        onHide={() => props.closeFunc(false)}
        className="custom-modal"
      >
        <div className="wrapper">
          <h1 className="modal-title">Register</h1>
          <h2 className="modal-subtitle">
            {props.subtitle || `Register to get started!`}
          </h2>
          <form
            onSubmit={handleRegister}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <label className="mb-3 form-input">
              <input
                type="text"
                id="first_name"
                placeholder="Enter your first name"
                autoComplete="off"
                autoFocus
              />
              <p />
            </label>
            <label className="mb-3 form-input">
              <input
                type="text"
                id="last_name"
                placeholder="Enter your last name"
                autoComplete="off"
              />
              <p />
            </label>
            <label className="mb-3 form-input">
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                autoComplete="off"
              />
              <p />
            </label>
            <label className="mb-3 form-input">
              <input
                type="number"
                id="phone"
                placeholder="Enter your phone number"
                autoComplete="off"
              />
              <p />
            </label>
            <label className="mb-3 form-input">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="new-password"
              />
              <p />
            </label>
            <label className="mb-3 form-input">
              <input
                type="password"
                id="confirm_password"
                placeholder="Confirm your password"
                autoComplete="off"
              />
              <p />
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

export default Register;
