import { ReactNode } from "react";
import { ContentState } from "./jjhTypes";

export type TopicCategory =
  | "인물"
  | "왕"
  | "국가"
  | "시대"
  | "기구"
  | "조직"
  | "사건"
  | "신분"
  | "문화"
  | "제도"
  | "유물";

export interface extraDateModel {
  extraDate: number;
  extraDateComment: string;
}

export interface TopicModel {
  category: TopicCategory;
  dateComment: string;
  detail: string;
  dateList: extraDateModel[];
  keywordList: {
    name: string;
    comment: string;
    file: string;
    dateComment: string;
  }[];
}

interface QuestionModel {
  roundNumber: number;
  questionNumber: number;
  choice: string;
}

export interface KeywordModel {
  name: string;
  comment: string;
  id: number;
  file: any;
  dateComment: string;
  extraDateList: extraDateModel[];
  questionList: QuestionModel[];
  number: number;
}

export interface TopicListModel {
  title: string;
  category: TopicCategory;
  era: string;
  dateComment: string;
  extraDateList: extraDateModel[];
  keywordList: KeywordModel[];
  isBookmarked: boolean;
}

export interface BookmarkedTopicListModel {
  chapterTitle: string;
  topicList: TopicListModel[];
}

export interface TopicMenuModel {
  title: string;
  date: string;
  state: ContentState;
  isBookmarked: boolean;
  keywordList: KeywordModel[];
  onClick: () => void;
  mainColor?: string;
  content: ReactNode;
}
