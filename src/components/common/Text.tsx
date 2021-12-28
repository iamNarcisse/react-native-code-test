import { Text, TextProps } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

interface RegularTextProps extends TextProps {
  title?: string;
}

const RegularText = ({ style, title, ...rest }: RegularTextProps) => {
  return (
    <Text style={[styles.regularText, style]} {...rest}>
      {title}
    </Text>
  );
};

const TitleText = ({ style, title, ...rest }: RegularTextProps) => {
  return (
    <Text style={[styles.title, style]} {...rest}>
      {title}
    </Text>
  );
};

export { RegularText, TitleText };

const styles = StyleSheet.create({
  title: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 41,
    marginBottom: 10,
  },

  regularText: {
    lineHeight: 21,
  },
});
