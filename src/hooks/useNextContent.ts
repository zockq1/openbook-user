import { useNavigate } from "react-router-dom";
import useQuesryString from "./useQueryString";
import { useCallback, useState } from "react";
import {
  useGetContentListQuery,
  useGetJJHListQuery,
} from "../store/api/jjhApi";
import { ContentModel } from "../types/jjhTypes";
import { JJHChapterModel } from "../types/jjhTypes";
import { JJHTimelineModel } from "../types/jjhTypes";

function useNextContent() {
  const { chapterNumber, jjhNumber } = useQuesryString();
  const navigate = useNavigate();
  const { data: jjhList } = useGetJJHListQuery();
  const { data: contentList } = useGetContentListQuery(jjhNumber);
  const [nextContentTitle, setNextContentTitle] = useState<string>("");

  const handleNextContent = useCallback(
    async (jjhNumber: number, contentNumber: number) => {
      if (!contentList || !jjhList) return;
      //다음 콘텐츠 찾기
      let nextContent: ContentModel | null;
      let nextJJHChapter: JJHChapterModel | undefined;
      let nextJJHTimeline: JJHTimelineModel | undefined;
      let isSameJJH = true;

      //다음 컨텐츠 찾기
      if (contentList[contentList.length - 1].contentNumber === contentNumber) {
        //단원의 마지막
        isSameJJH = false;
        nextContent = null;
        nextJJHChapter = jjhList.chapterList.find(
          (jjh) => jjh.jjhNumber === jjhNumber + 1
        );
        nextJJHTimeline = jjhList.timelineList.find(
          (jjh) => jjh.jjhNumber === jjhNumber + 1
        );
      } else {
        //단원의 마지막 X
        nextContent =
          contentList[
            contentList.findIndex(
              (content) => content.contentNumber === contentNumber
            ) + 1
          ];
        setNextContentTitle(nextContent.title);
      }

      if (!nextContent && !nextJJHChapter && !nextJJHTimeline) {
        navigate("/jeong-ju-haeng");
        return;
      }

      if (!nextContent) {
        //다음 컨텐츠가 다음 단원일 경우
        nextJJHChapter &&
          navigate(
            `/jeong-ju-haeng/content?jjh=${nextJJHChapter.jjhNumber}&chapter=${nextJJHChapter.number}&title=${nextJJHChapter.title}`,
            { replace: true }
          );
        nextJJHTimeline &&
          navigate(
            `/jeong-ju-haeng/content?jjh=${nextJJHTimeline.jjhNumber}&id=${
              nextJJHTimeline.id
            }&title=${nextJJHTimeline.era}(${
              nextJJHTimeline.startDate / 10000
            } ~ ${nextJJHTimeline.endDate / 10000})`,
            { replace: true }
          );
        return;
      }

      //다음 컨텐츠가 complete 상태가 아닌 경우
      if (nextContent.state !== "Complete" && isSameJJH) {
        const currentContent = (nextJJHChapter = jjhList.chapterList.find(
          (jjh) => jjh.jjhNumber === jjhNumber
        ));
        navigate(
          `/jeong-ju-haeng/content?jjh=${currentContent?.jjhNumber}&chapter=${currentContent?.number}&title=${currentContent?.title}`,
          { replace: true }
        );
        return;
      }

      //다음 컨텐츠가 complete 상태인 경우
      if (nextContent.content === "TOPIC_STUDY") {
        navigate(
          `/jeong-ju-haeng/content/topic-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${nextContent.title}&content=${nextContent.contentNumber}&title${nextContent.title}`,
          { replace: true }
        );
        window.location.reload();
        return;
      }

      if (nextContent.content === "CHAPTER_COMPLETE_QUESTION") {
        navigate(
          `/jeong-ju-haeng/content/final-question?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${nextContent.contentNumber}`,
          { replace: true }
        );
        window.location.reload();
        return;
      }
    },
    [chapterNumber, contentList, jjhList, navigate]
  );

  return { handleNextContent, nextContentTitle };
}

export default useNextContent;
