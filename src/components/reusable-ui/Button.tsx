import styled, { css, keyframes } from "styled-components";
import { theme } from "@/theme/theme";
import { ComponentProps, useEffect, useState } from "react";

type ButtonVersionType = "normal" | "success";

type ButtonType = {
  Icon?: JSX.Element;
  LoadingIcon?: JSX.Element;
  version?: ButtonVersionType;
  label: string;
  isLoading?: boolean;
  loaderDelay?: number;
} & ComponentProps<"button">;

const Spinner = () => <SpinnerStyled />;

export default function Button({
  label,
  Icon,
  LoadingIcon,
  className,
  version = "normal",
  onClick,
  disabled,
  isLoading = false,
  loaderDelay = 500,
}: ButtonType) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, loaderDelay);

      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, loaderDelay]);

  return (
    <ButtonStyled
      className={className}
      version={version}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {!showLoader && <span>{label}</span>}
      <div className="icon">
        {showLoader ? (
          LoadingIcon ? (
            <LoadingIconStyled>{LoadingIcon}</LoadingIconStyled>
          ) : (
            <Spinner />
          )
        ) : (
          Icon && Icon
        )}
      </div>
    </ButtonStyled>
  );
}

type ButtonStyledPropsType = {
  version: ButtonVersionType;
};

const spin = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const LoadingIconStyled = styled.div`
  animation: ${spin} 1s linear infinite;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerStyled = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const ButtonStyled = styled.button<ButtonStyledPropsType>`
  ${({ version }) => extraStyle[version]};
`;

const extraStyleNormal = css`
  width: 100%;
  border: 1px solid red;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative; //is used in case you want to create interactive icons where an icon replaces the text label.
  white-space: nowrap; //prevents the text label from wrapping to the next line.
  text-decoration: none; //removes the text decoration in case you’re applying the .btn class to a link.
  line-height: 1;

  padding: 18px 24px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 800;
  color: white;
  background-color: #ff9f1b;
  border: 1px solid #ff9f1b;
  cursor: pointer;

  :hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
    transition: all 200ms ease-out;
  }
  :active {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
    z-index: 2;
  }

  &.with-focus {
    border: 1px solid white;
    background-color: ${theme.colors.white};
    color: ${theme.colors.primary};
    :hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.white};
    }
    :active {
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const extraStyleSuccess = css`
  cursor: pointer;
  color: ${theme.colors.white};
  background: ${theme.colors.success};
  border: 1px solid ${theme.colors.success};
  border-radius: ${theme.borderRadius.round};
  height: 100%;
  padding: 0 1.5em;
  font-weight: ${theme.fonts.weights.semiBold};
  :hover {
    background: ${theme.colors.white};
    color: ${theme.colors.success};
    border: 1px solid ${theme.colors.success};
  }
  :active {
    color: ${theme.colors.white};
    background: ${theme.colors.success};
    border: 1px solid ${theme.colors.success};
  }
`;
const extraStyle = {
  normal: extraStyleNormal,
  success: extraStyleSuccess,
};
