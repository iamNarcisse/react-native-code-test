import * as eva from "@eva-design/eva";
import { ThemeContext } from "@src/context";
import { RootNavigator } from "@src/navigation";
import { AuthenticatedUserProvider } from "@src/navigation/AuthenticatedProvider";
import { AppTheme } from "@src/types";
import { default as theme } from "@theme/dark-theme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import mapping from "./mapping.json";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [activeTheme, setTheme] = useState(AppTheme.LIGHT);

  const toggleTheme = (theme = AppTheme.DARK) => {
    const nextTheme = theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    setTheme(nextTheme);
  };

  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, toggleTheme }}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva[activeTheme], ...theme }}
        customMapping={{ ...eva.mapping, ...mapping }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AuthenticatedUserProvider>
            <RootNavigator />
          </AuthenticatedUserProvider>
        </SafeAreaView>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
  },
});
