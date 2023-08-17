import parse from "html-react-parser";
import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import ContentBox from "../atoms/ContentBox";
import Button from "../atoms/Button";

interface ChapterLearningTemplateProps {
  title: string;
  content: string;
  handleNextContent: () => void;
}

function ChapterLearningTemplate({
  title,
  content,
  handleNextContent,
}: ChapterLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} category="단원 학습" />
      <ContentBox>{parse(String(content))}</ContentBox>
      <Button onClick={handleNextContent}>다음</Button>
    </Layout>
  );
}

export default ChapterLearningTemplate;
