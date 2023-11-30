import SettingBox from "../../unit/ui/main-box/SettingBox";
import UserBox from "../../unit/ui/main-box/UserBox";
import SubPageLayout from "../../atoms/layout/SubPageLayout";
import { Default, Mobile } from "../../atoms/layout/Responsive";

function OptionPage() {
  return (
    <>
      <Mobile>
        <SubPageLayout>
          <UserBox />
          <SettingBox />
        </SubPageLayout>
      </Mobile>

      <Default>
        <SubPageLayout>
          <UserBox />
          <SettingBox />
        </SubPageLayout>
      </Default>
    </>
  );
}

export default OptionPage;
