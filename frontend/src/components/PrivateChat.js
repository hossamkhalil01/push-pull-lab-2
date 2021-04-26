import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import { baseUrl } from "../helpers/urls";

const socket = io(baseUrl);

export default function PrivateChat() {
  const [allSockets, setAllSockets] = useState([]);
  const [selectedSocket, setSelectedSocket] = useState({});

  const handleNewUserMessage = (message) => {
    socket.emit("messageToUser", { socketId: selectedSocket, message });
  };
  useEffect(() => {
    socket.on("privateMessage", (message) => {
      addResponseMessage(message);
    });
    socket.on("socketsList", (socketsList) => {
      setAllSockets(socketsList);
    });
  }, []);

  return (
    <div>
      <div className="mt-5 row justify-content-center">
        <div className="col-6">
          <select
            id="selectSocket"
            name="socket"
            className="form-select form-select-lg mb-3"
            aria-label="Default select example"
            defaultValue={"DEFAULT"}
            value={selectedSocket}
            onChange={(option) => setSelectedSocket(option.value)}
          >
            <option value="DEFAULT" disabled>
              Select Socket
            </option>
            {allSockets.map((socket) => (
              <option value="{socket}" key="socket">
                {socket}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
}
