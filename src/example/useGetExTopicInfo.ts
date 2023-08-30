import { TopicModel } from "../types/topicTypes";

const useGetExTopicInfo = (): { data: TopicModel | undefined } => {
  const data: TopicModel = {
    startDate: 1352,
    endDate: 1374,
    category: "인물",
    detail: "string",
    dateList: [
      {
        extraDate: 1234,
        extraDateComment: "1234",
      },
    ],
    keywordList: [
      {
        name: "반원 개혁",
        comment: "원의 간섭에서 벗어나기 위해 반원 개혁 추진",
        file: "",
      },
      {
        name: "쌍성총관부",
        comment: "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
        file: "",
      },
      {
        name: "신돈",
        comment:
          "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",
        file: "",
      },
    ],
    sentenceList: [
      "원의 간섭에서 벗어나기 위해 반원 개혁을 추진",
      "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
      "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",
    ],
  };
  return {
    data,
  };
};

export default useGetExTopicInfo;
