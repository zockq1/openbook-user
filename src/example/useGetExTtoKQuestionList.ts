import { QuestionModel } from "../types/questionTypes";

const data: QuestionModel[] = [
  {
    questionType: "TtoK",
    answer: "공민왕",
    choiceList: [
      {
        choice: "반원 개혁",
        comment: "원의 간섭에서 벗어나기 위해 반원 개혁 추진",
        key: "공민왕",
      },
      {
        choice: "오답1",
        comment: "오답1 키워드 설명 입니다.",
        key: "오답주제1",
      },
      {
        choice: "오답2",
        comment: "오답2 키워드 설명 입니다.",
        key: "오답주제2",
      },
      {
        choice: "오답3",
        comment: "오답3 키워드 설명 입니다.",
        key: "오답주제3",
      },
    ],
  },
  {
    questionType: "TtoK",
    answer: "공민왕",
    choiceList: [
      {
        choice: "쌍성총관부",
        comment: "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
        key: "공민왕",
      },
      {
        choice: "오답4",
        comment: "오답4 키워드 설명 입니다.",
        key: "오답주제4",
      },
      {
        choice: "오답5",
        comment: "오답5 키워드 설명 입니다.",
        key: "오답주제5",
      },
      {
        choice: "오답6",
        comment: "오답6 키워드 설명 입니다.",
        key: "오답주제6",
      },
    ],
  },
];

const useGetExTtoKQuestionList = (): {
  data: QuestionModel[] | undefined;
} => {
  return {
    data,
  };
};

export default useGetExTtoKQuestionList;
