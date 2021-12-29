import { useNavigation } from "@react-navigation/native";
import { dateToLL } from "@src/helpers/date";
import Responsive from "@src/lib/responsive";
import { Blog, ScreenNames } from "@src/types";
import { Card, Layout } from "@ui-kitten/components";
import { AnimatePresence, MotiView } from "moti";
import React from "react";
import { StyleSheet } from "react-native";
import CustomImage from "./Image";
import { RegularText } from "./Text";

const OurCard = ({
  imageUrl,
  title,
  content,
  author,
  datePublished,
  views,
}: Blog) => {
  const navigator = useNavigation();

  const onPress = () => {
    const params = {
      title,
      content,
      imageUrl,
      datePublished,
      author,
      views,
    };
    navigator.navigate(ScreenNames.DETAIL as never, params as never);
  };

  const renderHeader = () => (
    <Layout style={styles.header}>
      <RegularText category="h5" title={title} style={styles.title} />
    </Layout>
  );

  const renderFooter = () => (
    <Layout style={styles.footer}>
      <RegularText
        category="s1"
        style={styles.footerText}
        title={`${author}  | ${dateToLL(datePublished)} | ${views} views`}
      />
    </Layout>
  );

  return (
    <AnimatePresence>
      <MotiView
        from={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.7,
        }}
      >
        <Card
          style={styles.container}
          onPress={onPress}
          header={renderHeader}
          footer={renderFooter}
          activeOpacity={0.7}
        >
          <Layout style={styles.cardContent}>
            <CustomImage
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          </Layout>
        </Card>
      </MotiView>
    </AnimatePresence>
  );
};

const MemoizedCard = React.memo(OurCard);

export { MemoizedCard };
const styles = StyleSheet.create({
  container: {
    marginBottom: Responsive.height(2),
    padding: 0,
  },
  title: {
    marginBottom: Responsive.height(1),
    lineHeight: 25,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  image: { height: 100, width: "100%" },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
  },
  footerDetail: {
    flexDirection: "column",
    alignItems: "center",
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 6,
  },

  footerText: {
    fontWeight: "400",
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
