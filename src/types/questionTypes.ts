type QuestionType = "TtoK" | "TtoS" | "KtoT" | "StoT";

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
