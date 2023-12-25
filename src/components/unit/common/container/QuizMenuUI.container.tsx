import styled from "styled-components";
import { MenuModel } from "../../../../types/commonTypes";
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
  flex-wrap: wrap;
  margin: 20px auto;

  @media (max-width: 767px) {
    flex-direction: column;
    margin: 0;
  }
`;

const ChapterBoxContainer = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;

const ChapterBox = styled.button<{
  color: string;
  important: boolean;
  lock: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  margin: 20px;
  border-radius: 10px;
  border: ${({ color, important, theme }) =>
    !important ? `1px solid ${color}` : `1px solid ${theme.colors.lightGrey}`};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ color }) => color};
  word-break: keep-all;
  transition: transform ease 0.2s, box-shadow ease 0.2s;

  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  @media (min-width: 768px) {
    margin-bottom: 50px;
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
      cursor: ${({ lock }) => lock && "not-allowed"};
    }
  }

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: 1fr;
    height: 74px;
    width: calc(100% - 80px);
    margin: 10px;
    margin-left: 0;
    padding-left: 15px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const StateBox = styled.div<{ color: string; important: boolean }>`
  width: 70px;
  height: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.white};
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: 768px) {
    position: absolute;
    top: 130px;
    left: 20px;
    height: 40px;
    width: 200px;
    transition: transform ease 0.2s, box-shadow ease 0.2s;
    cursor: pointer;
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.05);
    }
  }
`;

const Score = styled.div`
  position: absolute;
  left: 25px;
  @media (min-width: 768px) {
    position: relative;
    left: 0;
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
`;

const Description = styled.div<{ single: boolean }>`
  width: 100%;
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

function QuizMenuUI({ menuList, title, color = "" }: MenuUIProps) {
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
            subTitle,
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
                <Score>{icon}</Score>
                <Description single={!description}>
                  <Title>{title}</Title>
                  <SubTitle>{description}</SubTitle>
                </Description>
              </ChapterBox>
              <StateBox
                onClick={onClickSub}
                color={mainColor}
                important={important}
              >
                {subTitle}
              </StateBox>
            </ChapterBoxContainer>
          );
        })}
      </ChapterMenuList>
    </>
  );
}

export default QuizMenuUI;
