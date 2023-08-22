import React, { useState, useEffect } from "react";
import styled, {
  FlattenSimpleInterpolation,
  css,
  keyframes,
} from "styled-components";

const moveInAnimation = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const moveOutAnimation = keyframes`
  0% {
    max-height: 150px;
    padding: 8px;
    opacity: 1;
  }
  100% {
    max-height: 0;
    padding: 0;
    opacity: 0;
  }
`;

interface StyledNotificationProps {
  padding: number;
  bgColor: string;
  borderRadius: number;
  boxShadow: string;
  maxHeight: string;
  opacity: number;
  animation: FlattenSimpleInterpolation;
}

const StyledNotification = styled.div<StyledNotificationProps>`
  padding: ${({ padding }) => padding}px;
  text-align: center;
  display: inline-block;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: ${({ boxShadow }) => boxShadow};
  max-height: ${({ maxHeight }) => maxHeight};
  opacity: ${({ opacity }) => opacity};
  animation: ${({ animation }) => animation} 0.3s;
`;

interface NotificationProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const height = 150;
  const padding = 8;
  const bgColor = "#f0f0f0";
  const borderRadius = 8;
  const boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

  return (
    <StyledNotification
      padding={padding}
      bgColor={bgColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      maxHeight={visible ? `${height}px` : "0"}
      opacity={visible ? 1 : 0}
      animation={
        visible
          ? css`
              ${moveInAnimation}
            `
          : css`
              ${moveOutAnimation}
            `
      }
    >
      {message}
    </StyledNotification>
  );
};

export default Notification;
