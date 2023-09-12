import { ProgressModel } from "../types/progressTypes";

const useGetExProgress = (): {
  data: ProgressModel | undefined;
} => {
  const data: ProgressModel = {
    totalProgress: 83,
  };
  return {
    data,
  };
};

export default useGetExProgress;
