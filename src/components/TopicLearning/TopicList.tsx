import React from "react";
import TopicItem from "./TopicItem";
import SmallList from "../Common/SmallList";
import Separator from "../Common/Separator";
import SmallListItem from "../Common/SmallListItem";

interface TopicListProps {
  topicList: string[] | undefined;
}

function TopicList({ topicList }: TopicListProps) {
  return (
    <SmallList>
      {topicList?.map((item, index) => (
        <SmallListItem key={index}>
          <TopicItem topicTitle={item} />
          {index < topicList.length - 1 && <Separator />}
        </SmallListItem>
      ))}
    </SmallList>
  );
}

export default TopicList;
