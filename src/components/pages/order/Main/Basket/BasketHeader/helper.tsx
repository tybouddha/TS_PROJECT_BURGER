import { DEFAULT_SUM_TO_PAY } from "@/enums/product";
import { BasketProductQuantityType, MenuProductType } from "@/types/Product";
import { findObjectById } from "@/utils/array";
import { convertStringToBoolean } from "@/utils/string";

export const calculateSumToPay = (
  basket: BasketProductQuantityType[],
  menu: MenuProductType[] | undefined
) => {
  if (menu === undefined) return DEFAULT_SUM_TO_PAY;
  return basket.reduce((total, basketProduct) => {
    const menuProduct = findObjectById(basketProduct.id, menu);
    if (menuProduct === undefined) {
      console.error("Pas de produit trouvé pour cet Id");
      return total;
    }

    if (isNaN(menuProduct.price)) return total;

    if (convertStringToBoolean(menuProduct.isAvailable) === false) return total;

    const subTotal = menuProduct.price * basketProduct.quantity;
    total += subTotal;
    return total;
  }, DEFAULT_SUM_TO_PAY);
};
