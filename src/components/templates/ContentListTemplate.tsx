import { useParams } from "react-router-dom";
import { ChapterModel, ProgressModel } from "../../types/chapterTypes";
import Layout from "../atoms/Layout";
import TitleBox from "../molecules/TitleBox";
import ContentList from "../organisms/ContentList";

interface ContentListTemplateProps {
  chapterInfo: ChapterModel;
  contentList: string[];
  progress: ProgressModel;
}

function ContentListTemplate({
  chapterInfo,
  contentList,
  progress,
}: ContentListTemplateProps) {
  const { chapter } = useParams();
  return (
    <Layout>
      <TitleBox
        backLink="/jeong-ju-haeng"
        category={String(chapter) + ". " + chapterInfo.title}
      ></TitleBox>
      <ContentList
        contentList={contentList}
        progress={progress}
        chapterInfo={chapterInfo}
      />
    </Layout>
  );
}

export default ContentListTemplate;
