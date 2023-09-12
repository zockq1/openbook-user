import Layout from "../../atoms/layout/Layout";
import MenuList from "../../organisms/list/MenuList";
import TitleBox from "../../organisms/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";

interface MenuTemplateProps {
  category: string;
  backLink: string;
  menuList: MenuModel[];
}

function MenuTemplate({ menuList, category, backLink }: MenuTemplateProps) {
  return (
    <Layout>
      <TitleBox backLink={backLink} category={category}></TitleBox>
      <MenuList list={menuList} />
    </Layout>
  );
}

export default MenuTemplate;
