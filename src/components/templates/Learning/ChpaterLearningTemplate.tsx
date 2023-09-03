import parse from "html-react-parser";
import TitleBox from "../../organisms/TitleBox";
import Layout from "../../atoms/Layout";
import ContentBox from "../../atoms/ContentBox";
import Button from "../../atoms/Button";

interface ChapterLearningTemplateProps {
  title: string;
  content: string;
  handleNextContent?: () => void;
  backLink: string;
}

function ChapterLearningTemplate({
  title,
  content,
  handleNextContent,
  backLink,
}: ChapterLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} category="단원 학습" backLink={backLink} />
      <ContentBox>{parse(String(content))}</ContentBox>
      {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default ChapterLearningTemplate;
