import { theme } from "@/theme/theme";
import styled from "styled-components";

type AdminShortcutPropsType = {
  className?: string;
};

export default function AdminShortcut({ className }: AdminShortcutPropsType) {
  return (
    <AdminShortcutStyled className={className}>
      <span>Pour aller plus vite:</span>
      <span>ctrl + i: Toggle "mode" admin</span>
      <span>ctrl + j: Toggle "panel" admin</span>
      <button>Ne plus afficher</button>
    </AdminShortcutStyled>
  );
}

const AdminShortcutStyled = styled.div`
  border: 1px solid red;
  background: ${theme.colors.background_dark};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
