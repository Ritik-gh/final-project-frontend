import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useIsMobile from "../customHooks/useIsMobile";
import { Auth } from "../App.js";
import LoginPopup from "./sub/Login";
import RegisterPopup from "./sub/Register";

const Settings = () => {
  const isMobile = useIsMobile();
  const auth = useContext(Auth);
  const history = useHistory();
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
      <div className="container-fluid header-space footer-space">
        {!auth.isAuth ? (
          <>
            <p onClick={() => setLoginPopup(true)}>Login</p>
            <p onClick={() => setRegisterPopup(true)}>Register</p>
          </>
        ) : (
          <p
            onClick={() => {
              window.localStorage.user = "";
              auth.setAuth(false);
            }}
          >
            Logout
          </p>
        )}
      </div>
    </>
  );
};

export default Settings;
