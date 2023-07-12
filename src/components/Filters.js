// Date: 12/07/23
// Path: components/Filters.js

import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles/FiltersStyles";

// The Filters component renders a list of filter buttons.
// When a filter button is pressed, the onChange function is called with the index of the pressed button.
// The selections array is used to indicate which filter buttons are currently selected.
// The sections array contains the labels for each filter button.

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => {
        const isSelected = selections[index];

        // The following styles are applied to the filter button based on whether it is selected or not.
        const buttonStyle = {
          flex: 1 / sections.length,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: isSelected ? "#495e57" : "#edefee",
          borderRadius: 9,
          marginRight: 10,
        };

        const textStyle = {
          fontFamily: "Karla-Bold",
          color: isSelected ? "#edefee" : "#495e57",
          fontSize: 15,
        };

        // For each section, we render a TouchableOpacity with the given styles and call the onChange
        // function with the index of the button when it is pressed.
        // The text inside the button is the section name with the first character capitalized.
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={buttonStyle}
          >
            <View>
              <Text style={textStyle}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Filters;

