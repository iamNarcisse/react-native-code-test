import { ImageCachManager } from "@src/lib/CacheImage";
import Logger from "@src/lib/Logger";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  InteractionManager,
  StyleProp,
} from "react-native";
const useCache = new ImageCachManager();

interface ImageProp extends ImageProps {
  style?: StyleProp<ImageStyle>;
  source: ImageSourcePropType;
}

const CustomImage = ({ source, ...rest }: ImageProp) => {
  let isMounted = useRef(false).current;
  const [state, setState] = useState({
    uri: undefined,
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
        if (isMounted) {
          setState({
            ...state,
            working: false,
            uri: result as any,
          });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({
            ...state,
            working: false,
          });
        }

        Logger.log(error);
      });
  };

  useEffect(() => {
    isMounted = true;

    if (_source?.uri) {
      InteractionManager.runAfterInteractions(() => {
        if (isMounted) {
          expensiveOperation();
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (!state.uri && state.working) {
    return <ActivityIndicator />;
  }

  if (!state.uri && !state.working) {
    return null;
  }

  const mySource: ImageSourcePropType = _source?.uri
    ? { uri: state.uri }
    : source;
  return <Image source={mySource} {...rest} />;
};

export default CustomImage;
