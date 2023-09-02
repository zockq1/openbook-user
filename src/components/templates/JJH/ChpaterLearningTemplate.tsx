import parse from "html-react-parser";
import TitleBox from "../../organisms/TitleBox";
import Layout from "../../atoms/Layout";
import ContentBox from "../../atoms/ContentBox";
import Button from "../../atoms/Button";

interface ChapterLearningTemplateProps {
  chapterNumber: number;
  title: string;
  content: string;
  handleNextContent: () => void;
}

function ChapterLearningTemplate({
  chapterNumber,
  title,
  content,
  handleNextContent,
}: ChapterLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        title={title}
        category="단원 학습"
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
      />
      <ContentBox>{parse(String(content))}</ContentBox>
      <Button onClick={handleNextContent}>다음</Button>
    </Layout>
  );
}

export default ChapterLearningTemplate;
