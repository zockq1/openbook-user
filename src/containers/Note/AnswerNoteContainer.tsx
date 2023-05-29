import React from "react";
import { useGetAnswerNotesQuery } from "../../store/api/noteApi";
import AnswerNoteList from "../../components/Note/AnswerNoteList";

function AnswerNoteContainer() {
  const { data: answerNoteList } = useGetAnswerNotesQuery("1");

  return <AnswerNoteList answerNoteList={answerNoteList?.answerNoteList} />;
}

export default AnswerNoteContainer;
