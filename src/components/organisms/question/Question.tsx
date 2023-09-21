import { useEffect, useState } from "react";
import { RowList } from "../../atoms/layout/List";
import { LongChoiceItem } from "../../molecules/list-item/LongChoiceItem";
import Button from "../../atoms/button/Button";
import { ChoiceModel, QuestionModel } from "../../../types/questionTypes";
import { ShortChoiceItem } from "../../molecules/list-item/ShortChoiceItem";
import styled from "styled-components";
import TextBox from "../../atoms/box/TextBox";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import corrct from "../../../styles/images/correct.svg";
import incorrct from "../../../styles/images/incorrect.svg";
import QuestionCounter from "../../molecules/etc/QuestionCounter";
import { useAddTopicWrongCounterMutation } from "../../../store/api/questionApi";

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

function Question({
  questionList,
  handleNextContent,
  category,
  timeLimit,
}: QuestionProps) {
  const [addTopicWrongCounte] = useAddTopicWrongCounterMutation();
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  //const [isSolved, setIsSolved] = useState("no"); //no, correctAnswer, wrongAnswer
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestionList, setCurrentQuestionList] = useState<
    QuestionModel[]
  >([...questionList]);

  const correctAnswer = () =>
    toast(
      <img
        src={corrct}
        width="200px"
        style={{ margin: "auto", display: "block" }}
        alt="correct"
      />
    );

  const wrongAnswer = () =>
    toast(
      <img
        src={incorrct}
        width="200px"
        style={{ margin: "auto", display: "block" }}
        alt="correct"
      />
    );

  useEffect(() => {
    let shuffledQuestionList = [...currentQuestionList].sort(
      () => Math.random() - 0.5
    );
    setCurrentQuestionList(
      shuffledQuestionList.map((item) => {
        const shuffledQuestion: QuestionModel = {
          ...item,
          choiceList: [...item.choiceList].sort(() => Math.random() - 0.5),
        };
        return shuffledQuestion;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
    setSelectedCheckbox(checkboxId);
  };

  const handleChoiceClick = (checkboxId: string) => {
    setSelectedCheckbox((prevSelected) =>
      prevSelected === checkboxId ? prevSelected : checkboxId
    );
  };

  const handleCheckAnswer = () => {
    if (selectedCheckbox === "") {
    } else if (
      selectedCheckbox.substring(1) ===
      currentQuestionList[currentQuestionNumber].answer
    ) {
      setIsFinish(true);
      correctAnswer();
    } else {
      addTopicWrongCounte([
        {
          topicTitle: currentQuestionList[currentQuestionNumber].answer,
          count: 1,
        },
      ]);
      setIsFinish(true);
      wrongAnswer();
    }
  };
  const handleNextQuestion = () => {
    toast.dismiss();
    setSelectedCheckbox("");
    setIsFinish(false);
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem =
      currentQuestionList[currentQuestionNumber].questionType === "TtoS" ||
      currentQuestionList[currentQuestionNumber].questionType === "Mock"
        ? LongChoiceItem
        : ShortChoiceItem;

    return (
      <ChoiceItem
        handleCheckboxChange={handleCheckboxChange}
        handleChoiceClick={handleChoiceClick}
        choiceKey={String(index) + item.key}
        isCorrect={
          currentQuestionList[currentQuestionNumber].answer === item.key
        }
        choice={item.choice}
        isFinish={isFinish}
        selectedCheckbox={selectedCheckbox}
        key={String(index) + item.key}
      />
    );
  };

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Zoom}
        draggable={false}
        theme="light"
        closeButton={false}
      />
      <QuestionCounter
        timeLimit={timeLimit}
        totalQuestionCount={questionList.length}
        currentQuestionCount={currentQuestionNumber + 1}
        category={category}
      />
      {currentQuestionList[currentQuestionNumber].descriptionKeyword && (
        <Description>
          {currentQuestionList[currentQuestionNumber].descriptionKeyword?.map(
            (item) => {
              return (
                <TextBox maxWidth="full" key={item.name}>
                  {item.name}
                </TextBox>
              );
            }
          )}
        </Description>
      )}
      {currentQuestionList[currentQuestionNumber].description && (
        <Description>
          <img
            style={{ width: "100%", height: "auto" }}
            src={currentQuestionList[currentQuestionNumber].description}
            alt=""
          />
        </Description>
      )}
      {currentQuestionList[currentQuestionNumber].descriptionSentence && (
        <Description>
          <TextBox maxWidth="full">
            {currentQuestionList[currentQuestionNumber].descriptionSentence}
          </TextBox>
        </Description>
      )}
      <RowList>
        {currentQuestionList[currentQuestionNumber] &&
          currentQuestionList[currentQuestionNumber].choiceList.map(
            renderChoiceItem
          )}
      </RowList>
      {!isFinish ? (
        <Button onClick={handleCheckAnswer}>정답 확인</Button>
      ) : currentQuestionNumber < currentQuestionList.length - 1 ? (
        <Button onClick={handleNextQuestion}>다음 문제</Button>
      ) : (
        <Button onClick={handleNextContent}>다음</Button>
      )}
    </>
  );
}

export { Question };
