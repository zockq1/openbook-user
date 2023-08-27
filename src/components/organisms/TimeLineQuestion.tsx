import TimelineItem from "../molecules/TimelineItem";
import { TimeLineModel } from "../../types/questionTypes";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

interface TimelineQuestionProps {
  dateList: TimeLineModel[];
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
}

const Line = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 16px;
  height: 104%;
  left: 90px;
  z-index: 0;
`;

const StyledTimelineQuestion = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  & > :last-child {
    margin-bottom: 30px;
  }
`;

const Item = styled.div`
  display: inline-block;
  width: 100%;
  height: 68px;
  background-color: transparent;
`;

const NextItemPlace = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: -18px;
  height: 60px;
`;

const NextItemPlaceBox = styled.div`
  position: fixed;
  bottom: 20px;
  left: 15px;
  width: calc(100vw - 30px);
  height: 60px;
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
}: TimelineQuestionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [nextDateList, setNextDateList] = useState<TimeLineModel[]>(
    [...dateList].sort(() => Math.random() - 0.5)
  );
  const [playedDateList, setPlayedDateList] = useState<TimeLineModel[]>([]);

  useEffect(() => {
    setIsMounted(true);
    setPlayedDateList([nextDateList[0]]);
    setNextDateList((prevList) => prevList.slice(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nextDateList.length === 0) {
      setIsComplete(true);
    }
  }, [nextDateList, setIsComplete]);

  const handleChange = async (result: DropResult) => {
    const { destination } = result;
    if (!destination || destination.droppableId !== "played") return;

    if (
      destination.index === 0 &&
      nextDateList[0].date <= playedDateList[0].date
    ) {
      setPlayedDateList([nextDateList[0], ...playedDateList]);
      setNextDateList(nextDateList.slice(1));
    } else if (
      destination.index === 0 &&
      nextDateList[0].date > playedDateList[0].date
    ) {
    } else if (
      destination.index === playedDateList.length &&
      nextDateList[0].date >= playedDateList[playedDateList.length - 1].date
    ) {
      setPlayedDateList([...playedDateList, nextDateList[0]]);
      setNextDateList(nextDateList.slice(1));
    } else if (
      destination.index === playedDateList.length &&
      nextDateList[0].date < playedDateList[playedDateList.length - 1].date
    ) {
    } else if (
      nextDateList[0].date >= playedDateList[destination.index - 1].date &&
      nextDateList[0].date <= playedDateList[destination.index].date
    ) {
      const updatedList = [...playedDateList];
      updatedList.splice(destination.index, 0, nextDateList[0]);
      setPlayedDateList(updatedList);
      setNextDateList(nextDateList.slice(1));
    }
    if (nextDateList.length === 0) {
      setIsComplete(true);
    }
  };

  return (
    <StyledTimelineQuestion>
      <Line />
      {isMounted && (
        <DragDropContext onDragEnd={handleChange}>
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
          <Droppable droppableId="played">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </StyledTimelineQuestion>
  );
}

export default TimelineQuestion;
