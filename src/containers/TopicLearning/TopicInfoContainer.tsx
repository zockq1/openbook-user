import React from "react";
import { useParams } from "react-router-dom";
import { useGetTopicQuery } from "../../store/api/topicApi";
import TopicInfo from "../../components/TopicLearning/TopicInfo";

function TopicInfoContainer() {
  const { topicTitle } = useParams<{ topicTitle: string }>();
  const { data: topic } = useGetTopicQuery(topicTitle ? topicTitle : "");

  return <TopicInfo topicTitle={topicTitle ? topicTitle : ""} topic={topic} />;
}

export default TopicInfoContainer;
