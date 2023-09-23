import { useEffect } from "react";
import { useLazyGetTotalProgressQuery } from "../../../store/api/chapterApi";
import MainPageTemplate from "../../templates/main/MainPageTemplate";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function Main() {
  const [getProgressTriger, { data: progress }] =
    useLazyGetTotalProgressQuery();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      getProgressTriger();
    }
  }, [isLoggedIn, getProgressTriger]);

  return (
    <MainPageTemplate
      progress={{ totalProgress: progress ? progress.totalProgress : 0 }}
    />
  );
}

export default Main;
