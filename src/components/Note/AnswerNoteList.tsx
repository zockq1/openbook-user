import Separator from "../Common/Separator";
import SmallList from "../Common/SmallList";
import SmallListItem from "../Common/SmallListItem";
import AnswerNoteItem from "./AnswerNoteItem";

interface AnswerNoteListProps {
  answerNoteList: number[] | undefined;
}

function AnswerNoteList({ answerNoteList }: AnswerNoteListProps) {
  return (
    <SmallList>
      {answerNoteList?.map((item, index) => (
        <SmallListItem key={index}>
          <AnswerNoteItem answerNotenumber={item} />
          {index < answerNoteList.length - 1 && <Separator />}
        </SmallListItem>
      ))}
      {/* 임시 컴포넌트 */}
      <SmallListItem>
        <AnswerNoteItem answerNotenumber={1}></AnswerNoteItem>
      </SmallListItem>
    </SmallList>
  );
}

export default AnswerNoteList;
