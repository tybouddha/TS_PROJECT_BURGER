import { getMenu } from "@/api/product";
import { BasketProductQuantityType, MenuProductType } from "@/types/Product";
import { getLocalStorage } from "@/utils/window";

const intialiseMenu = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<MenuProductType[] | undefined>>
) => {
  const menuReceived = await getMenu(username);
  setMenu(menuReceived);
};

const intialiseBasket = (
  username: string,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantityType[]>>
) => {
  const basketReceived = getLocalStorage(username); // localStorage est synchrone, pas besoin de "await".
  if (basketReceived) setBasket(basketReceived as BasketProductQuantityType[]);
};

export const initialiseUserSession = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<MenuProductType[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantityType[]>>
) => {
  await intialiseMenu(username, setMenu);
  intialiseBasket(username, setBasket);
};
