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

export interface TopicModel {
  category: TopicCategory;
  dateComment: string;
  detail: string;
  dateList: { extraDate: number; extraDateComment: string }[];
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
