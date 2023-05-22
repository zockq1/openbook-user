import React from "react";
import { useGetChaptersQuery } from "../../store/api/chapterApi";
import ChapterList from "../../components/TopicLearning/ChapterList";

function ChapterListContainer() {
  const { data: chapterList } = useGetChaptersQuery();

  return <ChapterList chapterList={chapterList} />;
}

export default ChapterListContainer;
