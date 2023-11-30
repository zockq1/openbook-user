import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useLazyGetTotalProgressQuery } from "../../../store/api/jjhApi";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import JJHBox from "../../unit/ui/main-box/JJHBox";
import run from "../../../styles/images/run.svg";
import books from "../../../styles/images/books.svg";
import timeline from "../../../styles/images/timeline.svg";
import NavigationBar from "../../unit/ui/NavigationBar";
import InfoBox from "../../unit/ui/main-box/InfoBox";
import Icon from "../../atoms/icon/Icon";
import { Default, Mobile } from "../../atoms/layout/Responsive";

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
    <>
      <Mobile>
        <MainPageLayout>
          <JJHBox
            title="정주행"
            link="jeong-ju-haeng"
            image={run}
            percentage={progress?.totalProgress || 0}
          />
          <InfoBox
            title="학습 자료 모음"
            link="/learning"
            image={books}
            icon={<Icon icon="CHAPTER_INFO" size={22} />}
          />
          <InfoBox
            title="연표 모음"
            link="/timeline-list"
            image={timeline}
            icon={<Icon icon="TIMELINE_STUDY" size={22} />}
          />
        </MainPageLayout>

        <NavigationBar />
      </Mobile>

      <Default>
        <MainPageLayout>
          <JJHBox
            title="정주행"
            link="jeong-ju-haeng"
            image={run}
            percentage={progress?.totalProgress || 0}
            hover={hover === 0}
            setHover={() => setHover(0)}
          />
          <InfoBox
            title="학습 자료 모음"
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
        </MainPageLayout>
      </Default>
    </>
  );
}

export default Main;
