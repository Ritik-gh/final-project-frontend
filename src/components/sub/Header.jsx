import { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginPopup from "./Login";
import RegisterPopup from "./Register";
import useIsMobile from "@/customHooks/useIsMobile.js";
import logo from "@/assets/images/logo.svg";
import leftArrow from "@/assets/images/menu-right.svg";
import { LOGOUT } from "@/store/types.js";

const Header = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const history = useHistory();
  const dispatch = useDispatch(false);

  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [showBackBtn, setShowBackBtn] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (pathname.startsWith("/post/") || pathname === "/profile") {
      setShowBackBtn(true);
    } else {
      setShowBackBtn(false);
    }
  }, [pathname]);

  return (
    <>
      <LoginPopup
        show={loginPopup}
        closeFunc={setLoginPopup}
        subtitle={loginMsg}
      />
      <RegisterPopup show={registerPopup} closeFunc={setRegisterPopup} />
      <header className="container-fluid">
        <section className="row">
          <div className="col-md-4 col-xl-6 justify-content-start">
            {isMobile && showBackBtn && (
              <figure
                className="back-arrow"
                onClick={() => {
                  history.go(-1);
                }}
              >
                <img src={leftArrow} alt="" />
              </figure>
            )}
            <figure className="site-logo" onClick={() => history.push("/")}>
              <img src={logo} alt="" />
            </figure>
          </div>
          {!isMobile && (
            <div className="col-md-8 col-xl-6">
              {!user.isAuthorized ? (
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
                      dispatch({
                        type: LOGOUT,
                      });
                      history.push("/");
                    }}
                  >
                    Logout
                  </span>
                </>
              )}
              <button
                onClick={() => {
                  if (!user.isAuthorized) {
                    setLoginPopup(true);
                    setLoginMsg("You need to login first in order to post!");
                  } else {
                    history.push("/post-ad");
                  }
                }}
                className="btn-v1"
              >
                POST
              </button>
            </div>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
