import { QuestionModel } from "../types/questionTypes";

const useGetExStoTQuestionList = (): {
  data: QuestionModel[] | undefined;
} => {
  const data: QuestionModel[] = [
    {
      questionType: "StoT",
      answer: "공민왕",
      descriptionSentence:
        "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",

      choiceList: [
        { choice: "공민왕", key: "공민왕" },
        { choice: "오답1", key: "오답1" },
        { choice: "오답2", key: "오답2" },
        { choice: "오답3", key: "오답3" },
      ],
    },
    {
      questionType: "StoT",
      answer: "공민왕",
      descriptionSentence: "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
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

export default useGetExStoTQuestionList;
