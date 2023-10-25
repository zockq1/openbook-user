import { useNavigate } from "react-router-dom";
import useQuesryString from "./useQueryString";
import {
  useGetContentListQuery,
  useUpdateProgressMutation,
} from "../store/api/chapterApi";
import { useCallback } from "react";

function useNextContent(): () => Promise<void> {
  const navigate = useNavigate();
  const { chapterNumber, timelineId, jjhNumber, contentNumber, title } =
    useQuesryString();
  const { data: contentList } = useGetContentListQuery(jjhNumber);
  const [updateProgres] = useUpdateProgressMutation();

  const handleNextContent = useCallback(async () => {
    if (contentList === undefined) return;

    const currentIndex = contentList.findIndex(
      (item) => item.contentNumber === contentNumber
    );

    try {
      await updateProgres({
        contentNumber: contentNumber + 1,
      });

      if (currentIndex === contentList.length - 1) {
        navigate(`/jeong-ju-haeng`);
        return;
      }

      if (contentList[currentIndex + 1].content === "TOPIC_STUDY") {
        navigate(
          `/jeong-ju-haeng/content/topic-learning?jjh=${jjhNumber}&chapter=${chapterNumber}&topic=${
            contentList[currentIndex + 1].title
          }&content=${contentNumber + 1}`
        );
      }

      if (
        contentList[currentIndex + 1].content === "CHAPTER_COMPLETE_QUESTION"
      ) {
        navigate(
          `/jeong-ju-haeng/content/final-question?jjh=${jjhNumber}&chapter=${chapterNumber}&content=${
            contentNumber + 1
          }`
        );
      }

      if (contentList[currentIndex + 1].content === "TIMELINE_QUESTION") {
        navigate(
          `/jeong-ju-haeng/content/timeline-question?jjh=${jjhNumber}&id=${timelineId}&content=${
            contentNumber + 1
          }&title${title}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    chapterNumber,
    jjhNumber,
    contentList,
    contentNumber,
    navigate,
    timelineId,
    updateProgres,
    title,
  ]);

  return handleNextContent;
}

export default useNextContent;
