import styled from "styled-components";
import { useEffect, useReducer, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Button from "../../atoms/button/Button";
import { useUpdateTimelineWrongCounterMutation } from "../../../store/api/timelineApi";
import { TimeLineItemModel } from "../../../types/timelinetypes";
import TimelineItemUI from "../../unit/timeline/container/TimelineItemUI.container";

interface TimelineQuestionProps {
  dateList: TimeLineItemModel[];
  handleNextContent: () => void;
  id: number;
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
  width: 90%;
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
  width: calc(100% - 30px);
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

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  position: absolute;
  bottom: 20px;
  left: 15px;
  height: 60px;
  width: calc(100% - 30px);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.padding.base};
  border: ${({ theme }) => theme.border.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  z-index: 0;
`;

type State = {
  nextDateList: TimeLineItemModel[];
  playedDateList: TimeLineItemModel[];
  lineHeight: number;
  wrongCount: number;
  isFinish: boolean;
};

const MOVE_FIRST = "MOVE_FIRST";
const MOVE_MIDDLE = "MOVE_MIDDLE";
const MOVE_LAST = "MOVE_LAST";
const WRONG_MOVE = "WRONG_MOVE";
const FINISH = "FINISH";

type Action =
  | { type: "MOVE_FIRST" }
  | { type: "MOVE_MIDDLE"; destinationIndex: number }
  | { type: "MOVE_LAST" }
  | { type: "WRONG_MOVE" }
  | { type: "FINISH" };

const reducer = (state: State, action: Action): State => {
  const { playedDateList, nextDateList, lineHeight, wrongCount } = state;
  switch (action.type) {
    case MOVE_FIRST:
      return {
        ...state,
        playedDateList: [nextDateList[0], ...playedDateList],
        nextDateList: nextDateList.slice(1),
        lineHeight: nextDateList.length > 1 ? lineHeight + 68 : lineHeight,
        isFinish: nextDateList.length === 1,
      };
    case MOVE_LAST:
      return {
        ...state,
        playedDateList: [...playedDateList, nextDateList[0]],
        nextDateList: nextDateList.slice(1),
        lineHeight: nextDateList.length > 1 ? lineHeight + 68 : lineHeight,
        isFinish: nextDateList.length === 1,
      };
    case MOVE_MIDDLE:
      const updatedList = [...playedDateList];
      updatedList.splice(action.destinationIndex, 0, nextDateList[0]);
      return {
        ...state,
        playedDateList: updatedList,
        nextDateList: nextDateList.slice(1),
        lineHeight: nextDateList.length > 1 ? lineHeight + 68 : lineHeight,
        isFinish: nextDateList.length === 1,
      };
    case WRONG_MOVE:
      return { ...state, wrongCount: wrongCount + 1 };
    case FINISH:
      return { ...state, isFinish: true };
    default:
      return state;
  }
};

function TimelineQuestion({
  dateList,
  handleNextContent,
  id,
}: TimelineQuestionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [updateTimelineWrongCounter] = useUpdateTimelineWrongCounterMutation();
  const [state, dispatch] = useReducer(reducer, {
    playedDateList: [dateList[0]],
    nextDateList: dateList.slice(1),
    lineHeight: 166,
    wrongCount: 0,
    isFinish: dateList.length === 0,
  });
  const { playedDateList, nextDateList, lineHeight, wrongCount, isFinish } =
    state;
  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (nextDateList.length === 0) {
      dispatch({ type: FINISH });
    }
  }, [nextDateList]);

  useEffect(() => {
    if (isFinish) {
      updateTimelineWrongCounter({
        id: id,
        wrongCount: wrongCount,
        correctCount: 10,
      });
    }
  }, [isFinish, updateTimelineWrongCounter, wrongCount, id]);

  const onDragEnd = async (result: DropResult) => {
    const { destination } = result;
    if (!destination || destination.droppableId !== "played") return;
    const isFirst = destination.index === 0;
    const isLast = destination.index === playedDateList.length;
    const isMiddle = !isFirst && !isLast;

    if (isFirst) {
      const isCorrect = nextDateList[0].date <= playedDateList[0].date;
      if (isCorrect) {
        dispatch({ type: MOVE_FIRST });
        return;
      }
    }

    if (isLast) {
      const isCorrect =
        nextDateList[0].date >= playedDateList[playedDateList.length - 1].date;
      if (isCorrect) {
        dispatch({ type: MOVE_LAST });
        return;
      }
    }

    if (isMiddle) {
      const isCorrect =
        nextDateList[0].date >= playedDateList[destination.index - 1].date &&
        nextDateList[0].date <= playedDateList[destination.index].date;
      if (isCorrect) {
        dispatch({ type: MOVE_MIDDLE, destinationIndex: destination.index });
        return;
      }
    }

    dispatch({ type: WRONG_MOVE });
  };

  return (
    <>
      <StyledTimelineQuestion>
        {!isFinish && <Box />}
        {dateList.length !== 0 && isMounted && (
          <DragDropContext onDragEnd={onDragEnd}>
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
                              <TimelineItemUI
                                dateItem={item}
                                isKeywordOpen={false}
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
            {!isFinish && (
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
                                  <TimelineItemUI
                                    dateItem={{
                                      date: null,
                                      comment: nextDateList[0].comment.replace(
                                        /\([^)]*\)/g,
                                        ""
                                      ),
                                      keywordList: [],
                                      topicTitle: "",
                                    }}
                                    key={0}
                                    disableCircle={true}
                                    isQuestion={true}
                                    isKeywordOpen={false}
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
      {isFinish && <Button onClick={handleNextContent}>다음</Button>}
    </>
  );
}

export default TimelineQuestion;
