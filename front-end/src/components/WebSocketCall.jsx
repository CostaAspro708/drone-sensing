import { useEffect, useState } from "react";

export default function WebSocketCall({ socket }) {
  const [time, setTime] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    socket.on("time", (data) => {
      // setMessages([...messages, data.data]);
      setTime(data.data);
    });
  }, [socket, time]);

  useEffect(() => {
    socket.on("image", (data) => {
      // setMessages([...messages, data.data]);
      console.log(data)
      setImage(`data:image/jpeg;base64,${data.data}`);
    });
  }, [socket, image]);

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <h1 className="text-3xl font-bold underline"> {time} </h1>
      <img
          src={image}
          alt="Received Image"
        />
    </div>
  );
}
