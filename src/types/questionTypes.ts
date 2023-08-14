export interface ChoiceModel {
  choice: string;
  comment?: string;
  key: string;
}

export interface QuestionModel {
  answer: string;
  questionSentence?: string;

  description?: string;
  descriptionSentence?: string;
  descriptionKeyword?: { name: string; comment: string }[];

  choiceList: ChoiceModel[];
}
