import styled from "styled-components";

interface ChapterInfoUIProps {
  image: string;
}

const Image = styled.img`
  width: 100%;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  overflow: hidden;
`;

function ChapterInfoUI({ image }: ChapterInfoUIProps) {
  return <Image src={image} alt="단원 이미지" />;
}

export default ChapterInfoUI;
