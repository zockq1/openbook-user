import { useParams } from "react-router-dom";
import LinkBox from "../Common/LinkBox";
import SmallListTitle from "../Common/SmallListTitle";

interface TopicBoxProps {
  topicTitle: string;
}

function TopicItem({ topicTitle }: TopicBoxProps) {
  const { chapter } = useParams();
  return (
    <LinkBox to={`/topic-learning/${chapter}/${topicTitle}`}>
      <SmallListTitle>{topicTitle}</SmallListTitle>
    </LinkBox>
  );
}

export default TopicItem;
