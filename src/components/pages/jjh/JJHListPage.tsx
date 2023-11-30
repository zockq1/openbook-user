import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import MenuUI from "../../unit/common/container/MenuUI.container";
import withAuth from "../../../hoc/withAuth";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import { useNavigate } from "react-router-dom";
import { useGetJJHListQuery } from "../../../store/api/jjhApi";
import { JJHChapterModel, JJHTimelineModel } from "../../../types/jjhTypes";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";

interface JJHList extends MenuModel {
  jjhNumber: number;
}

function JJHListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const {
    data: jjhList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetJJHListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);
  useEffect(() => {
    if (!jjhList?.timelineList) {
      return;
    }

    const newChapterList: JJHList[] = [...jjhList.chapterList].map(
      (item: JJHChapterModel) => {
        const { title, state, jjhNumber, number, dateComment } = item;
        const result: JJHList = {
          type: "Qustion",
          title,
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&chapter=${number}&title=${title}`
            ),
          icon: number,
          description: dateComment,
          jjhNumber: jjhNumber,
          subTitle:
            state === "Locked" ? (
              <Icon icon="lock" color={theme.colors.white} size={40} />
            ) : state === "Complete" ? (
              <Icon icon="check" color={theme.colors.white} size={40} />
            ) : (
              state === "InProgress" && (
                <Icon icon="run" color={theme.colors.white} size={40} />
              )
            ),
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : state === "Complete"
              ? theme.colors.green
              : state === "InProgress"
              ? theme.colors.blue
              : theme.colors.white,
          important: state === "InProgress",
        };

        return result;
      }
    );

    const newTimelineList: JJHList[] = [...jjhList.timelineList].map(
      (item: JJHTimelineModel) => {
        const { endDate, era, startDate, state, jjhNumber, id } = item;
        const result: JJHList = {
          type: "Qustion",
          title: era,
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&id=${id}&title=${era}(${
                startDate / 10000
              } ~ ${endDate / 10000})`
            ),
          icon: <Icon icon="TIMELINE_STUDY" size={22} />,
          description: `${startDate / 10000} ~ ${item.endDate / 10000}`,
          jjhNumber: jjhNumber,
          subTitle:
            state === "Locked" ? (
              <Icon icon="lock" color={theme.colors.white} size={40} />
            ) : state === "Complete" ? (
              <Icon icon="check" color={theme.colors.white} size={40} />
            ) : (
              state === "InProgress" && (
                <Icon icon="run" color={theme.colors.white} size={40} />
              )
            ),
          mainColor:
            state === "Locked"
              ? theme.colors.red
              : state === "Complete"
              ? theme.colors.green
              : state === "InProgress"
              ? theme.colors.blue
              : theme.colors.white,
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

  const renderContent = () => {
    if (isLoading) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`정주행 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && jjhList.chapterList.length === 0) {
      return <EmptyUI message={`정주행 목록이 비었습니다.`} />;
    }

    if (isSuccess && jjhList.chapterList.length > 0) {
      return <MenuUI menuList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="run" category="정주행" />
      <ContentLayout>{renderContent()}</ContentLayout>
    </>
  );
}

export default withAuth(JJHListPage);
