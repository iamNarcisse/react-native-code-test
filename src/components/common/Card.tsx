import { useNavigation } from "@react-navigation/native";
import Responsive from "@src/lib/responsive";
import { Blog, ScreenNames } from "@src/types";
import { Card } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import CustomImage from "./Image";
import { RegularText } from "./Text";

const OurCard = ({ imageUrl, title, content }: Blog) => {
  const navigator = useNavigation();

  const onPress = () => {
    const params = {
      title,
      content,
      imageUrl,
    };
    navigator.navigate(ScreenNames.DETAIL as never, params as never);
  };

  return (
    <Card style={styles.container} onPress={onPress}>
      <RegularText title={title} style={styles.text} numberOfLines={3} />
      <CustomImage
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
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
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  image: { height: 100, width: "100%" },
});
