export interface TopicModel {
  category: string;
  startDate: number;
  endDate: number;
  detail: string;
  dateList: { extraDate: number; extraDateComment: string }[];
  keywordList: { name: string; comment: string; file: string }[];
  sentenceList: string[];
}

export interface TopicListModel {
  title: string;
  category: string;
  startDate: number;
  endDate: number;
}
