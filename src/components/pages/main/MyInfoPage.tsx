import { RowList } from "../../atoms/layout/List";
import MediumBox from "../../molecules/main-box/MediumBox";
import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";
import bookmark from "../../../styles/images/bookmark.svg";
import wrong from "../../../styles/images/wrong.svg";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

function MyInfoPage() {
  return (
    <MainContentLayout>
      <Header />
      <RowList>
        <MediumBox title="북마크" link="bookmark" image={bookmark}></MediumBox>
        <MediumBox
          title="오답노트"
          link="wrong-notes"
          image={wrong}
        ></MediumBox>
      </RowList>

      <NavigationBar />
    </MainContentLayout>
  );
}

export default MyInfoPage;
