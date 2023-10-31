import useQuesryString from "../../../../service/useQueryString";
import { useGetChapterInfoQuery } from "../../../../store/api/chapterApi";
import ChapterInfoUI from "../container/ChapterInfoUI.container";

function ChapterInfo() {
  const { chapterNumber } = useQuesryString();
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);

  if (!chapterInfo) {
    return <div>Loading...</div>;
  }
  return <ChapterInfoUI image={chapterInfo.content} />;
}

export default ChapterInfo;
