import { useNavigation, useRoute } from "@react-navigation/native";
import CustomImage from "@src/components/common/Image";
import { RegularText, TitleText } from "@src/components/common/Text";
import { dateToLL } from "@src/helpers/date";
import Responsive from "@src/lib/responsive";
import { BlogDetailRouteProp } from "@src/types";
import { Layout } from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { AnimatePresence, MotiView } from "moti";
import { useNotification } from "@src/hooks/useNotification";
import { getHashedValue } from "@src/helpers/getIdentifier";
import Logger from "@src/lib/Logger";

const BENCHMARK = 0.7;

const BlogDetailScreen = () => {
  const route = useRoute<BlogDetailRouteProp>();
  const navigation = useNavigation();
  const { title, content } = route.params;
  const { scheduleNotification, cancelNotification } = useNotification();
  const hasReadHeightRef = useRef<number | undefined>();
  const completedReading = useRef<boolean | undefined>(false);
  const [state, setState] = useState({
    layoutHeight: 0,
    hasReadHeight: 0,
    contentSizeHeight: 0,
    readingComplete: false,
  });

  const handleScheduleNotification = async () => {
    const hasReadHeight = hasReadHeightRef.current;
    const _completedReading = completedReading.current;

    // User just visited page but didn't  scroll(i.e read);
    if (!hasReadHeight) {
      return;
    }

    if (_completedReading) {
      return;
    }

    // Schedule local notification
    const notificationIdentifier = await getHashedValue(title);
    try {
      await scheduleNotification({
        identifier: notificationIdentifier,
        title,
      });
    } catch (error) {
      Logger.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", async () => {
      handleScheduleNotification();
    });
  }, []);

  const handleScroll = async (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentSizeHeight = event.nativeEvent.contentSize.height - 20;
    const hasReadHeight =
      event.nativeEvent.contentOffset.y + state.layoutHeight;
    hasReadHeightRef.current = hasReadHeight;
    const readBenchMark = BENCHMARK * contentSizeHeight;
    if (hasReadHeight > readBenchMark && !state.readingComplete) {
      completedReading.current = true;
      //User has completed reading article; cancel local notification if any
      const notificationIdentifier = await getHashedValue(title);
      await cancelNotification(notificationIdentifier);

      setState({
        ...state,
        readingComplete: true,
        contentSizeHeight,
        hasReadHeight,
      });

      return;
    }

    setState({
      ...state,
      contentSizeHeight,
      hasReadHeight,
    });
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    setState({
      ...state,
      layoutHeight,
    });
  };

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
      <ScrollView onLayout={onLayout} onScrollEndDrag={handleScroll}>
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
            <TitleText style={styles.titleText} title={title} />
            {headerMetaInfo()}
            <CustomImage
              source={{ uri: route.params.imageUrl }}
              style={styles.imageContainer}
              resizeMode="contain"
            />
          </MotiView>
        </AnimatePresence>

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
    paddingBottom: 15,
  },
});

/**
 * To do
 * Prevent notification from popping up when user in on the app
 * Put a circular progress bar
 * Cleanups and refactor
 */
