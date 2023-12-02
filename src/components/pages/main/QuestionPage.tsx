import mock from "../../../styles/images/mock.svg";
import quiz from "../../../styles/images/quiz.svg";
import timeline from "../../../styles/images/timeline.svg";
import Icon from "../../atoms/icon/Icon";
import SubPageLayout from "../../atoms/layout/SubPageLayout";
import InfoBox from "../../unit/ui/main-box/InfoBox";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import { useState } from "react";

function QuestionPage() {
  const [hover, setHover] = useState(0);

  return (
    <>
      <Mobile>
        <SubPageLayout>
          <InfoBox
            title="기출문제"
            link="/question/mock-exam-list"
            image={mock}
            icon={<Icon icon="pen" size={22} />}
          />
          <InfoBox
            title="퀴즈"
            link="/question/quiz-list"
            image={quiz}
            icon={<Icon icon="question" size={22} />}
          />
          <InfoBox
            title="연표 문제"
            link="/question/timeline-list"
            image={timeline}
            icon={<Icon icon="TIMELINE_QUESTION" size={22} />}
          />
        </SubPageLayout>
      </Mobile>

      <Default>
        <SubPageLayout>
          <InfoBox
            title="기출문제"
            link="/question/mock-exam-list"
            image={mock}
            icon={<Icon icon="pen" size={22} />}
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
            image={timeline}
            icon={<Icon icon="TIMELINE_QUESTION" size={22} />}
            hover={hover === 1}
            setHover={() => setHover(1)}
          />
        </SubPageLayout>
      </Default>
    </>
  );
}

export default QuestionPage;
