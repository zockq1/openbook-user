import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.li`
  position: relative;
  width: calc((50% - 10px));
  margin: 10px 0;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  overflow: hidden;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BoxImage = styled.img`
  margin-top: 15px;
  width: 90%;
  height: 90%;
`;

const BoxTitle = styled.div`
  width: max-content;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.margin.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textBlue};
`;

interface MediumBoxProps {
  children?: ReactNode;
  image: string;
  link: string;
  title: string;
}

function MediumBox({ children, image, link, title }: MediumBoxProps) {
  return (
    <Box>
      <Link to={link}>
        <InnerBox>
          <BoxTitle>{title + " >"}</BoxTitle>
          <BoxImage src={image} alt={title + " 이미지"} />
          {children}
        </InnerBox>
      </Link>
    </Box>
  );
}

export default MediumBox;
