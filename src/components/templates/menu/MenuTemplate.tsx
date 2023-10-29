import Layout from "../../atoms/layout/Layout";
import TitleBox from "../../organisms/ui/TitleBox";
import { MenuModel } from "../../../types/commonTypes";
import { IconType } from "../../atoms/icon/Icon";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import { ReactNode } from "react";
import MenuUI from "../../unit/common/container/MenuUI.container";

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
        <MenuUI menuList={menuList} />
      </MainContentLayout>
      {children}
    </Layout>
  );
}

export default MenuTemplate;
