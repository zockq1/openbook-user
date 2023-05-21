import styled from "styled-components";
import ChapterItem from "../components/ChapterItem";
import { useGetChaptersQuery } from "../store/api/chapterApi";

const ChapterList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 85px;
`;

function TopicLearning() {
  const { data: chapterList } = useGetChaptersQuery();

  return (
    <ChapterList>
      {chapterList?.titleList.map((item, index) => {
        return (
          <ChapterItem
            key={index}
            chapterTitle={item}
            chapterNumber={chapterList?.numberList[index]}
          />
        );
      })}
    </ChapterList>
  );
}

export default TopicLearning;
