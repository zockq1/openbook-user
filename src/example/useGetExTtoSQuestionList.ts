import { QuestionModel } from "../types/questionTypes";

const useGetExTtoSQuestionList = (): {
  data: QuestionModel[] | undefined;
} => {
  const data: QuestionModel[] = [
    {
      questionType: "TtoS",
      answer: "공민왕",
      choiceList: [
        {
          choice: "원의 간섭에서 벗어나기 위해 반원 개혁을 추진",
          key: "공민왕",
        },
        { choice: "오답1 문장 입니다.", key: "오답주제1" },
        { choice: "오답2 문장 입니다.", key: "오답주제2" },
        { choice: "오답3 문장 입니다.", key: "오답주제3" },
      ],
    },
    {
      questionType: "TtoS",
      answer: "공민왕",
      choiceList: [
        {
          choice:
            "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",
          key: "공민왕",
        },
        { choice: "오답4 문장 입니다.", key: "오답주제4" },
        { choice: "오답5 문장 입니다.", key: "오답주제5" },
        { choice: "오답6 문장 입니다.", key: "오답주제6" },
      ],
    },
  ];
  return {
    data,
  };
};

export default useGetExTtoSQuestionList;
