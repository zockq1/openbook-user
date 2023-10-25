import { useSearchParams } from "react-router-dom";

function useQuesryString() {
  const [searchParams] = useSearchParams();
  const jjh = searchParams.get("jjh");
  const chapter = searchParams.get("chapter");
  const topic = searchParams.get("topic");
  const id = searchParams.get("id");
  const content = searchParams.get("content");
  const title = searchParams.get("title");
  return {
    jjhNumber: Number(jjh),
    chapterNumber: Number(chapter),
    topicTitle: topic ? topic : "",
    title: title ? title : "",
    timelineId: Number(id),
    contentNumber: Number(content),
  };
}

export default useQuesryString;
