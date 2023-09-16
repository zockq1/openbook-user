import TimelineItem from "../../molecules/list-item/TimelineItem";
import { TimeLineModel } from "../../../types/questionTypes";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useAddChapterWrongCounterMutation } from "../../../store/api/questionApi";

interface TimelineQuestionProps {
  dateList: TimeLineModel[];
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
  chapter: number;
}

interface LineProps {
  height: number;
}

const Line = styled.div<LineProps>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 16px;
  height: ${({ height }) => `${height}px`};
  left: 90px;
  z-index: 0;
  transition: 0.5s ease;
`;

const StyledTimelineQuestion = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  height: 100%;
`;

const Item = styled.div`
  display: inline-block;
  width: 100%;
  height: 68px;
  background-color: transparent;
`;

const NextItemPlace = styled.div`
  display: flex;
  justify-content: center;
`;

const NextItemPlaceBox = styled.div`
  position: absolute;
  overflow: hidden;
  bottom: 18px;
  left: 15px;
  height: 80px;
  width: calc(100vw - 30px);
  z-index: 0;
`;

const PlayedItemPlaceBox = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 230px);
  width: 100%;
  padding-bottom: 30px;
  margin-bottom: 30px;
`;

const Box = styled.div`
  position: absolute;
  bottom: 20px;
  left: 15px;
  height: 60px;
  width: calc(100vw - 30px);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.padding.base};
  border: ${({ theme }) => theme.border.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  z-index: 0;
`;

function TimelineQuestion({
  dateList,
  setIsComplete,
  isComplete,
  chapter,
}: TimelineQuestionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [nextDateList, setNextDateList] = useState<TimeLineModel[]>(
    [...dateList].sort(() => Math.random() - 0.5)
  );
  const [playedDateList, setPlayedDateList] = useState<TimeLineModel[]>([]);
  const [lineHeight, setLineHeight] = useState<number>(166); //68씩 증가
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [addChapterWrongCounter] = useAddChapterWrongCounterMutation();

  useEffect(() => {
    setIsMounted(true);
    setPlayedDateList([nextDateList[0]]);
    setNextDateList((prevList) => prevList.slice(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nextDateList.length === 0) {
      addChapterWrongCounter({
        number: Number(chapter),
        count: wrongCount,
      });
      setIsComplete(true);
    }
  }, [
    nextDateList,
    setIsComplete,
    wrongCount,
    addChapterWrongCounter,
    chapter,
  ]);

  const handleChange = async (result: DropResult) => {
    const { destination } = result;
    if (!destination || destination.droppableId !== "played") return;

    if (
      //맨 앞에 넣었는데 맞았을때
      destination.index === 0 &&
      nextDateList[0].date <= playedDateList[0].date
    ) {
      setPlayedDateList([nextDateList[0], ...playedDateList]);
      setNextDateList(nextDateList.slice(1));
      nextDateList.length > 1 && setLineHeight((prev) => prev + 68);
    } else if (
      //맨 앞에 넣었는데 틀렸을때
      destination.index === 0 &&
      nextDateList[0].date > playedDateList[0].date
    ) {
      setWrongCount(wrongCount + 1);
    } else if (
      //맨 밑에 넣었는데 맞았을 때
      destination.index === playedDateList.length &&
      nextDateList[0].date >= playedDateList[playedDateList.length - 1].date
    ) {
      setPlayedDateList([...playedDateList, nextDateList[0]]);
      setNextDateList(nextDateList.slice(1));
      nextDateList.length > 1 && setLineHeight((prev) => prev + 68);
    } else if (
      //맨 밑에 넣었는데 틀렸을 때
      destination.index === playedDateList.length &&
      nextDateList[0].date < playedDateList[playedDateList.length - 1].date
    ) {
      setWrongCount(wrongCount + 1);
    } else if (
      //중간에 넣었는데 맞았을 때
      nextDateList[0].date >= playedDateList[destination.index - 1].date &&
      nextDateList[0].date <= playedDateList[destination.index].date
    ) {
      const updatedList = [...playedDateList];
      updatedList.splice(destination.index, 0, nextDateList[0]);
      setPlayedDateList(updatedList);
      setNextDateList(nextDateList.slice(1));
      nextDateList.length > 1 && setLineHeight((prev) => prev + 68);
    } else {
      //그 외
      setWrongCount(wrongCount + 1);
    }
  };

  return (
    <StyledTimelineQuestion>
      {!isComplete && <Box />}
      {dateList.length !== 0 && isMounted && (
        <DragDropContext onDragEnd={handleChange}>
          <Droppable droppableId="played">
            {(provided) => (
              <PlayedItemPlaceBox
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Line height={lineHeight} />
                {playedDateList.map((item, i: number) => (
                  <Draggable
                    draggableId={`${item.comment}`}
                    index={i}
                    key={`${item.comment}`}
                    isDragDisabled={true}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Item>
                            <TimelineItem
                              date={item.date}
                              comment={item.comment}
                              key={i}
                              isQuestion={true}
                            />
                          </Item>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </PlayedItemPlaceBox>
            )}
          </Droppable>
          {!isComplete && (
            <NextItemPlaceBox>
              <Droppable droppableId="next">
                {(provided) => (
                  <NextItemPlace
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Draggable draggableId={`ex`} index={0} key={`ex`}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {nextDateList[0] && (
                              <Item>
                                <TimelineItem
                                  date={null}
                                  comment={nextDateList[0].comment}
                                  key={0}
                                  disableCircle={true}
                                  isQuestion={true}
                                />
                              </Item>
                            )}
                          </div>
                        );
                      }}
                    </Draggable>

                    {provided.placeholder}
                  </NextItemPlace>
                )}
              </Droppable>
            </NextItemPlaceBox>
          )}
        </DragDropContext>
      )}
    </StyledTimelineQuestion>
  );
}

export default TimelineQuestion;
