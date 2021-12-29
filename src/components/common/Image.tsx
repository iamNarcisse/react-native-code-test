import { CustomImageCache } from "@src/lib/CacheImage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  InteractionManager,
  StyleProp,
} from "react-native";

const useCache = new CustomImageCache();

interface ImageProp extends ImageProps {
  style?: StyleProp<ImageStyle>;
  source: ImageSourcePropType;
}

const CustomImage = ({ source, ...rest }: ImageProp) => {
  const [state, setState] = useState({
    uri: null,
    working: false,
  });

  const _source: any = source;

  const expensiveOperation = async () => {
    setState({
      ...state,
      working: true,
    });

    useCache
      .getImageUri(_source.uri)
      .then((result) => {
        setState({
          ...state,
          working: false,
          uri: result as any,
        });
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          working: false,
        });
      });
  };

  useEffect(() => {
    if (_source?.uri) {
      InteractionManager.runAfterInteractions(async () => {
        expensiveOperation();
      });
    }
  }, []);

  if (!state.uri) {
    return <ActivityIndicator />;
  }

  const mySource = _source?.uri ? { uri: state.uri } : source;
  return <Image source={mySource} {...rest} />;
};

export default CustomImage;
