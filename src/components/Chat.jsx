import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import baseUrl from "../config";
import PostCard from "./sub/PostCard.jsx";
import { Auth } from "../App.js";

const Chat = () => {
  const { bidderId } = useParams();
  const auth = useContext(Auth);
  const history = useHistory();
  return (
    <>
      <div className="container-fluid header-space">
        Chat with id {bidderId}
      </div>
    </>
  );
};

export default Chat;
