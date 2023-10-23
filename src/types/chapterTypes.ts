export type ContentState = "Open" | "Locked" | "Updated";
export type Content =
  | "단원 학습"
  | "연표 학습"
  | "연표 문제"
  | "주제 학습"
  | "주제별 문제"
  | "단원 마무리 문제";

export interface ChapterModel {
  title: string;
  number: number;
  dateComment: string;
  topicCount: number;
}

export interface ChapterTitleModel {
  title: string;
}

export interface ChapterInfoModel {
  content: string;
}

export interface JJHModel {
  chapterList: JJHChapterModel[];
  timelineList: JJHTimelineModel[];
}

export interface JJHChapterModel {
  title: string;
  number: number;
  state: ContentState;
  progress: string;
  jjhNumber?: number;
}

export interface JJHTimelineModel {
  era: string;
  startDate: number;
  endDate: number;
  state: ContentState;
  progress: string;
  jjhNumber?: number;
}

export interface ContentModel {
  content: Content;
  title: string;
  state: ContentState;
  contentNumber?: number;
}
