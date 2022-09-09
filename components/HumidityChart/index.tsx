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

  if (sheetData) {
    getHourlyDataForDateRange(
      sheetData,
      "2022-09-07",
      "14:00",
      "2022-09-09",
      "01:00"
    );
  }

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
        label: "Humidity",
        data: hourlyData?.map((entry) => entry[3]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
