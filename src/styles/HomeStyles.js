import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

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
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor: "#e4e4e4",
    shadowRadius: 15,
    shadowOpacity: 0,
    borderRadius: 15,
    textDecorationColor: "#333333",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
  },
  itemBody: {
    flex: 1,
  },
  itemHeader: {
    fontSize: 20,
    paddingVertical: 8,
    color: "#495e57",
    backgroundColor: "#fff",
    fontFamily: "Karla-ExtraBold",
  },
  name: {
    fontSize: 20,
    color: "#000000",
    paddingBottom: 5,
    fontFamily: "Karla-Bold",
  },
  description: {
    color: "#495e57",
    paddingRight: 5,
    fontFamily: "Karla-Medium",
  },
  price: {
    fontSize: 15,
    color: "#495e57",
    paddingTop: 5,
    fontFamily: "Karla-Medium",
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  avatar: {
    flex: 1,
    position: "absolute",
    right: 10,
    top: 10,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarEmpty: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
  heroSection: {
    backgroundColor: "#495e57",
    padding: 15,
  },
  heroHeader: {
    color: "#f4ce14",
    fontSize: 40,
    fontFamily: "MarkaziText-Medium",
  },
  heroHeader2: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "MarkaziText-Medium",
  },
  heroText: {
    color: "#fff",
    fontFamily: "Karla-Medium",
    fontSize: 15,
  },
  heroBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroContent: {
    flex: 1,
    paddingRight: 5,
    paddingBottom: 5,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  delivery: {
    fontSize: 18,
    padding: 15,
    fontFamily: "Karla-ExtraBold",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});

export { styles };
