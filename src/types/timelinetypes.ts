export interface TimeLineItemModel {
  comment: string;
  date: number;
  topicTitle: string;
  keywordList: string[] | null;
}

export interface TimelineListModel {
  title: string;
  era: string;
  startDate: number;
  endDate: number;
  id: number;
  score: number;
  timelineCount: number;
}
