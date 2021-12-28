import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class Responsive {
  static height(value: number | string) {
    return hp(value);
  }

  static widht(value: number | string) {
    return wp(value);
  }
}

export default Responsive;
