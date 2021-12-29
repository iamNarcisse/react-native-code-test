import { useRoute } from "@react-navigation/native";
import CustomImage from "@src/components/common/Image";
import { RegularText, TitleText } from "@src/components/common/Text";
import { dateToLL } from "@src/helpers/date";
import Responsive from "@src/lib/responsive";
import { BlogDetailRouteProp } from "@src/types";
import { Layout } from "@ui-kitten/components";
import React from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const BlogDetailScreen = () => {
  const route = useRoute<BlogDetailRouteProp>();
  const notifList: any = {};
  const { title, content } = route.params;
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentSizeHeight = event.nativeEvent.contentSize.height - 20;
    const currentReadHeight = event.nativeEvent.contentOffset.y + layoutHeight;
    const readBenchmark = 0.7 * contentSizeHeight;
    if (currentReadHeight < readBenchmark) {
      if (!notifList[title as string]) {
        console.log("ADD TO NOTIF OOOO");
        notifList[title as string] = route.params;
      }
    } else if (currentReadHeight > readBenchmark) {
      if (notifList[title as string]) {
        console.log("REMOVE FROM NOTIF");
        notifList[title as string] = undefined;
      }
    }
  };

  const handleLayout = (event: LayoutChangeEvent) => {};

  const headerMetaInfo = () => {
    return (
      <View style={styles.headerMetaContainer}>
        <RegularText title={`${route.params.author} | `} />
        <RegularText title={dateToLL(route.params.datePublished)} />
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      <ScrollView onLayout={handleLayout} onScrollEndDrag={handleScroll}>
        <TitleText style={styles.titleText} title={title} />
        {headerMetaInfo()}
        <CustomImage
          source={{ uri: route.params.imageUrl }}
          style={styles.imageContainer}
          resizeMode="contain"
        />
        <Layout style={styles.contentContainer} level="2">
          <RegularText
            style={styles.paragraphText}
            category="p1"
            title={content}
          />
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: Responsive.height(30),
    width: "100%",
  },

  contentContainer: {
    padding: 10,
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  paragraphText: {
    marginBottom: 10,
    textAlign: "justify",
  },
  titleText: {
    textAlign: "center",
    textTransform: "capitalize",
  },

  headerMetaContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
