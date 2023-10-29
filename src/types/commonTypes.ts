import { ReactNode } from "react";
import { ContentState } from "./chapterTypes";

export interface MenuModel {
  type: "Base" | "Qustion" | "Progress";
  title: string; // "Base" | "Qustion" | "Progress"
  icon: ReactNode; // "Base" | "Qustion" | "Progress"
  state?: ContentState;
  subTitle?: ReactNode; // "Qustion" | "Progress"
  description?: string; // "Base" | "Qustion" |
  score?: number; // "Progress"
  onClickMain?: () => void; // "Base" | "Qustion" | "Progress"
  onClickSub?: () => void; // "Qustion" | "Progress"
  mainColor?: string; // "Base" | "Qustion" | "Progress"
  titleColor?: string; // "Base" | "Qustion" | "Progress"
  content?: ReactNode; // "Base" | "Qustion"
  important?: boolean;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}
