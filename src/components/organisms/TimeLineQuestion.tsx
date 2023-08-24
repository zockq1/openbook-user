import TimelineItem from "../molecules/TimelineItem";
import { TimeLineModel } from "../../types/questionTypes";
import styled from "styled-components";
import TextBox from "../atoms/TextBox";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

interface TimelineQuestionProps {
  dateList: TimeLineModel[];
}

const Line = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 16px;
  height: 100%;
  left: 90px;
  z-index: 0;
  transition: height 5s ease-in-out;
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
  height: 38px;
  background-color: transparent;
`;

const NextItem = styled.div`
  display: inline-block;
  width: 100%;
  height: 38px;
  margin-left: 125px;
  background-color: transparent;
`;

const NextItemPlace = styled.div`
  position: fixed;
  top: 100px;
  right: 10px;
`;

function TimelineQuestion({ dateList }: TimelineQuestionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [nextDateList, setNextDateList] = useState<TimeLineModel[]>(
    [...dateList].sort(() => Math.random() - 0.5)
  );
  const [placedDateList, setPlacedDateList] = useState<TimeLineModel[]>([]);

  useEffect(() => {
    setIsMounted(true);
    setPlacedDateList([nextDateList[0]]);
    setNextDateList((prevList) => prevList.slice(1));
  }, []);

  const handleChange = async (result: DropResult) => {
    const { destination } = result;
    if (!destination || destination.droppableId !== "played") return;

    if (
      destination.index === 0 &&
      nextDateList[0].date <= placedDateList[0].date
    ) {
      setPlacedDateList([nextDateList[0], ...placedDateList]);
      setNextDateList((prevList) => prevList.slice(1));
      return;
    } else if (
      destination.index === 0 &&
      nextDateList[0].date > placedDateList[0].date
    ) {
      return;
    }

    if (
      destination.index === placedDateList.length &&
      nextDateList[0].date >= placedDateList[placedDateList.length - 1].date
    ) {
      setPlacedDateList([...placedDateList, nextDateList[0]]);
      setNextDateList((prevList) => prevList.slice(1));
      return;
    } else if (
      destination.index === placedDateList.length &&
      nextDateList[0].date < placedDateList[placedDateList.length - 1].date
    ) {
      return;
    }
    if (
      nextDateList[0].date >= placedDateList[destination.index - 1].date &&
      nextDateList[0].date <= placedDateList[destination.index].date
    ) {
      const updatedList = [...placedDateList];
      updatedList.splice(destination.index, 0, nextDateList[0]);
      setPlacedDateList(updatedList);
      setNextDateList((prevList) => prevList.slice(1));
      return;
    }
  };

  return (
    <StyledTimelineQuestion>
      <Line />
      {isMounted && (
        <DragDropContext onDragEnd={handleChange}>
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
          <Droppable droppableId="played">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {placedDateList.map((item, i: number) => (
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
