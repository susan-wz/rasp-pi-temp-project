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
import { PageProps } from "../../types";
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

export function TemperatureChart({ sheetData, forecast }: PageProps) {
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

  let hourlyData;
  if (sheetData) {
    hourlyData = getHourlyDataForDateRange(sheetData);
  }

  const hoursToForecast = 48;

  // get past hours for labels
  const pastHoursLabels = hourlyData?.map((entry) => {
    return `${entry[0]} ${entry[1]}`;
  });

  // get forecasted hours for labels
  const latestHour = hourlyData[hourlyData?.length - 1];

  // open meteo returns data from start of day, this adds an offset to current hour
  const forecastStartIndex = forecast.time.findIndex(
    (entry) =>
      entry.split("T")[0] === latestHour[0] &&
      entry.split("T")[1] === latestHour[1]
  );
  
  const forecastedHourLabels = forecast.time
    .slice(forecastStartIndex, hoursToForecast)
    .map((entry) => {
      const date = entry.split("T")[0];
      const time = entry.split("T")[1];
      return `${date} ${time}`;
    });

  const labels = pastHoursLabels?.concat(forecastedHourLabels);

  const tempForecast = [...Array(hourlyData?.length)].concat(
    forecast.temperature_2m.slice(forecastStartIndex, hoursToForecast)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: hourlyData?.map((entry) => entry[2]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
      },
      {
        label: "Forecast",
        data: tempForecast,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        lineTension: 0.4,
        borderDash: [8, 8],
      },
    ],
  };
  return <Line options={options} data={data} />;
}
