export type QuestionType = "TtoK" | "KtoT";
export type ChoiceType = "String" | "Image";

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

export interface TimeLineModel {
  comment: string;
  date: number;
  topicTitle: string;
  keywordList: string[] | null;
}

export interface GetQuestionModel {
  chapterNumber: number;
  numberOfQuestion: number;
}

export interface RoundModel {
  date: number;
  number: number;
}

export interface WrongCounterModel {
  id: number;
  wrongCount: number;
  correctCount: number;
}

export interface QuestionCategoryModel {
  id: number;
  title: string;
  number: number;
  score: number;
}
