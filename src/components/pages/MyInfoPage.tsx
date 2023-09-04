import { RowList } from "../atoms/List";
import MediumBox from "../molecules/MediumBox";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";
import bookmark from "../../styles/images/bookmark.svg";
import wrong from "../../styles/images/wrong.svg";

function MyInfoPage() {
  return (
    <>
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
    </>
  );
}

export default MyInfoPage;
