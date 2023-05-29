import LinkBox from "../Common/LinkBox";
import SmallListTitle from "../Common/SmallListTitle";

interface AnswerNoteItemProps {
  answerNotenumber: number;
}

function AnswerNoteItem({ answerNotenumber }: AnswerNoteItemProps) {
  return (
    <LinkBox to={`/`}>
      <SmallListTitle>{answerNotenumber}</SmallListTitle>
    </LinkBox>
  );
}

export default AnswerNoteItem;
