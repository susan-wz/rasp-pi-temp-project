import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { TemperatureChart } from "../components/TemperatureChart";
import { HumidityChart } from "../components/HumidityChart";
import { Intro } from "../components/Intro";
import { PageProps } from "../types";
import { getForecast } from "../services/openMeteo";
import { getGoogleSheetData } from "../services/googleSheets";
import { getHistoricalWeather } from "../services/worldWeather";
import { getInsideForecastGuess } from "../services/guessingTemp";
import { getLatestHour } from "../utils/getLatestHour"

export async function getServerSideProps() {
  const sheetData = await getGoogleSheetData();
  const forecast = await getForecast();
  const historicalWeather = await getHistoricalWeather();
  // const historicalWeather = { temp: {}, humidity: {} };
  const insideForecastGuess = getInsideForecastGuess(sheetData, forecast);

  return {
    props: {
      sheetData,
      forecast,
      historicalWeather,
      insideForecastGuess,
    },
  };
}

const Home: NextPage<PageProps> = ({
  sheetData,
  forecast,
  historicalWeather,
  insideForecastGuess,
}) => {
  const { temp: loggedTemp, humidity: loggedHumidity } = sheetData;
  const { temp: forecastTemp, humidity: forecastHumidity } = forecast;
  const { temp: historicalTemp, humidity: historicalHumidity } =
    historicalWeather;
  const { temp: insideForecastTemp, humidity: insideForecastHumidity } =
    insideForecastGuess;

  const latestHour = getLatestHour();
  const latestTemp = loggedTemp[latestHour];
  const latestHumidity = loggedHumidity[latestHour];

  return (
    <div className={styles.container}>
      <Head>
        <title>Temperature Tracker</title>
        <meta
          name="description"
          content="Temperature and Humidity Data Straight From My Living Room"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.page}>
          <Intro {...{ latestHour, latestTemp, latestHumidity }} />
        </div>
        <div className={styles.page}>
          <TemperatureChart
            {...{
              loggedTemp,
              forecastTemp,
              historicalTemp,
              insideForecastTemp,
            }}
          />
        </div>
        <div className={styles.page}>
          <HumidityChart
            {...{
              loggedHumidity,
              forecastHumidity,
              historicalHumidity,
              insideForecastHumidity,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
