import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import { QuestionMenuModel } from "../../../types/commonTypes";
import { IconType } from "../../atoms/icon/Icon";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import QuestionMenuList from "../../organisms/list/QuestionMenuList";

interface QuestionMenuTemplateProps {
  icon?: IconType;
  category: string;
  questionMenuList: QuestionMenuModel[];
}

function QuestionMenuTemplate({
  questionMenuList,
  icon,
  category,
}: QuestionMenuTemplateProps) {
  return (
    <Layout>
      <TitleBox icon={icon} category={category}></TitleBox>
      <MainContentLayout>
        <QuestionMenuList list={questionMenuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default QuestionMenuTemplate;
