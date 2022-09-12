import { SingleWeatherLineType } from "../types";

export const getLabelsArray = (...tempArray: SingleWeatherLineType[]) => {
  // tempArray is an array of objects, each object has keys with the log time
  const labels: string[] = [];
  tempArray.forEach((tempObj) => {
    const time = Object.keys(tempObj);
    time.forEach((timeLog) => {
      if (labels.findIndex((label) => label === timeLog) === -1) {
        labels.push(timeLog);
      }
    });
  });
  const trimmedLabels = labels.slice(0, 140);
  return trimmedLabels;
};
