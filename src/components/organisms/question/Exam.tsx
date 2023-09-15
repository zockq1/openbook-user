import { useEffect, useRef, useState } from "react";
import { RowList } from "../../atoms/layout/List";
import { LongChoiceItem } from "../../molecules/list-item/LongChoiceItem";
import Button from "../../atoms/button/Button";
import { ChoiceModel, QuestionModel } from "../../../types/questionTypes";
import { ShortChoiceItem } from "../../molecules/list-item/ShortChoiceItem";
import styled, { css, keyframes } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import QuestionCounter from "../../molecules/etc/QuestionCounter";

interface QuestionProps {
  questionList: QuestionModel[];
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

const QuestionNavigation = styled.ul`
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

interface QuestionNavigationItemProps {
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

const QuestionNavigationItem = styled.li<QuestionNavigationItemProps>`
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

interface QuestionData {
  checkedChoice: string;
  state: "no" | "correctAnswer" | "wrongAnswer";
  isChecked: boolean;
}

function Exam({
  questionList,
  handleNextContent,
  category,
  timeLimit,
}: QuestionProps) {
  const [isComplete, setIsComplete] = useState<boolean>(false); //no, correctAnswer, wrongAnswer
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestionList, setCurrentQuestionList] = useState<
    QuestionModel[]
  >([...questionList]);
  const [dataList, setDataList] = useState<QuestionData[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  const questionNavigationRef = useRef<HTMLUListElement | null>(null);

  // 현재 선택된 QuestionNavigationItem의 위치를 계산
  const calculateScrollPosition = (currentQuestionNumber: number) => {
    if (questionNavigationRef.current) {
      const questionItem =
        questionNavigationRef.current.children[currentQuestionNumber];
      if (questionItem) {
        const itemRect = questionItem.getBoundingClientRect();
        const containerRect =
          questionNavigationRef.current.getBoundingClientRect();
        const scrollPosition =
          containerRect.left -
          containerRect.width / 2 +
          itemRect.width / 2 +
          5 +
          currentQuestionNumber * 40;
        return scrollPosition;
      }
    }
    return 0; // 스크롤 위치 계산 실패 시 0으로 설정
  };

  useEffect(() => {
    if (questionNavigationRef.current) {
      const scrollPosition = calculateScrollPosition(currentQuestionNumber);
      questionNavigationRef.current.scrollLeft = scrollPosition;
    }
  }, [currentQuestionNumber]);

  useEffect(() => {
    let shuffledQuestionList = [...currentQuestionList]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
        const shuffledQuestion: QuestionModel = {
          ...item,
          choiceList: [...item.choiceList].sort(() => Math.random() - 0.5),
        };
        return shuffledQuestion;
      });
    setCurrentQuestionList(shuffledQuestionList);
    setDataList(
      shuffledQuestionList.map((item) => {
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
      newDataList[currentQuestionNumber] = {
        ...newDataList[currentQuestionNumber],
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeout]);

  const handleCheckAnswer = () => {
    let newScore = 0;
    setIsComplete(true);
    setCurrentQuestionNumber(dataList.length);
    setDataList(
      dataList.map((item, index) => {
        if (
          item.checkedChoice.substring(1) === currentQuestionList[index].answer
        ) {
          newScore += currentQuestionList[index].score || 0;
        }
        return {
          ...item,
          state:
            item.checkedChoice.substring(1) ===
            currentQuestionList[index].answer
              ? "correctAnswer"
              : "wrongAnswer",
        };
      })
    );
    setScore(newScore);
  };
  const handleNextQuestion = () => {
    setSelectedCheckbox(dataList[currentQuestionNumber + 1].checkedChoice);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const handleClickNavigation = (index: number) => {
    setCurrentQuestionNumber(index);
    setSelectedCheckbox(dataList[index].checkedChoice);
  };

  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem =
      currentQuestionList[currentQuestionNumber].choiceType === "String"
        ? LongChoiceItem
        : ShortChoiceItem;

    return (
      <ChoiceItem
        handleCheckboxChange={handleCheckboxChange}
        handleChoiceClick={handleChoiceClick}
        current={String(index) + item.key}
        answer={currentQuestionList[currentQuestionNumber].answer}
        choice={item.choice}
        isSolved={isComplete ? dataList[currentQuestionNumber].state : "no"}
        selectedCheckbox={selectedCheckbox}
        key={index}
      />
    );
  };

  return (
    <>
      <QuestionNavigation ref={questionNavigationRef}>
        {dataList.map((item, index) => {
          return (
            <QuestionNavigationItem
              key={index}
              isCurrent={index === currentQuestionNumber}
              onClick={() => handleClickNavigation(index)}
              state={item.state}
            >
              {index + 1}
              {item.isChecked && <Check state={item.state} />}
            </QuestionNavigationItem>
          );
        })}
        <QuestionNavigationItem
          isCurrent={currentQuestionNumber === dataList.length}
          onClick={() => {
            isComplete && setCurrentQuestionNumber(dataList.length);
          }}
          state="no"
        >
          결과
        </QuestionNavigationItem>
      </QuestionNavigation>
      <QuestionCounter
        timeLimit={timeLimit}
        totalQuestionCount={questionList.length}
        currentQuestionCount={currentQuestionNumber + 1}
        category={category}
        setisTimeout={setIsTimeout}
      />
      {currentQuestionNumber < currentQuestionList.length &&
        currentQuestionList[currentQuestionNumber].description && (
          <Description>
            <img
              style={{ width: "100%", height: "auto" }}
              src={currentQuestionList[currentQuestionNumber].description}
              alt=""
            />
          </Description>
        )}
      <RowList>
        {currentQuestionNumber < currentQuestionList.length &&
          currentQuestionList[currentQuestionNumber] &&
          currentQuestionList[currentQuestionNumber].choiceList.map(
            renderChoiceItem
          )}
      </RowList>
      {currentQuestionList.length === currentQuestionNumber + 1
        ? currentQuestionNumber < currentQuestionList.length && (
            <Button onClick={handleCheckAnswer}>완료</Button>
          )
        : currentQuestionNumber < currentQuestionList.length && (
            <Button onClick={handleNextQuestion}>다음 문제</Button>
          )}
      {currentQuestionNumber === currentQuestionList.length && (
        <AnswerBox>점수: {score}</AnswerBox>
      )}
    </>
  );
}

export { Exam };
