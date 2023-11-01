import MainContentLayout from "../../atoms/layout/MainContentLayout";
import SettingBox from "../../molecules/main-box/SettingBox";
import UserBox from "../../molecules/main-box/UserBox";
import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";

function OptionPage() {
  return (
    <MainContentLayout>
      <Header />
      <UserBox />
      <SettingBox />
      <NavigationBar />
    </MainContentLayout>
  );
}

export default OptionPage;
