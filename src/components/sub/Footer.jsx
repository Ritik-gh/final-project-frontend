import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useIsMobile from "../../customHooks/useIsMobile";
import { Auth } from "../../App.js";
import LoginPopup from "./Login";

const Footer = () => {
  const isMobile = useIsMobile();
  const auth = useContext(Auth);
  const history = useHistory();
  const [loginPopup, setLoginPopup] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");

  return !isMobile ? (
    <></>
  ) : (
    <>
      <LoginPopup
        show={loginPopup}
        closeFunc={setLoginPopup}
        subtitle={loginMsg}
      />
      <section className="bottom-mobile-nav">
        <article onClick={() => history.push("/")}>Home</article>
        <article
          onClick={() => {
            if (!auth.isAuth) {
              setLoginMsg("You need to login first in order to post!");

              setLoginPopup(true);
            } else {
              history.push("/post-ad");
            }
          }}
        >
          Post
        </article>

        {auth.isAuth && (
          <>
            <article onClick={() => history.push("/chats")}>Chats</article>
          </>
        )}
        <article onClick={() => history.push("/settings")}>Settings</article>
      </section>
    </>
  );
};

export default Footer;
