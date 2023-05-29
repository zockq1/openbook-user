import React from "react";
import { useGetBookmarksQuery } from "../../store/api/noteApi";
import TopicList from "../../components/TopicLearning/TopicList";

function BookmarkContainer() {
  const { data: bookmarkList } = useGetBookmarksQuery("1");

  return <TopicList topicList={bookmarkList?.bookmarkList} />;
}

export default BookmarkContainer;
