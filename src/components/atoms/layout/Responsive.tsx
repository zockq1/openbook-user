import { useMediaQuery } from "react-responsive";
import { ReactNode } from "react";

interface ResponsiveProps {
  children?: ReactNode;
}

function Desktop({ children }: ResponsiveProps) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? <>{children}</> : null;
}
function Tablet({ children }: ResponsiveProps) {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? <>{children}</> : null;
}
function Mobile({ children }: ResponsiveProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? <>{children}</> : null;
}
function Default({ children }: ResponsiveProps) {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? <>{children}</> : null;
}

export { Default, Desktop, Tablet, Mobile };
