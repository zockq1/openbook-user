import { ColumnList } from "../atoms/List";
import KeywoedItem from "../molecules/KeywordItem";

interface KeywordListProps {
  keywordList: {
    name: string;
    comment: string;
    file: string;
  }[];
}

function KeywordList({ keywordList }: KeywordListProps) {
  return (
    <ColumnList>
      {keywordList.map((item, index) => {
        return (
          <KeywoedItem key={index} name={item.name} comment={item.comment} />
        );
      })}
    </ColumnList>
  );
}

export default KeywordList;
