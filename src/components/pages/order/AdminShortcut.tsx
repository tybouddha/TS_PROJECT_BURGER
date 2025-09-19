import { theme } from "@/theme/theme";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IoBulbSharp } from "react-icons/io5";

type AdminShortcutPropsType = {
  className?: string;
  onHide?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AdminShortcut({
  className,
  onHide,
}: AdminShortcutPropsType) {
  const [shortcutKey, setShortcutKey] = useState("Ctrl");

  useEffect(() => {
    if (navigator.userAgent.includes("Mac")) {
      setShortcutKey("Cmd");
    } else {
      setShortcutKey("Ctrl");
    }
  }, []);

  return (
    <AdminShortcutStyled className={className}>
      <span>
        <IoBulbSharp />
        Pour aller plus vite:
      </span>
      <span>{shortcutKey} + i : Toggle "mode" admin</span>
      <span>{shortcutKey} + j : Toggle "panel" admin</span>
      <button onClick={onHide}>Ne plus afficher</button>
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
