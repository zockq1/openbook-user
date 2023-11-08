import { useState, useEffect } from "react";

function useCountAnimation(initialCount: number, targetPercentage: number) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    let animationFrame: number;

    const step = () => {
      if (count < targetPercentage) {
        setCount((prevCount) => prevCount + 1);
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetPercentage, count]);

  return count;
}

export default useCountAnimation;
