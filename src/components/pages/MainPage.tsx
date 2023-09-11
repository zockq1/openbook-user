import useGetExProgress from "../../example/useGetExProgress";
import { useGetTotalProgressQuery } from "../../store/api/chapterApi";
import MainPageTemplate from "../templates/MainPageTemplate";

function Main() {
  const { data: progress } = useGetTotalProgressQuery();

  if (!progress) {
    return <div>Loading...</div>;
  }

  return <MainPageTemplate progress={progress} />;
}

export default Main;
