import styled from "styled-components";
import { MenuModel } from "../../../../types/commonTypes";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";
import Icon from "../../../atoms/icon/Icon";

interface MenuUIProps {
  menuList: MenuModel[];
  title: string;
}

const ChapterMenuList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px auto;
  &::after {
    content: "";
    flex: auto;
  }

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
  width: 250px;
  height: 120px;
  margin: 20px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: 10px;
  border: ${({ color, important, theme }) =>
    important ? `1px solid ${color}` : `1px solid ${theme.colors.lightGrey}`};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ color }) => color};
  word-break: keep-all;
  transition: transform ease 0.2s, box-shadow ease 0.2s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
    cursor: ${({ lock }) => lock && "not-allowed"};
  }

  @media (max-width: 767px) {
    flex-direction: row;
    height: 74px;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
  }
`;

const StateBox = styled.div<{ color: string; important: boolean }>`
  position: absolute;
  top: -1px;
  left: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px 0 10px 0;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.white};
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 767px) {
    position: absolute;
    width: 74px;
    height: 72px;
    top: 0;
    right: 0;
    left: auto;
    border-radius: 0 8px 8px 0;
  }
`;

const Description = styled.div<{ single: boolean }>`
  margin-top: ${({ single }) => (single ? "7px" : "0")};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  @media (max-width: 767px) {
    margin-left: 10px;
    text-align: start;
    vertical-align: bottom;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  @media (max-width: 767px) {
    text-align: start;
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.thin};

  & > div {
    padding: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.textBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.textBlue};
  }

  &::before,
  &::after {
    content: "";
    height: 1px;
    background-color: ${({ theme }) => theme.colors.textBlue};
    flex-grow: 1;
  }

  &::before {
    margin-right: 20px;
  }

  &::after {
    margin-left: 20px;
  }

  @media (max-width: 767px) {
    margin: 10px 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

function ChapterMenuUI({ menuList, title }: MenuUIProps) {
  return (
    <>
      <Divider>
        <div>{title}</div>
      </Divider>
      <ChapterMenuList>
        {menuList.map((menu, index, arr) => {
          const {
            title,
            icon,
            state = "Open",
            description = null,
            onClickMain = () => {},
            onClickSub = () => {},
            mainColor = "",
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
