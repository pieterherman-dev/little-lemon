// Import necessary packages and components
import React from "react";
import { View, Image } from "react-native";
// Import custom stylesheet
import { styles } from "../styles/SplashScreenStyles";

// Define the SplashScreen component
const SplashScreen = () => {
  // Render the component
  return (
    // Create a View component and apply the container styles
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/littleLemonLogo.png")}
      />
    </View>
  );
};

// Export the SplashScreen component
export default SplashScreen;
