import { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import baseUrl from "../config";
import PostCard from "./sub/PostCard.jsx";
import { Auth } from "../App.js";
import socketIOClient, { io } from "socket.io-client";
import useIsMobile from "../customHooks/useIsMobile";

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
  const [enduser, setEnduser] = useState();
  const [msg, setMsg] = useState();
  const msgInputRef = useRef();

  const getChats = async () => {
    const response = await fetch(`${baseUrl}/get-chats`, {
      headers: {
        auth: window.localStorage.token,
      },
    });
    try {
      const data = await response.json();
      setChats(data);
      setEnduser(data[0].enduser);
      console.log("user chats", data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-user?userId=${bidderId}`, {
        headers: {
          auth: window.localStorage.token,
        },
      });
      const data = await response.json();
      setEnduser(data);
    } catch (err) {
      console.log(err);
    }
  };

  function displaySentMsg() {
    const pTag = document.createElement("P");
    pTag.innerText = msg;
    chatSectionRef.current.appendChild(pTag);
    setMsg("");
  }

  function sendMsg() {
    socket.emit("send_msg", {
      receiverId: bidderId,
      msg: msg,
    });
    displaySentMsg();
    msgInputRef.current.focus();
  }

  useEffect(() => {
    bidderId && getProfile();
    getChats();
  }, []);

  return (
    <>
      <div className={`container-fluid`}>
        {!bidderId && chats && chats.length === 0 ? (
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
                            enduser?.id
                          );
                          if (recentElement.classList.contains("active")) {
                            recentElement.classList.remove("active");
                          }
                          const chat = chats.filter((chat) => {
                            return chat.enduser.id == e.target.id;
                          })[0].enduser;
                          if (!e.target.classList.contains("active")) {
                            e.target.classList.add("active");
                            chatSectionRef.current
                              .closest(".chat-div")
                              .classList.add("active");
                          }
                          setEnduser(chat);
                        }}
                        id={chat.enduser.id}
                        key={chat.enduser}
                        className={!isMobile && index === 0 ? "active" : ""}
                      >
                        {chat.enduser.first_name + " " + chat.enduser.last_name}
                      </p>
                    ))
                  ) : (
                    <p id={enduser?.id} className="active">
                      {enduser?.first_name + " " + enduser?.last_name}
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
                      e.target.nodeName === "SPAN" &&
                      currentTarget.classList.contains("active")
                    ) {
                      currentTarget.classList.remove("active");
                    }
                  }}
                >
                  <section className="">
                    <span className="me-3">Back</span>
                    {`${enduser?.first_name} ${enduser?.last_name}`}
                  </section>
                  <section className="" ref={chatSectionRef}></section>
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
