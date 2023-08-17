import { ChapterModel, ProgressModel } from "../../types/chapterTypes";
import { ColumnList } from "../atoms/List";
import ContentItem from "../molecules/ContentItem";

interface ChpaterListProps {
  contentList: string[];
  progress: ProgressModel;
  chapterInfo: ChapterModel;
}

function ConetntList({ contentList, progress, chapterInfo }: ChpaterListProps) {
  return (
    <ColumnList>
      {contentList.map((item) => {
        return (
          <ContentItem
            content={item}
            key={item}
            progress={progress}
            chapterInfo={chapterInfo}
          />
        );
      })}
    </ColumnList>
  );
}

export default ConetntList;
