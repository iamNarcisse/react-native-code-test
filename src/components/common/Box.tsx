import { useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

const SPACINGS = {
  s: "",
};
export const Box = ({ padding = "s", margin = "s", ...rest }) => {
  const theme = useTheme();

  return <View style={styles.container} {...rest} />;
};

export default Box;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
