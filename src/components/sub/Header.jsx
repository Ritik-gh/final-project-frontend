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
  const [loginMsg, setLoginMsg] = useState("");
  return (
    <>
      <LoginPopup
        show={loginPopup}
        closeFunc={setLoginPopup}
        subtitle={loginMsg}
      />
      <RegisterPopup show={registerPopup} closeFunc={setRegisterPopup} />
      <header className="container-fluid">
        <section className="d-flex justify-content-evenly align-items-center py-2">
          <span className="" onClick={() => history.push("/")}>
            Home
          </span>
          <button
            onClick={() => {
              if (!auth.isAuth) {
                setLoginPopup(true);
                setLoginMsg("You need to login first in order to post!");
              } else {
                history.push("/post");
              }
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
