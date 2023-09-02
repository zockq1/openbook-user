import { ContentState } from "./chapterTypes";

export interface MenuModel {
  title: string;
  description?: string;
  state: ContentState;
  icon: string | number;
  link: string;
}
