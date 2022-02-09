import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useIsMobile from "../customHooks/useIsMobile";

import LoginPopup from "./sub/Login";
import RegisterPopup from "./sub/Register";
import { LOGOUT } from "@/store/types";

const Settings = () => {
  const isMobile = useIsMobile();
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const user = useSelector((state) => state.user);

  return (
    <>
      <LoginPopup
        show={loginPopup}
        closeFunc={setLoginPopup}
        subtitle={loginMsg}
      />
      <RegisterPopup show={registerPopup} closeFunc={setRegisterPopup} />
      <div className="container-fluid header-space footer-space settings">
        {!user.isAuthorized ? (
          <>
            <p onClick={() => setLoginPopup(true)}>Login</p>
            <p onClick={() => setRegisterPopup(true)}>Register</p>
          </>
        ) : (
          <>
            <p
              className="page"
              onClick={() => {
                history.push("/profile");
              }}
            >
              Profile
            </p>
            <p
              onClick={() => {
                dispatch({
                  type: LOGOUT,
                });
                history.push("/");
              }}
            >
              Logout
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Settings;
