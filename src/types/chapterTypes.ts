export type ContentState = "open" | "locked" | "updated";

export interface ChapterModel {
  title: string;
  number: number;
  state: ContentState;
  progress: string;
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
