import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    width: "100%",
    height: "100%",
  },
  headerText: {
    fontSize: 30,
    paddingVertical: 20,
    fontFamily: "MarkaziText-Medium",
    color: "#495E57",
    textAlign: "center",
  },
  subText: {
    fontSize: 15,
    fontFamily: "Karla-Regular",
    color: "#495E57",
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    fontFamily: "Karla-Medium",
    color: "#495E57",
    marginLeft: 18,
  },
  inputBox: {
    borderColor: "#C7C8D2",
    backgroundColor: "#FFFFFF",
    alignSelf: "stretch",
    height: 45,
    margin: 18,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    borderRadius: 9,
    fontFamily: "Karla-Regular",
  },
  btn: {
    backgroundColor: "#f4ce14",
    borderColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginHorizontal: 18,
    marginBottom: 60,
    padding: 10,
    borderWidth: 1,
  },
  btnDisabled: {
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 18,
    marginBottom: 60,
  },
  halfBtn: {
    flex: 1,
    borderColor: "#f4ce14",
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
  },
  btntext: {
    fontSize: 15,
    color: "#333",
    fontFamily: "Karla-Bold",
    alignSelf: "center",
  },
  pageIndicator: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  pageDot: {
    backgroundColor: "#67788a",
    width: 22,
    height: 22,
    marginHorizontal: 10,
    borderRadius: 11,
  },
  pageDotActive: {
    backgroundColor: "#f4ce14",
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});

export { styles };
