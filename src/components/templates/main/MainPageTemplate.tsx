import { ProgressModel } from "../../../types/progressTypes";
import Layout from "../../atoms/layout/Layout";
import { RowList } from "../../atoms/layout/List";
import Header from "../../organisms/ui/Header";

import run from "../../../styles/images/run.svg";
import books from "../../../styles/images/books.svg";
import timeline from "../../../styles/images/timeline.svg";
import MediumBox from "../../molecules/main-box/MediumBox";
import NavigationBar from "../../organisms/ui/NavigationBar";
import JJHBox from "../../molecules/main-box/JJHBox";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

interface MainPageTemplateProps {
  progress: ProgressModel;
}

function MainPageTemplate({ progress }: MainPageTemplateProps) {
  return (
    <Layout>
      <Header />
      <MainContentLayout>
        <RowList>
          <JJHBox
            title="정주행"
            link="jeong-ju-haeng"
            image={run}
            percentage={progress.totalProgress}
          />
          <MediumBox
            title="학습 자료 모음"
            link="learning"
            image={books}
          ></MediumBox>
          <MediumBox
            title="연표 보기"
            link="timeline"
            image={timeline}
          ></MediumBox>
        </RowList>
      </MainContentLayout>

      <NavigationBar />
    </Layout>
  );
}

export default MainPageTemplate;
