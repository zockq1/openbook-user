import { useEffect, useState } from "react";
import { RowList } from "../atoms/List";
import { LongChoiceItem } from "../molecules/LongChoiceItem";
import AnswerNotification from "../atoms/AnswerNotification";
import Button from "../atoms/Button";
import { ChoiceModel, QuestionModel } from "../../types/questionTypes";
import { ShortChoiceItem } from "../molecules/ShortChoiceItem";
import styled from "styled-components";
import TextBox from "../atoms/TextBox";

interface LongChoiceList {
  questionList: QuestionModel[];
  choiceType: "short" | "long";
  handleNextContent: () => void;
}

const Description = styled.ul`
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: auto;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  border-radius: 10px;
  border: 3px solid ${({ theme }) => theme.colors.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

function LongChoiceQuestion({
  questionList,
  choiceType,
  handleNextContent,
}: LongChoiceList) {
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [isSolved, setIsSolved] = useState("no"); //no, correctAnswer, wrongAnswer
  const [currentChoiceList, setCurrentChoiceList] = useState<ChoiceModel[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  useEffect(() => {
    questionList.sort(() => Math.random() - 0.5);
  }, [questionList]);

  useEffect(() => {
    setCurrentChoiceList(
      questionList[currentQuestionNumber].choiceList.sort(
        () => Math.random() - 0.5
      )
    );
  }, [currentQuestionNumber, setCurrentChoiceList, questionList]);

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
    if (selectedCheckbox === questionList[currentQuestionNumber].answer) {
      setIsSolved("correctAnswer");
    } else {
      setIsSolved("wrongAnswer");
    }
  };

  const handleNextQuestion = () => {
    setSelectedCheckbox("");
    setIsSolved("no");
    setCurrentQuestionNumber(currentQuestionNumber + 1);
  };

  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem = choiceType === "long" ? LongChoiceItem : ShortChoiceItem;

    return (
      <ChoiceItem
        handleCheckboxChange={handleCheckboxChange}
        handleChoiceClick={handleSentenceClick}
        current={item.key}
        answer={questionList[currentQuestionNumber].answer}
        choice={item.choice}
        isSolved={isSolved}
        selectedCheckbox={selectedCheckbox}
        key={index}
      />
    );
  };

  return (
    <>
      {questionList[currentQuestionNumber].descriptionKeyword && (
        <Description>
          {questionList[currentQuestionNumber].descriptionKeyword?.map(
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
      {questionList[currentQuestionNumber].description && (
        <Description>
          <TextBox maxWidth="full">
            {questionList[currentQuestionNumber].description}
          </TextBox>
        </Description>
      )}
      <RowList>
        {questionList[currentQuestionNumber] &&
          currentChoiceList.map(renderChoiceItem)}
      </RowList>
      {isSolved !== "no" && <AnswerNotification isSolved={isSolved} />}
      {isSolved === "no" ? (
        <Button onClick={handleCheckAnswer}>정답 확인</Button>
      ) : currentQuestionNumber < questionList.length - 1 ? (
        <Button onClick={handleNextQuestion}>다음 문제</Button>
      ) : (
        <Button onClick={handleNextContent}>다음</Button>
      )}
    </>
  );
}

export { LongChoiceQuestion };
