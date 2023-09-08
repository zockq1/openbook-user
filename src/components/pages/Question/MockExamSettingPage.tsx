import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetRoundsQuery } from "../../../store/api/questionApi";

function MockExamSettingPage() {
  const navigate = useNavigate();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("infinite");
  const [selectedRound, setSelectedRound] = useState("random");
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] = useState("5");
  const { data: roundList } = useGetRoundsQuery();

  const handleStart = () => {
    const round = selectedRound === "random" ? 0 : selectedRound;
    navigate(
      `/question/quiz?timelimit=${selectedTimeLimit}&round=${round}&noq=${selectedNumberOfQuestion}`
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
          selectedItem: selectedTimeLimit,
          selectName: "time-limit",
          optionList: [{ value: "30", key: "30", description: "30분" }],
        },
        {
          title: "회차 선택",
          icon: <Icon category="단원 학습" />,
          handleSelect: handleSelectChapter,
          selectedItem: selectedRound,
          selectName: "chapter",
          optionList: [
            { value: "random", key: "random", description: "무작위" },
            ...roundList.map((item) => {
              return {
                value: String(item.number),
                key: String(item.number),
                description: String(item.number) + "회",
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
          optionList: [{ value: "20", key: "20", description: "20" }],
        },
      ]}
    />
  );
}

export default MockExamSettingPage;
