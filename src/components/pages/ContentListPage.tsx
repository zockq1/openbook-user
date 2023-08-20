import { useDispatch, useSelector } from "react-redux";
import { ChapterModel, ProgressModel } from "../../types/chapterTypes";
import ContentListTemplate from "../templates/ContentListTemplate";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { updateContentListWithTopics } from "../../store/slices/contentSlice";
import { useGetChapterTopicListQuery } from "../../store/api/topicApi";
import { useParams } from "react-router-dom";

const chapterInfo: ChapterModel = {
  title: "교역망의 발달과 은 유통",
  number: 2,
  state: "open",
  progress: "연표 학습",
};

//const topicList: string[] = ["공민왕"];

const progress: ProgressModel = {
  chapterNumber: 2,
  content: "단원 학습",
};

function ContentListPage() {
  const dispatch = useDispatch();
  const { chapter } = useParams();
  const { contentList } = useSelector((state: RootState) => state.content);
  const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));

  useEffect(() => {
    if (topicList) {
      dispatch(updateContentListWithTopics(topicList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicList]);

  return (
    <ContentListTemplate
      chapterInfo={chapterInfo}
      contentList={contentList}
      progress={progress}
    />
  );
}

export default ContentListPage;
