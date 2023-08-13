import { useEffect, useState } from "react";

export default function WebSocketCall({ socket }) {
  const [time, setTime] = useState([]);
  useEffect(() => {
    socket.on("time", (data) => {
      // setMessages([...messages, data.data]);
      setTime(data.data);
    });
  }, [socket, time]);

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <h1 className="text-3xl font-bold underline"> {time} </h1>
    </div>
  );
}
