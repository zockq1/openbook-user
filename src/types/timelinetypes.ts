export interface TimelineModel {
  title: string;
  era: string;
  startDate: number;
  endDate: number;
  id: number;
  score: number;
  timelineCount: number;
}

export type GetTimelineModel = TimelineModel[];
