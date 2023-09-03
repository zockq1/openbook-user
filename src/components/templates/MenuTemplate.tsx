import Layout from "../atoms/Layout";
import MenuList from "../organisms/MenuList";
import TitleBox from "../organisms/TitleBox";
import { MenuModel } from "../../types/CommonTypes";

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
