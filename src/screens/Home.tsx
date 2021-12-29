import bounce from "@assets/egg-bounce.json";
import { MemoizedCard } from "@src/components/common/Card";
import Firebase from "@src/config/firebase";
import { useAppTheme } from "@src/hooks/useAppTheme";
import {
  default as Responsive,
  default as responsive,
} from "@src/lib/responsive";
import MockRequest from "@src/services";
import { AppTheme, Blog } from "@src/types";
import { Icon, Layout } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

const request = new MockRequest();

interface HomeState {
  data: Blog[];
  fetching: boolean;
}
const HomeScreen = () => {
  const [state, setState] = useState<HomeState>({
    data: [],
    fetching: false,
  });

  const { toggleTheme, theme } = useAppTheme();

  const logout = () => {
    Firebase.auth().signOut();
  };

  useEffect(() => {
    onFetchData();
  }, []);

  const onFetchData = () => {
    setState({
      ...state,
      fetching: true,
    });
    request
      .getAll()
      .then((data) => {
        setState({
          ...state,
          fetching: false,
          data,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          fetching: false,
        });
      });
  };

  const renderItem = ({ item }: { item: Blog }) => {
    return <MemoizedCard {...item} />;
  };

  const renderAnimation = () => {
    return (
      <LottieView source={bounce} autoPlay resizeMode="contain" speed={1.5} />
    );
  };

  if (state.fetching) {
    return renderAnimation();
  }

  const renderToggleIcon = () => {
    const iconName = theme === AppTheme.DARK ? "moon" : "sun";
    return (
      <TouchableOpacity onPress={toggleTheme}>
        <Icon
          style={styles.icon}
          fill="#8F9BB3"
          name={iconName}
          onPress={toggleTheme}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={styles.container}>
      {renderToggleIcon()}

      <FlatList
        data={state.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        initialNumToRender={10}
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
