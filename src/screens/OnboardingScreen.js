// Importing necessary modules and functions from libraries
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import { validateEmail, validateName } from "../utils";
import { styles } from "../styles/OnboardingScreenStyles";
import { AuthContext } from "../contexts/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// This is the Onboarding component
const Onboarding = () => {
  // Using state hooks for first name, last name and email fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Using state hooks for validation checks
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);

  // A useEffect hook to validate form fields whenever they change
  useEffect(() => {
    setIsEmailValid(validateEmail(email));
    setIsFirstNameValid(validateName(firstName));
    setIsLastNameValid(validateName(lastName));
  }, [firstName, lastName, email]);

  // Getting the onboard function from the AuthContext
  const { onboard } = useContext(AuthContext);

  // Loading the custom fonts using useFonts hook from expo-font
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../../assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("../../assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("../../assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("../../assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("../../assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("../../assets/fonts/MarkaziText-Medium.ttf"),
  });

  // Function to hide splash screen once the fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts are not loaded, don't render anything
  if (!fontsLoaded) {
    return null;
  }

  // Main return for the Onboarding component
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      onLayout={onLayoutRootView}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/littleLemonLogo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <Text style={styles.headerText}>Welcome</Text>
      <Text style={styles.subText}>
        {" "}
        Please enter your personal details below
      </Text>
      <View style={styles.page}>
        <View style={styles.pageContainer}>
          <Text style={styles.text}>First name *</Text>
          <TextInput
            style={styles.inputBox}
            value={firstName}
            onChangeText={setFirstName}
            placeholder={"First name"}
          />
          <Text style={styles.text}>Last name *</Text>
          <TextInput
            style={styles.inputBox}
            value={lastName}
            onChangeText={setLastName}
            placeholder={"Last name"}
          />
          <Text style={styles.text}>Email *</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
            placeholder={"Email"}
            keyboardType="email-address"
          />
        </View>

        <Pressable
          style={[
            styles.btn,
            isFirstNameValid && isLastNameValid && isEmailValid
              ? null
              : styles.btnDisabled,
          ]}
          onPress={() => onboard({ firstName, lastName, email })}
          disabled={!isFirstNameValid || !isLastNameValid || !isEmailValid}
        >
          <Text style={styles.btntext}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

// Exporting the Onboarding component
export default Onboarding;
