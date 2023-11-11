import MediumBox from "../../molecules/main-box/MediumBox";
import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";
import bookmark from "../../../styles/images/bookmark.svg";
import wrong from "../../../styles/images/wrong.svg";
import MainPageLayout from "../../atoms/layout/MainPageLayout";
import styled from "styled-components";

const SubMenu = styled.ul`
  display: flex;
  justify-content: space-between;
`;

function MyInfoPage() {
  return (
    <MainPageLayout>
      <Header />
      <SubMenu>
        <MediumBox title="북마크" link="bookmark" image={bookmark}></MediumBox>
        <MediumBox
          title="오답노트"
          link="wrong-notes"
          image={wrong}
        ></MediumBox>
      </SubMenu>

      <NavigationBar />
    </MainPageLayout>
  );
}

export default MyInfoPage;
