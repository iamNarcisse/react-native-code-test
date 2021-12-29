import * as eva from "@eva-design/eva";
import { ThemeContext } from "@src/context";
import { useNotification } from "@src/hooks/useNotification";
import { RootNavigator } from "@src/navigation";
import { AuthenticatedUserProvider } from "@src/navigation/AuthenticatedProvider";
import { AppTheme } from "@src/types";
import { default as theme } from "@theme/dark-theme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import mapping from "./mapping.json";

type Subscription = {
  /**
   * A method to unsubscribe the listener.
   */
  remove: () => void;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [activeTheme, setTheme] = useState(AppTheme.LIGHT);
  const { cancelNotification } = useNotification();
  const toggleTheme = (theme = AppTheme.DARK) => {
    const nextTheme = theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK;
    setTheme(nextTheme);
  };

  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {}
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          // User tapped on notification; thus remove from notification loop
          const identifier = response.notification.request.identifier;
          await cancelNotification(identifier);
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener as Subscription
      );
      Notifications.removeNotificationSubscription(
        responseListener as Subscription
      );
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
