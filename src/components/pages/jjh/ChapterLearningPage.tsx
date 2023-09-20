import { useNavigate, useParams } from "react-router-dom";
import ChapterLearningTemplate from "../../templates/learning/ChpaterLearningTemplate";
import {
  useGetChapterInfoQuery,
  useGetChapterTitleQuery,
} from "../../../store/api/chapterApi";
import { useUpdateProgressMutation } from "../../../store/api/chapterApi";
import withAuth from "../../../hoc/withAuth";

function ChapterLearningPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  const { data: chapterTitle } = useGetChapterTitleQuery(Number(chapter));
  const { data: chapterInfo } = useGetChapterInfoQuery(Number(chapter));
  const [updateProgres] = useUpdateProgressMutation();

  if (!chapterInfo || !chapterTitle) {
    return <div>Loading...</div>;
  }

  const handleNextContent = () => {
    updateProgres({
      content: "연표 학습",
      title: String(chapter),
      state: "Open",
    });
    navigate(`/jeong-ju-haeng/${chapter}/timeline-learning`);
  };

  return (
    <ChapterLearningTemplate
      title={String(chapter) + ". " + chapterTitle.title}
      content={String(chapterInfo.content)}
      handleNextContent={handleNextContent}
      handleBackPage={() => navigate(`/jeong-ju-haeng/${Number(chapter)}`)}
    />
  );
}

export default withAuth(ChapterLearningPage);
