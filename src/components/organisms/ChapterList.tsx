import ChpaterItem from "../molecules/ChapterItem";
import { ColumnList } from "../atoms/List";
import { ChapterModel } from "../../types/chapterTypes";

interface ChpaterListProps {
  chapterList: ChapterModel[];
}

function ChpaterList({ chapterList }: ChpaterListProps) {
  return (
    <ColumnList>
      {chapterList.map((item) => {
        return <ChpaterItem chapterInfo={item} key={item.number} />;
      })}
    </ColumnList>
  );
}

export default ChpaterList;
