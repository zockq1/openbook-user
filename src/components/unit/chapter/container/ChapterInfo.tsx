import useQuesryString from "../../../../hooks/useQueryString";
import { useGetChapterInfoQuery } from "../../../../store/api/chapterApi";
import ChapterInfoUI from "../presenter/ChapterInfoUI";

function ChapterInfo() {
  const { chapterNumber } = useQuesryString();
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);

  if (!chapterInfo) {
    return <div>Loading...</div>;
  }
  return <ChapterInfoUI image={chapterInfo.content} />;
}

export default ChapterInfo;
