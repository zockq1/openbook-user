import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import ChpaterList from "../organisms/ChapterList";
import { ChapterModel } from "../../types/chapterTypes";

interface JeongJuHaengListTemplatesProps {
  chapterList: ChapterModel[];
}

function JeongJuHaengListTemplates({
  chapterList,
}: JeongJuHaengListTemplatesProps) {
  return (
    <Layout>
      <TitleBox backLink="/" category="정주행"></TitleBox>
      <ChpaterList chapterList={chapterList} />
    </Layout>
  );
}

export default JeongJuHaengListTemplates;
