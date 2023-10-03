export type QuestionType = "TtoK" | "KtoT";
export type ChoiceType = "String" | "Image";

export interface ChoiceModel {
  choice: string;
  comment: string;
  key: string;
}

export interface QuestionModel {
  questionType: QuestionType;
  answer: string;
  choiceType?: ChoiceType;
  description?: string; //이미지
  descriptionKeyword?: { name: string; comment: string }[];
  choiceList: ChoiceModel[];
}

export interface ExamModel {
  number: number;
  description: string;
  descriptionComment: string;
  answer: string;
  choiceType: ChoiceType;
  choiceList: ChoiceModel[];
  score: number;
}

export interface ExamListModel extends ExamModel {
  checkedChoiceKey: string;
  isCorrect: boolean;
  isChecked: boolean;
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
