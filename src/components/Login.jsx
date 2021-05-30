import { useState, useContext } from "react";
import baseUrl from "../config.js";
import { useHistory, useLocation } from "react-router-dom";
import { Auth } from "../App.js";

const Login = (props) => {
  const auth = useContext(Auth);
  const history = useHistory();
  function handleLogin(e) {
    e.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    let formIsValid = false;
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
    if (!password.value) {
      password.nextElementSibling.innerText = "password can't be empty";
    } else if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password.value
      )
    ) {
      password.nextElementSibling.innerText =
        "Your password must include at least 8 numbers. It must be case sensitive, having at least one number, alphabet and character";
    } else {
      password.nextElementSibling.innerText = "";
      formIsValid = true;
    }

    if (formIsValid) {
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data == "invalid email") {
            email.nextElementSibling.innerText =
              "Seems like there is no user with this email, try registering first";
          } else if (data == "invalid password") {
            password.nextElementSibling.innerText = "Password didn't match";
          } else if (data == "valid") {
            window.localStorage.user = email.value;
            // props.setAuth(true);
            auth.setAuth(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      <div className="container">
        <form
          onSubmit={handleLogin}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <label className="mb-3 form-input">
            <input
              type="email"
              name=""
              id="email"
              placeholder="Enter your email address"
              autoFocus
              autoComplete="new-password"
            />
            <p />
          </label>
          <label className="mb-3 form-input">
            <input
              type="password"
              name=""
              id="password"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <p />
          </label>
          <button className="btn-v1" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
