import useGetExChapterList from "../../../example/useGetExChapterList";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import JeongJuHaengListTemplates from "../../templates/JJH/JeongJuHaengListTemplates";

function JeongJuHaengListPage() {
  /******************************* 실제 코드 *********************************/
  // const { data: chapterList } = useGetChaptersQuery();
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: chapterList } = useGetExChapterList();
  /******************************* 예시 코드 *********************************/

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return <JeongJuHaengListTemplates chapterList={chapterList} />;
}

export default JeongJuHaengListPage;

//   지금까지 한 갯수(  ) / (3 + (주제 개수 * 3) + (주제 개수 * 2)) * 100
