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

export interface ChoiceModel {
  choice: string;
  key: string;
  commentList: string;
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
