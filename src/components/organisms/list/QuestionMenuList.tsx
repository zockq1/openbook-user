import { ColumnList } from "../../atoms/layout/List";
import { QuestionMenuModel } from "../../../types/commonTypes";
import QuestionMenuItem from "../../molecules/list-item/QuestionMenuItem";

interface QuestionMenuListProps {
  list: QuestionMenuModel[];
}

function QuestionMenuList({ list }: QuestionMenuListProps) {
  return (
    <ColumnList>
      {list.map((item, index) => {
        return <QuestionMenuItem questionMenuItem={item} key={index} />;
      })}
    </ColumnList>
  );
}

export default QuestionMenuList;
