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

  // get sheetdata, return an array of every entry that's on the hour
  // if none for the hour for some reason, then skip
  // can come back to this to get one that's +/- a minute

  const hourlyData = sheetData?.filter(
    (entry) => entry[1].substring(3) === "00"
  );

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
      },
    ],
  };
  return <Line options={options} data={data} />;
}
