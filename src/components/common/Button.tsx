import React from "react";
import { Button, ButtonProps } from "@ui-kitten/components";
import { ActivityIndicator } from "react-native";

interface AppButtonProps extends ButtonProps {
  loading?: boolean;
  title?: string;
}

const AppButton = ({ title, loading, onPress, ...rest }: AppButtonProps) => {
  return (
    <Button onPress={onPress} status="primary" disabled={loading} {...rest}>
      {loading ? <ActivityIndicator /> : title}
    </Button>
  );
};

export { AppButton };
