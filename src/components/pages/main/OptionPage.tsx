import MainPageLayout from "../../atoms/layout/MainPageLayout";
import SettingBox from "../../unit/ui/main-box/SettingBox";
import UserBox from "../../unit/ui/main-box/UserBox";
import Header from "../../unit/ui/Header";
import NavigationBar from "../../unit/ui/NavigationBar";

function OptionPage() {
  return (
    <MainPageLayout>
      <Header />
      <UserBox />
      <SettingBox />
      <NavigationBar />
    </MainPageLayout>
  );
}

export default OptionPage;
