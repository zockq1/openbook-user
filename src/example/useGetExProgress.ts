import { ProgressModel } from "../types/ProgressTypes";

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
