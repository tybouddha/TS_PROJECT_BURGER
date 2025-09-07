export type MenuProductType = {
  id: string;
  imageSource: string;
  title: string;
  price: number;
  quantity?: number;
  isAvailable: boolean;
  isPublicised: boolean;
};

export type BasketProductQuantityType = {
  id: string;
  quantity: number;
};

export type BasketProductType = MenuProductType & BasketProductQuantityType;
