// Import necessary packages and components
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { validateEmail } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { styles } from "../styles/ProfileScreenStyles";

const Profile = () => {
  // Use state for storing the profile object
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    image: "",
  });
  const [discard, setDiscard] = useState(false);

  // On component mount or whenever 'discard' state changes, read the profile from async storage
  useEffect(() => {
    (async () => {
      try {
        const getProfile = await AsyncStorage.getItem("profile");
        setProfile(JSON.parse(getProfile));
        setDiscard(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [discard]);

  // Functions for form validation and profile updating
  const validateName = (name) => {
    if (name.length > 0) {
      return name.match(/[^a-zA-Z]/);
    } else {
      return true;
    }
  };

  const validateNumber = (number) => {
    if (isNaN(number)) {
      return false;
    } else if (number.length == 10) {
      return true;
    }
  };

  const { update } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const updateProfile = (key, value) => {
    setProfile((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Loading custom fonts
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../../assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("../../assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("../../assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("../../assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("../../assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("../../assets/fonts/MarkaziText-Medium.ttf"),
  });

  // Check if fonts are loaded before hiding the splash screen
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts are not loaded, render nothing
  if (!fontsLoaded) {
    return null;
  }

  const getIsFormValid = () => {
    return (
      !validateName(profile.firstName) &&
      !validateName(profile.lastName) &&
      validateEmail(profile.email) &&
      validateNumber(profile.phoneNumber)
    );
  };

  // Function for picking an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile((prevState) => ({
        ...prevState,
        ["image"]: result.assets[0].uri,
      }));
    }
  };

  // Function for removing an image
  const removeImage = () => {
    setProfile((prevState) => ({
      ...prevState,
      ["image"]: "",
    }));
  };

  // Main return of the component, includes a lot of components for displaying and manipulating the profile
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
      <ScrollView style={styles.viewScroll}>
        <Text style={styles.headertext}>Personal information</Text>
        <Text style={styles.text}>Avatar</Text>
        <View style={styles.avatarContainer}>
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarEmpty}>
              <Text style={styles.avatarEmptyText}>
                {profile.firstName && Array.from(profile.firstName)[0]}
                {profile.lastName && Array.from(profile.lastName)[0]}
              </Text>
            </View>
          )}
          <View style={styles.avatarButtons}>
            <Pressable
              style={styles.changeBtn}
              title="Pick an image from camera roll"
              onPress={pickImage}
            >
              <Text style={styles.saveBtnText}>Change</Text>
            </Pressable>
            <Pressable
              style={styles.removeBtn}
              title="Pick an image from camera roll"
              onPress={removeImage}
            >
              <Text style={styles.discardBtnText}>Remove</Text>
            </Pressable>
          </View>
        </View>
        <Text
          style={[
            styles.text,
            !validateName(profile.firstName) ? "" : styles.error,
          ]}
        >
          First Name
        </Text>
        <TextInput
          style={styles.inputBox}
          value={profile.firstName}
          onChangeText={(newValue) => updateProfile("firstName", newValue)}
          placeholder={"First Name"}
        />
        <Text
          style={[
            styles.text,
            !validateName(profile.lastName) ? "" : styles.error,
          ]}
        >
          Last Name
        </Text>
        <TextInput
          style={styles.inputBox}
          value={profile.lastName}
          onChangeText={(newValue) => updateProfile("lastName", newValue)}
          placeholder={"Last Name"}
        />
        <Text
          style={[
            styles.text,
            validateEmail(profile.email) ? "" : styles.error,
          ]}
        >
          Email
        </Text>
        <TextInput
          style={styles.inputBox}
          value={profile.email}
          keyboardType="email-address"
          onChangeText={(newValue) => updateProfile("email", newValue)}
          placeholder={"Email"}
        />
        <Text style={[styles.text]}>Phone number</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={(newValue) => updateProfile("phoneNumber", newValue)}
          placeholder={"Phone number"}
        />
        <Text style={styles.headertext}>Email notifications</Text>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.orderStatuses}
            onValueChange={(newValue) =>
              updateProfile("orderStatuses", newValue)
            }
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Order statuses</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.passwordChanges}
            onValueChange={(newValue) =>
              updateProfile("passwordChanges", newValue)
            }
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Password changes</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.specialOffers}
            onValueChange={(newValue) =>
              updateProfile("specialOffers", newValue)
            }
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Special offers</Text>
        </View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={profile.newsletter}
            onValueChange={(newValue) => updateProfile("newsletter", newValue)}
            color={"#495e57"}
          />
          <Text style={styles.paragraph}>Newsletter</Text>
        </View>
        <Pressable style={styles.btnLogout} onPress={() => logout()}>
          <Text style={styles.btntext}>Log out</Text>
        </Pressable>
        <View style={styles.buttons}>
          <Pressable style={styles.discardBtn} onPress={() => setDiscard(true)}>
            <Text style={styles.discardBtnText}>Discard changes</Text>
          </Pressable>
          <Pressable
            style={[styles.saveBtn, getIsFormValid() ? "" : styles.btnDisabled]}
            onPress={() => update(profile)}
            disabled={!getIsFormValid()}
          >
            <Text style={styles.saveBtnText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Export Profile component
export default Profile;
