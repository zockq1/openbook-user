import Layout from "../../atoms/layout/Layout";
import MenuList from "../../organisms/list/MenuList";
import TitleBox from "../../organisms/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";
import { IconType } from "../../atoms/icon/Icon";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import { ReactNode } from "react";

interface MenuTemplateProps {
  icon?: IconType;
  category: string;
  menuList: MenuModel[];
  children?: ReactNode;
}

function MenuTemplate({
  menuList,
  icon,
  category,
  children,
}: MenuTemplateProps) {
  return (
    <Layout>
      <TitleBox icon={icon} category={category}></TitleBox>
      <MainContentLayout>
        <MenuList list={menuList} />
      </MainContentLayout>
      {children}
    </Layout>
  );
}

export default MenuTemplate;
