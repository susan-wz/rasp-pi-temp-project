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

export function TemperatureChart({ sheetData }: SheetDataProps) {
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
        label: "Temperature",
        data: hourlyData?.map((entry) => entry[2]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4
      },
    ],
  };
  return <Line options={options} data={data} />;
}
