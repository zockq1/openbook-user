import { Link } from "react-router-dom";
import styled from "styled-components";
import ListItem from "../Common/ListItem";
import Title from "../Common/Title";

const ChapterLink = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;

const CompletionRateText = styled.div`
  position: absolute;
  bottom: 24px;
  right: 100px;
`;

const CompletionRate = styled.div`
  position: absolute;
  bottom: 24px;
  right: 10px;
  font-size: 30px;
  font-weight: 800;
`;

interface ChapterBoxProps {
  chapterTitle: string;
  chapterNumber: number;
}

function ChapterItem({ chapterTitle, chapterNumber }: ChapterBoxProps) {
  return (
    <ListItem height="100px">
      <ChapterLink to={`/topic-learning/${chapterNumber}`}>
        <Title>{chapterNumber + "단원: " + chapterTitle}</Title>
        <CompletionRateText>학습진도 : </CompletionRateText>
        <CompletionRate>{chapterNumber === 1 ? "100%" : "0%"}</CompletionRate>
      </ChapterLink>
    </ListItem>
  );
}

export default ChapterItem;
