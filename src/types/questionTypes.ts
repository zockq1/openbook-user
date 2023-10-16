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
  answer: string; //topicTitle
  choiceType: ChoiceType;
  description: string[];
  choiceList: QuestionChoiceModel[];
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

export interface ChapterWrongCounterModel {
  number: number;
  count: number;
}

export interface TopicWrongCounterModel {
  topicTitle: string;
  count: number;
}
