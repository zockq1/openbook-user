import bookmark from "../../../styles/images/bookmark.svg";
import wrong from "../../../styles/images/wrong.svg";
import search from "../../../styles/images/search.svg";
import Icon from "../../atoms/icon/Icon";
import SubPageLayout from "../../atoms/layout/SubPageLayout";
import InfoBox from "../../unit/ui/main-box/InfoBox";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import { useState } from "react";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import DescriptionBox from "../../unit/ui/main-box/DescriptionBox";

function MyInfoPage() {
  const [hover, setHover] = useState(0);
  return (
    <>
      <Mobile>
        <MainPageLayout>
          <InfoBox
            title="북마크"
            link="/my-info/bookmark"
            image={bookmark}
            icon={<Icon icon="bookmarkOn" size={22} />}
          />
          <InfoBox
            title="오답노트"
            link="/my-info/wrong-notes"
            image={wrong}
            icon={<Icon icon="x" size={22} />}
          />
          <InfoBox
            title="검색"
            link="/my-info/search"
            image={search}
            icon={<Icon icon="search" size={22} />}
          />
        </MainPageLayout>
      </Mobile>

      <Default>
        <SubPageLayout>
          <InfoBox
            title="북마크"
            link="/my-info/bookmark"
            image={bookmark}
            icon={<Icon icon="bookmarkOn" size={22} />}
            hover={hover === 0}
            setHover={() => setHover(0)}
          />
          <InfoBox
            title="오답노트"
            link="/my-info/wrong-notes"
            image={wrong}
            icon={<Icon icon="x" size={22} />}
            hover={hover === 1}
            setHover={() => setHover(1)}
          />
          <InfoBox
            title="검색"
            link="/my-info/search"
            image={search}
            icon={<Icon icon="search" size={22} />}
            hover={hover === 2}
            setHover={() => setHover(2)}
          />
          <DescriptionBox></DescriptionBox>
        </SubPageLayout>
      </Default>
    </>
  );
}

export default MyInfoPage;
