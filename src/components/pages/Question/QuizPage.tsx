import useGetExChapterList from "../../../example/useGetExJJHChapterList";
import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import QuestionTemplate from "../../templates/Question/QuestionTemplate";
import useGetExKtoTQuestionList from "../../../example/useGetExKtoTQuestionList";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  /******************************* 실제 코드 *********************************/
  // const { data: chapterList } = useGetChaptersQuery();
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data } = useGetExChapterList();
  const [chapterList] = useState(data);
  const { data: KtoTQuestionList } = useGetExKtoTQuestionList();
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

  if (!chapterList || !questionList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {start ? (
        <QuestionTemplate
          category="퀴즈"
          backLink="/question"
          questionList={questionList}
          handleNextContent={handleNext}
        />
      ) : (
        <QuestionOptionTemplate
          title="퀴즈"
          icon={<Icon category="퀴즈" />}
          handleStart={handleStart}
          optionList={[
            {
              title: "시간제한",
              icon: <Icon category="시간제한" />,
              handleSelect: handleSelectTimeLimit,
              selectedItem: selectedTimeLimit,
              selectName: "time-limit",
              optionList: [
                { value: "infinite", key: "infinite", description: "무제한" },
              ],
            },
            {
              title: "단원 선택",
              icon: <Icon category="단원 학습" />,
              handleSelect: handleSelectChapter,
              selectedItem: selectedChapter,
              selectName: "chapter",
              optionList: [
                { value: "random", key: "random", description: "무작위" },
                ...chapterList.map((item) => {
                  return {
                    value: `${item.number}`,
                    key: `${item.number}`,
                    description: `${item.number}. ${item.title}`,
                  };
                }),
              ],
            },
            {
              title: "문제 수",
              icon: <Icon category="갯수" />,
              handleSelect: handleSelectNumberOfQuestion,
              selectedItem: selectedNumberOfQuestion,
              selectName: "number-of-question",
              optionList: [
                { value: "5", key: "5", description: "5" },
                { value: "10", key: "10", description: "10" },
                { value: "20", key: "20", description: "20" },
              ],
            },
          ]}
        />
      )}
    </>
  );
}

export default QuizPage;
