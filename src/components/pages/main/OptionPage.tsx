import SettingBox from "../../unit/ui/main-box/SettingBox";
import UserBox from "../../unit/ui/main-box/UserBox";
import { Default, Mobile } from "../../atoms/layout/Responsive";
import ContentLayout from "../../atoms/layout/ContentLayout";

function OptionPage() {
  return (
    <>
      <Mobile>
        <ContentLayout>
          <UserBox />
          <SettingBox />
        </ContentLayout>
      </Mobile>

      <Default>
        <ContentLayout>
          <UserBox />
          <SettingBox />
        </ContentLayout>
      </Default>
    </>
  );
}

export default OptionPage;
