import { ProgressModel } from "../types/ProgressTypes";

const useGetExProgress = (): {
  data: ProgressModel | undefined;
} => {
  const data: ProgressModel = {
    total: 30,
    complete: 19,
  };
  return {
    data,
  };
};

export default useGetExProgress;
