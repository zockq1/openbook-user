import Layout from "../../atoms/Layout";
import CommonList from "../../organisms/CommonList";
import TitleBox from "../../organisms/TitleBox";
import { CommonListItemModel } from "../../../types/CommonTypes";

interface TimeLineMenuTemplateProps {
  timelineList: CommonListItemModel[];
}

function TimeLineMenuTemplate({ timelineList }: TimeLineMenuTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink="/" category="연표 학습"></TitleBox>
      <CommonList list={timelineList} />;
    </Layout>
  );
}

export default TimeLineMenuTemplate;
