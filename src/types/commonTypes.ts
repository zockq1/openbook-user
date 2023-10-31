import { ReactNode } from "react";
import { ContentState } from "./jjhTypes";

export interface MenuModel {
  type: "Base" | "Qustion" | "Progress";
  title: string;
  icon?: ReactNode;
  state?: ContentState;
  subTitle?: ReactNode;
  description?: string;
  score?: number;
  onClickMain?: () => void;
  onClickSub?: () => void;
  mainColor?: string;
  titleColor?: string;
  content?: ReactNode;
  important?: boolean;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}
