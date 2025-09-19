import styled from "styled-components";
import Profile from "./Profile";
import ToggleButton from "@/components/reusable-ui/ToggleButton";
import ToastAdmin from "./ToastAdmin";
import { toast } from "react-toastify";
import { useOrderContext } from "@/context/OrderContext";

export default function NavbarRightSide() {
  const { isModeAdmin, setIsModeAdmin, setIsToggleHovered } = useOrderContext();

  const displayToastNotification = () => {
    if (!isModeAdmin) {
      toast.info("Mode admin activé", {
        // icon: <FaUserSecret size={30} />,
        theme: "dark",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsModeAdmin(!isModeAdmin);
  };

  return (
    <NavbarRightSideStyled>
      <div
        onMouseEnter={() => setIsToggleHovered(true)}
        onMouseLeave={() => setIsToggleHovered(false)}
      >
        <ToggleButton
          isChecked={isModeAdmin}
          labelIfUnchecked="ACTIVER LE MODE ADMIN"
          labelIfChecked="DÉSACTIVER LE MODE ADMIN"
          onToggle={displayToastNotification}
        />
      </div>
      <Profile />
      <ToastAdmin />
    </NavbarRightSideStyled>
  );
}

const NavbarRightSideStyled = styled.div`
  display: flex;
  align-items: center;
  padding-right: 50px;
`;
