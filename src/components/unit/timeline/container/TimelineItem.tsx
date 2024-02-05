import TimelineItemUI from "../presenter/TimelineItemUI";

interface TimelineTopicProps {
  dateItem: {
    comment: string;
    date: number | string | null;
    keywordList: string[] | null;
    file?: string;
  };
  isQuestion?: boolean;
}

function TimelineItem({ dateItem, isQuestion = false }: TimelineTopicProps) {
  return <TimelineItemUI dateItem={dateItem} isQuestion={isQuestion} />;
}

export default TimelineItem;
