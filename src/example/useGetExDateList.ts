import { TimeLineModel } from "../types/questionTypes";

const useGetExDateList = (): { data: TimeLineModel[] | undefined } => {
  const data: TimeLineModel[] = [
    {
      date: 1206,
      comment: "몽골 부족 통일",
      topicTitle: "1",
    },
    {
      date: 1234,
      comment: "금 몽골에 멸망",
      topicTitle: "1",
    },
    {
      date: 1271,
      comment: "원 건국",
      topicTitle: "1",
    },
    {
      date: 1279,
      comment: "남송 멸망",
      topicTitle: "1",
    },
  ];
  return {
    data,
  };
};

export default useGetExDateList;
