import { useContext, useEffect, useState } from "react";
import { useGetChapterListQuery } from "../../../store/api/chapterApi";
import { MenuModel } from "../../../types/commonTypes";
import TitleBox from "../../unit/ui/TitleBox";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";
import MenuSkeletonListUI from "../../unit/skeleton/MenuSkeletonListUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import EmptyUI from "../../unit/skeleton/EmptyUI";
import ContentLayout from "../../atoms/layout/ContentLayout";
import ChapterMenu from "../../unit/common/container/ChapterMenu";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import ChapterSideMenu from "../../unit/common/container/ChapterSideMenu";
import { useMediaQuery } from "react-responsive";

function LearningChapterListPage() {
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const theme = useContext(ThemeContext);
  const {
    data: chapterList,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetChapterListQuery();
  const [menuList, setMenuList] = useState<MenuModel[]>([]);

  useEffect(() => {
    if (!chapterList) {
      return;
    }

    setMenuList(
      [...chapterList]
        .sort((a, b) => a.number - b.number)
        .map((item, index) => {
          const { title, number } = item;
          if (isNotMobile && index === 0) {
            navigate(`/learning/chapter?chapter=${number}&title=${title}`, {
              replace: true,
            });
          }
          const result: MenuModel = {
            type: "Base",
            state: "Chapter",
            title: title?.toString().split("-")[0].trim(),
            onClickMain: () =>
              navigate(`/learning/chapter?chapter=${number}&title=${title}`),
            onClickSub: () =>
              navigate(`/learning/chapter?chapter=${number}&title=${title}`),
            icon: (
              <span>
                {number}
                <span style={{ fontSize: theme.fontSizes.xs }}> 단원</span>
              </span>
            ),
            description: title?.toString().split("-")[1] || null,
          };
          return result;
        })
    );
  }, [setMenuList, chapterList, navigate, theme, isNotMobile]);

  const renderContent = () => {
    if (isLoading) {
      return <MenuSkeletonListUI />;
    }

    if (isError && error) {
      return (
        <ErrorUI
          error={error}
          message={`단원 목록 불러오기에 실패하였습니다.`}
        />
      );
    }

    if (isSuccess && chapterList.length === 0) {
      return <EmptyUI message={`단원 목록이 비었습니다.`} />;
    }

    if (isSuccess && chapterList.length > 0) {
      return <ChapterMenu menuList={menuList} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="CHAPTER_INFO" category="학습 자료 모음" />
      <Mobile>
        <ContentLayout full>{renderContent()}</ContentLayout>
      </Mobile>
      <Default>
        <ContentLayout leftMenu={<ChapterSideMenu />}>{}</ContentLayout>
      </Default>
    </>
  );
}

export default LearningChapterListPage;
