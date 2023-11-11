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
import MediumBox from "../../molecules/main-box/MediumBox";
import run from "../../../styles/images/run.svg";
import books from "../../../styles/images/books.svg";
import timeline from "../../../styles/images/timeline.svg";
import NavigationBar from "../../organisms/ui/NavigationBar";

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

          <SubMenu>
            <MediumBox title="학습 자료 모음" link="learning" image={books} />
            <MediumBox
              title="연표 보기"
              link="timeline-list"
              image={timeline}
            />
          </SubMenu>
        </ColumnList>
      </MainPageLayout>

      <NavigationBar />
    </Layout>
  );
}

export default Main;
