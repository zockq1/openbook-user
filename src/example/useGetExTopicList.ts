import { TopicListModel } from "../types/topicTypes";

const useGetExTopicList = (): { data: TopicListModel[] | undefined } => {
  const data: TopicListModel[] = [
    {
      startDate: 1352,
      endDate: 1374,
      category: "인물",
      title: "공민왕",
    },
  ];
  return {
    data,
  };
};

export default useGetExTopicList;
