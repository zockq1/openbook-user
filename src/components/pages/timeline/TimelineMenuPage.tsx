import { useContext, useEffect, useState } from "react";
import TitleBox from "../../unit/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import ChapterMenu from "../../unit/common/container/ChapterMenu.presenter";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import TimelineSideMenu from "../../unit/common/container/TimelineSideMenu.presenter";
import { useMediaQuery } from "react-responsive";

function TimelineMenuPage() {
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const theme = useContext(ThemeContext);
  const {
    data: timelineList,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTimelineListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    setMenuList([
      {
        type: "Base",
        title: "전체 연표",
        onClickMain: () =>
          navigate(`/timeline?id=-1&title=전체 연표/BC 700K ~ 현대`),
        icon: (
          <span>
            <Icon icon="TIMELINE_STUDY" size={22} />
            <span style={{ fontSize: theme.fontSizes.xs }}> 연표</span>
          </span>
        ),
        description: "BC 700K ~ 현대",
      },
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((timeline, index) => {
          const result: MenuModel = {
            type: "Base",
            title: `${timeline.title}`,
            onClickMain: () =>
              navigate(
                `/timeline?id=${timeline.id}&title=${
                  timeline.title
                }/${Math.floor(timeline.startDate / 10000)} ~ ${Math.floor(
                  timeline.endDate / 10000
                )}`
              ),
            icon: (
              <span>
                <Icon icon="TIMELINE_STUDY" size={22} />
                <span style={{ fontSize: theme.fontSizes.xs }}> 연표</span>
              </span>
            ),
            description: `${Math.floor(
              timeline.startDate / 10000
            )} ~ ${Math.floor(timeline.endDate / 10000)}`,
          };
          return result;
        }),
    ]);

    if (isNotMobile) {
      navigate(`/timeline?id=-1&title=전체 연표/BC 700K ~ 현대`, {
        replace: true,
      });
    }
  }, [setMenuList, timelineList, theme, navigate, isNotMobile]);

  const renderContent = () => {
    if (isLoading) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`연표 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && timelineList.length === 0) {
      return <EmptyUI message={`연표 목록이 비었습니다.`} />;
    }

    if (isSuccess && timelineList.length > 0) {
      return <ChapterMenu menuList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TIMELINE_STUDY" category="연표 학습" />
      <Mobile>
        <ContentLayout full>{renderContent()}</ContentLayout>
      </Mobile>
      <Default>
        <ContentLayout leftMenu={<TimelineSideMenu />}>{}</ContentLayout>
      </Default>
    </>
  );
}

export default TimelineMenuPage;
