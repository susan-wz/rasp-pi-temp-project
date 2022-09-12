import { OpenMeteoResponse } from "../../types";

export const openMeteo = async (url: string): Promise<OpenMeteoResponse | undefined> => {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();
      return data;
    } else {
      throw "error calling openMeteo";
    }
  } catch (error) {
    console.log("error calling openMeteo: ", error);
  }
};
