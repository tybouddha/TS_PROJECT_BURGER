import styled from "styled-components";
import { theme } from "@/theme/theme";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import { initialiseUserSession } from "./helpers/initialiseUserSession";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrderContext } from "@/context/OrderContext";
import AdminShortcut from "./AdminShortcut";

export default function OrderPage() {
  // state
  const { username } = useParams();
  const { setMenu, setBasket, isModeAdmin, setIsModeAdmin, isToggleHovered } =
    useOrderContext();

  const [isAdminShortcutVisible, setIsAdminShortcutVisible] = useState(false);
  const ADMIN_SHORTCUT_HIDDEN_KEY = "adminShortcutHidden";

  useEffect(() => {
    setIsModeAdmin(false);
  }, [username, setIsModeAdmin]);

  useEffect(() => {
    if (username) initialiseUserSession(username, setMenu, setBasket);
  }, [username, setMenu, setBasket]);

  useEffect(() => {
    const isHidden = localStorage.getItem(ADMIN_SHORTCUT_HIDDEN_KEY) === "true";

    if (isToggleHovered && isModeAdmin && !isHidden) {
      setIsAdminShortcutVisible(true);
    }
  }, [isToggleHovered, isModeAdmin]);

  const handleHideShortcut = () => {
    setIsAdminShortcutVisible(false);
    localStorage.setItem(ADMIN_SHORTCUT_HIDDEN_KEY, "true");
  };

  //affichage (render)
  return (
    <OrderPageStyled>
      {isModeAdmin && isAdminShortcutVisible ? (
        <AdminShortcut className="shortcut" onHide={handleHideShortcut} />
      ) : null}
      <div className="container">
        <Navbar />
        <Main />
      </div>
    </OrderPageStyled>
  );
}

const OrderPageStyled = styled.div`
  background: ${theme.colors.primary};
  height: 100vh;
  .shortcut {
    /* border: 3px solid blue; */
    position: absolute;
    z-index: 10;
    top: 10px;
    left: 10px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .container {
    background: red;
    height: 95vh;
    width: 1400px;
    display: flex;
    flex-direction: column;
    border-radius: ${theme.borderRadius.extraRound};
  }
`;
