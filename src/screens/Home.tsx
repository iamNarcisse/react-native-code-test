import bounce from "@assets/bounce.json";
import { MemoizedCard } from "@src/components/common/Card";
import Firebase from "@src/config/firebase";
import blogData from "@src/data/blogData.json";
import { useAppTheme } from "@src/hooks/useAppTheme";
import {
  default as Responsive,
  default as responsive,
} from "@src/lib/responsive";
import MockRequest from "@src/services";
import { AppTheme } from "@src/types";
import { Icon, Layout } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

const request = new MockRequest();
const HomeScreen = () => {
  const { toggleTheme, theme } = useAppTheme();
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<any>([]);

  var animation = useRef<LottieView | null>();

  const logout = () => {
    Firebase.auth().signOut();
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const onFetchData = () => {
    setFetching(true);
    request
      .getAll()
      .then((data) => {
        setData(data);
        setFetching(false);
      })
      .catch((error) => {
        setFetching(false);
      });
  };

  const renderItem = ({ item }) => {
    return <MemoizedCard {...item} />;
  };

  const renderAnimation = () => {
    return (
      <>
        <LottieView
          ref={(animation) => {
            animation = animation;
          }}
          source={bounce}
          autoPlay
          speed={1.5}
        />
      </>
    );
  };

  if (fetching) {
    return renderAnimation();
  }

  const renderToggleIcon = () => {
    return theme === AppTheme.DARK ? (
      <Icon
        style={styles.icon}
        fill="#8F9BB3"
        name="moon"
        onPress={toggleTheme}
      />
    ) : (
      <Icon
        style={styles.icon}
        fill="#8F9BB3"
        name="sun"
        onPress={toggleTheme}
      />
    );
  };

  return (
    <Layout style={styles.container}>
      {renderToggleIcon()}

      <FlatList
        data={blogData.blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        initialNumToRender={3}
        removeClippedSubviews
      />
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Responsive.widht(2),
    flex: 1,
  },

  icon: {
    width: 32,
    alignSelf: "flex-end",
    height: 32,
    marginVertical: Responsive.height(2),
  },

  logoContainer: {
    height: responsive.height(35),
  },

  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
});
