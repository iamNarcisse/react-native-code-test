// Component Types

import { RouteProp } from "@react-navigation/native";

/**
 * Text Input
 */

interface TextInputProps {}

export enum AppTheme {
  DARK = "dark",
  LIGHT = "light",
}

export enum ScreenNames {
  LOGIN = "LoginScreen",
  HOME = "HomeScreen",
  DETAIL = "DetailScreen",
}

export interface Blog {
  title: string;
  imageUrl: string;
  content: string;
  author: string;
  datePublished: string;
  views: number;
}

export interface ObjectLiteral {
  [key: string]: any;
}
export interface BlogDetailRouteProp extends RouteProp<ObjectLiteral> {
  params: {
    title: string;
    content: string;
    imageUrl: string;
    views: number;
    author: string;
    datePublished: string;
  };
}
