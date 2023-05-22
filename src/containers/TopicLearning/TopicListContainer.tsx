import React from "react";
import { useParams } from "react-router-dom";
import { useGetChapterTopicListQuery } from "../../store/api/topicApi";
import TopicList from "../../components/TopicLearning/TopicList";

function TopicListContainer() {
  const { chapter } = useParams();
  const { data: topicList } = useGetChapterTopicListQuery(Number(chapter));

  return <TopicList topicList={topicList?.topicList} />;
}

export default TopicListContainer;
