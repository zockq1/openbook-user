import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { TimeLineItemModel } from "../../../../types/timelinetypes";
import TimelineItem from "../container/TimelineItem";
import Icon from "../../../atoms/icon/Icon";

interface TimelineQuestionProps {
  dateList: TimeLineItemModel[];
  nextDateList: TimeLineItemModel[];
  playedDateList: TimeLineItemModel[];
  onDragEnd: (result: DropResult) => Promise<void>;
  isFinish: boolean;
  lineHeight: number;
  wrongCount: number;
  isActiveGuide: boolean;
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
  top: calc(100vh - 196px);
  z-index: 0;

  @media (max-width: 767px) {
    top: calc(100vh - 210px);
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
  height: 95px;
  width: 100%;
  top: calc(100vh - 225px);
  padding: 0 10px;

  @media (max-width: 767px) {
    top: calc(100vh - 240px);
  }

  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.lightGrey};
`;

const PlayedItemPlaceBox = styled.div`
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  top: 50px;
  height: calc(100vh - 310px);

  @media (min-width: 768px) {
    height: calc(100vh - 300px);
  }
  width: 100%;
  padding: 10px;
  margin-top: 10px;

  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.lightGrey};

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

const ScoreBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 5px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.lightGrey};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};

  & > .play {
    color: ${({ theme }) => theme.colors.blue};
  }

  & > .wrong {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const bounceAnimation = keyframes`
  0% {
    top: 60px;
  }
  90%{
    top: calc(-100vh + 400px);
  }
  100% {
    top: 60px;
  }
`;

const DragIcon = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  animation: ${bounceAnimation} 2s 1s infinite;
  z-index: 100000;
`;

function TimelineQuestionUI({
  dateList,
  nextDateList,
  playedDateList,
  onDragEnd,
  isFinish,
  lineHeight,
  wrongCount,
  isActiveGuide,
}: TimelineQuestionProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ScoreBox>
        <span className="play">{`배치: ${playedDateList.length}/${dateList.length}`}</span>
        <span className="wrong">{`오답: ${wrongCount}`}</span>
      </ScoreBox>

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
                    {isActiveGuide && (
                      <DragIcon>
                        <Icon icon="drag" size={30} color="grey" />
                      </DragIcon>
                    )}
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
