import { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import baseUrl from "../config";
import PostCard from "./sub/PostCard.jsx";
import { Auth } from "../App.js";
import socketIOClient, { io } from "socket.io-client";

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

socket.on("connect_error", (err) => {
  console.log(err);
});

socket.on("join-msg", (msg) => {
  console.log("join msg", msg);
});

socket.on("join-room", ({ room, id }) => {
  console.log(`room is ${room} and id is ${id}`);
});

const Chats = () => {
  function sendMsg() {
    socket.emit("send_msg", {
      receiverId: bidderId,
      msg: msg,
    });
  }

  const { bidderId } = useParams();
  const chatSectionRef = useRef();
  const auth = useContext(Auth);
  const history = useHistory();
  const [chats, setChats] = useState();
  const [bidder, setBidder] = useState();
  const [msg, setMsg] = useState();
  const getChats = async () => {
    const response = await fetch(`${baseUrl}/get-chats`, {
      headers: {
        auth: window.localStorage.token,
      },
    });
    try {
      const data = await response.json();
      setChats(data);
      console.log("user chats", data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
    const response = await fetch(`${baseUrl}/get-user?userId=${bidderId}`, {
      headers: {
        auth: window.localStorage.token,
      },
    });
    try {
      const data = await response.json();
      setBidder(data);
      console.log("bidder details", data);
    } catch (err) {
      console.log(err);
    }
  };

  const postMsg = async () => {
    const response = await fetch(`${baseUrl}/post-msg`, {
      method: "PUT",
      headers: {
        auth: window.localStorage.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: msg,
        receiverId: bidder?.id,
      }),
    });
    try {
      const data = response.text();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    const pTag = document.createElement("P");
    pTag.innerText = msg;
    if (chatSectionRef.current.childElementCount === 0) {
      chatSectionRef.appendChild(pTag);
    } else {
      chatSectionRef.insertBefore(pTag, chatSectionRef.children[0]);
    }
    msg = "";
  };

  useEffect(() => {
    bidderId ? getProfile() : getChats();
  }, []);

  return (
    <>
      <div className={`container-fluid ${!bidderId ? "header-space" : ""}`}>
        {!bidderId ? (
          chats && chats.length > 0 ? (
            <></>
          ) : (
            "No chats yet!"
          )
        ) : (
          bidder && (
            <>
              <section className="row">
                <div className="chat-div">
                  <section>
                    <div className="">{`${bidder.first_name} ${bidder.last_name}`}</div>
                    <div className="" ref={chatSectionRef}></div>
                  </section>
                  <article className={`form-input `}>
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
                      />
                      <span onClick={sendMsg}>{">"}</span>
                    </div>
                  </article>
                </div>
              </section>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Chats;
