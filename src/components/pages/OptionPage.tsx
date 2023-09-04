import SettingBox from "../molecules/SettingBox";
import UserBox from "../molecules/UserBox";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";

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
