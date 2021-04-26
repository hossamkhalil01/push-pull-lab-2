import "./App.css";
import Broadcast from "./components/Broadcast.js";
import PrivateChat from "./components/PrivateChat.js";
import RoomChat from "./components/RoomChat.js";

function App() {
  return (
    <div className="App">
      <Broadcast />
      {/* <PrivateChat />
      <RoomChat /> */}
    </div>
  );
}

export default App;
