import { useEffect, useState } from "react";
import { RowList } from "../atoms/List";
import { LongChoiceItem } from "../molecules/LongChoiceItem";
import Button from "../atoms/Button";
import { ChoiceModel, QuestionModel } from "../../types/questionTypes";
import { ShortChoiceItem } from "../molecules/ShortChoiceItem";
import styled from "styled-components";
import TextBox from "../atoms/TextBox";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import corrct from "../../styles/images/correct.svg";
import incorrct from "../../styles/images/incorrect.svg";

interface ChoiceList {
  questionList: QuestionModel[];
  handleNextContent: () => void;
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

function ChoiceQuestion({ questionList, handleNextContent }: ChoiceList) {
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [isSolved, setIsSolved] = useState("no"); //no, correctAnswer, wrongAnswer
  const [currentChoiceList, setCurrentChoiceList] = useState<ChoiceModel[]>([]);
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
    const shuffledQuestionList = [...currentQuestionList].sort(
      () => Math.random() - 0.5
    );
    setCurrentQuestionList(shuffledQuestionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentChoiceList(
      [...currentQuestionList[currentQuestionNumber].choiceList].sort(
        () => Math.random() - 0.5
      )
    );
  }, [currentQuestionList, setCurrentChoiceList, currentQuestionNumber]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = event.target.id;
    setSelectedCheckbox(checkboxId);
  };

  const handleSentenceClick = (checkboxId: string) => {
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
      setIsSolved("correctAnswer");
      correctAnswer();
    } else {
      setIsSolved("wrongAnswer");
      wrongAnswer();
    }
  };

  const handleNextQuestion = () => {
    toast.dismiss();
    setSelectedCheckbox("");
    setIsSolved("no");
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem =
      currentQuestionList[currentQuestionNumber].questionType === "TtoS"
        ? LongChoiceItem
        : ShortChoiceItem;

    return (
      <ChoiceItem
        handleCheckboxChange={handleCheckboxChange}
        handleChoiceClick={handleSentenceClick}
        current={String(index) + item.key}
        answer={currentQuestionList[currentQuestionNumber].answer}
        choice={item.choice}
        isSolved={isSolved}
        selectedCheckbox={selectedCheckbox}
        key={index}
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
          currentChoiceList.map(renderChoiceItem)}
      </RowList>
      {isSolved === "no" ? (
        <Button onClick={handleCheckAnswer}>정답 확인</Button>
      ) : currentQuestionNumber < currentQuestionList.length - 1 ? (
        <Button onClick={handleNextQuestion}>다음 문제</Button>
      ) : (
        <Button onClick={handleNextContent}>다음</Button>
      )}
    </>
  );
}

export { ChoiceQuestion };
