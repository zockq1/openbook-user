import { IconType } from "../components/atoms/icon/Icon";

export type ContentState = "Complete" | "InProgress" | "Locked" | "Updated";
export type Content =
  | "CHAPTER_INFO"
  | "TIMELINE_STUDY"
  | "TIMELINE_QUESTION"
  | "TOPIC_STUDY"
  | "TOPIC_QUESTION"
  | "CHAPTER_COMPLETE_QUESTION";

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
  jjhNumber: number;
  dateComment: string;
}

export interface JJHTimelineModel {
  era: string;
  startDate: number;
  endDate: number;
  state: ContentState;
  jjhNumber: number;
  id: number;
}

export interface ContentModel {
  content: Content;
  title: string;
  state: ContentState;
  contentNumber: number;
  dateComment: string;
  category: IconType | null;
}
