import { ProgressModel } from "../../types/ProgressTypes";
import Layout from "../atoms/Layout";
import { RowList } from "../atoms/List";
import Percentage from "../atoms/Percentage";
import ProgressBar from "../atoms/ProgressBar";
import LargeBox from "../molecules/LargeBox";
import Header from "../organisms/Header";

import run from "../../styles/images/run.svg";
import books from "../../styles/images/books.svg";
import timeline from "../../styles/images/timeline.svg";
import MediumBox from "../molecules/MediumBox";
import NavigationBar from "../organisms/NavigationBar";

interface MainPageTemplateProps {
  progress: ProgressModel;
}

function MainPageTemplate({ progress }: MainPageTemplateProps) {
  return (
    <Layout>
      <Header />
      <RowList>
        <LargeBox title="정주행" link="jeong-ju-haeng" image={run}>
          <Percentage
            percentage={Math.floor((progress.complete / progress.total) * 100)}
          />
          <ProgressBar
            percentage={Math.floor((progress.complete / progress.total) * 100)}
          />
        </LargeBox>
        <MediumBox title="개념 학습" link="learning" image={books}></MediumBox>
        <MediumBox
          title="연표 보기"
          link="timeline"
          image={timeline}
        ></MediumBox>
      </RowList>
      <NavigationBar />
    </Layout>
  );
}

export default MainPageTemplate;
