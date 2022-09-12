import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { TemperatureChart } from "../components/TemperatureChart";
import { HumidityChart } from "../components/HumidityChart";
import { PageProps } from "../types";
import { getForecast } from "../services/openMeteo";
import { getGoogleSheetData } from "../services/googleSheets";
import { getHistoricalWeather } from "../services/worldWeather";

export async function getServerSideProps() {
  const sheetData = await getGoogleSheetData();
  const forecast = await getForecast();
  const historicalWeather = await getHistoricalWeather();
  // const historicalWeather = { temp: {}, humidity: {} };

  return {
    props: {
      sheetData,
      forecast,
      historicalWeather,
    },
  };
}

const Home: NextPage<PageProps> = ({
  sheetData,
  forecast,
  historicalWeather,
}) => {
  const { temp: loggedTemp, humidity: loggedHumidity } = sheetData;
  const { temp: forecastTemp, humidity: forecastHumidity } = forecast;
  const { temp: historicalTemp, humidity: historicalHumidity } =
    historicalWeather;
  return (
    <div className={styles.container}>
      <Head>
        <title>Temperature Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <TemperatureChart {...{ loggedTemp, forecastTemp, historicalTemp }} />
        <HumidityChart
          {...{ loggedHumidity, forecastHumidity, historicalHumidity }}
        />
      </main>
    </div>
  );
};

export default Home;
