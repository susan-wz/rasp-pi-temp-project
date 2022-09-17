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
import { HumidityChartProps } from "../../types";
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

export function HumidityChart({
  loggedHumidity,
  forecastHumidity,
  historicalHumidity,
  insideForecastHumidity,
}: HumidityChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `How humid is it in Susan's living room?`,
        font: {
          size: 36,
        },
      },
    },
  };

  const labels = getLabelsArray();

  const loggedHumidityLine = labels.map((label) => {
    return loggedHumidity[label];
  });
  const historicalHumidityLine = labels.map((label) => {
    return historicalHumidity[label];
  });
  const forecastHumidityLine = labels.map((label) => {
    return forecastHumidity[label];
  });
  const insideForecastLine = labels.map((label) => {
    return insideForecastHumidity[label];
  });

  const nowIndex = labels.findIndex((label) => label === getLatestHour());
  if (nowIndex !== -1) {
    labels[nowIndex] = "Now";
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Living Room Humidity",
        data: loggedHumidityLine,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
        pointRadius: 2
      },
      {
        label: "Living Room Humidity Forecast",
        data: insideForecastLine,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
        pointRadius: 2,
        borderDash: [4, 8],
      },
      {
        label: "Outside Humidity",
        data: historicalHumidityLine,
        borderColor: "blue",
        backgroundColor: "blue",
        lineTension: 0.4,
        pointRadius: 2
      },
      {
        label: "Outside Humidity Forecast",
        data: forecastHumidityLine,
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
