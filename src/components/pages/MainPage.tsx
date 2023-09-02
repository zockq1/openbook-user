import useGetExProgress from "../../example/useGetExProgress";
import MainPageTemplate from "../templates/MainPageTemplate";

function Main() {
  /******************************* 실제 코드 *********************************/
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: progress } = useGetExProgress();
  /******************************* 예시 코드 *********************************/

  if (!progress) {
    return <div>Loading...</div>;
  }

  return <MainPageTemplate progress={progress} />;
}

export default Main;
