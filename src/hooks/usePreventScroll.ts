import { useEffect } from "react";

const usePreventScroll = () => {
  useEffect(() => {
    // const preventDefault = (e: Event) => {
    //   e.preventDefault();
    // };

    document.body.style.cssText = `
      overflow: hidden !important;
      touch-action: none;
    `;

    // document.addEventListener("scroll", preventDefault, { passive: false });
    // document.addEventListener("touchmove", preventDefault, { passive: false });
    // document.addEventListener("mousewheel", preventDefault, { passive: false });

    return () => {
      document.body.style.cssText = "";
      // document.removeEventListener("scroll", preventDefault);
      // document.removeEventListener("touchmove", preventDefault);
      // document.removeEventListener("mousewheel", preventDefault);
    };
  }, []);
};

export default usePreventScroll;
