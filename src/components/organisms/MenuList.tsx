import { useNavigate } from "react-router-dom";
import { ColumnList } from "../atoms/List";
import MenuItem from "../molecules/MenuItem";
import { ContentState } from "../../types/chapterTypes";
import { MenuModel } from "../../types/CommonTypes";

interface MenuListProps {
  list: MenuModel[];
}

function MenuList({ list }: MenuListProps) {
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
          <MenuItem
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

export default MenuList;
