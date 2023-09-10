import { ContentState } from "./chapterTypes";

export interface MenuModel {
  title: string;
  description?: string;
  state: ContentState;
  icon: string | number;
  link: string;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}
