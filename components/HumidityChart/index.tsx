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
import { getLabelsArray } from "../../utils/getLabelsArray";
import { HumidityChartProps } from '../../types'

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

  const data = {
    labels,
    datasets: [
      {
        label: "Living Room Humidity",
        data: loggedHumidityLine,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        lineTension: 0.4,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
