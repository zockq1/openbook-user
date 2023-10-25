import TitleBox from "../../organisms/ui/TitleBox";
import Layout from "../../atoms/layout/Layout";
import ContentBox from "../../atoms/box/ContentBox";
import Button from "../../atoms/button/Button";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

interface ChapterLearningTemplateProps {
  title: string;
  content: string;
  handleNextContent?: () => void;
}

function ChapterLearningTemplate({
  title,
  content,
  handleNextContent,
}: ChapterLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} icon="CHAPTER_INFO" category="단원 학습" />
      <MainContentLayout>
        <ContentBox>
          <img
            src={content}
            alt={title}
            style={{ width: "100%", height: "100%" }}
          />
        </ContentBox>
        {handleNextContent && <Button onClick={handleNextContent}>다음</Button>}
      </MainContentLayout>
    </Layout>
  );
}

export default ChapterLearningTemplate;
