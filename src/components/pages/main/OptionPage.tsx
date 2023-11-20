import MainPageLayout from "../../atoms/layout/MainPageLayout";
import SettingBox from "../../unit/ui/main-box/SettingBox";
import UserBox from "../../unit/ui/main-box/UserBox";
import Header from "../../unit/ui/Header";
import NavigationBar from "../../unit/ui/NavigationBar";
import Layout from "../../atoms/layout/Layout";
import usePreventScroll from "../../../hooks/usePreventScroll";

function OptionPage() {
  usePreventScroll();

  return (
    <Layout>
      <Header />
      <MainPageLayout>
        <UserBox />
        <SettingBox />
      </MainPageLayout>
      <NavigationBar />
    </Layout>
  );
}

export default OptionPage;
