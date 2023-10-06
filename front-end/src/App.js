import "./App.css";
import HttpCall from "./components/HttpCall";
import WebSocketCall from "./components/WebSocketCall";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import LineChart from "./components/LineChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import GraphSelector from "./components/GraphSelector";
import { Data2 } from "./Data2";
import { Data } from "./Data";

Chart.register(CategoryScale);
const graphOptions = {
  1: 'Temp',
  2: 'Light',
  3: 'Humid',
  4: 'Position',
};

function App() {
  console.log(graphOptions[1]);
  const [combinedData, setCombinedData] = useState(
    [Data, Data2, Data, Data2, Data]
  );

  console.log(combinedData);
  const [graphType, setGraphType] = useState(1);
  
  
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: combinedData[0].map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const socket_ip = window.location.hostname + ":5001/";
  const socket = io(socket_ip, {
    transports: ["websocket"],
    cors: {
      origin: window.location.hostname + ":3000",
    },
  });

  return (
    <div className="App">
      <h1>React/Flask App + socket.io</h1>
      <div className="w-1/2">
        <GraphSelector setGraphType={setGraphType} graphOptions={graphOptions} setChartData={setChartData} combinedData={combinedData} chartData={chartData}/>
        <LineChart chartData={chartData} graphType={graphType} graphOptions={graphOptions}/>
      </div>
      <div className="line">
        {/* Render your chart component here using chartData */}
        {/* Example: */}
        {/* <MyChart chartData={chartData} /> */}
      </div>
      {/* Uncomment the WebSocketCall component if needed */}
      {/* <WebSocketCall socket={socket} /> */}
    </div>
  );
}

export default App;
