import { ColumnList } from "../atoms/List";
import { ChapterModel, ContentState } from "../../types/chapterTypes";
import { useNavigate } from "react-router-dom";
import ListItem from "../molecules/ListItem";

interface ChpaterListProps {
  chapterList: ChapterModel[];
}

function ChpaterList({ chapterList }: ChpaterListProps) {
  const navigate = useNavigate();
  const onClickChapter = (state: ContentState, chapterNumber: number) => {
    if (state === "Locked") {
      return;
    }
    navigate(`/jeong-ju-haeng/${chapterNumber}`);
  };
  return (
    <ColumnList>
      {chapterList.map((item, index) => {
        return (
          <ListItem
            title={item.title}
            description={"진행도: " + item.progress}
            icon={item.number}
            onClickItem={() => onClickChapter(item.state, item.number)}
            state={item.state}
            key={index}
          />
        );
      })}
    </ColumnList>
  );
}

export default ChpaterList;
