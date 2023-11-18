import { useContext, useEffect, useState } from "react";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";

function TimelineMenuPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: timelineList } = useGetTimelineListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!timelineList) {
      return;
    }

    setMenuList([
      {
        type: "Base",
        title: "전체 연표",
        onClickMain: () => navigate(`/timeline?id=-1&title=전체 연표`),
        onClickSub: () => {
          navigate(`/timeline?id=-1&title=전체 연표`);
          navigate(`/`);
        },
        icon: <Icon icon="TIMELINE_STUDY" size={22} />,
        description: "BC 700K ~ 현대",
      },
      ...[...timelineList]
        .sort((a, b) => a.startDate - b.startDate)
        .map((timeline, index) => {
          const result: MenuModel = {
            type: "Base",
            title: `${timeline.era}`,
            onClickMain: () =>
              navigate(`/timeline?id=${timeline.id}&title=${timeline.title}`),
            onClickSub: () =>
              navigate(`/timeline?id=${timeline.id}&title=${timeline.title}`),
            icon: index + 1,
            description: `${timeline.startDate / 10000} ~ ${
              timeline.endDate / 10000
            }`,
          };
          return result;
        }),
    ]);
  }, [setMenuList, timelineList, theme, navigate]);

  if (menuList.length === 0) {
    return (
      <Layout>
        <TitleBox icon="TIMELINE_STUDY" category="연표 학습" />
        <MainContentLayout>
          <MenuSkeletonListUI />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="TIMELINE_STUDY" category="연표 학습" />
      <MainContentLayout>
        <MenuUI menuList={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default TimelineMenuPage;
