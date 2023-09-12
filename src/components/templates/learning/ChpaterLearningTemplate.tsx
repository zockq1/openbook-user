import parse from "html-react-parser";
import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import ContentBox from "../../atoms/box/ContentBox";
import Button from "../../atoms/button/Button";

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