import { ContentState } from "./chapterTypes";

export interface CommonListItemModel {
  title: string;
  description?: string;
  state: ContentState;
  icon: string | number;
  link: string;
}
