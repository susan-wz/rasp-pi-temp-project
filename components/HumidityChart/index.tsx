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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function HumidityChart({ sheetData }: any) {
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

  const labels: any[] = []

  const data = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        lineTension: 0.4,
      },
    ],
  };
  return <Line options={options} data={data} />;
}
