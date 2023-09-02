import { useParams } from "react-router-dom";
import ContentListTemplate from "../../templates/JJH/ContentListTemplate";
import {
  useGetChapterTitleQuery,
  useGetContentListQuery,
} from "../../../store/api/chapterApi";
import useGetExChapterTitle from "../../../example/useGetExChapterTitle";
import useGetExContentList from "../../../example/useGetExContentList";

function ContentListPage() {
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  // const { data: contentList } = useGetContentListQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: chapterTitle } = useGetExChapterTitle();
  const { data: contentList } = useGetExContentList();
  /******************************* 예시 코드 *********************************/

  if (!contentList || !chapterTitle) {
    return <div>Loading...</div>;
  }

  return (
    <ContentListTemplate
      title={String(chapter) + ". " + chapterTitle.title}
      contentList={contentList}
    />
  );
}

export default ContentListPage;
