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
  const { setMenu, setBasket, isModeAdmin, isToggleHovered } =
    useOrderContext();
  const [isAdminShortcutVisible, setIsAdminShortcutVisible] = useState(false);

  useEffect(() => {
    if (username) initialiseUserSession(username, setMenu, setBasket);
  }, [username, setMenu, setBasket]);

  useEffect(() => {
    if (isToggleHovered) {
      setIsAdminShortcutVisible(true);
    }
  }, [isToggleHovered]);

  //affichage (render)
  return (
    <OrderPageStyled>
      {isModeAdmin && isToggleHovered ? (
        <AdminShortcut
          className="shortcut"
          onHide={() => setIsAdminShortcutVisible(false)}
        />
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
  border: 10px solid red;
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
