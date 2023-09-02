import Layout from "../../atoms/Layout";
import MenuList from "../../organisms/MenuList";
import TitleBox from "../../organisms/TitleBox";
import { MenuModel } from "../../../types/CommonTypes";

interface TimeLineMenuTemplateProps {
  timelineList: MenuModel[];
}

function TimeLineMenuTemplate({ timelineList }: TimeLineMenuTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink="/" category="연표 학습"></TitleBox>
      <MenuList list={timelineList} />;
    </Layout>
  );
}

export default TimeLineMenuTemplate;
