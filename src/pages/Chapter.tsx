import { useParams } from "react-router-dom";
import { useGetChapterTopicListQuery } from "../store/api/topicApi";
import TopicItem from "../components/TopicItem";
import styled from "styled-components";

const TopicList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 95%;

  border-radius: 10px;

  margin: 85px auto 10px;
  background-color: #fff;
`;
const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #e3e3e3;
  margin: 5px 0;
`;
const Box = styled.li`
  height: 30px;
  width: 90%;

  margin: 10px 0;

  font-weight: 700;
  font-size: 15px;
  color: #5a5a5a;
`;

function Chapter() {
  const { chapter } = useParams();
  const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));
  return (
    <TopicList>
      {topicList?.topicList.map((item, index) => {
        return (
          <Box key={index}>
            <TopicItem topicTitle={item} />
            {index < topicList.topicList.length - 1 && <Separator />}
          </Box>
        );
      })}
    </TopicList>
  );
}

export default Chapter;
