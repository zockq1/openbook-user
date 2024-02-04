import { useContext, useEffect, useState } from "react";
import { useGetJJHListQuery } from "../../../../store/api/jjhApi";
import { MenuModel } from "../../../../types/commonTypes";
import SideMenuUI from "../presenter/SideMenuUI";
import { JJHChapterModel, JJHTimelineModel } from "../../../../types/jjhTypes";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import Icon from "../../../atoms/icon/Icon";
import useQuesryString from "../../../../hooks/useQueryString";

interface JJHList extends MenuModel {
  jjhNumber: number;
}

function JJHSideMenu() {
  const navigate = useNavigate();
  const { jjhNumber } = useQuesryString();
  const theme = useContext(ThemeContext);
  const { data: jjhList } = useGetJJHListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!jjhList?.timelineList) {
      return;
    }

    const newChapterList: JJHList[] = [...jjhList.chapterList].map(
      (item: JJHChapterModel) => {
        const { title, state, jjhNumber, number } = item;
        const result: JJHList = {
          type: "Qustion",
          id: jjhNumber,
          title: title?.toString().split("-")[0].trim(),
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&chapter=${number}&title=${title}`
            ),
          icon: (
            <Icon
              size={14}
              icon={
                state === "Locked"
                  ? "lock"
                  : state === "Complete"
                  ? "check"
                  : "run"
              }
            />
          ),
          description: title?.toString().split("-")[1] || null,
          jjhNumber: jjhNumber,
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : state === "Complete"
              ? theme.colors.green
              : state === "InProgress"
              ? theme.colors.blue
              : theme.colors.textBlue,
          important: state === "InProgress",
        };

        return result;
      }
    );

    const newTimelineList: JJHList[] = [...jjhList.timelineList].map(
      (item: JJHTimelineModel) => {
        const { endDate, era, startDate, state, jjhNumber, id, title } = item;
        const result: JJHList = {
          type: "Qustion",
          id: jjhNumber,
          title: title + " 연표",
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&id=${id}&title=${era}/${Math.floor(
                startDate / 10000
              )} ~ ${Math.floor(endDate / 10000)}`
            ),
          icon: (
            <Icon
              size={14}
              icon={
                state === "Locked"
                  ? "lock"
                  : state === "Complete"
                  ? "check"
                  : "run"
              }
            />
          ),
          description: `${Math.floor(startDate / 10000)} ~ ${Math.floor(
            item.endDate / 10000
          )}`,
          jjhNumber: jjhNumber,
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : state === "Complete"
              ? theme.colors.green
              : state === "InProgress"
              ? theme.colors.blue
              : theme.colors.textBlue,
          important: state === "InProgress",
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
            id,
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
            id,
          };
        })
    );
  }, [setMenuList, jjhList, navigate, theme]);

  return <SideMenuUI menuList={menuList} selectedId={jjhNumber} />;
}

export default JJHSideMenu;
