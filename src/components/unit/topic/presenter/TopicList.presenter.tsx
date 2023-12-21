import { TopicMenuModel } from "../../../../types/topicTypes";
import { ColumnList } from "../../../atoms/layout/List";
import Topic from "./Topic.presenter";

interface TopicListProps {
  topicList: TopicMenuModel[];
}

function TopicList({ topicList }: TopicListProps) {
  return (
    <ColumnList>
      {topicList.map((topic, index) => {
        return <Topic topic={topic} key={index} />;
      })}
    </ColumnList>
  );
}

export default TopicList;
