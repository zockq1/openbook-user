import { MenuModel } from "../../../../types/commonTypes";
import QuizMenuUI from "../container/QuizMenuUI.container";

interface ChapterMenuProps {
  menuList: MenuModel[];
}

function QuizMenu({ menuList }: ChapterMenuProps) {
  const chapterCategory0 = ["전체"];
  const chapterCategory1 = [
    "선사",
    "여러",
    "고구려",
    "백제",
    "신라",
    "가야",
    "삼국",
    "통일 신라",
    "발해",
    "남북국",
  ];
  const chapterCategory3 = ["후삼국", "고려"];
  const chapterCategory4 = ["조선"];
  const chapterCategory5 = ["일제", "개항기", "국권"];
  const chapterCategory6 = ["정부", "현대"];
  const chapterCategory7 = [
    "노력",
    "유물",
    "탑",
    "석상",
    "그림",
    "세시",
    "민속",
    "지역사",
    "유산",
    "종교",
    "건축",
  ];
  return (
    <>
      <QuizMenuUI
        title="전체"
        color="#101a28"
        menuList={menuList.filter((chapter) =>
          chapterCategory0.some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
      <QuizMenuUI
        title="선사 시대 ~ 남북국 시대"
        color="#5F0F40"
        menuList={menuList.filter(
          (chapter) =>
            chapterCategory1.some((category) =>
              chapter.title?.toString().includes(category)
            ) &&
            !chapter.title?.toString().includes("후") &&
            !chapter.title?.toString().includes("고려")
        )}
      />
      <QuizMenuUI
        title="고려 시대"
        color="#161A30"
        menuList={menuList.filter((chapter) =>
          chapterCategory3.some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
      <QuizMenuUI
        title="조선 시대"
        color="#706233"
        menuList={menuList.filter((chapter) =>
          chapterCategory4.some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
      <QuizMenuUI
        title="개항기 ~ 일제강점기"
        color="#413F42"
        menuList={menuList.filter((chapter) =>
          chapterCategory5.some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
      <QuizMenuUI
        title="현대"
        color="#6C4343"
        menuList={menuList.filter((chapter) =>
          chapterCategory6.some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
      <QuizMenuUI
        title="기타"
        color="#435334"
        menuList={menuList.filter((chapter) =>
          chapterCategory7.some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
      <QuizMenuUI
        title="기출 문제"
        color="#435334"
        menuList={menuList.filter((chapter) =>
          ["심화"].some((category) =>
            chapter.title?.toString().includes(category)
          )
        )}
      />
    </>
  );
}

export default QuizMenu;
