import styled from "styled-components";
import ChapterBox from "../components/ChapterBox";

const ChapterList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 75px;
`;

function TopicLearning() {
  return (
    <ChapterList>
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
      <ChapterBox />
    </ChapterList>
  );
}

export default TopicLearning;
