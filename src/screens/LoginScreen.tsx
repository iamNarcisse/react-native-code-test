import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@src/components/common/Box";
import { TextInput } from "@src/components/common/Input";
import { RegularText, TitleText } from "@src/components/common/Text";
import Firebase from "@src/config/firebase";
import Responsive from "@src/lib/responsive";
import { Button, Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet } from "react-native";
import * as yup from "yup";
const auth = Firebase.auth();

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type FormField = {
  email: string;
  password: string;
};

type FormType = {
  name: "password" | "email";
  label?: string;
};

const FORM: Array<FormType> = [
  {
    name: "email",
    label: "Email",
  },
  {
    name: "password",
    label: "Password",
  },
];
const LoginScreen = () => {
  const [state, setState] = useState({
    loading: false,
    errorMsg: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormField>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormField) => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const response = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      setState({
        ...state,
        loading: false,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMsg: "Login details is incorrect",
      });
    }
  };

  return (
    <Layout style={styles.container}>
      <TitleText style={styles.titleText} title="Welcome Back" />

      {FORM.map((item, index) => {
        return (
          <Controller
            key={index}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Box>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={(event) => {
                      if (state.errorMsg) {
                        setState({
                          ...state,
                          errorMsg: "",
                        });
                      }

                      onChange(event);
                    }}
                    value={value}
                    label={item.label}
                  />

                  {errors[item.name] ? (
                    <RegularText
                      status="danger"
                      title={errors[item.name]?.message}
                    />
                  ) : null}
                </Box>
              );
            }}
            name={item.name}
          />
        );
      })}

      {state.errorMsg ? (
        <RegularText status="danger" title={state.errorMsg} />
      ) : null}

      <Box>
        <Button
          onPress={handleSubmit(onSubmit)}
          status="primary"
          disabled={state.loading}
        >
          {state.loading ? <ActivityIndicator /> : "Login"}
        </Button>
      </Box>
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Responsive.widht(5),
  },

  titleText: {
    textAlign: "center",
    marginTop: Responsive.height(5),
  },

  icon: {
    height: 20,
    width: 20,
  },
});
