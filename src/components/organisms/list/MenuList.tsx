import { ColumnList } from "../../atoms/layout/List";
import MenuItem from "../../molecules/list-item/MenuItem";
import { MenuModel } from "../../../types/commonTypes";

interface MenuListProps {
  list: MenuModel[];
}

function MenuList({ list }: MenuListProps) {
  return (
    <ColumnList>
      {list.map((item, index) => {
        return <MenuItem menuItem={item} key={index} />;
      })}
    </ColumnList>
  );
}

export default MenuList;
