export const openMeteo = async (url: string) => {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
      let data = await response.json();
      return data?.hourly;
    } else {
      throw "error calling openMeteo";
    }
  } catch (error) {
    console.log("error calling openMeteo: ", error);
  }
};
