import { ColumnList } from "../../atoms/layout/List";
import MenuItem from "../../molecules/list-item/MenuItem";
import { MenuModel } from "../../../types/commonTypes";
import { ThemeContext } from "styled-components";
import QuestionMenuItem from "../../molecules/list-item/QuestionMenuItem";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../atoms/icon/Icon";

interface MenuListProps {
  list: MenuModel[];
}

function MenuList({ list }: MenuListProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <ColumnList>
      {list.map((item, index) => {
        return (
          <li key={index}>
            {item.content && item.link ? (
              <QuestionMenuItem
                questionMenuItem={{
                  title: item.title,
                  description: item.description,
                  subTitle:
                    item.state === "Locked" ? (
                      <Icon color={theme.colors.white} size={40} icon="lock" />
                    ) : (
                      "문제 풀기"
                    ),
                  score: null,
                  icon:
                    typeof item.icon !== "number"
                      ? item.icon
                      : "TIMELINE_QUESTION",
                  color:
                    item.state === "Locked"
                      ? theme.colors.red
                      : theme.colors.blue,
                  number: index,
                  onClickMain: () => {},
                  onClickSub: () => {
                    item.link && item.state !== "Locked" && navigate(item.link);
                  },
                }}
              />
            ) : (
              <MenuItem menuItem={item} />
            )}
            {item.state === "Open" && item.content}
          </li>
        );
      })}
    </ColumnList>
  );
}

export default MenuList;
