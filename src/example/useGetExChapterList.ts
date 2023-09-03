import { ChapterModel } from "../types/chapterTypes";

const useGetExChapterList = (): { data: ChapterModel[] | undefined } => {
  const data: ChapterModel[] = [
    {
      title: "인류의 출현",
      number: 1,
      state: "Open",
      progress: "완료",
      startDate: null,
      endDate: -1000,
      topicCount: 0,
    },
    {
      title: "교역망의 발달과 은 유통",
      number: 2,
      state: "Open",
      progress: "연표 학습",
      startDate: 1259,
      endDate: 1356,
      topicCount: 1,
    },
    {
      title: "조선의 건국",
      number: 3,
      state: "Locked",
      progress: "시작 전",
      startDate: 1392,
      endDate: 1454,
      topicCount: 0,
    },
  ];
  return {
    data,
  };
};

export default useGetExChapterList;
