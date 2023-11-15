import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";
import bookmark from "../../../styles/images/bookmark.svg";
import wrong from "../../../styles/images/wrong.svg";
import search from "../../../styles/images/search.svg";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import Icon from "../../atoms/icon/Icon";
import { RowList } from "../../atoms/layout/List";
import QuestionBox from "../../molecules/main-box/QuestionBox";

function MyInfoPage() {
  return (
    <MainPageLayout>
      <Header />
      <RowList>
        <QuestionBox
          title="북마크"
          link="/my-info/bookmark"
          image={bookmark}
          icon={<Icon icon="bookmarkOn" size={22} />}
        />
        <QuestionBox
          title="오답노트"
          link="/my-info/wrong-notes"
          image={wrong}
          icon={<Icon icon="x" size={22} />}
        />
        <QuestionBox
          title="검색"
          link="/my-info/search"
          image={search}
          icon={<Icon icon="search" size={22} />}
        />
      </RowList>

      <NavigationBar />
    </MainPageLayout>
  );
}

export default MyInfoPage;
