import useGetExChapterList from "../../../example/useGetExChapterList";
import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import QuestionTemplate from "../../templates/Question/QuestionTemplate";
import useGetExKtoTQuestionList from "../../../example/useGetExKtoTQuestionList";
import { useNavigate } from "react-router-dom";
import useGetExMockExamList from "../../../example/useGetExMockEaxm";

function MockExamPage() {
  const navigate = useNavigate();
  /******************************* 실제 코드 *********************************/
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: KtoTQuestionList } = useGetExMockExamList();
  const [questionList] = useState(KtoTQuestionList);
  /******************************* 예시 코드 *********************************/
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("무제한");
  const [selectedChapter, setSelectedChapter] = useState("무작위");
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] = useState("5");
  const [start, setStart] = useState<boolean>(false);

  const handleStart = () => {
    setStart(true);
  };

  const handleNext = () => {
    navigate("/question");
  };

  const handleSelectTimeLimit = (e: any) => {
    setSelectedTimeLimit(e.target.value);
  };

  const handleSelectChapter = (e: any) => {
    setSelectedChapter(e.target.value);
  };

  const handleSelectNumberOfQuestion = (e: any) => {
    setSelectedNumberOfQuestion(e.target.value);
  };

  if (!questionList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {start ? (
        <QuestionTemplate
          category="모의고사"
          backLink="/question"
          questionList={questionList}
          handleNextContent={handleNext}
        />
      ) : (
        <QuestionOptionTemplate
          title="모의고사"
          icon={<Icon category="모의고사" />}
          handleStart={handleStart}
          optionList={[
            {
              title: "시간제한",
              icon: <Icon category="시간제한" />,
              handleSelect: handleSelectTimeLimit,
              selectedItem: selectedTimeLimit,
              selectName: "time-limit",
              optionList: [{ value: "30", key: "30", description: "30분" }],
            },
            {
              title: "회차 선택",
              icon: <Icon category="단원 학습" />,
              handleSelect: handleSelectChapter,
              selectedItem: selectedChapter,
              selectName: "chapter",
              optionList: [
                { value: "random", key: "random", description: "무작위" },
                { value: "60", key: "60", description: "60회" },
                { value: "61", key: "61", description: "61회" },
                { value: "62", key: "62", description: "62회" },
              ],
            },
            {
              title: "문제 수",
              icon: <Icon category="갯수" />,
              handleSelect: handleSelectNumberOfQuestion,
              selectedItem: selectedNumberOfQuestion,
              selectName: "number-of-question",
              optionList: [{ value: "20", key: "20", description: "20" }],
            },
          ]}
        />
      )}
    </>
  );
}

export default MockExamPage;
