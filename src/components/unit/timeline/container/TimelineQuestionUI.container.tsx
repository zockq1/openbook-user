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
  position: relative;
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

const NextLine = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.textBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  width: 6px;
  height: 40px;
  left: 89px;
  top: calc(100vh - 158px);
  z-index: 0;

  @media (max-width: 767px) {
    top: calc(100vh - 133px);
  }
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
  position: absolute;
  top: calc(100vh - 185px);
  left: 12px;

  @media (max-width: 767px) {
    top: calc(100vh - 160px);
  }
`;

const PlayedItemPlaceBox = styled.div`
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 185px);

  @media (min-width: 768px) {
    height: calc(100vh - 200px);
  }
  width: 100%;
  padding: 10px;
  margin-top: 10px;

  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};

  &::-webkit-scrollbar {
    width: 20px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textBlue};
    border-radius: 100px;
    border: 7px solid ${({ theme }) => theme.colors.bg};
  }

  &::-webkit-scrollbar-track {
    background: transparent; /*스크롤바 뒷 배경 색상*/
  }
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
            <NextLine />
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
                                    date: "???",
                                    comment: nextDateList[0].comment,
                                    keywordList: [],
                                  }}
                                  key={0}
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
