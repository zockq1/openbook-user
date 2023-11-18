import { useContext, useEffect, useState } from "react";
import { useGetChapterListQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";

function LearningChapterListPage() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { data: chapterList } = useGetChapterListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList(
      [...chapterList]
        .sort((a, b) => a.number - b.number)
        .map((item) => {
          const { title, number, topicCount } = item;
          const result: MenuModel = {
            type: "Base",
            title: title,
            onClickMain: () =>
              navigate(`/learning/chapter?chapter=${number}&title=${title}`),
            onClickSub: () =>
              navigate(`/learning/chapter?chapter=${number}&title=${title}`),
            icon: number,
            description: "주제 수: " + topicCount,
          };
          return result;
        })
    );
  }, [setMenuList, chapterList, navigate, theme]);

  if (menuList.length === 0) {
    return (
      <Layout>
        <TitleBox icon="CHAPTER_INFO" category="학습 자료 모음" />
        <MainContentLayout>
          <MenuSkeletonListUI />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="CHAPTER_INFO" category="학습 자료 모음" />
      <MainContentLayout>
        <MenuUI menuList={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default LearningChapterListPage;
