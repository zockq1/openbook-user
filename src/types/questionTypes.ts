export type QuestionType = "TtoK" | "TtoS" | "KtoT" | "StoT" | "Mock";
export type ChoiceType = "String" | "Image";

export interface ChoiceModel {
  choice: string;
  comment?: string;
  key: string;
}

export interface QuestionModel {
  questionType: QuestionType;
  answer: string;
  questionSentence?: string;

  description?: string;
  descriptionSentence?: string;
  descriptionKeyword?: { name: string; comment: string }[];

  choiceList: ChoiceModel[];
}

export interface TimeLineModel {
  comment: string;
  date: number;
  topicTitle: string;
}

export interface GetQuestionModel {
  chapterNumber: number;
  numberOfQuestion: number;
}

export interface RoundModel {
  date: number;
  number: number;
}

export interface ChapterWrongCounterModel {
  number: number;
  count: number;
}

export interface TopicWrongCounterModel {
  topicTitle: string;
  count: number;
}
