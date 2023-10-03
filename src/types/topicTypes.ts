export interface TopicModel {
  category: string;
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
  category: string;
  dateComment: string;
}
