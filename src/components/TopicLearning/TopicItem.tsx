import { useParams } from "react-router-dom";
import styled from "styled-components";
import LinkBox from "../Common/LinkBox";

const TopicTitle = styled.div`
  margin: auto 0;
`;

interface TopicBoxProps {
  topicTitle: string;
}

function TopicItem({ topicTitle }: TopicBoxProps) {
  const { chapter } = useParams();
  return (
    <LinkBox to={`/topic-learning/${chapter}/${topicTitle}`}>
      <TopicTitle>{topicTitle}</TopicTitle>
    </LinkBox>
  );
}

export default TopicItem;
