import { IntroProps } from "../../types";
import styles from "./intro.module.css";

export function Intro({ latestHour, latestTemp, latestHumidity }: IntroProps) {
  const hasData = latestTemp && latestHumidity;
  const oops = `... hmmm. I've got no data. Maybe the cat unplugged the Raspberry Pi again?`;
  const tempReport = `${latestTemp}°C in my living room. The humidity is ${latestHumidity}.`;
  const statusText = `As of ${latestHour}, it's ${hasData ? tempReport : oops}`;
  let comment = hasData ? "Quite comfortable. 😊" : null;
  if (latestTemp > 28 && latestHumidity > 80) {
    comment =
      "Quite hot... I think I might actually need air conditioning now. 🥵";
  } else if (latestTemp < 21 && typeof latestTemp === "number") {
    comment = "A bit cold actually. 🥶";
  } else if (latestHumidity > 70) {
    comment = "Why is Toronto always so humid? 😅";
  }
  return (
    <div>
      <p>Just checking in?</p>
      <p>{statusText}</p>
      <p>{comment}</p>
      <div className={styles.bottom}>
        <p>More interesting stuff below.</p>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
}
