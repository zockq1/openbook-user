import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useLazyGetTotalProgressQuery } from "../../../store/api/jjhApi";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import JJHBox from "../../unit/ui/main-box/JJHBox";
import run from "../../../styles/images/run.svg";
import books from "../../../styles/images/books.svg";
import timeline from "../../../styles/images/timeline.svg";
import timelineQuestion from "../../../styles/images/timeline-question.svg";
import mock from "../../../styles/images/mock.svg";
import quiz from "../../../styles/images/quiz.svg";
import bookmark from "../../../styles/images/bookmark.svg";
import wrong from "../../../styles/images/wrong.svg";
import search from "../../../styles/images/search.svg";
import InfoBox from "../../unit/ui/main-box/InfoBox";
import Icon from "../../atoms/icon/Icon";
import styled from "styled-components";

const Menu = styled.div`
  margin: 8px;
  display: grid;
  border-radius: 25px;
  overflow: hidden;
  border: ${({ theme }) => theme.border.default};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
`;

function Main() {
  const [getProgressTriger, { data: progress }] =
    useLazyGetTotalProgressQuery();
  const [hover, setHover] = useState(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      getProgressTriger();
    }
  }, [isLoggedIn, getProgressTriger]);

  return (
    <MainPageLayout>
      <JJHBox
        title="정주행"
        link="jeong-ju-haeng"
        image={run}
        percentage={progress?.totalProgress || 0}
        hover={hover === 0}
        setHover={() => setHover(0)}
      />
      <Menu>
        <InfoBox
          title="학습 자료"
          link="/learning"
          image={books}
          icon={<Icon icon="CHAPTER_INFO" size={22} />}
          hover={hover === 1}
          setHover={() => setHover(1)}
        />
        <InfoBox
          title="연표 모음"
          link="/timeline-list"
          image={timeline}
          icon={<Icon icon="TIMELINE_STUDY" size={22} />}
          hover={hover === 2}
          setHover={() => setHover(2)}
        />
        <InfoBox
          title="북마크"
          link="/my-info/bookmark"
          image={bookmark}
          icon={<Icon icon="bookmarkOn" size={22} />}
          hover={hover === 0}
          setHover={() => setHover(0)}
        />
        <InfoBox
          title="검색"
          link="/my-info/search"
          image={search}
          icon={<Icon icon="search" size={22} />}
          hover={hover === 2}
          setHover={() => setHover(2)}
        />
        <InfoBox
          title="퀴즈"
          link="/question/quiz-list"
          image={quiz}
          icon={<Icon icon="question" size={22} />}
          hover={hover === 0}
          setHover={() => setHover(0)}
        />
        <InfoBox
          title="연표 문제"
          link="/question/timeline-list"
          image={timelineQuestion}
          icon={<Icon icon="TIMELINE_QUESTION" size={22} />}
          hover={hover === 1}
          setHover={() => setHover(1)}
        />
        <InfoBox
          title="기출문제"
          link="/question/mock-exam-list"
          image={mock}
          icon={<Icon icon="pen" size={22} />}
          hover={hover === 2}
          setHover={() => setHover(2)}
        />
        <InfoBox
          title="오답노트"
          link="/my-info/wrong-notes"
          image={wrong}
          icon={<Icon icon="x" size={22} />}
          hover={hover === 1}
          setHover={() => setHover(1)}
        />
      </Menu>
    </MainPageLayout>
  );
}

export default Main;
