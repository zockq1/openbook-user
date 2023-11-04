export type QuestionType = "TtoK" | "KtoT" | "Exam";
export type ChoiceType = "String" | "Image";
export type QuestionMode = "Quiz" | "Exam";

export interface QuestionModel {
  questionType: QuestionType;
  choiceType: ChoiceType;
  descriptionList: string[];
  descriptionCommentList: string[];
  choiceList: {
    choice: string;
    key: string;
    commentList: string[];
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
  savedAnswernote: boolean;
  number: number;
  description: string;
  descriptionCommentList: ExamCommentModel[];
  answer: number;
  choiceType: ChoiceType;
  choiceList: ExamChoiceModel[];
  score: number;
  checkedChoiceKey: number | null;
}

export interface ExamListModel extends ExamModel {
  checkedChoiceKey: number;
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

/* QuestionCategory */

export interface QuestionCategoryModel {
  id: number;
  title: string;
  number: number;
  score: number;
  topicCount: number;
}
