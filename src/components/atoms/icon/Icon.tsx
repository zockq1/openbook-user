import { Content } from "../../../types/jjhTypes";
import { TopicCategory } from "../../../types/topicTypes";
import { ReactComponent as Run } from "../../../styles/icon/running.svg";
import { ReactComponent as Arrow } from "../../../styles/icon/fi-br-angle-double-right.svg";
import { ReactComponent as Fail } from "../../../styles/icon/fi-br-ban.svg";
import { ReactComponent as Infinity } from "../../../styles/icon/fi-br-infinity.svg";
import { ReactComponent as Question } from "../../../styles/icon/fi-br-question.svg";
import { ReactComponent as Again } from "../../../styles/icon/fi-br-rotate-left.svg";
import { ReactComponent as Exclamation } from "../../../styles/icon/fi-br-exclamation.svg";
import { ReactComponent as Flag } from "../../../styles/icon/fi-br-flag.svg";
import { ReactComponent as Home } from "../../../styles/icon/house-chimney.svg";
import { ReactComponent as QuestionSquare } from "../../../styles/icon/question-square.svg";
import { ReactComponent as MyInfo } from "../../../styles/icon/book-open-reader.svg";
import { ReactComponent as Clock } from "../../../styles/icon/clock-five.svg";
import { ReactComponent as Hashtag } from "../../../styles/icon/hastag.svg";
import { ReactComponent as Pen } from "../../../styles/icon/pen-clip.svg";
import { ReactComponent as Description } from "../../../styles/icon/poll-h.svg";
import { ReactComponent as Setting } from "../../../styles/icon/settings.svg";

import { ReactComponent as O } from "../../../styles/icon/square-o.svg";
import { ReactComponent as X } from "../../../styles/icon/square-x.svg";
import { ReactComponent as One } from "../../../styles/icon/square-1.svg";
import { ReactComponent as Two } from "../../../styles/icon/square-2.svg";
import { ReactComponent as Three } from "../../../styles/icon/square-3.svg";
import { ReactComponent as Back } from "../../../styles/icon/left.svg";
import { ReactComponent as Next } from "../../../styles/icon/right.svg";
import { ReactComponent as Lock } from "../../../styles/icon/lock.svg";
import { ReactComponent as Login } from "../../../styles/icon/sign-in-alt.svg";
import { ReactComponent as Check } from "../../../styles/icon/checkbox.svg";
import { ReactComponent as User } from "../../../styles/icon/circle-user.svg";
import { ReactComponent as Dice } from "../../../styles/icon/dice-alt.svg";

import { ReactComponent as Person } from "../../../styles/icon/user.svg";
import { ReactComponent as Organization } from "../../../styles/icon/users-alt.svg";
import { ReactComponent as King } from "../../../styles/icon/user-crown.svg";
import { ReactComponent as Society } from "../../../styles/icon/share.svg";
import { ReactComponent as Policy } from "../../../styles/icon/pen-field.svg";
import { ReactComponent as Identity } from "../../../styles/icon/id-card-clip-alt.svg";
import { ReactComponent as Era } from "../../../styles/icon/hourglass-end.svg";
import { ReactComponent as Culture } from "../../../styles/icon/book-open-cover.svg";
import { ReactComponent as Office } from "../../../styles/icon/bank.svg";
import { ReactComponent as Topic } from "../../../styles/icon/blog-text.svg";
import { ReactComponent as Timeline } from "../../../styles/icon/calendar-clock.svg";
import { ReactComponent as Chapter } from "../../../styles/icon/rectangle-list.svg";
import { ReactComponent as Key } from "../../../styles/icon/key.svg";
import { ReactComponent as Comment } from "../../../styles/icon/comment.svg";
import { ReactComponent as BookmarkOn } from "../../../styles/icon/bookmark-on.svg";
import { ReactComponent as BookmarkOff } from "../../../styles/icon/bookmark-off.svg";
import { ReactComponent as Search } from "../../../styles/icon/search.svg";
//import { ReactComponent as  } from "../../../styles/icon";

export type IconType =
  | "run"
  | "home"
  | "questionSquare"
  | "myInfo"
  | "setting"
  | "clock"
  | "hashtag"
  | "description"
  | "pen"
  | "question"
  | "infinity"
  | "dice"
  | "login"
  | "user"
  | "lock"
  | "back"
  | "arrow"
  | "check"
  | "one"
  | "two"
  | "three"
  | "fail"
  | "back"
  | "next"
  | "again"
  | "o"
  | "x"
  | "key"
  | "comment"
  | "bookmarkOn"
  | "bookmarkOff"
  | "search"
  | Content
  | TopicCategory;

interface Iconprops {
  icon: IconType;
  color?: string;
  size?: number | string;
}

function Icon({ icon, size, color = "inherit" }: Iconprops) {
  const icons: {
    [key: string]: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >;
  } = {
    //콘텐트
    CHAPTER_INFO: Chapter,
    TIMELINE_STUDY: Timeline,
    TIMELINE_QUESTION: Timeline,
    TOPIC_STUDY: Topic,
    TOPIC_QUESTION: QuestionSquare,
    CHAPTER_COMPLETE_QUESTION: QuestionSquare,

    //주제
    인물: Person,
    국가: Flag,
    왕: King,
    시대: Era,
    사건: Exclamation,
    조직: Organization,
    기구: Office,
    문화: Culture,
    사회: Society,
    제도: Policy,
    신분: Identity,

    //아이콘
    run: Run,
    home: Home,
    questionSquare: QuestionSquare,
    myInfo: MyInfo,
    setting: Setting,
    clock: Clock,
    hashtag: Hashtag,
    description: Description,
    pen: Pen,
    question: Question,
    infinity: Infinity,
    again: Again,
    arrow: Arrow,
    fail: Fail,
    dice: Dice,
    login: Login,
    user: User,
    lock: Lock,
    back: Back,
    next: Next,
    check: Check,
    one: One,
    two: Two,
    three: Three,
    o: O,
    x: X,
    key: Key,
    comment: Comment,
    bookmarkOff: BookmarkOff,
    bookmarkOn: BookmarkOn,
    search: Search,
  };

  if (!icons[icon]) return null;

  const SelectedIcon = icons[icon];
  return <SelectedIcon width={size} height={size} color={color} />;
}

export default Icon;
