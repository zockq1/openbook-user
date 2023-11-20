import { useContext, useEffect, useState } from "react";
import { MenuModel } from "../../../types/commonTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../unit/ui/TitleBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import MenuUI from "../../unit/common/container/MenuUI.container";
import { useGetChapterInfoQuery } from "../../../store/api/chapterApi";
import { useGetChapterTopicListQuery } from "../../../store/api/jjhApi";
import KeywordList from "../../unit/topic/presenter/KeywordList.presenter";
import { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import ChapterInfo from "../../unit/chapter/presenter/ChapterInfo.presenter";
import useQuesryString from "../../../hooks/useQueryString";
import KeywordToggleButton from "../../unit/topic/presenter/KeywordToggleButton.presenter";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";

function LearningTopicListPage() {
  const theme = useContext(ThemeContext);
  const { chapterNumber, title } = useQuesryString();
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);
  const { data: chapterInfo } = useGetChapterInfoQuery(chapterNumber);
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!topicList || chapterInfo === undefined) {
      return;
    }

    let newMenu: MenuModel[] = [...topicList].map((item) => {
      const { title, category, dateComment, keywordList, isBookmarked } = item;
      const result: MenuModel = {
        type: "Base",
        title: title,
        icon: <Icon icon={category} size={22} />,
        description: `${dateComment}`,
        content: (
          <KeywordList
            keywordList={keywordList}
            topicTitle={title}
            isBookmarked={isBookmarked}
          />
        ),
      };
      return result;
    });

    if (chapterInfo.content)
      newMenu.unshift({
        type: "Base",
        title: "단원 학습",
        icon: <Icon icon="CHAPTER_INFO" size={22} />,
        description: `${title}`,
        content: <ChapterInfo />,
      });

    setMenuList(newMenu);
  }, [setMenuList, topicList, chapterNumber, title, chapterInfo, theme]);

  if (menuList.length === 0) {
    return (
      <Layout>
        <TitleBox icon="TOPIC_STUDY" category={title} />
        <MainContentLayout>
          <KeywordToggleButton comment keyword />
          <MenuSkeletonListUI />
        </MainContentLayout>
      </Layout>
    );
  }

  return (
    <Layout>
      <TitleBox icon="TOPIC_STUDY" category={title} />
      <MainContentLayout>
        <KeywordToggleButton comment keyword />
        <MenuUI menuList={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default LearningTopicListPage;
