// Component Types

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
