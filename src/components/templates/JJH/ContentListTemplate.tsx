import { ContentModel } from "../../../types/chapterTypes";
import Layout from "../../atoms/Layout";
import TitleBox from "../../organisms/TitleBox";
import ContentList from "../../organisms/ContentList";

interface ContentListTemplateProps {
  title: string;
  contentList: ContentModel[];
}

function ContentListTemplate({ title, contentList }: ContentListTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink="/jeong-ju-haeng" category={title}></TitleBox>
      <ContentList contentList={contentList} />
    </Layout>
  );
}

export default ContentListTemplate;
