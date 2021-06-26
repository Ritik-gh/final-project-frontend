import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import useIsMobile from "../../customHooks/useIsMobile";
import { Auth } from "../../App.js";
import LoginPopup from "./Login";
import home from "../../assets/images/home.svg";
import homeFill from "../../assets/images/home-fill.svg";
import post from "../../assets/images/post.svg";
import postFill from "../../assets/images/post-fill.svg";
import chat from "../../assets/images/chat.svg";
import chatFill from "../../assets/images/chat-fill.svg";
import settings from "../../assets/images/settings.svg";
import settingsFill from "../../assets/images/settings-fill.svg";
const Footer = () => {
  const isMobile = useIsMobile();
  const auth = useContext(Auth);
  const history = useHistory();
  const [loginPopup, setLoginPopup] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [activeIcon, setActiveIcon] = useState(1);

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
        <figure
          onClick={() => {
            history.push("/");
            setActiveIcon(1);
          }}
        >
          <img src={activeIcon === 1 ? homeFill : home} alt="" />
        </figure>
        <figure
          onClick={() => {
            if (!auth.isAuth) {
              setLoginMsg("You need to login first in order to post!");

              setLoginPopup(true);
            } else {
              history.push("/post-ad");
            }
            setActiveIcon(2);
          }}
        >
          <img src={activeIcon === 2 ? postFill : post} alt="" />
        </figure>

        {auth.isAuth && (
          <>
            <figure
              onClick={() => {
                history.push("/chats");
                setActiveIcon(3);
              }}
            >
              <img src={activeIcon === 3 ? chatFill : chat} alt="" />
            </figure>
          </>
        )}
        <figure
          onClick={() => {
            history.push("/settings");
            setActiveIcon(4);
          }}
        >
          <img src={activeIcon === 4 ? settingsFill : settings} alt="" />
        </figure>
      </section>
    </>
  );
};

export default Footer;
