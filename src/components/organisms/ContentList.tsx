import { ContentModel } from "../../types/chapterTypes";
import { ColumnList } from "../atoms/List";
import ContentItem from "../molecules/ContentItem";

interface ChpaterListProps {
  contentList: ContentModel[];
}

function ConetntList({ contentList }: ChpaterListProps) {
  return (
    <ColumnList>
      {contentList.map((item, index) => {
        return <ContentItem content={item} index={index} key={index} />;
      })}
    </ColumnList>
  );
}

export default ConetntList;
