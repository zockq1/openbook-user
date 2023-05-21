import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetTopicQuery } from "../store/api/topicApi";

const TopicBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 95%;
  height: 80vh;

  border-radius: 10px;

  margin: 85px auto 10px;
  padding-left: 15px;
  padding-top: 15px;
  background-color: #fff;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

function Topic() {
  const { topicTitle } = useParams();
  const { data: topic } = useGetTopicQuery(topicTitle ? topicTitle : "");
  console.log(topic);
  return (
    <TopicBox>
      <Title>{topicTitle}</Title>
      <br />
      <p>
        {topic?.startDate[0]} ~ {topic?.endDate[0]}
      </p>
      <br />
      {topic?.detail &&
        topic?.detail.split("\n").map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
    </TopicBox>
  );
}

export default Topic;
