import { ChapterTitleModel } from "../types/chapterTypes";

const useGetExChapterTitle = (): {
  data: ChapterTitleModel | undefined;
} => {
  const data: ChapterTitleModel = {
    title: "교역망의 발달과 은 유통",
  };
  return {
    data,
  };
};

export default useGetExChapterTitle;
