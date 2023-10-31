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

export interface TopicListModel {
  title: string;
  category: TopicCategory;
  dateComment: string;
  number: number;
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
