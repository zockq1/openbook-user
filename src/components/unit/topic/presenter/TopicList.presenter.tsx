import { TopicMenuModel } from "../../../../types/topicTypes";
import { ColumnList } from "../../../atoms/layout/List";
import { Default } from "../../../atoms/layout/Responsive";
import Topic from "./Topic.presenter";

interface TopicListProps {
  topicList: TopicMenuModel[];
}

function TopicList({ topicList }: TopicListProps) {
  return (
    <div>
      <ColumnList>
        {topicList.map((topic, index) => {
          return <Topic topic={topic} key={index} />;
        })}
      </ColumnList>
      <Default>
        <div style={{ marginBottom: "calc(100vh - 165px)" }}></div>
      </Default>
    </div>
  );
}

export default TopicList;
