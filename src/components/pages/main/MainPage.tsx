import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useLazyGetTotalProgressQuery } from "../../../store/api/jjhApi";
import Layout from "../../atoms/layout/Layout";
import Header from "../../organisms/ui/Header";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import { ColumnList } from "../../atoms/layout/List";
import styled from "styled-components";
import JJHBox from "../../molecules/main-box/JJHBox";
import run from "../../../styles/images/run.svg";
import books from "../../../styles/images/books.svg";
import timeline from "../../../styles/images/timeline.svg";
import NavigationBar from "../../organisms/ui/NavigationBar";
import InfoBox from "../../molecules/main-box/InfoBox";
import Icon from "../../atoms/icon/Icon";

const SubMenu = styled.ul`
  display: flex;
  justify-content: space-between;
`;

function Main() {
  const [getProgressTriger, { data: progress }] =
    useLazyGetTotalProgressQuery();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      getProgressTriger();
    }
  }, [isLoggedIn, getProgressTriger]);

  return (
    <Layout>
      <Header />
      <MainPageLayout>
        <ColumnList>
          <SubMenu>
            <JJHBox
              title="정주행"
              link="jeong-ju-haeng"
              image={run}
              percentage={progress?.totalProgress || 0}
            />
          </SubMenu>

          <InfoBox
            title="학습 자료 모음"
            link="/learning"
            image={books}
            icon={<Icon icon="CHAPTER_INFO" size={22} />}
            description="단원, 주제, 키워드 학습 자료"
          />
          <InfoBox
            title="연표 모음"
            link="/timeline-list"
            image={timeline}
            icon={<Icon icon="TIMELINE_STUDY" size={22} />}
            description="연표 자료"
          />
        </ColumnList>
      </MainPageLayout>

      <NavigationBar />
    </Layout>
  );
}

export default Main;
