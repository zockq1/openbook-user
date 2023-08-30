import { QuestionModel } from "../types/questionTypes";

export const useGetExKtoTQuestionList = (): {
  data: QuestionModel[] | undefined;
} => {
  const data: QuestionModel[] = [
    {
      questionType: "KtoT",
      answer: "공민왕",
      descriptionKeyword: [
        { name: "쌍성총관부", comment: "쌍성총관부 설명" },
        { name: "반원 개혁", comment: "반원 개혁" },
      ],

      choiceList: [
        { choice: "공민왕", key: "공민왕" },
        { choice: "오답1", key: "오답1" },
        { choice: "오답2", key: "오답2" },
        { choice: "오답3", key: "오답3" },
      ],
    },
    {
      questionType: "KtoT",
      answer: "공민왕",
      descriptionKeyword: [
        { name: "신돈 등용", comment: "신돈 등용" },
        { name: "반원 개혁", comment: "반원 개혁" },
      ],
      choiceList: [
        {
          choice: "공민왕",
          key: "공민왕",
        },
        { choice: "오답4", key: "오답4" },
        { choice: "오답5", key: "오답5" },
        { choice: "오답6 ", key: "오답6" },
      ],
    },
  ];
  return {
    data,
  };
};

export default useGetExKtoTQuestionList;
