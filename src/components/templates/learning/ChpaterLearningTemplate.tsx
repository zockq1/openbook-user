import parse from "html-react-parser";
import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import ContentBox from "../../atoms/box/ContentBox";
import Button from "../../atoms/button/Button";

interface ChapterLearningTemplateProps {
  title: string;
  content: string;
  handleNextContent?: () => void;
  handleBackPage: () => void;
}

function ChapterLearningTemplate({
  title,
  content,
  handleNextContent,
  handleBackPage,
}: ChapterLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={title}
        icon="단원 학습"
        category="단원 학습"
        handleBackPage={handleBackPage}
      />
      <ContentBox>{parse(String(content))}</ContentBox>
      {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
    </Layout>
  );
}

export default ChapterLearningTemplate;
