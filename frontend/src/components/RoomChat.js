import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import { baseUrl } from "../helpers/urls";

const socket = io(baseUrl);

export default function PrivateChat() {
  const [group, setGroup] = useState([]);

  const handleAddGroup = (e) => {
    e.preventDefault();
    socket.emit("subscribeToRoom");
    setGroup("");
  };
  const handleNewUserMessage = (message) => {
    socket.emit("messageToRoom", { group, message });
  };
  useEffect(() => {
    socket.on("groupMessage", (message) => {
      addResponseMessage(message);
    });
  }, []);

  return (
    <div>
      <div className="mt-5 row justify-content-center">
        <form onSubmit={handleAddGroup}>
          <div className="d-flex">
            <div className="col-8">
              <input
                type="text"
                name="group-name"
                id="group-name"
                className="form-control"
                placeholder="Enter group name"
                required
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-primary">Join</button>
            </div>
          </div>
        </form>
        <Widget handleNewUserMessage={handleNewUserMessage} />
      </div>
    </div>
  );
}
