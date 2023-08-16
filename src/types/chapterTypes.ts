export type ContentState = "open" | "locked";

export interface ChapterModel {
  title: string;
  number: number;
  state: ContentState;
  progress: string;
}

export interface ChapterLearningModel {
  title: string;
  content: string;
}
