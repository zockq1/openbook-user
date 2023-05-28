import React from "react";
import ChapterItem from "./ChapterItem";
import List from "../Common/List";

interface TopicLearningComponentProps {
  chapterList: { titleList: string[]; numberList: number[] } | undefined;
}

function ChapterList({ chapterList }: TopicLearningComponentProps) {
  return (
    <List>
      {chapterList?.titleList.map((item, index) => {
        return (
          <ChapterItem
            key={index}
            chapterTitle={item}
            chapterNumber={chapterList?.numberList[index]}
          />
        );
      })}
    </List>
  );
}

export default ChapterList;
