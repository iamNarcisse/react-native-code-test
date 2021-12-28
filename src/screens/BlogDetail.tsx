import { RouteProp, useRoute } from "@react-navigation/native";
import CustomImage from "@src/components/common/Image";
import { RegularText, TitleText } from "@src/components/common/Text";
import Responsive from "@src/lib/responsive";
import { Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface ObjectLiteral {
  [key: string]: any;
}
interface BlogDetailRouteProp extends RouteProp<ObjectLiteral> {
  params: { title?: string; content: string; imageUrl: string };
}

const BlogDetailScreen = ({}) => {
  let layoutHeight = 0;

  const route = useRoute<BlogDetailRouteProp>();

  const notifList: any = {};

  const [state, setState] = useState({
    layoutHeight: 0,
  });

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

  console.log(notifList);

  const handleLayout = (event: LayoutChangeEvent) => {};

  const handleNotification = () => {};

  return (
    <Layout style={styles.container}>
      <ScrollView onLayout={handleLayout} onScrollEndDrag={handleScroll}>
        <CustomImage
          source={{ uri: route.params.imageUrl }}
          style={styles.imageContainer}
          resizeMode="contain"
        />

        <View style={styles.contentContainer}>
          <TitleText title={title} />
          <RegularText
            style={styles.paragraphText}
            category="p1"
            title={content}
          />
        </View>
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
  },
  paragraphText: {
    marginBottom: 10,
    textAlign: "justify",
  },
});
