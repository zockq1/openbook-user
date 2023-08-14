import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import ChpaterList from "../organisms/ChapterList";

interface JeongJuHaengListTemplatesProps {
  chapterList: {
    title: string;
    number: number;
    state: string;
    progress: string;
  }[];
}

function JeongJuHaengListTemplates({
  chapterList,
}: JeongJuHaengListTemplatesProps) {
  return (
    <Layout>
      <TitleBox category="정주행"></TitleBox>
      <ChpaterList chapterList={chapterList} />
    </Layout>
  );
}

export default JeongJuHaengListTemplates;
