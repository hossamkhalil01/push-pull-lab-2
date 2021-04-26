import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import { baseUrl } from "../helpers/urls";

const socket = io(baseUrl);

export default function Broadcast() {
  const handleNewUserMessage = (message) => {
    socket.emit("messageToAll", message);
  };

  useEffect(() => {
    socket.on("broadcast", (msg) => addResponseMessage(msg));
  }, []);

  return (
    <div>
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
}
