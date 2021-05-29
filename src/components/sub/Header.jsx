import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "../../App.js";
const Header = () => {
  const history = useHistory();
  const auth = useContext(Auth);
  return (
    <>
      <header className="container">
        <section className="d-flex justify-content-evenly align-items-center py-3">
          <span className="" onClick={() => history.push("/")}>
            Home
          </span>
          {!auth.isAuth ? (
            <>
              <span className="" onClick={() => history.push("/login")}>
                Login
              </span>
              <span className="" onClick={() => history.push("/register")}>
                Register
              </span>
            </>
          ) : (
            <span
              className=""
              onClick={() => {
                window.localStorage.user = "";
                auth.setAuth(false);
              }}
            >
              Logout
            </span>
          )}
          <button
            onClick={() => {
              !auth.isAuth ? history.push("/login") : history.push("/post");
            }}
            className="btn-v1"
          >
            POST
          </button>
        </section>
      </header>
    </>
  );
};

export default Header;
