import { RowList } from "../atoms/List";
import MediumBox from "../molecules/MediumBox";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";
import mock from "../../styles/images/mock.svg";
import quiz from "../../styles/images/quiz.svg";
import date from "../../styles/images/date.svg";
import LargeBox from "../molecules/LargeBox";

function QuestionPage() {
  return (
    <>
      <Header />
      <RowList>
        <LargeBox title="퀴즈" link="" image={quiz}></LargeBox>
        <LargeBox title="연표 문제" link="" image={date}></LargeBox>
        <LargeBox title="모의고사" link="" image={mock}></LargeBox>
      </RowList>
      <NavigationBar />
    </>
  );
}

export default QuestionPage;
