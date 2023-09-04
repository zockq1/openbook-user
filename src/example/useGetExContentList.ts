import { ContentModel } from "../types/chapterTypes";

const useGetExContentList = (): { data: ContentModel[] | undefined } => {
  const data: ContentModel[] = [
    {
      content: "단원 학습",
      title: "교역망의 발달과 은 유통",
      state: "Open",
    },
    {
      content: "연표 학습",
      title: "교역망의 발달과 은 유통",
      state: "Open",
    },
    {
      content: "주제 학습",
      title: "공민왕",
      state: "Open",
    },
    {
      content: "단원 마무리 문제",
      title: "교역망의 발달과 은 유통",
      state: "Open",
    },
  ];

  return {
    data,
  };
};

export default useGetExContentList;
