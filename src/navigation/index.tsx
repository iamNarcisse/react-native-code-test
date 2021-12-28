import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Firebase from "@src/config/firebase";
import { useAppAuthentication } from "@src/hooks/useAuthentication";
import BlogDetailScreen from "@src/screens/BlogDetail";
import HomeScreen from "@src/screens/Home";
import LoginScreen from "@src/screens/Login";
import React, { Fragment, useEffect } from "react";

const auth = Firebase.auth();

const ROUTES = [
  {
    name: "HomeScreen",
    component: HomeScreen,
    option: {
      headerShown: false,
    },
  },

  {
    name: "DetailScreen",
    component: BlogDetailScreen,
    option: {
      headerShown: true,
      title: "",
    },
  },
];
const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {ROUTES.map((item, index) => {
          return (
            <Stack.Screen
              options={item.option}
              key={index}
              name={item.name}
              component={item.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const RootNavigator = () => {
  const { user, setUser } = useAppAuthentication();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChange();
    return unsubscribeAuth;
  }, []);

  const onAuthStateChange = () => {
    auth.onAuthStateChanged(async (authenticatedUser) => {
      try {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return <Fragment>{user ? <MainNavigator /> : <AuthNavigator />}</Fragment>;
};

export { RootNavigator };
