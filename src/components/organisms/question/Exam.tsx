import { useEffect, useRef, useState } from "react";
import { RowList } from "../../atoms/layout/List";
import { LongChoiceItem } from "../../molecules/list-item/LongChoiceItem";
import Button from "../../atoms/button/Button";
import { ShortChoiceItem } from "../../molecules/list-item/ShortChoiceItem";
import styled, { css, keyframes } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ChoiceModel, ExamModel } from "../../../types/questionTypes";
import QuestionCounter from "../../molecules/etc/QuestionCounter";

interface ExamProps {
  examList: ExamModel[];
  handleNextContent: () => void;
  category: string;
  timeLimit: number;
}

const Description = styled.ul`
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  border-radius: 10px;
  border: ${({ theme }) => theme.border.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

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
  state: "no" | "correctAnswer" | "wrongAnswer";
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
  color: ${({ theme, state }) =>
    state === "no"
      ? theme.colors.black
      : state === "correctAnswer"
      ? theme.colors.blue
      : theme.colors.red};

  text-align: center;
  animation: ${({ isCurrent }) =>
    isCurrent
      ? css`
          ${popAnimation} 400ms linear
        `
      : ""};
`;

interface CheckProps {
  state: "no" | "correctAnswer" | "wrongAnswer";
}

const Check = styled.div<CheckProps>`
  --color: ${({ theme, state }) =>
    state === "no"
      ? theme.colors.black
      : state === "correctAnswer"
      ? theme.colors.blue
      : theme.colors.red};
  position: absolute;
  transform: rotate(45deg);
  height: 12px;
  width: 6px;
  border-bottom: 2px solid var(--color);
  border-right: 2px solid var(--color);
  top: -10%;
  left: 70%;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

interface ExamData {
  checkedChoice: string;
  state: "no" | "correctAnswer" | "wrongAnswer";
  isChecked: boolean;
}

function Exam({ examList, handleNextContent, category, timeLimit }: ExamProps) {
  const [isComplete, setIsComplete] = useState<boolean>(false); //no, correctAnswer, wrongAnswer
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [currentExamNumber, setCurrentExamNumber] = useState(0);
  const [currentExamList, setCurrentExamList] = useState<ExamModel[]>([
    ...examList,
  ]);
  const [dataList, setDataList] = useState<ExamData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  const examNavigationRef = useRef<HTMLUListElement | null>(null);

  // 현재 선택된 ExamNavigationItem의 위치를 계산
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
      const scrollPosition = calculateScrollPosition(currentExamNumber);
      examNavigationRef.current.scrollLeft = scrollPosition;
    }
  }, [currentExamNumber]);

  useEffect(() => {
    let shuffledExamList = [...currentExamList]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
        const shuffledExam: ExamModel = {
          ...item,
          choiceList: [...item.choiceList].sort(() => Math.random() - 0.5),
        };
        return shuffledExam;
      });
    setCurrentExamList(shuffledExamList);
    setDataList(
      shuffledExamList.map((item) => {
        return {
          checkedChoice: "",
          state: "no",
          isChecked: false,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
    setSelectedCheckbox(checkboxId);
  };

  const handleChoiceClick = (checkboxId: string) => {
    if (!isComplete) {
      let newDataList = [...dataList];
      newDataList[currentExamNumber] = {
        ...newDataList[currentExamNumber],
        checkedChoice: checkboxId,
        isChecked: true,
      };
      setDataList(newDataList);
      setSelectedCheckbox((prevSelected) =>
        prevSelected === checkboxId ? prevSelected : checkboxId
      );
    }
  };

  useEffect(() => {
    if (isTimeout) {
      handleCheckAnswer();
      setCurrentExamNumber(dataList.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeout]);

  const handleCheckAnswer = () => {
    let newScore = 0;
    setIsComplete(true);
    setCurrentExamNumber(dataList.length);
    setDataList(
      dataList.map((item, index) => {
        if (item.checkedChoice.substring(1) === currentExamList[index].answer) {
          newScore += currentExamList[index].score || 0;
        }
        return {
          ...item,
          state:
            item.checkedChoice.substring(1) === currentExamList[index].answer
              ? "correctAnswer"
              : "wrongAnswer",
        };
      })
    );
    setScore(newScore);
  };
  const handleNextExam = () => {
    setSelectedCheckbox(dataList[currentExamNumber + 1].checkedChoice);
    setCurrentExamNumber(currentExamNumber + 1);
  };

  const handleClickNavigation = (index: number) => {
    setCurrentExamNumber(index);
    setSelectedCheckbox(dataList[index].checkedChoice);
  };

  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem =
      currentExamList[currentExamNumber].choiceType === "String"
        ? LongChoiceItem
        : ShortChoiceItem;

    return (
      <ChoiceItem
        handleCheckboxChange={handleCheckboxChange}
        handleChoiceClick={handleChoiceClick}
        current={String(index) + item.key}
        answer={currentExamList[currentExamNumber].answer}
        choice={item.choice}
        isSolved={isComplete ? dataList[currentExamNumber].state : "no"}
        selectedCheckbox={selectedCheckbox}
        key={index}
      />
    );
  };

  return (
    <>
      <ExamNavigation ref={examNavigationRef}>
        {dataList.map((item, index) => {
          return (
            <ExamNavigationItem
              key={index}
              isCurrent={index === currentExamNumber}
              onClick={() => handleClickNavigation(index)}
              state={item.state}
            >
              {index + 1}
              {item.isChecked && <Check state={item.state} />}
            </ExamNavigationItem>
          );
        })}
        <ExamNavigationItem
          isCurrent={currentExamNumber === dataList.length}
          onClick={() => {
            isComplete && setCurrentExamNumber(dataList.length);
          }}
          state="no"
        >
          결과
        </ExamNavigationItem>
      </ExamNavigation>
      <QuestionCounter
        timeLimit={timeLimit}
        totalQuestionCount={examList.length}
        currentQuestionCount={currentExamNumber + 1}
        category={category}
        setisTimeout={setIsTimeout}
      />
      {currentExamNumber < currentExamList.length &&
        currentExamList[currentExamNumber].description && (
          <Description>
            <img
              style={{ width: "100%", height: "auto" }}
              src={currentExamList[currentExamNumber].description}
              alt=""
            />
          </Description>
        )}
      <RowList>
        {currentExamNumber < currentExamList.length &&
          currentExamList[currentExamNumber] &&
          currentExamList[currentExamNumber].choiceList.map(renderChoiceItem)}
      </RowList>
      {currentExamList.length === currentExamNumber + 1
        ? currentExamNumber < currentExamList.length && (
            <Button onClick={handleCheckAnswer}>완료</Button>
          )
        : currentExamNumber < currentExamList.length && (
            <Button onClick={handleNextExam}>다음 문제</Button>
          )}
      {currentExamNumber === currentExamList.length && (
        <AnswerBox>점수: {score}</AnswerBox>
      )}
    </>
  );
}

export { Exam };
