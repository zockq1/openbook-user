import SettingBox from "../../molecules/main-box/SettingBox";
import UserBox from "../../molecules/main-box/UserBox";
import Header from "../../organisms/ui/Header";
import NavigationBar from "../../organisms/ui/NavigationBar";

function OptionPage() {
  return (
    <>
      <Header />
      <UserBox />
      <SettingBox />
      <NavigationBar />
    </>
  );
}

export default OptionPage;
