import { useEffect, useState } from "react";

export default function WebSocketCall({ socket }) {
  const [time, setTime] = useState([]);
  const [image, setImage] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [light, setLight] = useState([]);

  // for each sensing reading. 


  useEffect(() => {
    socket.on("time", (data) => {
      // setMessages([...messages, data.data]);
      setTime(data.data);
    });
  }, [socket, time]);

  useEffect(() => {
    socket.on("temperature", (data) => {
      // setMessages([...messages, data.data]);
      setTemperature(data.data);
    });
  }, [socket, temperature]);

  useEffect(() => {
    socket.on("pressure", (data) => {
      // setMessages([...messages, data.data]);
      setPressure(data.data);
    });
  }, [socket, pressure]);
  
  useEffect(() => {
    socket.on("humidity", (data) => {
      // setMessages([...messages, data.data]);
      setHumidity(data.data);
    });
  }, [socket, humidity]);

  useEffect(() => {
    socket.on("light", (data) => {
      // setMessages([...messages, data.data]);
      setLight(data.data);
    });
  }, [socket, light]);
  
  

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
      <h1> temp {temperature}c</h1>
      <h1>pressure {pressure} hPa </h1>
      <h1>humidity {humidity} % </h1>
      <h1>light {light} lux </h1>
      <img
          src={image}
          alt="Received Image"
        />
    </div>
  );
}
