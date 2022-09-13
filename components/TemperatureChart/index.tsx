import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TempChartProps } from "../../types";
import { getLabelsArray } from "../../utils/getLabelsArray";
import { getLatestHour } from "../../utils/getLatestHour";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TemperatureChart({
  loggedTemp,
  forecastTemp,
  historicalTemp,
  insideForecastTemp,
}: TempChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `How hot is it in Susan's living room?`,
        font: {
          size: 36,
        },
      },
    },
  };

  const labels = getLabelsArray();

  const loggedTempLine = labels.map((label) => {
    return loggedTemp[label];
  });
  const historicalTempLine = labels.map((label) => {
    return historicalTemp[label];
  });
  const forecastTempLine = labels.map((label) => {
    return forecastTemp[label];
  });
  const insideForecastLine = labels.map((label) => {
    return insideForecastTemp[label];
  });

  const nowIndex = labels.findIndex((label) => label === getLatestHour());
  if (nowIndex !== -1) {
    labels[nowIndex] = "Now";
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Living Room Temperature",
        data: loggedTempLine,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
        pointRadius: 2
      },
      {
        label: "Living Room Forecast",
        data: insideForecastLine,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
        pointRadius: 2,
        borderDash: [4, 8],
      },
      {
        label: "Outside Temperature",
        data: historicalTempLine,
        borderColor: "blue",
        backgroundColor: "blue",
        lineTension: 0.4,
        pointRadius: 2
      },
      {
        label: "Outside Forecast",
        data: forecastTempLine,
        borderColor: "blue",
        backgroundColor: "blue",
        lineTension: 0.4,
        pointRadius: 2,
        borderDash: [4, 8],
      },
    ],
  };
  return <Line options={options} data={data} />;
}
