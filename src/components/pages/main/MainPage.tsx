import { useEffect, useState } from "react";
import { useLazyGetTotalProgressQuery } from "../../../store/api/chapterApi";
import MainPageTemplate from "../../templates/main/MainPageTemplate";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function Main() {
  const [getProgressTriger, progressResult] = useLazyGetTotalProgressQuery();
  const [progress, setProgress] = useState<number>(0);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      getProgressTriger();
    }
  }, [isLoggedIn, getProgressTriger]);

  useEffect(() => {
    if (progressResult.data) {
      setProgress(progressResult.data?.totalProgress);
    }
  }, [progressResult]);

  return <MainPageTemplate progress={{ totalProgress: progress }} />;
}

export default Main;
