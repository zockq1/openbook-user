import { useNavigate, useParams } from "react-router-dom";
import TopicLearningTemplate from "../../templates/learning/TopicLearningTemplate";
import { useGetTopicQuery } from "../../../store/api/topicApi";

function LearningTopicPage() {
  const navigate = useNavigate();
  const { chapter, topic } = useParams();
  const { data: topicInfo } = useGetTopicQuery(String(topic));

  if (!topicInfo) {
    return <div>Loading...</div>;
  }

  return (
    <TopicLearningTemplate
      topicTitle={String(topic)}
      topicInfo={topicInfo}
      handleBackPage={() => navigate(`/learning/${chapter}`)}
    />
  );
}

export default LearningTopicPage;
