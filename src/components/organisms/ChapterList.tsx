import ChpaterItem from "../molecules/ChapterItem";
import { ColumnList } from "../atoms/List";

interface ChpaterListProps {
  chapterList: {
    title: string;
    number: number;
    state: string;
    progress: string;
  }[];
}

function ChpaterList({ chapterList }: ChpaterListProps) {
  return (
    <ColumnList>
      {chapterList.map((item) => {
        return <ChpaterItem chapterInfo={item} />;
      })}
    </ColumnList>
  );
}

export default ChpaterList;
