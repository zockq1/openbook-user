import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";

const Box = styled.li`
  position: relative;
  width: 100%;
  height: calc((100vh - 184px) / 4 - 20px);
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  overflow: hidden;
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const BoxImage = styled.img`
  height: 100%;
  width: 100%;
  float: right;
`;

interface QuizBoxProps {
  image: string;
  link: string;
  title: string;
  icon: ReactNode;
}

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 17px 5px 5px 10px;

  & > .title {
    color: ${({ theme }) => theme.colors.textBlue};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  & > .sub {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textBlue};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

function InfoBox({ image, link, title, icon }: QuizBoxProps) {
  return (
    <Box>
      <Link to={link}>
        <InnerBox>
          <MenuLabelBox state="Open">{icon}</MenuLabelBox>
          <Description>
            <span className="title">{title}</span>
          </Description>
          <BoxImage src={image} alt={title + " 이미지"} />
        </InnerBox>
      </Link>
    </Box>
  );
}

export default InfoBox;
