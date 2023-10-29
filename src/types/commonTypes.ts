import { IconType } from "../components/atoms/icon/Icon";
import { ContentState } from "./chapterTypes";

export interface MenuModel {
  title: string;
  description?: string;
  state: ContentState;
  icon: IconType | number;
  link: string;
}

export interface QuestionMenuModel {
  title: string;
  subTitle: string;
  number: number;
  score: number;
  onClickMain: () => void;
  onClickSub: () => void;
  color: string;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}
