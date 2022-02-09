import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useIsMobile from "@/customHooks/useIsMobile";
import LoginPopup from "./Login";
import home from "@/assets/images/home.svg";
import homeFill from "@/assets/images/home-fill.svg";
import post from "@/assets/images/post.svg";
import postFill from "@/assets/images/post-fill.svg";
import chat from "@/assets/images/chat.svg";
import chatFill from "@/assets/images/chat-fill.svg";
import settings from "@/assets/images/settings.svg";
import settingsFill from "@/assets/images/settings-fill.svg";

const Footer = () => {
  const isMobile = useIsMobile();
  const history = useHistory();
  const { pathname } = useLocation();
  const [loginPopup, setLoginPopup] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [activeIcon, setActiveIcon] = useState(pathname === "/" && 1);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (pathname === "/") {
      setActiveIcon(1);
    } else if (pathname === "/post-ad") {
      setActiveIcon(2);
    } else if (pathname.startsWith("/chats")) {
      setActiveIcon(3);
    } else if (pathname === "/settings") {
      setActiveIcon(4);
    }
  }, [pathname]);
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
          }}
        >
          <img src={activeIcon === 1 ? homeFill : home} alt="" />
        </figure>
        <figure
          onClick={() => {
            if (!user.isAuthorized) {
              setLoginMsg("You need to login first in order to post!");
              setLoginPopup(true);
            } else {
              history.push("/post-ad");
            }
          }}
        >
          <img src={activeIcon === 2 ? postFill : post} alt="" />
        </figure>

        {user.isAuthorized && (
          <>
            <figure
              onClick={() => {
                history.push("/chats");
              }}
            >
              <img src={activeIcon === 3 ? chatFill : chat} alt="" />
            </figure>
          </>
        )}
        <figure
          onClick={() => {
            history.push("/settings");
          }}
        >
          <img src={activeIcon === 4 ? settingsFill : settings} alt="" />
        </figure>
      </section>
    </>
  );
};

export default Footer;
