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

const Chats = () => {
  const { bidderId } = useParams();
  const chatSectionRef = useRef();
  const auth = useContext(Auth);
  const history = useHistory();
  const [chats, setChats] = useState();
  const [bidder, setBidder] = useState();
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

  function sendMsg() {
    socket.emit("send_msg", {
      receiverId: bidderId,
      msg: msg,
    });
    displaySentMsg();
    msgInputRef.current.focus();
  }

  function displaySentMsg() {
    const pTag = document.createElement("P");
    pTag.innerText = msg;
    chatSectionRef.current.appendChild(pTag);
    setMsg("");
  }

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
                  <section className="">{`${bidder.first_name} ${bidder.last_name}`}</section>
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
              </section>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Chats;
