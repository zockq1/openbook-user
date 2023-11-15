import { Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";
import questionLoading from "../../../styles/icon/question-loading.json";
import searchLoading from "../../../styles/icon/search-loading.json";
import bookmarkLoading from "../../../styles/icon/bookmark-loading.json";
import wrongLoading from "../../../styles/icon/wrong-note-loading.json";
import loginLoading from "../../../styles/icon/user-loading.json";

const LoadingConainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 150px);

  #lottie {
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
  return (
    <LoadingConainer>
      <Player autoplay speed={1.5} loop src={loadingImages[image]} />
    </LoadingConainer>
  );
}

export default Loading;
