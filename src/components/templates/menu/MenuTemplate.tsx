import Layout from "../../atoms/layout/Layout";
import MenuList from "../../organisms/list/MenuList";
import TitleBox from "../../organisms/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";

interface MenuTemplateProps {
  category: string;
  handleBackPage: () => void;
  menuList: MenuModel[];
}

function MenuTemplate({
  menuList,
  category,
  handleBackPage,
}: MenuTemplateProps) {
  return (
    <Layout>
      <TitleBox handleBackPage={handleBackPage} category={category}></TitleBox>
      <MenuList list={menuList} />
    </Layout>
  );
}

export default MenuTemplate;
