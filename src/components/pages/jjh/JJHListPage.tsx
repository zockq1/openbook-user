import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import { useNavigate } from "react-router-dom";
import { useGetJJHListQuery } from "../../../store/api/jjhApi";
import { JJHChapterModel, JJHTimelineModel } from "../../../types/jjhTypes";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ChapterMenu from "../../unit/common/presenter/ChapterMenu.presenter";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import JJHSideMenu from "../../unit/common/presenter/JJHSideMenu.presenter";
import { useMediaQuery } from "react-responsive";

interface JJHList extends MenuModel {
  jjhNumber: number;
}

function JJHListPage() {
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery({ minWidth: 768 });
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
        const { title, state, jjhNumber, number } = item;
        const result: JJHList = {
          type: "Qustion",
          title: title?.toString().split("-")[0].trim(),
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&chapter=${number}&title=${title}`
            ),
          icon: (
            <span>
              {number}
              <span style={{ fontSize: theme.fontSizes.xs }}> 단원</span>
            </span>
          ),
          description: title?.toString().split("-")[1] || null,
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
        const { endDate, era, startDate, state, jjhNumber, id, title } = item;
        const result: JJHList = {
          type: "Qustion",
          title: title,
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&id=${id}&title=${era}/${
                startDate / 10000
              } ~ ${endDate / 10000}`
            ),
          icon: (
            <span>
              <Icon icon="TIMELINE_STUDY" size={22} />
              <span style={{ fontSize: theme.fontSizes.xs }}> 연표</span>
            </span>
          ),
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

    let find = false;
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

          if (isNotMobile && state === "InProgress" && onClickMain) {
            onClickMain();
            find = true;
          }
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

    if (isNotMobile && !find && newChapterList[0]?.onClickMain) {
      newChapterList[0].onClickMain();
    }
  }, [setMenuList, jjhList, navigate, theme, isNotMobile]);

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
      return <ChapterMenu menuList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="run" category="정주행" />
      <Mobile>
        <ContentLayout full>{renderContent()}</ContentLayout>
      </Mobile>
      <Default>
        <ContentLayout leftMenu={<JJHSideMenu />}></ContentLayout>
      </Default>
    </>
  );
}

export default JJHListPage;
