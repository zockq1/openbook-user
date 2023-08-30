import { ChapterInfoModel } from "../types/chapterTypes";

const useGetExChapterInfo = (): {
  data: ChapterInfoModel | undefined;
} => {
  const data: ChapterInfoModel = {
    content:
      '<h2>1. 명의 해금 정책과 조공 무역 체제</h2><figure class="table"><table><tbody><tr><th>조선</th><td><p>조선은 조천사를 통해 명과 공무역</p><p>﻿조선은 생사, 비단, 서적 등을 수입</p></td></tr><tr><th>일본</th><td><p>무로마치 막부는 15세기 초 명의 책봉</p><p>﻿무로마치 막부는 생사, &nbsp;비단, 도자기, 서적 수입</p></td></tr><tr><th>류큐</th><td><p>류큐는 명과 조공 무역 전개</p><p>﻿﻿명의 해금 정책으로 류큐가 중계 무역의 거 포르투갈 상인의 진축로 류큐의 중계 무역 쇠퇴</p></td></tr></tbody></table></figure>',
  };
  return {
    data,
  };
};

export default useGetExChapterInfo;
