import parse from "html-react-parser";
import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import ContentBox from "../atoms/ContentBox";

interface ChapterLearningTemplateProps {
  title: string;
  content: string;
}

function ChapterLearningTemplate({
  title,
  content,
}: ChapterLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} category="단원 학습" />
      <ContentBox>{parse(String(content))}</ContentBox>
    </Layout>
  );
}

export default ChapterLearningTemplate;
