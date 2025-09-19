import {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { useMenu } from "@/hooks/useMenu";
import { useBasket } from "@/hooks/useBasket";
import { findObjectById } from "@/utils/array";
import { EMPTY_PRODUCT } from "@/enums/product";
import { AdminTabEnum } from "@/enums/tab";
import { BasketProductQuantityType, MenuProductType } from "@/types/Product";

type OrderContextType = {
  isModeAdmin: boolean;
  setIsModeAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  currentTabSelected: AdminTabEnum;
  setCurrentTabSelected: React.Dispatch<React.SetStateAction<AdminTabEnum>>;
  menu: MenuProductType[] | undefined;
  setMenu: React.Dispatch<React.SetStateAction<MenuProductType[] | undefined>>;
  handleAdd: (newProduct: MenuProductType, username: string) => void;
  handleDelete: (idOfProductToDelete: string, username: string) => void;
  resetMenu: (username: string) => void;
  newProduct: MenuProductType;
  setNewProduct: React.Dispatch<React.SetStateAction<MenuProductType>>;
  productSelected: MenuProductType;
  setProductSelected: React.Dispatch<React.SetStateAction<MenuProductType>>;
  handleEdit: (productBeingEdited: MenuProductType, username: string) => void;
  titleEditRef: React.RefObject<HTMLInputElement>;
  basket: BasketProductQuantityType[];
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantityType[]>>;
  handleAddToBasket: (idProductToAdd: string, username: string) => void;
  handleDeleteBasketProduct: (
    idBasketProduct: string,
    username: string
  ) => void;
  handleProductSelected: (idProductClicked: string) => Promise<void>;
  isToggleHovered: boolean;
  setIsToggleHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

// 1. Création du context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 2. Installation du context
export const OrderContextProvider = ({ children }: PropsWithChildren) => {
  const [isModeAdmin, setIsModeAdmin] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTabSelected, setCurrentTabSelected] = useState<AdminTabEnum>(
    AdminTabEnum.ADD
  );
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);
  const [productSelected, setProductSelected] = useState(EMPTY_PRODUCT);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu } =
    useMenu();
  const { basket, setBasket, handleAddToBasket, handleDeleteBasketProduct } =
    useBasket();
  const [isToggleHovered, setIsToggleHovered] = useState(false);

  const handleProductSelected = async (idProductClicked: string) => {
    if (!isModeAdmin || !menu) return;
    const productClickedOn = findObjectById(idProductClicked, menu);
    if (!productClickedOn) return;
    await setIsCollapsed(false);
    await setCurrentTabSelected(AdminTabEnum.EDIT);
    await setProductSelected(productClickedOn);
    titleEditRef.current?.focus();
    // autre syntaxe possbile titleEditRef.current && titleEditRef.current.focus();
  };

  const orderContextValue = {
    isModeAdmin,
    setIsModeAdmin,
    isCollapsed,
    setIsCollapsed,
    currentTabSelected,
    setCurrentTabSelected,
    menu,
    setMenu,
    handleAdd,
    handleDelete,
    resetMenu,
    newProduct,
    setNewProduct,
    productSelected,
    setProductSelected,
    handleEdit,
    titleEditRef,
    basket,
    setBasket,
    handleAddToBasket,
    handleDeleteBasketProduct,
    handleProductSelected,
    isToggleHovered,
    setIsToggleHovered,
  };

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

// 3. Consommation du context
export const useOrderContext = () => {
  const orderContextData = useContext(OrderContext);
  if (orderContextData === undefined)
    throw new Error(
      "useOrderContext must be used within a OrderContextProvider"
    );
  return orderContextData;
};
