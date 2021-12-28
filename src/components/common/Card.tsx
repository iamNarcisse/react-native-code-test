import { Card, Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { RegularText } from "./Text";
import images from "@assets/index";
import Responsive from "@src/lib/responsive";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "@src/types";
const OurCard = ({ imageUrl, title, content }: any) => {
  const navigator = useNavigation();

  const onPress = () => {
    navigator.navigate(ScreenNames.DETAIL as never, {
      title,
      content,
    });
  };

  return (
    <Card style={styles.container} onPress={onPress}>
      <RegularText title={title} style={styles.text} />
      <Image
        source={images.dummyImage}
        style={{ height: 100, width: "100%" }}
      />
    </Card>
  );
};

const MemoizedCard = React.memo(OurCard);

export { MemoizedCard };
const styles = StyleSheet.create({
  container: {
    marginBottom: Responsive.height(2),
  },
  text: {
    marginBottom: Responsive.height(1),
    lineHeight: 20,
    textAlign: "justify",
  },
});
