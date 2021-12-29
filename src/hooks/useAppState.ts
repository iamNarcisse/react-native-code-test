import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export const useAppStatusState = () => {
  const [currentState, setState] = useState(AppState.currentState);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription: any = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
        }

        appState.current = nextAppState;
        setState(appState.current);
      }
    );

    return () => {
      subscription?.remove();
    };
  }, [AppState]);

  return {
    currentState,
  };
};
