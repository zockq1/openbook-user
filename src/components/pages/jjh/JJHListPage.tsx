import { useEffect, useState } from "react";
import { useGetJJHListQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";
import { JJHChapterModel, JJHTimelineModel } from "../../../types/chapterTypes";

interface JJHList extends MenuModel {
  jjhNumber: number;
}

function JJHListPage() {
  const { data: jjhList } = useGetJJHListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  useEffect(() => {
    if (!jjhList?.timelineList) {
      return;
    }

    const newChapterList: JJHList[] = [...jjhList.chapterList].map(
      (item: JJHChapterModel) => {
        const result: JJHList = {
          title: item.title,
          state: item.state,
          link: `/jeong-ju-haeng/content?jjh=${item.jjhNumber}&chapter=${item.number}&title=${item.number}.${item.title}`,
          icon: item.number,
          description: "진행도: " + item.progress,
          jjhNumber: item.jjhNumber,
        };
        return result;
      }
    );

    const newTimelineList: JJHList[] = [...jjhList.timelineList].map(
      (item: JJHTimelineModel) => {
        const result: JJHList = {
          title: `${item.era}(${item.startDate} ~ ${item.endDate})`,
          state: item.state,
          link: `/jeong-ju-haeng/content?jjh=${item.jjhNumber}&id=${item.id}&title=${item.era}(${item.startDate} ~ ${item.endDate})`,
          icon: "TIMELINE_STUDY",
          description: "진행도: " + item.progress,
          jjhNumber: item.jjhNumber,
        };
        return result;
      }
    );

    setMenuList(
      [...newChapterList, ...newTimelineList]
        .sort((a, b) => a.jjhNumber - b.jjhNumber)
        .map((item) => {
          const { title, state, link, icon, description } = item;
          return {
            title,
            state,
            link,
            icon,
            description,
          };
        })
    );
  }, [setMenuList, jjhList]);

  if (!jjhList) {
    return <div>Loading...</div>;
  }

  return <MenuTemplate menuList={menuList} icon="run" category="정주행" />;
}

export default withAuth(JJHListPage);
