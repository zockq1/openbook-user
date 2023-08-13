import styled, { keyframes } from "styled-components";

const zoomInAnimation = keyframes`
  from {
     opacity: 0;
     transform: scale3d(.3, .3, .3);
   }

   50% {
     opacity: 1;
   }

   66% {
    transform: scale(1.1);
  }
`;

const Circle = styled.div<AnswerNotificationProps>`
  position: relative;
  margin: 30px auto;
  width: 150px;
  height: 150px;
  background-color: ${({ theme, isSolved }) =>
    isSolved === "correctAnswer" ? theme.colors.blue : theme.colors.red};
  border-radius: 50%;
  animation: ${zoomInAnimation} 0.5s ease;
`;

const CheckMark = styled.div`
  position: absolute;
  transform: rotate(45deg) translate(-50%, -50%);
  left: 35%;
  top: 45%;
  height: calc(150px / 3);
  width: calc(150px / 6);
  border-bottom: 5px solid ${({ theme }) => theme.colors.white};
  border-right: 5px solid ${({ theme }) => theme.colors.white};
`;

const XMark1 = styled.div`
  position: absolute;
  transform: rotate(45deg) translate(-50%, -50%);
  left: 33%;
  top: 43%;
  height: calc(150px / 2);
  width: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const XMark2 = styled.div`
  position: absolute;
  transform: rotate(-45deg) translate(0%, -50%);
  left: 67%;
  top: 43%;
  height: calc(150px / 2);
  width: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

interface AnswerNotificationProps {
  isSolved: string;
}

function AnswerNotification({ isSolved }: AnswerNotificationProps) {
  return (
    <Circle isSolved={isSolved}>
      {isSolved === "correctAnswer" && <CheckMark />}
      {isSolved === "wrongAnswer" && <XMark1 />}
      {isSolved === "wrongAnswer" && <XMark2 />}
    </Circle>
  );
}

export default AnswerNotification;
