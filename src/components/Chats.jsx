import { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import baseUrl from "../config";
import PostCard from "./sub/PostCard.jsx";
import socketIOClient, { io } from "socket.io-client";
import useIsMobile from "@/customHooks/useIsMobile";
import leftArrow from "@/assets/images/menu-right.svg";
import { v4 as uuid } from "uuid";

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

socket.on("connectError", (err) => {
  console.log(err);
});

const Chats = () => {
  const isMobile = useIsMobile();
  const { bidderId } = useParams();
  const chatSectionRef = useRef();
  const history = useHistory();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(true);
  const [bidderChat, setBidderChat] = useState();
  const msgInputRef = useRef();
  const user = useSelector((state) => state.user);

  const chatsHaveBidderId = () => {
    const results = chats?.filter((chat) => {
      return chat.enduser.id == bidderId;
    });
    if (results?.length === 1) {
      return true;
    } else {
      return false;
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

      setLoading(false);
      console.log("I just got triggered", activeChat);
      console.log("user chats", data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-user?userId=${bidderId}`, {
        headers: {
          auth: window.localStorage.token,
        },
      });
      const data = await response.json();
      const tempObj = {
        enduser: {
          first_name: data.first_name,
          last_name: data.last_name,
          id: data.id,
        },
        msgs: [],
      };

      setBidderChat(tempObj);

      console.log("profile data", data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // const displaySentMsg = () => {
  //   const divTag = document.createElement("DIV");
  //   const spanTag = document.createElement("SPAN");
  //   spanTag.innerText = msg;
  //   divTag.classList = "chat-msg right";
  //   divTag.appendChild(spanTag);
  //   console.log(chatSectionRef.current.children);
  //   chatSectionRef.current?.appendChild(divTag);
  //   divTag.scrollIntoView({
  //     behavior: "smooth",
  //   });
  //   setMsg("");
  // };

  const displayReceivedMsg = (msg) => {
    const divTag = document.createElement("DIV");
    const spanTag = document.createElement("SPAN");
    spanTag.innerText = msg;
    divTag.classList = "chat-msg left";
    divTag.appendChild(spanTag);
    chatSectionRef.current?.appendChild(divTag);
    divTag.scrollIntoView({
      behavior: "smooth",
    });
    setMsg("");
  };

  const handleChatClick = (e, type) => {
    console.log(activeChat, "handle click");
    const recentElement = document.getElementById(activeChat?.enduser.id);
    if (recentElement) {
      if (recentElement.classList.contains("active")) {
        recentElement.classList.remove("active");
      }
      if (type === 1) {
        setActiveChat(bidderChat);
      } else {
        const chat = chats.filter((chat) => {
          return chat.enduser.id == e.target.id;
        })[0];
        setActiveChat(chat);
      }
      // !e.target.classList.contains("active")
      if (
        !chatSectionRef.current
          .closest(".chat-div")
          .classList.contains("active")
      ) {
        // e.target.classList.add("active");
        chatSectionRef.current.closest(".chat-div").classList.add("active");
      }
    }
  };

  function sendMsg() {
    socket.emit("send_msg", {
      receiverId: activeChat.enduser.id,
      msg: msg,
    });
    activeChat.msgs.push({
      type: "sent",
      msg: msg,
    });
    setMsg("");
    msgInputRef.current.focus();
  }

  useEffect(() => {
    socket.on("receive_msg", ({ msg, senderId }) => {
      console.log(msg, "from", senderId);
      const incomingMsg = {
        type: "received",
        msg: msg,
      };
      if (activeChat) {
        if (activeChat.enduser.id == senderId) {
          activeChat.msgs.push(incomingMsg);
          console.log("active chat", activeChat);
        }
        if (bidderId) {
          if (chatsHaveBidderId) {
            const chat = chats?.filter((chat) => {
              return chat.enduser.id == senderId;
            });
            chat[0].msgs.push(incomingMsg);
          } else if (bidderId == senderId) {
            bidderChat?.msgs.push(incomingMsg);
          }
        } else {
          const chat = chats?.filter((chat) => {
            return chat.enduser.id == senderId;
          });
          chat[0].msgs.push(incomingMsg);
        }
      }
      displayReceivedMsg(msg);
    });
  }, []);

  useEffect(() => {
    getChats();
    bidderId && getProfile();
  }, [user.isAuthorized]);

  useEffect(() => {
    if (!bidderId) {
      setActiveChat(chats && chats[0]);
    } else if (bidderId && chatsHaveBidderId()) {
      const chat = chats?.filter((chat) => {
        return chat.enduser.id == bidderId;
      })[0];
      setActiveChat(chat);
    } else if (bidderId && !chatsHaveBidderId()) {
      setActiveChat(bidderChat);
      console.log(
        "active chat profile data",
        chatsHaveBidderId(),
        activeChat,
        chats
      );
    }
    console.log("I am active chat", activeChat);
  }, [chats]);

  useEffect(() => {
    if (activeChat?.msgs.length) {
      chatSectionRef.current?.children[
        chatSectionRef.current?.children.length - 1
      ].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeChat?.msgs.length, chatSectionRef.current]);

  console.log("chats have bidder id", chatsHaveBidderId());

  useEffect(() => {
    const activeElement = document.getElementById(activeChat?.enduser.id);
    if (activeElement && !activeElement.classList.contains("active")) {
      activeElement.classList.add("active");
    }
  });

  return (
    <>
      <div className={`container-fluid`}>
        {loading ? (
          <article className="loader" />
        ) : !bidderId && chats && chats.length === 0 ? (
          <h3 className="text-center header-space">No chats yet!</h3>
        ) : (
          <>
            <section className="row position-relative">
              <article className="col-md-4 px-0">
                <div className="chat-row-group">
                  {(chats?.length < 1 || (bidderId && !chatsHaveBidderId())) &&
                    bidderChat && (
                      <p
                        id={bidderChat?.enduser.id}
                        onClick={(e) => handleChatClick(e, 1)}
                      >
                        {bidderChat?.enduser.first_name +
                          " " +
                          bidderChat?.enduser.last_name}
                      </p>
                    )}
                  {chats?.length > 0 &&
                    chats?.map((chat, index) => (
                      <p
                        onClick={(e) => handleChatClick(e, 2)}
                        id={chat.enduser.id}
                        key={uuid()}
                      >
                        {chat.enduser.first_name + " " + chat.enduser.last_name}
                      </p>
                    ))}
                </div>
              </article>
              {activeChat && (
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
                      {isMobile && (
                        <figure className="back-arrow">
                          <img src={leftArrow} alt="" />
                        </figure>
                      )}
                      {`${activeChat?.enduser.first_name} ${activeChat?.enduser.last_name}`}
                    </section>
                    <section className="" ref={chatSectionRef}>
                      {activeChat &&
                        activeChat.msgs.length > 0 &&
                        activeChat.msgs.map((msg, index) => (
                          <div
                            className={`chat-msg ${
                              msg.type === "sent" ? "right" : "left"
                            }`}
                            key={uuid()}
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
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Chats;
