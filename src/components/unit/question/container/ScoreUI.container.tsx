import styled, { keyframes } from "styled-components";
import { QuestionModel } from "../../../../types/questionTypes";
import fail from "../../../../styles/images/fail.svg";
import success from "../../../../styles/images/success.svg";
import redFlag from "../../../../styles/images/red-flag.svg";
import blueFlag from "../../../../styles/images/blue-flag.svg";

const ScoreContainer = styled.div`
  display: flex;
  position: relative;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  padding-bottom: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Progress = styled.div`
  display: flex;
  position: absolute;
  bottom: 12px;
  justify-content: flex-start;
  align-items: center;

  border-radius: 100px;
  padding: 0 5px;
  height: 20px;
  width: calc(100% - 24px);
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
`;

const Load = keyframes`
  0% { width: 0; }
  100% { width: var(--progress-width, 0); }
`;

interface BarProps {
  percentage: number;
}

const Bar = styled.div<BarProps>`
  --progress-width: ${({ percentage }) => `${percentage}%`};
  animation: ${Load} 1s normal forwards;
  border-radius: 100px;
  background: ${({ percentage, theme }) =>
    percentage < 80 ? theme.colors.red : theme.colors.blue};
  height: 10px;
  width: 0;
`;

const Image = styled.img`
  width: 40%;
`;

const Title = styled.div<{ isSuccess: boolean }>`
  width: 100%;
  margin: 10px 0;
  color: ${({ theme, isSuccess }) =>
    isSuccess ? theme.colors.blue : theme.colors.red};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 30px;
  font-family: "Giants-Regular";
  text-align: center;
  white-space: nowrap;
`;

const Score = styled.div<{ isSuccess: boolean }>`
  width: 100%;
  margin: 10px 0;
  color: ${({ theme, isSuccess }) =>
    isSuccess ? theme.colors.blue : theme.colors.red};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-family: "Giants-Regular";
  text-align: center;
  white-space: nowrap;
`;

const Sub = styled.div`
  width: 100%;
  margin: 10px 0 20px;
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: "Giants-Regular";
  text-align: center;
  word-break: keep-all;
`;

const Flag = styled.img`
  position: absolute;
  width: 40px;
  bottom: 20px;
  right: 20%;
  transform: translate(-5px, 0);
  z-index: 999;
`;

interface ScoreUIProps {
  score: number;
  questionList: QuestionModel[];
  isJJH: boolean;
}

function ScoreUI({ score, questionList, isJJH }: ScoreUIProps) {
  const persentage = (score / questionList.length) * 100;
  const isSuccess = persentage >= 80;
  return (
    <>
      {isSuccess ? (
        <ScoreContainer>
          <Image src={success} />
          <DescriptionContainer>
            <Title isSuccess={isSuccess}>합격!</Title>
            <Score isSuccess={isSuccess}>
              {Math.floor(persentage)}%({score}/{questionList.length})
            </Score>
            {isJJH && <Sub>다음 학습으로 넘어가세요!</Sub>}
          </DescriptionContainer>
          <Flag src={blueFlag} />
          <Progress>
            <Bar percentage={persentage} />
          </Progress>
        </ScoreContainer>
      ) : (
        <ScoreContainer>
          <Image src={isSuccess ? success : fail} />
          <DescriptionContainer>
            <Title isSuccess={isSuccess}>불합격!</Title>
            <Score isSuccess={isSuccess}>
              {Math.floor(persentage)}%({score}/{questionList.length})
            </Score>
            {isJJH && (
              <Sub>
                80%({Math.ceil(questionList.length * 0.8)}/{questionList.length}
                )를 넘기지 못했습니다.
                <br />
                다시 공부해주세요.
              </Sub>
            )}
          </DescriptionContainer>
          <Flag src={redFlag} />
          <Progress>
            <Bar percentage={persentage} />
          </Progress>
        </ScoreContainer>
      )}
    </>
  );
}
export default ScoreUI;

/*
합격
  1.컨텐츠 목록으로 돌아가기
  2.다시 풀어보기
  3.다음 문제로 바로가기
    a.다음 문제가 같은 컨텐츠 목록에 있을 경우
불합격
  1.컨텐츠 목록으로 돌아가기
  2.다시 풀어보기
*/
