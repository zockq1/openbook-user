import { useParams } from "react-router-dom";
import TopicLearningTemplate from "../../templates/Learning/TopicLearningTemplate";
import useGetExTopicInfo from "../../../example/useGetExTopicInfo";
import { useGetTopicQuery } from "../../../store/api/topicApi";

function LearningTopicPage() {
  const { chapter, topic } = useParams();
  /******************************* 실제 코드 *********************************/
  const { data: topicInfo } = useGetTopicQuery(String(topic));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  //const { data: topicInfo } = useGetExTopicInfo();
  /******************************* 예시 코드 *********************************/

  if (!topicInfo) {
    return <div>Loading...</div>;
  }

  return (
    <TopicLearningTemplate
      topicTitle={String(topic)}
      topicInfo={topicInfo}
      backLink={`/learning/${chapter}`}
    />
  );
}

export default LearningTopicPage;
