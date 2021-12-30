import React, { FC } from "react";

import {
  AnimatedCircularProgress,
  AnimatedCircularProgressProps,
} from "react-native-circular-progress";

import { EvaProp, withStyles } from "@ui-kitten/components";

interface CircularProgress extends AnimatedCircularProgressProps {
  onAnimationComplete?: () => void;
  eva?: EvaProp;
}
const ThemeCircularProgress: FC<CircularProgress> = ({
  size = 120,
  width = 50,
  fill = 100,
  onAnimationComplete,
  eva,
}) => {
  const theme: any = eva?.theme;
  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={fill}
      tintColor={theme["color-primary-500"]}
      onAnimationComplete={onAnimationComplete}
      backgroundColor="#F6F9FC"
      padding={0}
      style={eva?.style?.barContainer}
    />
  );
};

const CircularProgress = withStyles(ThemeCircularProgress, (theme) => ({
  barContainer: {
    backgroundColor: "transparent",
  },
}));

export { CircularProgress };
