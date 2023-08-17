import { useGetChaptersQuery } from "../../store/api/chapterApi";
import { ChapterModel } from "../../types/chapterTypes";
import JeongJuHaengListTemplates from "../templates/JeongJuHaengListTemplates";

const chapterList: ChapterModel[] = [
  {
    title: "인류의 출현",
    number: 1,
    state: "open",
    progress: "완료",
  },
  {
    title: "교역망의 발달과 은 유통",
    number: 2,
    state: "open",
    progress: "연표 학습",
  },
  {
    title: "조선의 건국",
    number: 3,
    state: "locked",
    progress: "시작 전",
  },
];

function JeongJuHaengListPage() {
  //const { data: chapterList } = useGetChaptersQuery();

  return <JeongJuHaengListTemplates chapterList={chapterList || []} />;
}

export default JeongJuHaengListPage;

//   지금까지 한 갯수(  ) / (3 + (주제 개수 * 3) + (주제 개수 * 2)) * 100
