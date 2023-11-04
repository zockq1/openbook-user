import Layout from "../../atoms/layout/Layout";
import { RowList } from "../../atoms/layout/List";
import Header from "../../organisms/ui/Header";

import run from "../../../styles/images/run.svg";
import books from "../../../styles/images/books.svg";
import timeline from "../../../styles/images/timeline.svg";
import MediumBox from "../../molecules/main-box/MediumBox";
import NavigationBar from "../../organisms/ui/NavigationBar";
import JJHBox from "../../molecules/main-box/JJHBox";
import { ProgressModel } from "../../../types/jjhTypes";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import styled from "styled-components";

const SubMenu = styled.ul`
  display: flex;
  justify-content: space-between;
`;

interface MainPageTemplateProps {
  progress: ProgressModel;
}

function MainPageTemplate({ progress }: MainPageTemplateProps) {
  return (
    <Layout>
      <Header />
      <MainPageLayout>
        <RowList>
          <JJHBox
            title="정주행"
            link="jeong-ju-haeng"
            image={run}
            percentage={progress.totalProgress}
          />
          <SubMenu>
            <MediumBox title="학습 자료 모음" link="learning" image={books} />
            <MediumBox
              title="연표 보기"
              link="timeline-list"
              image={timeline}
            />
          </SubMenu>
        </RowList>
      </MainPageLayout>

      <NavigationBar />
    </Layout>
  );
}

export default MainPageTemplate;
