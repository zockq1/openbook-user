import { useEffect, useReducer } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useUpdateTimelineWrongCounterMutation } from "../../../../store/api/timelineApi";
import { TimeLineItemModel } from "../../../../types/timelinetypes";
import TimelineQuestionUI from "../container/TimelineQuestionUI.container";
import ResultButtonUI from "../../question/container/ResultButtonUI.container";
import TimelineScore from "./TimelineScore.presenter";

interface TimelineQuestionProps {
  dateList: TimeLineItemModel[];
  onNextContent: () => void;
  id: number;
  onFinish?: () => void;
}

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
  onNextContent,
  id,
  onFinish,
}: TimelineQuestionProps) {
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
      if (wrongCount <= 2) {
        onFinish && onFinish();
      }
    }
  }, [isFinish, updateTimelineWrongCounter, wrongCount, id, onFinish]);

  const handleDragEnd = async (result: DropResult) => {
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
      {isFinish ? (
        <TimelineScore wrongCount={wrongCount} />
      ) : (
        <TimelineQuestionUI
          dateList={dateList}
          nextDateList={nextDateList}
          playedDateList={playedDateList}
          isFinish={isFinish}
          lineHeight={lineHeight}
          onDragEnd={handleDragEnd}
        />
      )}
      {isFinish && (
        <ResultButtonUI isSuccess={true} onNextContent={onNextContent} />
      )}
    </>
  );
}

export default TimelineQuestion;
