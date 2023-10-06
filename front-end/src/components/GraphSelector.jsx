// / components/LineChart.js
import React from "react";
import 'tailwindcss/tailwind.css';



function GraphSelector({ setGraphType, graphOptions, setChartData, combinedData, chartData}) {
    const handleOptionClick = (optionNumber) => {
        setGraphType(optionNumber);
        setChartData({
            labels: combinedData[optionNumber].map((data) => data.year),
            datasets: [
              {
                label: "Users Gained",
                data: combinedData[optionNumber].map((data) => data.userGain),
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
          console.log(chartData)
        //Setgrapadata
      };

      
      
  return (
    <div className="w-full">
        <div className="flex justify-between w-full px-10">
        {Object.entries(graphOptions).map(([number, label]) => (
          <div
            key={number}
            onClick={() => handleOptionClick(number)}
          >
            {label}
          </div>
        ))}
      </div>


    </div>
  );
}
export default GraphSelector;