import styled from "styled-components";
import lottie from "lottie-web/build/player/lottie_light";
import questionLoading from "../../../styles/icon/question-loading.json";
import searchLoading from "../../../styles/icon/search-loading.json";
import bookmarkLoading from "../../../styles/icon/bookmark-loading.json";
import wrongLoading from "../../../styles/icon/wrong-note-loading.json";
import loginLoading from "../../../styles/icon/user-loading.json";
import { useEffect, useRef } from "react";

const LoadingConainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 150px);

  svg {
    width: 90%;
    color: ${({ theme }) => theme.colors.bg};
  }
`;

const loadingImages = {
  question: questionLoading,
  search: searchLoading,
  bookmark: bookmarkLoading,
  wrong: wrongLoading,
  login: loginLoading,
};

interface LoadingProps {
  image: keyof typeof loadingImages;
}

function Loading({ image }: LoadingProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        animationData: loadingImages[image],
        autoplay: true,
        container: container.current,
        loop: true,
        renderer: "svg",
      });
    }
  }, [image]);

  return (
    <LoadingConainer>
      <div ref={container} />
    </LoadingConainer>
  );
}

export default Loading;
