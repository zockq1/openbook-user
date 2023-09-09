import useGetExProgress from "../../example/useGetExProgress";
import MainPageTemplate from "../templates/MainPageTemplate";

function Main() {
  const { data: progress } = useGetExProgress();

  if (!progress) {
    return <div>Loading...</div>;
  }

  return <MainPageTemplate progress={progress} />;
}

export default Main;
