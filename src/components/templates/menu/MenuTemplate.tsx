import Layout from "../../atoms/layout/Layout";
import MenuList from "../../organisms/list/MenuList";
import TitleBox from "../../organisms/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";
import { IconType } from "../../atoms/icon/Icon";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

interface MenuTemplateProps {
  icon?: IconType;
  category: string;
  handleBackPage: () => void;
  menuList: MenuModel[];
}

function MenuTemplate({
  menuList,
  icon,
  category,
  handleBackPage,
}: MenuTemplateProps) {
  return (
    <Layout>
      <TitleBox
        handleBackPage={handleBackPage}
        icon={icon}
        category={category}
      ></TitleBox>
      <MainContentLayout>
        <MenuList list={menuList} />
      </MainContentLayout>
    </Layout>
  );
}

export default MenuTemplate;
