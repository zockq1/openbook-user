import { IconType } from "../components/atoms/icon/Icon";

export type ContentState =
  | "Complete"
  | "InProgress"
  | "Locked"
  | "Updated"
  | "Chapter"
  | "Topic"
  | "Timeline"
  | "Question";
export type Content =
  | "CHAPTER_INFO"
  | "TIMELINE_STUDY"
  | "TIMELINE_QUESTION"
  | "TOPIC_STUDY"
  | "TOPIC_QUESTION"
  | "CHAPTER_COMPLETE_QUESTION";

/* JJH */

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
  title: string;
  era: string;
  startDate: number;
  endDate: number;
  state: ContentState;
  jjhNumber: number;
  id: number;
}

/* Content */

export interface ContentModel {
  content: Content;
  title: string;
  state: ContentState;
  contentNumber: number;
  dateComment: string;
  category: IconType | null;
  savedBookmark: boolean;
}

export interface ProgressModel {
  totalProgress: number;
}

export interface UpdateProgressModel {
  contentNumber: number;
}
