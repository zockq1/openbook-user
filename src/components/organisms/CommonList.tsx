import { useNavigate } from "react-router-dom";
import { ColumnList } from "../atoms/List";
import ListItem from "../molecules/ListItem";
import { ContentState } from "../../types/chapterTypes";
import { CommonListItemModel } from "../../types/CommonTypes";

interface CommonListProps {
  list: CommonListItemModel[];
}

function CommonList({ list }: CommonListProps) {
  const navigate = useNavigate();

  const onClickListItem = (state: ContentState, link: string) => {
    if (state === "Locked") {
      return;
    }
    navigate(link);
  };

  return (
    <ColumnList>
      {list.map((item, index) => {
        return (
          <ListItem
            title={item.title}
            description={item.description}
            icon={item.icon}
            onClickItem={() => onClickListItem(item.state, item.link)}
            state={item.state}
            key={index}
          />
        );
      })}
    </ColumnList>
  );
}

export default CommonList;
