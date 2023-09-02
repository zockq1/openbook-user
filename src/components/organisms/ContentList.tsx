import { useNavigate, useParams } from "react-router-dom";
import { ContentModel, ContentState } from "../../types/chapterTypes";
import { ColumnList } from "../atoms/List";
import ListItem from "../molecules/ListItem";

interface ChpaterListProps {
  contentList: ContentModel[];
}

function ConetntList({ contentList }: ChpaterListProps) {
  const navigate = useNavigate();
  const { chapter } = useParams();

  const onClickContent = (
    state: ContentState,
    content: string,
    title: string
  ) => {
    if (state === "Locked") {
      return;
    }
    switch (content) {
      case "단원 학습":
        navigate(`/jeong-ju-haeng/${chapter}/chapter-learning`);
        break;
      case "연표 학습":
        navigate(`/jeong-ju-haeng/${chapter}/timeline-learning`);
        break;
      case "주제 학습":
        navigate(`/jeong-ju-haeng/${chapter}/topic-learning/${title}`);
        break;
      case "단원 마무리 학습":
        navigate(`/jeong-ju-haeng/${chapter}/final-learning`);
        break;
    }
  };

  return (
    <ColumnList>
      {contentList.map((item, index) => {
        return (
          <ListItem
            title={item.content}
            description={item.title}
            icon={item.content}
            onClickItem={() =>
              onClickContent(item.state, item.content, item.title)
            }
            state={item.state}
            key={index}
          />
        );
      })}
    </ColumnList>
  );
}

export default ConetntList;
