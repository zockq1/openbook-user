import { useEffect, useState } from "react";
import useGetExChapterList from "../../../example/useGetExChapterList";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";
import TimeLineMenuTemplate from "../../templates/TimeLine/TimeLineMenuTemplate";
import { MenuModel } from "../../../types/CommonTypes";

function TimelineMenuPage() {
  /******************************* 실제 코드 *********************************/
  //const { data: chapterList } = useGetChaptersQuery();
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data } = useGetExChapterList();
  const [chapterList] = useState(data);
  /******************************* 예시 코드 *********************************/
  const [timelineList, setTimelineList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setTimelineList([
      {
        title: "전체 연표",
        state: "Open",
        link: `/timeline/0`,
        icon: "연표 학습",
        description: "??? ~ ???",
      },
      ...chapterList.map((item) => {
        const result: MenuModel = {
          title: item.title,
          state: "Open",
          link: `/timeline/${item.number}`,
          icon: item.number,
          description: "??? ~ ???",
        };
        return result;
      }),
    ]);
  }, [setTimelineList, chapterList]);

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return <TimeLineMenuTemplate timelineList={timelineList} />;
}

export default TimelineMenuPage;
