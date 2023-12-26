import { useEffect, useState } from "react";
import styled from "styled-components";

interface SideAnchorUIProps {
  anchorList: string[];
}

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  position: sticky;
  top: 100px;
  width: auto;
`;

const AnchorLink = styled.a<{ isActive: boolean }>`
  width: max-content;
  padding: 8px;
  margin-left: 30px;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme, isActive }) =>
    isActive ? theme.fontWeight.medium : theme.fontWeight.regular};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.textBlue : theme.colors.grey};
  border-left: 2px solid ${({ theme }) => theme.colors.lightGrey};

  &:hover {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const VerticalLine = styled.div<{ top: number }>`
  position: absolute;
  left: 30px;
  top: ${({ top }) => `${top}px`};
  width: 2px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.textBlue};
  transition: all 0.15s ease;
`;

function SideAnchorUI({ anchorList }: SideAnchorUIProps) {
  const [activeLink, setActiveLink] = useState<string | null>(anchorList[0]);
  const [lineTop, setLineTop] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 100;

      const activeSection = anchorList.find((anchor) => {
        const element = document.getElementById(anchor);
        if (element) {
          const elementTop = element.offsetTop - threshold;
          const elementBottom = elementTop + element.offsetHeight;

          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        }
        return false;
      });

      setActiveLink((prev) => activeSection || prev);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [anchorList]);

  useEffect(() => {
    const activeElement = document.getElementById(`link-${activeLink || ""}`);
    if (activeElement) {
      setLineTop(activeElement.offsetTop);
    }
  }, [activeLink]);

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <MenuList>
      {anchorList.map((anchor) => {
        return (
          <AnchorLink
            key={anchor}
            id={`link-${anchor}`}
            onClick={() => scrollToElement(anchor)}
            isActive={activeLink === anchor}
          >
            {anchor}
          </AnchorLink>
        );
      })}
      {activeLink && <VerticalLine top={lineTop} />}
    </MenuList>
  );
}

export default SideAnchorUI;
