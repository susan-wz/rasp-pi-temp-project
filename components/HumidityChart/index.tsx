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
import { SheetDataProps } from "../../types";
import { getHourlyDataForDateRange } from "../../utils/getHourlyDataForDateRange";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function HumidityChart({ sheetData }: SheetDataProps) {
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

  let hourlyData
  if (sheetData) {
    hourlyData = getHourlyDataForDateRange(sheetData);
  }

  const labels = hourlyData?.map((entry) => {
    return `${entry[0]} ${entry[1]}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: hourlyData?.map((entry) => entry[3]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        lineTension: 0.4
      },
    ],
  };
  return <Line options={options} data={data} />;
}
