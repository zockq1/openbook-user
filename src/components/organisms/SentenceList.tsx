import { useContext } from "react";
import { ColumnList } from "../atoms/List";
import TextBox from "../atoms/TextBox";
import { ThemeContext } from "styled-components";

interface SentenceListProps {
  sentenceList: string[];
}

function SentenceList({ sentenceList }: SentenceListProps) {
  const theme = useContext(ThemeContext);
  return (
    <ColumnList>
      {sentenceList.map((item, index) => {
        return (
          <TextBox maxWidth="full" margin={theme.margin.base} key={index}>
            {item}
          </TextBox>
        );
      })}
    </ColumnList>
  );
}

export default SentenceList;
