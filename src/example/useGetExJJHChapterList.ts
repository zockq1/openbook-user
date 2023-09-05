import { JJHChapterModel } from "../types/chapterTypes";

const useGetExJJHChapterList = (): { data: JJHChapterModel[] | undefined } => {
  const data: JJHChapterModel[] = [
    {
      title: "인류의 출현",
      number: 1,
      state: "Open",
      progress: "완료",
    },
    {
      title: "교역망의 발달과 은 유통",
      number: 2,
      state: "Open",
      progress: "연표 학습",
    },
    {
      title: "조선의 건국",
      number: 3,
      state: "Locked",
      progress: "시작 전",
    },
  ];
  return {
    data,
  };
};

export default useGetExJJHChapterList;
