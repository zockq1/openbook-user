export type QuestionType = "TtoK" | "KtoT";
export type ChoiceType = "String" | "Image";

/* EXAM */

export interface RoundModel {
  date: number;
  number: number;
}

export interface ExamCommentModel {
  topicTitle: string;
  topicDateComment: string | null;
  keywordName: string;
  keywordDateComment: string | null;
  keywordComment: string;
}

export interface ExamChoiceModel {
  choice: string;
  number: number;
  commentList: ExamCommentModel[];
}

export interface ExamModel {
  number: number;
  description: string;
  descriptionCommentList: ExamCommentModel[];
  answer: number;
  choiceType: ChoiceType;
  choiceList: ExamChoiceModel[];
  score: number;
}

export interface ExamListModel extends ExamModel {
  checkedChoiceKey: number;
  isCorrect: boolean;
  isChecked: boolean;
}

/* Question */

export interface QuestionChoiceModel {
  choice: string;
  key: string;
}

export interface QuestionModel {
  questionType: QuestionType;
  answer: string;
  choiceType: ChoiceType;
  description: string[];
  choiceList: QuestionChoiceModel[];
  keywordIdList: number[];
}

export interface GetQuestionModel {
  id: number;
  numberOfQuestion: number;
}

export interface WrongCounterModel {
  id: number;
  wrongCount: number;
  correctCount: number;
}

/* QuestionCategory */

export interface QuestionCategoryModel {
  id: number;
  title: string;
  number: number;
  score: number;
  topicCount: number;
}
