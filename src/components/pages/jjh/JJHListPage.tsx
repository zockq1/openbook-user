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
import ChapterMenuUI from "../../unit/common/container/ChapterMenuUI.container";

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
          title,
          state,
          onClickMain: () =>
            state !== "Locked" &&
            navigate(
              `/jeong-ju-haeng/content?jjh=${jjhNumber}&id=${id}&title=${era}(${
                startDate / 10000
              } ~ ${endDate / 10000})`
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

    const chapterCategory1 = [
      "선사",
      "여러",
      "고구려",
      "백제",
      "신라",
      "가야",
      "삼국",
    ];
    const chapterCategory2 = ["통일 신라", "발해", "남북국"];
    const chapterCategory3 = ["후삼국", "고려"];
    const chapterCategory4 = ["조선"];
    const chapterCategory5 = ["일제", "개항기", "국권"];
    const chapterCategory6 = ["정부"];
    const chapterCategory7 = [
      "노력",
      "유물",
      "탑",
      "석상",
      "그림",
      "세시",
      "민속",
      "지역사",
    ];

    if (isSuccess && jjhList.chapterList.length > 0) {
      return (
        <>
          <ChapterMenuUI
            title="선사 시대 ~ 삼국 시대"
            menuList={menuList.filter(
              (chapter) =>
                chapterCategory1.some((category) =>
                  chapter.title?.toString().includes(category)
                ) &&
                !chapter.title?.toString().includes("통일") &&
                !chapter.title?.toString().includes("후")
            )}
          />
          <ChapterMenuUI
            title="남북국 시대"
            menuList={menuList.filter((chapter) =>
              chapterCategory2.some((category) =>
                chapter.title?.toString().includes(category)
              )
            )}
          />
          <ChapterMenuUI
            title="고려 시대"
            menuList={menuList.filter((chapter) =>
              chapterCategory3.some((category) =>
                chapter.title?.toString().includes(category)
              )
            )}
          />
          <ChapterMenuUI
            title="조선 시대"
            menuList={menuList.filter((chapter) =>
              chapterCategory4.some((category) =>
                chapter.title?.toString().includes(category)
              )
            )}
          />
          <ChapterMenuUI
            title="개항기 ~ 일제강점기"
            menuList={menuList.filter((chapter) =>
              chapterCategory5.some((category) =>
                chapter.title?.toString().includes(category)
              )
            )}
          />
          <ChapterMenuUI
            title="현대"
            menuList={menuList.filter((chapter) =>
              chapterCategory6.some((category) =>
                chapter.title?.toString().includes(category)
              )
            )}
          />
          <ChapterMenuUI
            title="기타"
            menuList={menuList.filter((chapter) =>
              chapterCategory7.some((category) =>
                chapter.title?.toString().includes(category)
              )
            )}
          />
        </>
      );
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

export default JJHListPage;
