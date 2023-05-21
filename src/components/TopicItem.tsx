import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const TopicLink = styled(Link)`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const TopicTitle = styled.div`
  margin: auto 0;
`;

interface TopicBoxProps {
  topicTitle: string;
}

function TopicItem({ topicTitle }: TopicBoxProps) {
  const { chapter } = useParams();
  return (
    <TopicLink to={`/topic-learning/${chapter}/${topicTitle}`}>
      <TopicTitle>{topicTitle}</TopicTitle>
    </TopicLink>
  );
}

export default TopicItem;
