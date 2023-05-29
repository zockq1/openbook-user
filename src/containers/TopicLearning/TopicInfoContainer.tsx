import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTopicQuery } from "../../store/api/topicApi";
import TopicInfo from "../../components/TopicLearning/TopicInfo";
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
} from "../../store/api/noteApi";

function TopicInfoContainer() {
  const { topicTitle } = useParams<{ topicTitle: string }>();
  const { data: topic } = useGetTopicQuery(topicTitle ? topicTitle : "");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const handleBookmarkToggle = async () => {
    if (isBookmarked) {
      await addBookmark({
        customerId: "1",
        topicTitle: topicTitle ? topicTitle : "",
      });
    } else {
      await deleteBookmark({
        customerId: "1",
        topicTitle: topicTitle ? topicTitle : "",
      });
    }
    setIsBookmarked((prevState) => !prevState);
  };

  return (
    <TopicInfo
      topicTitle={topicTitle ? topicTitle : ""}
      topic={topic}
      isBookmarked={isBookmarked}
      onBookmarkToggle={handleBookmarkToggle}
    />
  );
}

export default TopicInfoContainer;
