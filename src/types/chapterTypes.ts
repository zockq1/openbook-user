export type ContentState = "Open" | "Locked" | "Updated";

export interface ChapterModel {
  title: string;
  number: number;
  state: ContentState;
  progress: string;
  startDate?: number | null;
  endDate?: number | null;
  topicCount?: number;
}

export interface ChapterTitleModel {
  title: string;
}

export interface ChapterInfoModel {
  content: string;
}

export interface ContentModel {
  content: string;
  title: string;
  state: ContentState;
}
