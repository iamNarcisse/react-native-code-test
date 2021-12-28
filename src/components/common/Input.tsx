import { Icon, Input, InputProps, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface TextInputProps extends InputProps {
  placeholder?: string;
}

export const TextInput = ({ placeholder, ...rest }: TextInputProps) => {
  return (
    <Input style={styles.textInputStyle} {...rest} placeholder={placeholder} />
  );
};

export const PasswordInput = ({
  placeholder,
  label,
  ...rest
}: TextInputProps) => {
  const [value, setValue] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const AlertIcon = (props: any) => (
    <Icon {...props} name="alert-circle-outline" />
  );

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      {/* <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} /> */}
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View>
        {/* {AlertIcon(styles.captionIcon)} */}
        <Text>Should contain at least 8 symbols</Text>
      </View>
    );
  };

  return (
    <Input
      {...rest}
      placeholder={placeholder}
      label={label}
      caption={renderCaption}
      // accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={(nextValue) => setValue(nextValue)}
    />
  );
};

const styles = StyleSheet.create({
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
  },

  textInputStyle: {
    borderWidth: 2,
  },
});
