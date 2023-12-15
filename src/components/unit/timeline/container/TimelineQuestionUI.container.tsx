import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { TimeLineItemModel } from "../../../../types/timelinetypes";
import TimelineItem from "../presenter/TimelineItem.presenter";

interface TimelineQuestionProps {
  dateList: TimeLineItemModel[];
  nextDateList: TimeLineItemModel[];
  playedDateList: TimeLineItemModel[];
  onDragEnd: (result: DropResult) => Promise<void>;
  isFinish: boolean;
  lineHeight: number;
}

interface LineProps {
  height: number;
}

const Container = styled.div`
  height: 90%;
`;

const Line = styled.div<LineProps>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.textBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 6px;
  height: ${({ height }) => `${height}px`};
  left: 87px;
  z-index: 0;
  transition: 0.5s ease;
`;

const StyledTimelineQuestion = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  flex-direction: column;
  width: 100%;
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

const PlayedItemPlaceBox = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 190px);

  @media (min-width: 768px) {
    height: calc(100vh - 390px);
  }
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;

  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
`;

const Box = styled.div`
  position: absolute;
  bottom: 32px;
  left: 15px;
  @media (min-width: 768px) {
    width: 400px;
    left: 50%;
    bottom: 192px;
    transform: translate(-50%, 0);
  }
  height: 60px;
  width: calc(100% - 30px);
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  z-index: 0;
`;

function TimelineQuestionUI({
  dateList,
  nextDateList,
  playedDateList,
  onDragEnd,
  isFinish,
  lineHeight,
}: TimelineQuestionProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <StyledTimelineQuestion>
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
                              <TimelineItem
                                dateItem={item}
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
            <Box />
            {!isFinish && (
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
                                  dateItem={{
                                    date: null,
                                    comment: nextDateList[0].comment.replace(
                                      /\([^)]*\)/g,
                                      ""
                                    ),
                                    keywordList: [],
                                  }}
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
            )}
          </DragDropContext>
        )}
      </StyledTimelineQuestion>
    </Container>
  );
}

export default TimelineQuestionUI;
