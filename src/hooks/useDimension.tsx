import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export interface DimensionsType {
  width: number;
  height: number;
}
const useDimensions = () => {
  const [dimensions, setDimensions] = useState<DimensionsType>(
    Dimensions.get("window")
  );
  const onChange = ({ window }: { window: DimensionsType }) => {
    setDimensions(window);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  return dimensions;
};

export default useDimensions;
