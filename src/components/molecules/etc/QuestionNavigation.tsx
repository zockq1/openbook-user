import { useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { ExamListModel } from "../../../types/questionTypes";

const ExamNavigation = styled.ul`
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 0 15px;
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
  min-width: 40px;
  padding: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  background-color: ${({ theme, isCurrent }) =>
    isCurrent && theme.colors.lightGrey};
  color: ${({ theme, isFinish, isCorrect }) =>
    isFinish
      ? isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.black};

  text-align: center;
  animation: ${({ isCurrent }) =>
    isCurrent
      ? css`
          ${popAnimation} 400ms linear
        `
      : ""};
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

interface QuestionNuvagationProps {
  handleClickNavigation: (index: number) => void;
  currentNumber: number;
  dataList: ExamListModel[];
  isFinish: boolean;
}

function QuestionNuvagation({
  handleClickNavigation,
  currentNumber,
  dataList,
  isFinish,
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
    return 0; // 스크롤 위치 계산 실패 시 0으로 설정
  };

  useEffect(() => {
    if (examNavigationRef.current) {
      const scrollPosition = calculateScrollPosition(currentNumber);
      examNavigationRef.current.scrollLeft = scrollPosition;
    }
  }, [currentNumber]);

  return (
    <ExamNavigation ref={examNavigationRef}>
      {dataList.map((item, index) => {
        return (
          <ExamNavigationItem
            key={index}
            isCurrent={index === currentNumber}
            onClick={() => handleClickNavigation(index)}
            isCorrect={item.isCorrect}
            isFinish={isFinish}
          >
            {index + 1}
            {item.isChecked && (
              <Check isCorrect={item.isCorrect} isFinish={isFinish} />
            )}
          </ExamNavigationItem>
        );
      })}
      <ExamNavigationItem
        isCurrent={currentNumber === dataList.length}
        onClick={() => {
          isFinish && handleClickNavigation(dataList.length);
        }}
        isFinish={false}
        isCorrect
      >
        결과
      </ExamNavigationItem>
    </ExamNavigation>
  );
}

export default QuestionNuvagation;
