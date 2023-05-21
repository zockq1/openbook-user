import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  incrementCorrect,
  incrementSolved,
  incrementWrong,
} from "../store/slices/quizSlice";

const QuestionBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 95%;
  height: 80vh;

  border-radius: 10px;

  margin: 85px auto 10px;
  padding-left: 15px;
  padding-top: 15px;
  background-color: #fff;
  font-size: 12px;
`;

const Choice = styled.div<{ selected: boolean; isCorrect: boolean }>`
  cursor: pointer;
  margin-bottom: 10px;
  ${(props) => props.selected && `color: ${props.isCorrect ? "green" : "red"}`};
`;

const Answer = styled.div<{ color: string }>`
  text-align: center;
  margin-top: 100px;
  ${(props) => `color: ${props.color}`};
  font-size: 100px;
  font-family: "Hanna";
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 10px;
  font-size: 18px;
  font-weight: 700;
`;

function Question() {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [description, setDescription] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [choice5, setChoice5] = useState("");
  const [choice1Id, setChoice1Id] = useState();
  const [choice2Id, setChoice2Id] = useState();
  const [choice3Id, setChoice3Id] = useState();
  const [choice4Id, setChoice4Id] = useState();
  const [choice5Id, setChoice5Id] = useState();
  const [correctId, setCorrectId] = useState();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);

  const handleChoiceClick = (choiceId: any) => {
    setSelectedChoice(choiceId);
    if (choiceId === correctId) {
      dispatch(incrementSolved());
      dispatch(incrementCorrect());
      setShowCorrectAnswer(true);
      setShowWrongAnswer(false);
    } else {
      dispatch(incrementSolved());
      dispatch(incrementWrong());
      setShowCorrectAnswer(false);
      setShowWrongAnswer(true);
    }
  };
  const getQuestion = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/temp-question?category=인물&type=1`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPrompt(data.prompt);
      setDescription(data.description.content);
      setChoice1(data.choiceList[0].content);
      setChoice2(data.choiceList[1].content);
      setChoice3(data.choiceList[2].content);
      setChoice4(data.choiceList[3].content);
      setChoice5(data.choiceList[4].content);
      setChoice1Id(data.choiceList[0].id);
      setChoice2Id(data.choiceList[1].id);
      setChoice3Id(data.choiceList[2].id);
      setChoice4Id(data.choiceList[3].id);
      setChoice5Id(data.choiceList[4].id);
      setCorrectId(data.answerChoiceId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  const handleNextQuestion = () => {
    setSelectedChoice(null);
    setShowCorrectAnswer(false);
    setShowWrongAnswer(false);
    getQuestion();
  };

  return (
    <QuestionBox>
      <div>{"<문제> " + prompt}</div>
      <br />
      <div>{"<보기> " + description}</div>
      <br />
      <Choice
        selected={selectedChoice === choice1Id}
        isCorrect={correctId === choice1Id}
        onClick={() => handleChoiceClick(choice1Id)}
      >
        {"1. " + choice1}
      </Choice>
      <Choice
        selected={selectedChoice === choice2Id}
        isCorrect={correctId === choice2Id}
        onClick={() => handleChoiceClick(choice2Id)}
      >
        {"2. " + choice2}
      </Choice>
      <Choice
        selected={selectedChoice === choice3Id}
        isCorrect={correctId === choice3Id}
        onClick={() => handleChoiceClick(choice3Id)}
      >
        {"3. " + choice3}
      </Choice>
      <Choice
        selected={selectedChoice === choice4Id}
        isCorrect={correctId === choice4Id}
        onClick={() => handleChoiceClick(choice4Id)}
      >
        {"4. " + choice4}
      </Choice>
      <Choice
        selected={selectedChoice === choice5Id}
        isCorrect={correctId === choice5Id}
        onClick={() => handleChoiceClick(choice5Id)}
      >
        {"5. " + choice5}
      </Choice>
      {showCorrectAnswer && <Answer color="green">정답</Answer>}
      {showWrongAnswer && <Answer color="red">오답</Answer>}
      <NextButton onClick={handleNextQuestion}>다음 문제{"->"}</NextButton>
    </QuestionBox>
  );
}

export default Question;
