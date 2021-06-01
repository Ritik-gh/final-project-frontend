import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "../../App.js";
import LoginPopup from "./Login";
import RegisterPopup from "./Register";
const Header = () => {
  const history = useHistory();
  const auth = useContext(Auth);
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  return (
    <>
      <LoginPopup show={loginPopup} closeFunc={setLoginPopup} />
      <RegisterPopup show={registerPopup} closeFunc={setRegisterPopup} />
      <header className="container-fluid">
        <section className="d-flex justify-content-evenly align-items-center py-3">
          <span className="" onClick={() => history.push("/")}>
            Home
          </span>
          <button
            onClick={() => {
              !auth.isAuth ? history.push("/login") : history.push("/post");
            }}
            className="btn-v1"
          >
            POST
          </button>
          {!auth.isAuth ? (
            <>
              <span className="" onClick={() => setLoginPopup(true)}>
                Login
              </span>
              <span className="" onClick={() => setRegisterPopup(true)}>
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
        </section>
      </header>
    </>
  );
};

export default Header;
