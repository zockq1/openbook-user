import Layout from "../atoms/Layout";
import Header from "../organisms/Header";
import NavigationBar from "../organisms/NavigationBar";
import run from "../../styles/images/run.svg";
import LargeBox from "../molecules/LargeBox";
import Percentage from "../atoms/Percentage";
import ProgressBar from "../atoms/ProgressBar";
import useGetExProgress from "../../example/useGetExProgress";

function Main() {
  /******************************* 실제 코드 *********************************/
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: progress } = useGetExProgress();
  /******************************* 예시 코드 *********************************/

  if (!progress) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Header />
      <LargeBox title="정주행" link="jeong-ju-haeng" image={run}>
        <Percentage
          percentage={Math.floor((progress.complete / progress.total) * 100)}
        />
        <ProgressBar
          percentage={Math.floor((progress.complete / progress.total) * 100)}
        />
      </LargeBox>
      <NavigationBar />
    </Layout>
  );
}

export default Main;
