import "./App.css";
import HttpCall from "./components/HttpCall";
import WebSocketCall from "./components/WebSocketCall";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const socket_ip = window.location.hostname + ":5001/";
  const socket = io(socket_ip, {
    transports: ["websocket"],
    cors: {
      origin: window.location.hostname+":3000/",
    },
  });


  return (
    <div className="App">
      <h1>React/Flask App + socket.io</h1>
      <div className="line">

      </div>
    <WebSocketCall socket={socket} />
    </div>
  );
}

export default App;
