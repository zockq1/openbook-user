import { useParams } from "react-router-dom";
import { ContentModel } from "../../types/chapterTypes";
import ContentListTemplate from "../templates/ContentListTemplate";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../store/api/chapterApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContentList } from "../../store/slices/contentSlice";

const contentList: ContentModel[] = [
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
    content: "연표 문제",
    title: "교역망의 발달과 은 유통",
    state: "Open",
  },
  {
    content: "주제 학습",
    title: "공민왕",
    state: "Open",
  },
  {
    content: "주제 보고 키워드 맞추기",
    title: "공민왕",
    state: "Open",
  },
  {
    content: "주제 보고 문장 맞추기",
    title: "공민왕",
    state: "Open",
  },
  {
    content: "키워드 보고 주제 맞추기",
    title: "교역망의 발달과 은 유통",
    state: "Open",
  },
  {
    content: "문장 보고 주제 맞추기",
    title: "교역망의 발달과 은 유통",
    state: "Locked",
  },
];

const chapterTitle = { title: "교역망의 발달과 은 유통" };

function ContentListPage() {
  const { chapter } = useParams();
  const dispatch = useDispatch();
  // const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  // const { data: contentList } = useGetContentListQuery(Number(chapter));

  useEffect(() => {
    dispatch(setContentList(contentList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentList]);

  return (
    <ContentListTemplate
      title={String(chapter) + ". " + chapterTitle?.title}
      contentList={contentList || []}
    />
  );
}

export default ContentListPage;
