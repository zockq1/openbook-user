import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.li`
  height: 100px;
  width: 100%;

  margin-bottom: 10px;

  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
  background-color: #fff;
`;
const ChapterLink = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;

const ChapterTitle = styled.div`
  margin-top: 15px;
  margin-left: 10px;
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
    <Item>
      <ChapterLink to={`/topic-learning/${chapterNumber}`}>
        <ChapterTitle>{chapterNumber + "단원: " + chapterTitle}</ChapterTitle>
        <CompletionRateText>학습진도 : </CompletionRateText>
        <CompletionRate>{chapterNumber === 1 ? "100%" : "0%"}</CompletionRate>
      </ChapterLink>
    </Item>
  );
}

export default ChapterItem;
