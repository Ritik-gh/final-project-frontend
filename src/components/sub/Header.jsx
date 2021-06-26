import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "../../App.js";
import LoginPopup from "./Login";
import RegisterPopup from "./Register";
import useIsMobile from "../../customHooks/useIsMobile.js";
const Header = () => {
  const isMobile = useIsMobile();
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
        <section className="justify-content-between justify-content-md-evenly">
          <span className="" onClick={() => history.push("/")}>
            Home
          </span>

          {!isMobile &&
            (!auth.isAuth ? (
              <>
                <span className="" onClick={() => setLoginPopup(true)}>
                  Login
                </span>
                <span className="" onClick={() => setRegisterPopup(true)}>
                  Register
                </span>
              </>
            ) : (
              <>
                <span
                  className=""
                  onClick={() => {
                    history.push("/profile");
                  }}
                >
                  Profile
                </span>
                <span
                  className=""
                  onClick={() => {
                    history.push("/chats");
                  }}
                >
                  Chats
                </span>
                <span
                  className=""
                  onClick={() => {
                    window.localStorage.user = "";
                    auth.setAuth(false);
                  }}
                >
                  Logout
                </span>
              </>
            ))}
          <button
            onClick={() => {
              if (!auth.isAuth) {
                setLoginMsg("You need to login first in order to post!");
                setLoginPopup(true);
              } else {
                history.push("/post-ad");
              }
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
