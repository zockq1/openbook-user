import { ReactNode } from "react";
import { IconType } from "../components/atoms/icon/Icon";
import { ContentState } from "./chapterTypes";

export interface MenuModel {
  title: string;
  description?: string;
  state: ContentState;
  icon: IconType | number;
  link?: string;
  content?: ReactNode;
}

export interface QuestionMenuModel {
  title: string;
  subTitle: ReactNode;
  number: number;
  score: number | null;
  onClickMain: () => void;
  onClickSub: () => void;
  color: string;

  icon?: IconType;
  description?: string;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}
