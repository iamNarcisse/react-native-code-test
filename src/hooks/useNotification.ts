import Logger from "@src/lib/Logger";
import * as Notifications from "expo-notifications";
import { useRef } from "react";

const PERIOD = 30; // 3 hours in seconds
export const useNotification = () => {
  let notifIdentifier = useRef<string>().current;
  const cancelNotification = async (identifier: string) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
      Logger.log(error);
    }
  };

  const scheduleNotification = async ({
    title,
    identifier,
  }: {
    title: string;
    identifier: string;
  }) => {
    notifIdentifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Complete reading ${title}`,
      },
      trigger: { seconds: PERIOD, repeats: true },
    });

    return notifIdentifier;
  };

  return {
    cancelNotification,
    scheduleNotification,
  };
};
