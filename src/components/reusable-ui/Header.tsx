import styled from "styled-components";
import { theme } from "../../theme/theme";

type HeaderPropsType = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderPropsType) {
  return <HeaderStyled>{children}</HeaderStyled>;
}

const HeaderStyled = styled.div`
  height: 70px;
  background: ${theme.colors.background_dark};
  padding: 0 16px;
`;
