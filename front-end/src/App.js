import "./App.css";
import HttpCall from "./components/HttpCall";
import WebSocketCall from "./components/WebSocketCall";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const socket = io("192.168.56.1:5001/", {
    transports: ["websocket"],
    cors: {
      origin: "http://192.168.56.1:3000/",
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
