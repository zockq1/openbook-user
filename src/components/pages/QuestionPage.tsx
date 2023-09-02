import { RowList } from "../atoms/List";
import MediumBox from "../molecules/MediumBox";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";
import mock from "../../styles/images/mock.svg";
import quiz from "../../styles/images/quiz.svg";
import date from "../../styles/images/date.svg";

function QuestionPage() {
  return (
    <>
      <Header />
      <RowList>
        <MediumBox title="퀴즈" link="" image={quiz}></MediumBox>
        <MediumBox title="연표 문제" link="" image={date}></MediumBox>
        <MediumBox title="모의고사" link="" image={mock}></MediumBox>
      </RowList>
      <NavigationBar />
    </>
  );
}

export default QuestionPage;
