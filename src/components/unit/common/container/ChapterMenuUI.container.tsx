import styled from "styled-components";
import { MenuModel } from "../../../../types/commonTypes";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";
import Icon from "../../../atoms/icon/Icon";
import Divider from "../../../atoms/box/Divider";

interface MenuUIProps {
  menuList: MenuModel[];
  title: string;
  color?: string;
}

const ChapterMenuList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 20px auto;
  /* &::after {
    content: "";
    flex: auto;
  } */

  @media (max-width: 767px) {
    flex-direction: column;
    margin: 0;
  }
`;

const ChapterBoxContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChapterBox = styled.button<{
  color: string;
  important: boolean;
  lock: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 245px;
  height: 120px;
  margin: 20px;
  border-radius: 10px;
  border: ${({ color, important, theme }) =>
    !important ? `1px solid ${color}` : `1px solid ${theme.colors.lightGrey}`};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ color }) => color};
  word-break: keep-all;
  transition: transform ease 0.2s, box-shadow ease 0.2s;

  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
    cursor: ${({ lock }) => lock && "not-allowed"};
  }

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    height: 74px;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }
`;

const StateBox = styled.div<{ color: string; important: boolean }>`
  position: absolute;
  top: -1px;
  right: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 0 10px 0 10px;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
`;

const Description = styled.div<{ single: boolean }>`
  width: 100%;
  margin-top: ${({ single }) => (single ? "7px" : "0")};
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  @media (max-width: 767px) {
    vertical-align: bottom;
    font-size: ${({ theme }) => theme.fontSizes.large};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const SubTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
`;

function ChapterMenuUI({ menuList, title, color = "" }: MenuUIProps) {
  if (menuList.length === 0) return <></>;
  return (
    <>
      <Divider>{title}</Divider>
      <ChapterMenuList>
        {menuList.map((menu, index, arr) => {
          const {
            title,
            icon,
            state = "Timeline",
            description = null,
            onClickMain = () => {},
            onClickSub = () => {},
            mainColor = color,
            important = false,
          } = menu;

          return (
            <ChapterBoxContainer key={index}>
              <ChapterBox
                lock={state === "Locked"}
                color={mainColor}
                important={true}
                onClick={onClickMain}
              >
                <MenuLabelBox state={state}>{icon}</MenuLabelBox>
                <Description single={!description}>
                  <Title>{title}</Title>
                  <SubTitle>{description}</SubTitle>
                </Description>

                <StateBox
                  onClick={onClickSub}
                  color={mainColor}
                  important={important}
                >
                  <Icon
                    icon={
                      state === "Locked"
                        ? "lock"
                        : state === "InProgress"
                        ? "run"
                        : state === "Complete"
                        ? "check"
                        : state === "Chapter"
                        ? "culture"
                        : state === "Timeline"
                        ? "TIMELINE_STUDY"
                        : "check"
                    }
                    size={30}
                  />
                </StateBox>
              </ChapterBox>
            </ChapterBoxContainer>
          );
        })}
      </ChapterMenuList>
    </>
  );
}

export default ChapterMenuUI;
