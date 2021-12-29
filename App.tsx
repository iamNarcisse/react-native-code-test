import * as eva from "@eva-design/eva";
import { ThemeContext } from "@src/context";
import useFonts from "@src/hooks/useFont";
import Logger from "@src/lib/Logger";
import { RootNavigator } from "@src/navigation";
import { AuthenticatedUserProvider } from "@src/navigation/AuthenticatedProvider";
import { AppTheme } from "@src/types";
import { default as theme } from "@theme/dark-theme.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import mapping from "./mapping.json";
import * as Notifications from "expo-notifications";

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

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    LoadFonts().catch((error) => Logger.log(error));
  }, []);

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
