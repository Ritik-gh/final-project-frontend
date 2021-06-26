import { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import baseUrl from "../config";
import PostCard from "./sub/PostCard.jsx";
import { Auth } from "../App.js";
import socketIOClient, { io } from "socket.io-client";
import useIsMobile from "../customHooks/useIsMobile";
import leftArrow from "../assets/images/left-arrow.svg";

const socket = io(baseUrl, {
  auth: {
    token: window.localStorage.token,
  },
});

socket.on("connect", () => {
  console.log("connected to server with id", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconncected");
  });
});

socket.on("receive_msg", (msg) => {
  console.log(msg);
});

socket.on("connectError", (err) => {
  console.log(err);
});

const Chats = () => {
  const isMobile = useIsMobile();
  const { bidderId } = useParams();
  const chatSectionRef = useRef();
  const auth = useContext(Auth);
  const history = useHistory();
  const [chats, setChats] = useState();
  const [activeChat, setActiveChat] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(true);
  const msgInputRef = useRef();

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-user?userId=${bidderId}`, {
        headers: {
          auth: window.localStorage.token,
        },
      });
      const data = await response.json();
      setActiveChat(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getChats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-chats`, {
        headers: {
          auth: window.localStorage.token,
        },
      });
      const data = await response.json();
      setChats(data);
      setActiveChat(data[0]);
      setLoading(false);
      console.log("user chats", data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  function displaySentMsg() {
    const divTag = document.createElement("DIV");
    const spanTag = document.createElement("SPAN");
    spanTag.innerText = msg;
    divTag.classList = "chat-msg right";
    divTag.appendChild(spanTag);
    chatSectionRef.current.appendChild(divTag);
    setMsg("");
  }

  function sendMsg() {
    socket.emit("send_msg", {
      receiverId: activeChat.enduser.id,
      msg: msg,
    });
    displaySentMsg();
    msgInputRef.current.focus();
  }

  useEffect(() => {
    bidderId && getProfile();
    getChats();
  }, [auth.isAuth]);

  return (
    <>
      <div className={`container-fluid`}>
        {loading ? (
          <article className="loader" />
        ) : !bidderId && chats && chats.length === 0 ? (
          "No chats yet!"
        ) : (
          <>
            <section className="row position-relative">
              <article className="col-md-4 px-0">
                <div className="chat-row-group">
                  {chats && chats.length > 0 ? (
                    chats?.map((chat, index) => (
                      <p
                        onClick={(e) => {
                          const recentElement = document.getElementById(
                            activeChat?.enduser.id
                          );
                          if (recentElement.classList.contains("active")) {
                            recentElement.classList.remove("active");
                          }
                          const chat = chats.filter((chat) => {
                            return chat.enduser.id == e.target.id;
                          })[0];
                          if (!e.target.classList.contains("active")) {
                            e.target.classList.add("active");
                            chatSectionRef.current
                              .closest(".chat-div")
                              .classList.add("active");
                          }
                          setActiveChat(chat);
                        }}
                        id={chat.enduser.id}
                        key={chat.enduser}
                        className={!isMobile && index === 0 ? "active" : ""}
                      >
                        {chat.enduser.first_name + " " + chat.enduser.last_name}
                      </p>
                    ))
                  ) : (
                    <p id={activeChat?.enduser.id} className="active">
                      {activeChat?.enduser.first_name +
                        " " +
                        activeChat?.enduser.last_name}
                    </p>
                  )}
                </div>
              </article>
              <article className="col-md-8 px-0">
                <div
                  className={`chat-div`}
                  onClick={(e) => {
                    const currentTarget = e.currentTarget;
                    if (
                      e.target.nodeName === "IMG" &&
                      currentTarget.classList.contains("active")
                    ) {
                      currentTarget.classList.remove("active");
                    }
                  }}
                >
                  <section className="">
                    <figure className="back-arrow">
                      <img src={leftArrow} alt="" />
                    </figure>
                    {`${activeChat?.enduser.first_name} ${activeChat?.enduser.last_name}`}
                  </section>
                  <section className="" ref={chatSectionRef}>
                    {activeChat &&
                      activeChat.msgs.length > 0 &&
                      activeChat.msgs.map((msg) => (
                        <div
                          className={`chat-msg ${
                            msg.type === "sent" ? "right" : "left"
                          }`}
                        >
                          <span>{msg.msg}</span>
                        </div>
                      ))}
                  </section>
                  <section className={`form-input `}>
                    <div className={`${msg ? "has-msg" : ""}`}>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Type a Message"
                        autoFocus
                        value={msg}
                        onChange={(e) => {
                          setMsg(e.target.value);
                        }}
                        ref={msgInputRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") sendMsg();
                        }}
                      />
                      <span onClick={sendMsg}>{">"}</span>
                    </div>
                  </section>
                </div>
              </article>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Chats;
