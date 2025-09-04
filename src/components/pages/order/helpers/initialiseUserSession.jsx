import { authenticateUser } from "../../../../api/user";
import { getLocalStorage } from "../../../../utils/window";

export const initialiseUserSession = async (username, setMenu, setBasket) => {
  // S'assurer que l'utilisateur existe dans la base de données
  const userReceived = await authenticateUser(username);

  if (userReceived && userReceived.menu) {
    setMenu(userReceived.menu);
  }

  // Initialiser le panier depuis le localStorage
  const basketReceived = getLocalStorage(username);
  if (basketReceived) setBasket(basketReceived);
};
