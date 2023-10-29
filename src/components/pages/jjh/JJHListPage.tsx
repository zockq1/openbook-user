import { useContext, useEffect, useState } from "react";
import { useGetJJHListQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import MenuTemplate from "../../templates/menu/MenuTemplate";
import withAuth from "../../../hoc/withAuth";
import { JJHChapterModel, JJHTimelineModel } from "../../../types/chapterTypes";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import { useNavigate } from "react-router-dom";

interface JJHList extends MenuModel {
  jjhNumber: number;
}

function JJHListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: jjhList } = useGetJJHListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  useEffect(() => {
    if (!jjhList?.timelineList) {
      return;
    }

    const newChapterList: JJHList[] = [...jjhList.chapterList].map(
      (item: JJHChapterModel) => {
        const { title, state, jjhNumber, progress, number } = item;
        const result: JJHList = {
          type: "Base",
          title,
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&chapter=${number}&title=${number}.${title}`
            ),
          icon: number,
          description: "진행도: " + progress,
          jjhNumber: jjhNumber,
          subTitle:
            state === "Locked" ? (
              <Icon icon="lock" color={theme.colors.white} size={40} />
            ) : progress === "완료" ? (
              <Icon icon="check" color={theme.colors.white} size={40} />
            ) : (
              progress === "진행 중" && (
                <Icon icon="run" color={theme.colors.white} size={40} />
              )
            ),
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : progress === "완료"
              ? theme.colors.green
              : progress === "진행 중"
              ? theme.colors.blue
              : theme.colors.white,
          important: progress === "진행 중",
        };

        return result;
      }
    );

    const newTimelineList: JJHList[] = [...jjhList.timelineList].map(
      (item: JJHTimelineModel) => {
        const { endDate, era, startDate, state, jjhNumber, progress, id } =
          item;
        const result: JJHList = {
          type: "Base",
          title: `${era}(${startDate / 10000} ~ ${item.endDate / 10000})`,
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&id=${id}&title=${era}(${
                startDate / 10000
              } ~ ${endDate / 10000})`
            ),
          icon: <Icon icon="TIMELINE_STUDY" />,
          description: "진행도: " + progress,
          jjhNumber: jjhNumber,
          subTitle:
            state === "Locked" ? (
              <Icon icon="lock" color={theme.colors.white} size={40} />
            ) : progress === "완료" ? (
              <Icon icon="check" color={theme.colors.white} size={40} />
            ) : (
              progress === "진행 중" && (
                <Icon icon="run" color={theme.colors.white} size={40} />
              )
            ),
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : progress === "완료"
              ? theme.colors.green
              : progress === "진행 중"
              ? theme.colors.blue
              : theme.colors.white,
          important: progress === "진행 중",
        };
        return result;
      }
    );

    setMenuList(
      [...newChapterList, ...newTimelineList]
        .sort((a, b) => a.jjhNumber - b.jjhNumber)
        .map((item) => {
          const {
            title,
            state,
            type,
            icon,
            description,
            onClickMain,
            mainColor,
            subTitle,
            important,
          } = item;
          return {
            type,
            title,
            subTitle,
            mainColor,
            state,
            icon,
            description,
            onClickMain,
            onClickSub: onClickMain,
            important,
          };
        })
    );
  }, [setMenuList, jjhList, navigate, theme]);

  if (!jjhList) {
    return <div>Loading...</div>;
  }

  return <MenuTemplate menuList={menuList} icon="run" category="정주행" />;
}

export default withAuth(JJHListPage);