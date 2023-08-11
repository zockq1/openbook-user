import styled from "styled-components";
import ChpaterItem from "../molecules/ChapterItem";

interface ChpaterListProps {
  chapterList: {
    title: string;
    number: number;
    state: string;
    progress: number;
  }[];
}

const StyledChapterList = styled.ul`
  display: flex;
  flex-direction: column;
`;

function ChpaterList({ chapterList }: ChpaterListProps) {
  return (
    <StyledChapterList>
      {chapterList.map((item) => {
        return <ChpaterItem chapterInfo={item} />;
      })}
    </StyledChapterList>
  );
}

export default ChpaterList;
