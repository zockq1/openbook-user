import { useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { QuestionModel } from "../../../../types/questionTypes";
import Icon from "../../../atoms/icon/Icon";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    width: calc(100vw - 20px);
  }

  @media (min-width: 768px) {
    grid-column: 1/3;
    margin: 5px;
  }
`;

const ResultContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  margin: ${({ theme }) => theme.margin.base};
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 10px;
  padding: 5px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

const ExamNavigation = styled.ul`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: ${({ theme }) => theme.margin.base};
  margin-top: 0;
  margin-bottom: 0;
  padding: 5px 15px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  @media (min-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ExamNavigationItemProps {
  isCurrent: boolean;
  isCorrect: boolean;
  isFinish: boolean;
}
const popAnimation = keyframes`
  0% {
    transform: scale(0.7);
  }
  33% {
    transform: scale(0.9);
  }
  66% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const ExamNavigationItem = styled.li<ExamNavigationItemProps>`
  position: relative;
  flex-shrink: 0;
  min-width: 41px;
  padding: 5px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  background-color: ${({ theme, isCurrent }) =>
    isCurrent && theme.colors.lightGrey};
  color: ${({ theme, isFinish, isCorrect }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.textBlue};

  text-align: center;
  list-style-type: none;
  animation: ${({ isCurrent }) =>
    isCurrent
      ? css`
          ${popAnimation} 400ms linear
        `
      : ""};
  cursor: pointer;
`;

interface CheckProps {
  isCorrect: boolean;
  isFinish: boolean;
}

const Check = styled.div<CheckProps>`
  --color: ${({ theme, isCorrect, isFinish }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.black};
  position: absolute;
  transform: rotate(45deg);
  height: 12px;
  width: 6px;
  border-bottom: 2px solid var(--color);
  border-right: 2px solid var(--color);
  top: -10%;
  left: 70%;
`;

const Lock = styled.div`
  position: absolute;
  top: -5%;
  left: 65%;
`;

interface QuestionNuvagationProps {
  onClickMove: (index: number) => void;
  currentNumber: number;
  questionList: QuestionModel[];
  isFinish: boolean;
  isWrongNote?: boolean;
}

function QuestionNavigationUI({
  onClickMove,
  currentNumber,
  questionList,
  isFinish,
  isWrongNote = false,
}: QuestionNuvagationProps) {
  const examNavigationRef = useRef<HTMLUListElement | null>(null);

  const calculateScrollPosition = (currentExamNumber: number) => {
    if (examNavigationRef.current) {
      const examItem = examNavigationRef.current.children[currentExamNumber];
      if (examItem) {
        const itemRect = examItem.getBoundingClientRect();
        const containerRect = examNavigationRef.current.getBoundingClientRect();
        const scrollPosition =
          containerRect.left -
          containerRect.width / 2 +
          itemRect.width / 2 +
          5 +
          currentExamNumber * 40;
        return scrollPosition;
      }
    }
    return examNavigationRef.current?.scrollLeft || 0; // 스크롤 위치 계산 실패 시 0으로 설정
  };

  useEffect(() => {
    if (examNavigationRef.current) {
      const scrollPosition = calculateScrollPosition(currentNumber);
      examNavigationRef.current.scrollLeft = scrollPosition;
    }
  }, [currentNumber]);

  return (
    <Container>
      <ExamNavigation ref={examNavigationRef}>
        {questionList.map((item, index) => {
          return (
            <ExamNavigationItem
              key={index}
              isCurrent={index === currentNumber}
              onClick={() => onClickMove(index)}
              isCorrect={item.isCorrect}
              isFinish={item.isFinish}
            >
              {item.number}
              {item.isChecked && (
                <Check isCorrect={item.isCorrect} isFinish={item.isFinish} />
              )}
              {!item.isOpen && (
                <Lock>
                  <Icon icon="lock" size={8} />
                </Lock>
              )}
            </ExamNavigationItem>
          );
        })}
      </ExamNavigation>
      {!isWrongNote && (
        <ResultContainer>
          <ExamNavigationItem
            isCurrent={currentNumber === questionList.length}
            onClick={() => {
              isFinish && onClickMove(questionList.length);
            }}
            isFinish={false}
            isCorrect
          >
            결과
          </ExamNavigationItem>
        </ResultContainer>
      )}
    </Container>
  );
}

export default QuestionNavigationUI;
