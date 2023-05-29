import LinkBox from "../../components/Common/LinkBox";
import List from "../../components/Common/List";
import ListItem from "../../components/Common/ListItem";
import Title from "../../components/Common/Title";

function NotePage() {
  return (
    <List>
      <ListItem>
        <LinkBox to="/note/answer-note">
          <Title>오답노트</Title>
        </LinkBox>
      </ListItem>
      <ListItem>
        <Title>북마크</Title>
      </ListItem>
    </List>
  );
}

export default NotePage;
