import { ReactNode } from "react";

export type QuestionType = "TtoK" | "KtoT" | "Exam";
export type ChoiceType = "String" | "Image";
export type QuestionMode = "Quiz" | "Exam";

export interface QuestionCommentModel {
  comment: string;
  icon: ReactNode;
  type: "Topic" | "Keyword" | "Comment";
}

export interface QuestionModel {
  id: number;
  number: number;
  questionType: QuestionType;
  choiceType: ChoiceType;
  descriptionList: string[];
  descriptionCommentList: QuestionCommentModel[];
  choiceList: {
    choice: string;
    key: string;
    commentList: QuestionCommentModel[];
  }[];
  answer: string;

  checkedChoiceKey: string;
  isCorrect: boolean;
  isChecked: boolean;
  isFinish: boolean;
  isOpen: boolean;

  score: number;
  keywordIdList?: number[]; //퀴즈 모드만
}

/* EXAM */

export interface RoundModel {
  date: number;
  number: number;
  score: number;
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
  id: number;
  savedAnswerNote: boolean;
  number: number;
  description: string;
  descriptionCommentList: ExamCommentModel[];
  answer: number;
  choiceType: ChoiceType;
  choiceList: ExamChoiceModel[];
  score: number;
  checkedChoiceKey: string | null;
}

export interface ExamListModel extends ExamModel {
  checkedChoiceKey: string;
  isCorrect: boolean;
  isChecked: boolean;
}

/* Question */

export interface QuizChoiceModel {
  choice: string;
  key: string;
}

export interface QuizModel {
  questionType: QuestionType;
  answer: string;
  choiceType: ChoiceType;
  description: string[];
  choiceList: QuizChoiceModel[];
  keywordIdList: number[];
}

export interface GetQuizModel {
  id: number;
  numberOfQuestion: number;
}

export interface WrongCounterModel {
  id: number;
  wrongCount: number;
  correctCount: number;
}

export interface UpdateWrongQuestionModel {
  id: number;
  checkedChoiceKey: number;
  score: number;
}

export interface WrongQuestionListModel {
  roundNumber: number;
  questionCount: number;
}

/* QuestionCategory */

export interface QuestionCategoryModel {
  id: number;
  title: string;
  number: number;
  score: number;
  topicCount: number;
}
