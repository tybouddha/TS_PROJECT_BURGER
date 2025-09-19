import { theme } from "@/theme/theme";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { IoBulbSharp } from "react-icons/io5";
import Button from "@/components/reusable-ui/Button";

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
      <div className="all-content">
        <div className="title-div">
          <span>
            <IoBulbSharp />
            Pour aller plus vite :
          </span>
        </div>
        <div className="admin-div">
          <span>{shortcutKey} + i : Toggle "mode" admin</span>
        </div>
        <div className="panel-div">
          <span>{shortcutKey} + j : Toggle "panel" admin</span>
        </div>
        <div className="button-div">
          <Button
            label="Ne plus afficher"
            onClick={onHide}
            className="button"
          />
        </div>
      </div>
    </AdminShortcutStyled>
  );
}

const AdminShortcutStyled = styled.div`
  background: ${theme.colors.background_dark};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${theme.borderRadius.round};

  height: 184px;
  width: 260px;

  .all-content {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    margin: 20px;

    gap: 12px;
  }

  .title-div {
    font-weight: ${theme.fonts.weights.heavy};
    width: 220px;
    height: 22px;
    font-size: ${theme.fonts.size.P0};
  }

  .admin-div {
    width: 220px;
    height: 20px;
    font-size: ${theme.fonts.size.XS};
  }

  .panel-div {
    width: 220px;
    height: 20px;
    font-size: ${theme.fonts.size.XS};
  }

  .button-div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 43px;
  }

  .button {
    border-color: ${theme.colors.white};
    background-color: ${theme.colors.background_dark};
    border-radius: 30px;
    &:hover {
      border-color: ${theme.colors.primary};
    }
  }
`;
