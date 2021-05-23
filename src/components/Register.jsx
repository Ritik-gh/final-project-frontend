import { useState } from "react";
import baseUrl from "../config.js";
const Register = () => {
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
      firstName.value = "";
    }
    if (!lastName.value) {
      lastName.nextElementSibling.innerText = "Last name can't be empty";
    } else {
      lastName.nextElementSibling.innerText = "";
      lastName.value = "";
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
      email.value = "";
    }
    if (!phone.value) {
      phone.nextElementSibling.innerText = "Phone number can't be empty";
    } else if (
      !/^([+0-9]{2,4})?( |-)?([0-9]{3})( |-)?([0-9]{3})( |-)?([0-9]{4})$/.test(
        phone.value
      )
    ) {
      phone.nextElementSibling.innerText =
        "Enter a valid 10 digit phone number!";
    } else {
      phone.nextElementSibling.innerText = "";
      phone.value = "";
    }
    if (!password.value) {
      password.nextElementSibling.innerText = "password can't be empty";
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password.value
      )
    ) {
      console.log(password.value);
      password.nextElementSibling.innerText =
        "Your password must include at least 8 numbers. It must be case sensitive, having at least one number, alphabet and character";
    } else {
      password.nextElementSibling.innerText = "";
      password.value = "";
    }
    if (!confirmPassword.value) {
      confirmPassword.nextElementSibling.innerText =
        "this field can't be empty";
    } else if (confirmPassword.value != password.value) {
      confirmPassword.nextElementSibling.innerText =
        "this field must match the password above!";
    } else {
      confirmPassword.nextElementSibling.innerText = "";
      formIsValid = true;
      confirmPassword.value = "";
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
      });
    }
  }
  return (
    <>
      <div className="container">
        <form onSubmit={handleRegister}>
          <label>
            <input
              type="text"
              id="first_name"
              placeholder="Enter your first name"
              autoComplete="off"
              autoFocus
            />
            <p />
          </label>
          <label>
            <input
              type="text"
              id="last_name"
              placeholder="Enter your last name"
              autoComplete="off"
            />
            <p />
          </label>
          <label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              autoComplete="off"
            />
            <p />
          </label>
          <label>
            <input
              type="number"
              id="phone"
              placeholder="Enter your phone number"
              autoComplete="off"
            />
            <p />
          </label>
          <label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <p />
          </label>
          <label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm your password"
              autoComplete="off"
            />
            <p />
          </label>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
