import { ReactNode } from "react";
import { ContentState } from "./jjhTypes";

export interface MenuModel {
  type: "Base" | "Qustion" | "Progress";
  title: ReactNode;
  icon?: ReactNode;
  state?: ContentState;
  subTitle?: ReactNode;
  description?: ReactNode;
  score?: number;
  onClickMain?: () => void;
  onClickSub?: () => void;
  mainColor?: string;
  titleColor?: string;
  content?: ReactNode;
  important?: boolean;
  topicTitle?: string;
  isBookmarked?: boolean;
}

export interface OptionModel {
  value: number;
  key: number;
  description: string;
}

export interface SearchModel {
  chapterList: {
    chapterNumber: number;
    chapterTitle: string;
  }[];
  topicList: {
    chapterNumber: number;
    chapterTitle: string;
    topicTitle: string;
  }[];
  keywordList: {
    chapterNumber: number;
    chapterTitle: string;
    topicTitle: string;
    keywordName: string;
    keywordComment: string;
  }[];
}
