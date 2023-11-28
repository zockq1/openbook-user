import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

interface ResponsiveProps {
  children: ReactNode;
}

const Desktop = ({ children }: ResponsiveProps) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }: ResponsiveProps) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }: ResponsiveProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }: ResponsiveProps) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

export { Default, Desktop, Tablet, Mobile };
