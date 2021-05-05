//Imports
import { Dimensions, Platform } from "react-native";
var { height, width } = Dimensions.get("window");

export const CONST = {
  DEVICE_HEIGHT: height,
  DEVICE_WIDTH: width,
  DEVICE_OS: Platform.OS,
 
};
