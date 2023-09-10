import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetRoundsQuery } from "../../../store/api/questionApi";

function MockExamSettingPage() {
  const navigate = useNavigate();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(Infinity);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] =
    useState<number>(5);
  const { data: roundList } = useGetRoundsQuery();

  const handleStart = () => {
    navigate(
      `/question/quiz?timelimit=${selectedTimeLimit}&round=${selectedRound}&noq=${selectedNumberOfQuestion}`
    );
  };

  const handleSelectTimeLimit = (e: any) => {
    setSelectedTimeLimit(e.target.value);
  };

  const handleSelectChapter = (e: any) => {
    setSelectedRound(e.target.value);
  };

  const handleSelectNumberOfQuestion = (e: any) => {
    setSelectedNumberOfQuestion(e.target.value);
  };

  if (!roundList) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionOptionTemplate
      title="모의고사"
      icon={<Icon category="모의고사" />}
      handleStart={handleStart}
      optionList={[
        {
          title: "시간제한",
          icon: <Icon category="시간제한" />,
          handleSelect: handleSelectTimeLimit,
          selectName: "time-limit",
          optionList: [
            { value: 60 * 70, key: 60 * 70, description: "70분" },
            { value: 60 * 80, key: 60 * 80, description: "80분" },
          ],
        },
        {
          title: "회차 선택",
          icon: <Icon category="단원 학습" />,
          handleSelect: handleSelectChapter,
          selectName: "chapter",
          optionList: [
            { value: 0, key: 0, description: "무작위" },
            ...roundList.map((item) => {
              return {
                value: item.number,
                key: item.number,
                description: String(item.number) + "회",
              };
            }),
          ],
        },
        {
          title: "문제 수",
          icon: <Icon category="갯수" />,
          handleSelect: handleSelectNumberOfQuestion,
          selectName: "number-of-question",
          optionList: [{ value: 50, key: 50, description: "50문제" }],
        },
      ]}
    />
  );
}

export default MockExamSettingPage;
