import Logger from "@src/lib/Logger";
import * as Font from "expo-font";

const useFonts = async () => {
  try {
    await Font.loadAsync({
      Roboto: require("../../assets/fonts/Roboto/Roboto.ttf"),
      "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
    });
  } catch (error) {
    Logger.log(error);
  }
};

export default useFonts;
