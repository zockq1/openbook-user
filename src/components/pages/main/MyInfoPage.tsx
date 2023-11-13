import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";
import bookmark from "../../../styles/images/bookmark.svg";
import wrong from "../../../styles/images/wrong.svg";
import search from "../../../styles/images/search.svg";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import InfoBox from "../../molecules/main-box/InfoBox";
import Icon from "../../atoms/icon/Icon";
import { RowList } from "../../atoms/layout/List";

function MyInfoPage() {
  return (
    <MainPageLayout>
      <Header />
      <RowList>
        {/* <MediumBox title="북마크" link="bookmark" image={bookmark}></MediumBox>
        <MediumBox
          title="오답노트"
          link="wrong-notes"
          image={wrong}
        ></MediumBox> */}
        <br />
        <InfoBox
          title="북마크"
          link="/my-info/bookmark"
          image={bookmark}
          icon={<Icon icon="bookmarkOn" size={22} />}
          description="단원별 북마크한 주제 보기"
        />
        <InfoBox
          title="오답노트"
          link="/my-info/wrong-notes"
          image={wrong}
          icon={<Icon icon="x" size={22} />}
          description="회차별 틀린 기출 문제 보기"
        />
        <InfoBox
          title="검색"
          link="/my-info/search"
          image={search}
          icon={<Icon icon="search" size={22} />}
          description="단원, 주제, 키워드 찾기"
        />
      </RowList>

      <NavigationBar />
    </MainPageLayout>
  );
}

export default MyInfoPage;
