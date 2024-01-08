import { useEffect } from "react";

const usePreventScroll = () => {
  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden !important;
      touch-action: none;
    `;

    return () => {
      document.body.style.cssText = "";
    };
  }, []);
};

export default usePreventScroll;
