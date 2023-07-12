// Import necessary libraries and components
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useMemo, useReducer, useCallback } from "react";
import { Alert } from "react-native";
import Onboarding from "./src/screens/OnboardingScreen";
import Profile from "./src/screens/ProfileScreen";
import SplashScreen from "./src/screens/SplashScreen";
import Home from "./src/screens/HomeScreen";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./src/contexts/AuthContext";

// Create a navigator stack
const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  // Define a state and dispatch function with useReducer
  // Initial state is an object with keys 'isLoading' and 'isOnboardingCompleted'
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "onboard":
          return {
            ...prevState,
            isLoading: false,
            isOnboardingCompleted: action.isOnboardingCompleted,
          };
      }
    },
    {
      isLoading: true,
      isOnboardingCompleted: false,
    }
  );

  // useEffect hook to load user profile data from AsyncStorage when the component mounts
  useEffect(() => {
    (async () => {
      let profileData = [];
      try {
        const getProfile = await AsyncStorage.getItem("profile");
        if (getProfile !== null) {
          profileData = getProfile;
        }
      } catch (e) {
        console.error(e);
      } finally {
        // If the profile data exists, set 'isOnboardingCompleted' to true, else false
        if (Object.keys(profileData).length != 0) {
          dispatch({ type: "onboard", isOnboardingCompleted: true });
        } else {
          dispatch({ type: "onboard", isOnboardingCompleted: false });
        }
      }
    })();
  }, []);

  // useMemo hook to create 'authContext' object which has functions for onboarding, updating profile, and logout
  const authContext = useMemo(
    () => ({
      onboard: async (data) => {
        // Save profile data to AsyncStorage and update 'isOnboardingCompleted' to true
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("profile", jsonValue);
        } catch (e) {
          console.error(e);
        }
        dispatch({ type: "onboard", isOnboardingCompleted: true });
      },
      update: async (data) => {
        // Update profile data in AsyncStorage and show a success alert
        try {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("profile", jsonValue);
        } catch (e) {
          console.error(e);
        }
        Alert.alert("Success", "Successfully saved changes!");
      },
      logout: async () => {
        // Clear all data in AsyncStorage and update 'isOnboardingCompleted' to false
        try {
          await AsyncStorage.clear();
        } catch (e) {
          console.error(e);
        }
        dispatch({ type: "onboard", isOnboardingCompleted: false });
      },
    }),
    []
  );

  // If 'isLoading' is true, render 'SplashScreen'
  if (state.isLoading) {
    return <SplashScreen />;
  }

  // Else render navigation stack with 'Home' and 'Profile' if 'isOnboardingCompleted' is true, or 'Onboarding' if false
  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {state.isOnboardingCompleted ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
