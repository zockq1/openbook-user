import React from "react";
import ChapterItem from "./ChapterItem";
import List from "../Common/List";
import { ChapterListModel } from "../../types/chapterTypes";

interface TopicLearningComponentProps {
  chapterList: ChapterListModel[] | undefined;
}

function ChapterList({ chapterList }: TopicLearningComponentProps) {
  console.log(chapterList);
  return (
    <List>
      {chapterList?.map((item, index) => {
        return (
          <ChapterItem
            key={index}
            chapterTitle={item.title}
            chapterNumber={item.number}
          />
        );
      })}
    </List>
  );
}

export default ChapterList;
